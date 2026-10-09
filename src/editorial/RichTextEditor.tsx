import { useEffect, useRef, useState } from 'react';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { type RichNode, type ArticleSectionTarget, hasContent, safeLink, safeSummaryLink } from './model';

export default function RichTextEditor({ value, onChange, label, summary = false, sectionTargets = [] }: { value: RichNode; onChange: (value: RichNode) => void; label: string; summary?: boolean; sectionTargets?: ArticleSectionTarget[] }) {
  const [link, setLink] = useState('');
  const [showLink, setShowLink] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [newTab, setNewTab] = useState(false);
  const [editingLink, setEditingLink] = useState(false);
  const [linkMode, setLinkMode] = useState<'url' | 'section'>('url');
  const [selectedSection, setSelectedSection] = useState('');
  const selection = useRef({ from: 1, to: 1, text: '' });
  const placeholder = 'Write a short summary of this article. Select text to add a hyperlink.';
  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [2, 3, 4] }, code: false, codeBlock: false, link: summary ? { openOnClick: false, autolink: false, protocols: ['https'], isAllowedUri: safeSummaryLink, HTMLAttributes: { target: null, rel: 'noopener noreferrer' } } : { openOnClick: false, protocols: ['http', 'https', 'mailto'] } })],
    content: value,
    editorProps: { attributes: { 'aria-label': label, role: 'textbox', 'aria-multiline': 'true', ...(summary ? { 'aria-description': placeholder } : {}) } },
    onUpdate: ({ editor: current }) => onChange(current.getJSON() as RichNode),
  });
  const linkActive = useEditorState({ editor, selector: context => context.editor?.isActive('link') || false });
  useEffect(() => {
    if (editor && JSON.stringify(editor.getJSON()) !== JSON.stringify(value)) {
      editor.commands.setContent(value, { emitUpdate: false });
      setShowLink(false);
    }
  }, [editor, value]);
  if (!editor) return <div className="admin-rich-loading">Loading editor…</div>;
  function openSummaryLink(mode?: 'url' | 'section') {
    if (editor.isActive('link')) editor.commands.extendMarkRange('link');
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, '\n');
    const attributes = editor.getAttributes('link');
    const internal = String(attributes.href || '').startsWith('#');
    setLinkMode(mode || (internal ? 'section' : 'url'));
    let destination = '';
    if (internal) { try { destination = decodeURIComponent(attributes.href.slice(1)); } catch { destination = ''; } }
    setSelectedSection(destination);
    selection.current = { from, to, text };
    setLink(attributes.href || '');
    setLinkText(text);
    setNewTab(attributes.target === '_blank');
    setEditingLink(editor.isActive('link'));
    setShowLink(true);
  }
  function applySummaryLink() {
    const destination = linkMode === 'section' ? `#${selectedSection}` : link;
    if (!safeSummaryLink(destination) || !linkText.trim() || (linkMode === 'section' && !sectionTargets.some(target => target.id === selectedSection))) return;
    const { from, to, text } = selection.current;
    const attributes = { href: destination, target: linkMode === 'url' && !destination.startsWith('#') && newTab ? '_blank' : null, rel: 'noopener noreferrer' };
    if (linkText === text && from !== to) {
      editor.chain().focus().setTextSelection({ from, to }).setLink(attributes).setTextSelection(to).run();
    } else {
      const marks = editor.state.doc.resolve(from).marks().filter(mark => mark.type.name !== 'link').map(mark => ({ type: mark.type.name, attrs: mark.attrs }));
      editor.chain().focus().insertContentAt({ from, to }, { type: 'text', text: linkText, marks: [...marks, { type: 'link', attrs: attributes }] }).run();
    }
    setShowLink(false);
  }
  function removeSummaryLink() {
    if (showLink) editor.chain().focus().setTextSelection({ from: selection.current.from, to: selection.current.to }).unsetLink().run();
    else editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setShowLink(false);
  }
  const controls = [
    { label: 'Bold', active: editor.isActive('bold'), run: () => editor.chain().focus().toggleBold().run() },
    { label: 'Italic', active: editor.isActive('italic'), run: () => editor.chain().focus().toggleItalic().run() },
    { label: 'Subheading', active: editor.isActive('heading', { level: 3 }), run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: 'Bullets', active: editor.isActive('bulletList'), run: () => editor.chain().focus().toggleBulletList().run() },
    { label: 'Numbers', active: editor.isActive('orderedList'), run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: 'Callout', active: editor.isActive('blockquote'), run: () => editor.chain().focus().toggleBlockquote().run() },
  ];
  return <div className={`admin-rich${summary ? ' admin-summary-editor' : ''}`}>
    <div className="admin-toolbar" role="toolbar" aria-label={`${label} formatting`}>
      {controls.filter(control => !summary || ['Bold', 'Italic'].includes(control.label)).map(control => <button type="button" key={control.label} aria-pressed={control.active} onClick={control.run}>{control.label}</button>)}
      {summary ? <>
        <button type="button" onMouseDown={event => event.preventDefault()} onClick={() => openSummaryLink('url')}>Add Link</button>
        <button type="button" onMouseDown={event => event.preventDefault()} onClick={() => openSummaryLink('section')}>Link to Article Section</button>
        <button type="button" disabled={!linkActive} onMouseDown={event => event.preventDefault()} onClick={() => openSummaryLink()}>Edit Link</button>
        <button type="button" disabled={!linkActive && !showLink} onMouseDown={event => event.preventDefault()} onClick={removeSummaryLink}>Remove Link</button>
      </> : <button type="button" aria-pressed={editor.isActive('link')} onClick={() => { setLink(editor.getAttributes('link').href || ''); setShowLink(!showLink); }}>Link</button>}
      <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>Undo</button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>Redo</button>
    </div>
    {showLink && (summary ? <div className="admin-summary-link">
      {linkMode === 'section' ? <>
        <label>Article section<select aria-label="Destination article section" value={selectedSection} onChange={event => setSelectedSection(event.target.value)}><option value="">Choose a section in this article</option>{selectedSection && !sectionTargets.some(target => target.id === selectedSection) && <option value={selectedSection}>Deleted section — choose a replacement</option>}{sectionTargets.map(target => <option key={target.id} value={target.id}>{target.label}</option>)}</select></label>
        {!sectionTargets.length && <p>Add an article section before linking to it.</p>}
        {selectedSection && !sectionTargets.some(target => target.id === selectedSection) && <p className="admin-error" role="alert">This section no longer exists. Choose another destination.</p>}
      </> : <label>URL<input aria-label="Summary link URL" placeholder="https://example.org or /resources" value={link} onChange={event => setLink(event.target.value)} /></label>}
      <label>Link text<input aria-label="Summary link text" value={linkText} onChange={event => setLinkText(event.target.value)} /></label>
      {linkMode === 'url' && <label className="admin-new-tab"><input type="checkbox" checked={newTab} onChange={event => setNewTab(event.target.checked)} />Open in new tab</label>}
      {linkMode === 'url' && link && !safeSummaryLink(link) && <p className="admin-error" role="alert">Enter a valid HTTPS or relative internal URL.</p>}
      <div className="admin-summary-link-actions"><button type="button" disabled={!linkText.trim() || (linkMode === 'section' ? !sectionTargets.some(target => target.id === selectedSection) : !safeSummaryLink(link))} onClick={applySummaryLink}>{editingLink ? 'Save Link' : 'Apply Link'}</button><button type="button" onClick={() => setShowLink(false)}>Cancel</button></div>
    </div> : <div className="admin-link-input"><input aria-label="Link URL" value={link} placeholder="https://organiser.example" onChange={event => setLink(event.target.value)} /><button type="button" disabled={!safeLink(link)} onClick={() => { editor.chain().focus().extendMarkRange('link').setLink({ href: link }).run(); setShowLink(false); }}>Apply link</button><button type="button" onClick={() => { editor.chain().focus().unsetLink().run(); setShowLink(false); }}>Remove link</button></div>)}
    <div className={summary ? 'admin-summary-content' : undefined}><EditorContent editor={editor} />{summary && !hasContent(value) && <span className="admin-summary-placeholder" aria-hidden="true">{placeholder}</span>}</div>
  </div>;
}
