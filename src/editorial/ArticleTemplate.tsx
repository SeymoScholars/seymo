import { Fragment, useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { type ArticleContent, type RichNode, hasContent, safeLink, safeSummaryLink, sectionAnchorId, summaryDocumentFor } from './model';
import './editorial.css';

function RichNodeView({ node, summary = false, articlePath }: { node: RichNode; summary?: boolean; articlePath?: string }) {
  let children: ReactNode = node.content?.map((child, index) => <RichNodeView key={index} node={child} summary={summary} articlePath={articlePath} />);
  if (node.type === 'text') {
    children = node.text;
    for (const mark of node.marks || []) {
      if (mark.type === 'bold') children = <strong>{children}</strong>;
      if (mark.type === 'italic') children = <em>{children}</em>;
      if (mark.type === 'strike') children = <s>{children}</s>;
      if (mark.type === 'underline') children = <u>{children}</u>;
      if (mark.type === 'link' && mark.attrs?.href && (summary ? safeSummaryLink(mark.attrs.href) : safeLink(mark.attrs.href))) {
        const internal = summary && mark.attrs.href.startsWith('#');
        children = <a href={internal && articlePath ? `${articlePath}${mark.attrs.href}` : mark.attrs.href} target={!internal && mark.attrs.target === '_blank' ? '_blank' : undefined} rel="noopener noreferrer">{children}</a>;
      }
    }
    return <>{children}</>;
  }
  switch (node.type) {
    case 'paragraph': return <p>{children}</p>;
    case 'heading': return node.attrs?.level === 2 ? <h2>{children}</h2> : node.attrs?.level === 4 ? <h4>{children}</h4> : <h3>{children}</h3>;
    case 'bulletList': return <ul>{children}</ul>;
    case 'orderedList': return <ol start={node.attrs?.start}>{children}</ol>;
    case 'listItem': return <li>{children}</li>;
    case 'blockquote': return <blockquote>{children}</blockquote>;
    case 'hardBreak': return <br />;
    case 'horizontalRule': return <hr />;
    default: return <Fragment>{children}</Fragment>;
  }
}

export function RichText({ content }: { content: RichNode }) {
  return <div className="editorial-prose"><RichNodeView node={content} /></div>;
}

export function ArticleSummary({ article, className = '', articlePath }: { article: { summary: string; summaryContent?: RichNode }; className?: string; articlePath?: string }) {
  const content = summaryDocumentFor(article);
  if (!hasContent(content)) return null;
  return <div className={`article-summary ${className}`}><RichNodeView node={content} summary articlePath={articlePath} /></div>;
}

function ArticleImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  if (!src) return null;
  return <figure className="editorial-figure"><img src={src} alt={alt} loading="lazy" /><figcaption>{caption}</figcaption></figure>;
}

export default function ArticleTemplate({ article, preview = false }: { article: ArticleContent; preview?: boolean }) {
  const articleRoot = useRef<HTMLElement>(null);
  useEffect(() => {
    if (preview) return;
    function scrollToFragment() {
      let id = '';
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!id) return;
      const destination = document.getElementById(id);
      if (destination && articleRoot.current?.contains(destination)) destination.scrollIntoView({ block: 'start' });
    }
    const frame = requestAnimationFrame(scrollToFragment);
    window.addEventListener('hashchange', scrollToFragment);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', scrollToFragment); };
  }, [article, preview]);
  function navigatePreview(event: MouseEvent<HTMLElement>) {
    if (!preview || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element ? event.target.closest('a') : null;
    const href = anchor?.getAttribute('href');
    if (!href?.startsWith('#')) return;
    event.preventDefault();
    let id = '';
    try { id = decodeURIComponent(href.slice(1)); } catch { return; }
    const destination = Array.from(articleRoot.current?.querySelectorAll<HTMLElement>('[id]') || []).find(element => element.id === id);
    destination?.scrollIntoView({ block: 'start' });
    destination?.focus({ preventScroll: true });
  }
  const date = new Date(`${article.date}T12:00:00Z`);
  const validDate = !Number.isNaN(date.getTime());
  const month = validDate ? date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }) : '';
  const formattedDate = validDate ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '';
  const hasSidebar = article.sidebarHeading && hasContent(article.sidebarContent);
  return (
    <article ref={articleRoot} onClick={navigatePreview} className={`seymo-editorial${preview ? ' editorial-preview' : ''}`}>
      <header className="editorial-header">
        <div className="editorial-masthead">SEYMO • NEWS &amp; INSIGHTS</div>
        <p className="editorial-topic">{[article.category || (preview ? 'CATEGORY' : ''), article.topic, month].filter(Boolean).join(' | ')}</p>
        <h1><span>{article.title || (preview ? 'Your article title' : '')}</span></h1>
        <div className="editorial-rule" />
      </header>
      <div className={`editorial-intro-grid${hasSidebar ? '' : ' editorial-without-sidebar'}`}>
        <div>
          <ArticleSummary article={article} className="editorial-summary" />
          <p className="editorial-byline">By {article.author} <span aria-hidden="true">•</span> Updated <time dateTime={article.date}>{formattedDate}</time></p>
          <ArticleImage src={article.heroImage} alt={article.heroAlt} caption={article.heroCaption} />
          {hasContent(article.introduction) && <section className="editorial-introduction" id={article.introductionHeading ? undefined : 'introduction'} tabIndex={article.introductionHeading ? undefined : -1}>{article.introductionHeading && <h2 id="introduction" tabIndex={-1}>{article.introductionHeading}</h2>}<RichText content={article.introduction} /></section>}
        </div>
        {hasSidebar && <aside className="editorial-sidebar"><h2 id="editorial-context" tabIndex={-1}>{article.sidebarHeading}</h2><RichText content={article.sidebarContent} /></aside>}
      </div>
      {article.sections.map(section => <section key={section.id} id={section.heading ? undefined : sectionAnchorId(section.id)} tabIndex={section.heading ? undefined : -1} className={`editorial-section${section.kind === 'callout' ? ' editorial-callout' : ''}`}>
        {section.label && <p className="editorial-label">{section.label}</p>}
        {section.heading && <h2 id={sectionAnchorId(section.id)} tabIndex={-1}>{section.heading}</h2>}
        {section.subheading && <h3 id={`${sectionAnchorId(section.id)}-subheading`} tabIndex={-1}>{section.subheading}</h3>}
        <RichText content={section.content} />
        <ArticleImage src={section.image} alt={section.imageAlt} caption={section.caption} />
      </section>)}
      {hasContent(article.conclusion) && <section className="editorial-section editorial-conclusion"><h2 id="conclusion" tabIndex={-1}>{article.conclusionHeading || 'Conclusion'}</h2><RichText content={article.conclusion} /></section>}
      {article.ctaText && <p className="editorial-community">{article.ctaUrl && safeLink(article.ctaUrl) ? <a href={article.ctaUrl}>{article.ctaText}</a> : article.ctaText}</p>}
      {article.references.length > 0 && <section className="editorial-section editorial-references"><h2 id="references-official-links" tabIndex={-1}>References &amp; Official Links</h2><ol>{article.references.map((reference, index) => <li id={`reference-${index + 1}`} key={reference.id}><span>[{index + 1}]</span> {reference.title} {safeLink(reference.url) && <a href={reference.url} rel="noopener noreferrer">Source<span className="sr-only">: {reference.title}</span></a>}</li>)}</ol></section>}
      {article.editorialNote && <p className="editorial-note"><strong>Editorial note:</strong> {article.editorialNote}</p>}
      <footer className="editorial-footer">SEYMO SCHOLARS • LEARNING, EXPLAINED</footer>
    </article>
  );
}
