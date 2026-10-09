import { z } from 'zod';

export type RichNode = {
  type: string;
  text?: string;
  attrs?: { href?: string; level?: number; start?: number };
  marks?: { type: string; attrs?: { href?: string; target?: '_blank' | '_self' | null } }[];
  content?: RichNode[];
};

export function safeLink(value: string): boolean {
  try {
    const url = new URL(value);
    return ['https:', 'http:', 'mailto:'].includes(url.protocol);
  } catch {
    return false;
  }
}

export function safeSummaryLink(value: string): boolean {
  if (!value || value !== value.trim() || /[\u0000-\u0020\u007f\\]/.test(value) || value.startsWith('//')) return false;
  try {
    const base = 'https://seymo.invalid';
    const url = new URL(value, base);
    if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return /^https:\/\//i.test(value) && url.protocol === 'https:' && !url.username && !url.password;
    return url.origin === base;
  } catch {
    return false;
  }
}

const link = z.string().max(2048).refine(safeLink, 'Use a complete https://, http:// or mailto: link.');
const richLink = z.string().max(2048).refine(value => safeLink(value) || safeSummaryLink(value), 'Use a valid URL.');
const image = z.string().max(2048).refine(value => !value || /^\/api\/article-images\/[a-f0-9-]+$/.test(value) || /^\/[a-zA-Z0-9/_ .-]+\.(png|jpe?g|webp)$/i.test(value) || (safeLink(value) && value.startsWith('https://')), 'Upload an image or use an HTTPS image URL.');
const richNode: z.ZodType<RichNode> = z.lazy(() => z.object({
  type: z.enum(['doc', 'paragraph', 'text', 'heading', 'bulletList', 'orderedList', 'listItem', 'blockquote', 'hardBreak', 'horizontalRule']),
  text: z.string().max(50000).optional(),
  attrs: z.object({ href: link.optional(), level: z.number().int().min(2).max(4).optional(), start: z.number().int().min(1).max(9999).optional() }).optional(),
  marks: z.array(z.object({ type: z.enum(['bold', 'italic', 'strike', 'link', 'underline']), attrs: z.object({ href: richLink.optional(), target: z.enum(['_blank', '_self']).nullable().optional() }).optional() })).max(8).optional(),
  content: z.array(richNode).max(500).optional(),
}));
const document = richNode.refine(value => value.type === 'doc', 'Rich text must be a document.');
const summaryDocument = document.refine(function validLinks(node: RichNode): boolean {
  return (node.marks || []).every(mark => mark.type !== 'link' || Boolean(mark.attrs?.href && safeSummaryLink(mark.attrs.href))) && (node.content || []).every(validLinks);
}, 'Summary links must use HTTPS or a relative internal URL.').refine(value => richTextToPlainText(value).length <= 1500, 'Keep the summary within 1,500 characters.');

export const articleSchema = z.object({
  category: z.string().trim().min(1).max(120),
  topic: z.string().trim().max(200),
  title: z.string().trim().min(1).max(300),
  summary: z.string().trim().max(1500),
  summaryContent: summaryDocument.optional(),
  author: z.string().trim().min(1).max(120),
  date: z.iso.date(),
  heroImage: image,
  heroAlt: z.string().max(300),
  heroCaption: z.string().max(500),
  introductionHeading: z.string().max(300),
  introduction: document,
  sidebarHeading: z.string().max(200),
  sidebarContent: document,
  sections: z.array(z.object({
    id: z.string().uuid(),
    heading: z.string().max(300),
    subheading: z.string().max(300),
    label: z.string().max(100),
    kind: z.enum(['section', 'callout']),
    content: document,
    image: image,
    imageAlt: z.string().max(300),
    caption: z.string().max(500),
  })).max(100),
  conclusionHeading: z.string().max(300),
  conclusion: document,
  ctaText: z.string().max(500),
  ctaUrl: z.union([z.literal(''), link]),
  references: z.array(z.object({ id: z.string().uuid(), title: z.string().trim().min(1).max(500), url: link })).max(100),
  editorialNote: z.string().max(3000),
}).refine(value => new Set(value.sections.map(section => section.id)).size === value.sections.length, 'Article section IDs must be unique.').transform(value => ({ ...value, summary: value.summaryContent ? richTextToPlainText(value.summaryContent) : value.summary }));

export type ArticleContent = z.infer<typeof articleSchema>;
export type ArticleRecord = { id: string; slug: string; status: 'draft' | 'published'; revision: number; document: ArticleContent };
export type ArticleSectionTarget = { id: string; label: string };
export const sectionAnchorId = (id: string) => `section-${id}`;
export function articleSectionTargets(article: ArticleContent): ArticleSectionTarget[] {
  const targets: ArticleSectionTarget[] = [];
  if (hasContent(article.introduction)) targets.push({ id: 'introduction', label: article.introductionHeading || 'Introduction' });
  if (article.sidebarHeading && hasContent(article.sidebarContent)) targets.push({ id: 'editorial-context', label: `Sidebar: ${article.sidebarHeading}` });
  article.sections.forEach((section, index) => {
    targets.push({ id: sectionAnchorId(section.id), label: `${index + 1}. ${section.heading || section.subheading || 'Untitled section'}` });
    if (section.subheading) targets.push({ id: `${sectionAnchorId(section.id)}-subheading`, label: `  ↳ ${section.subheading}` });
  });
  if (hasContent(article.conclusion)) targets.push({ id: 'conclusion', label: article.conclusionHeading || 'Conclusion' });
  if (article.references.length) targets.push({ id: 'references-official-links', label: 'References & Official Links' });
  return targets;
}
export function brokenSummarySectionLinks(article: ArticleContent): { href: string; text: string }[] {
  const targets = new Set(articleSectionTargets(article).map(target => target.id));
  article.references.forEach((reference, index) => targets.add(`reference-${index + 1}`));
  const broken = new Map<string, string>();
  function inspect(node: RichNode) {
    for (const mark of node.marks || []) {
      const href = mark.type === 'link' ? mark.attrs?.href : undefined;
      if (!href?.startsWith('#')) continue;
      let id = '';
      try { id = decodeURIComponent(href.slice(1)); } catch { id = ''; }
      if (!targets.has(id)) broken.set(href, [broken.get(href), node.text].filter(Boolean).join(' '));
    }
    node.content?.forEach(inspect);
  }
  inspect(summaryDocumentFor(article));
  return [...broken].map(([href, text]) => ({ href, text: text || href }));
}
export const emptyDocument = (): RichNode => ({ type: 'doc', content: [{ type: 'paragraph' }] });
export const textDocument = (text: string): RichNode => ({ type: 'doc', content: text.split(/\n\n+/).map(paragraph => ({ type: 'paragraph', content: [{ type: 'text', text: paragraph }] })) });
export function summaryDocumentFor(article: { summary: string; summaryContent?: RichNode }): RichNode {
  if (article.summaryContent) return article.summaryContent;
  if (!article.summary) return emptyDocument();
  return {
    type: 'doc', content: article.summary.split(/\n\n/).map(paragraph => ({
      type: 'paragraph', content: paragraph.split('\n').flatMap((line, index) => [
        ...(index ? [{ type: 'hardBreak' }] : []), ...(line ? [{ type: 'text', text: line }] : []),
      ]),
    })),
  };
}
export function richTextToPlainText(node: RichNode): string {
  if (node.type === 'text') return node.text || '';
  if (node.type === 'hardBreak') return '\n';
  return (node.content || []).map(richTextToPlainText).join(node.type === 'doc' ? '\n\n' : ['bulletList', 'orderedList'].includes(node.type) ? '\n' : '');
}
export function newArticle(): ArticleContent {
  return {
    category: '', topic: '', title: '', summary: '', author: 'Seymo Scholars', date: new Date().toISOString().slice(0, 10),
    heroImage: '', heroAlt: '', heroCaption: '', introductionHeading: 'Introduction', introduction: emptyDocument(),
    sidebarHeading: 'WHY THIS GUIDE MATTERS', sidebarContent: emptyDocument(), sections: [],
    conclusionHeading: 'Conclusion', conclusion: emptyDocument(), ctaText: '', ctaUrl: '', references: [], editorialNote: '',
  };
}
export function hasContent(node: RichNode): boolean {
  return Boolean(node.text?.trim() || node.content?.some(hasContent));
}
export function slugify(title: string): string {
  return title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 150).replace(/-$/, '');
}
