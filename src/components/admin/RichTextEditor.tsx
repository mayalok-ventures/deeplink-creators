'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TiptapLink from '@tiptap/extension-link'
import TiptapImage from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Youtube from '@tiptap/extension-youtube'
import FontFamily from '@tiptap/extension-font-family'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import { useState, useCallback, useRef, useEffect } from 'react'
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    List, ListOrdered, Quote, Code2,
    Link as LinkIcon, Unlink, Image as ImageIcon,
    Youtube as YoutubeIcon, Heading1, Heading2, Heading3,
    Undo2, Redo2, Minus, Table as TableIcon, Palette,
    Highlighter, Superscript as SuperscriptIcon, Subscript as SubscriptIcon,
    Maximize2, Minimize2, Pilcrow, RemoveFormatting, ChevronDown, X,
    Upload, Link2, Check, MousePointerClick, Grid3X3
} from 'lucide-react'
import { uploadImage } from '@/lib/firestore'

const TEXT_COLORS = [
    { label: 'Default', value: '#F1F5F9' },
    { label: 'Red', value: '#EF4444' },
    { label: 'Amber', value: '#F59E0B' },
    { label: 'Green', value: '#10B981' },
    { label: 'Blue', value: '#3B82F6' },
    { label: 'Purple', value: '#8B5CF6' },
    { label: 'Pink', value: '#EC4899' },
    { label: 'Gray', value: '#94A3B8' },
    { label: 'Black', value: '#000000' },
]

const HIGHLIGHT_COLORS = [
    { label: 'None', value: '' },
    { label: 'Yellow', value: '#FEF08A' },
    { label: 'Green', value: '#BBF7D0' },
    { label: 'Blue', value: '#BFDBFE' },
    { label: 'Purple', value: '#E9D5FF' },
    { label: 'Pink', value: '#FECDD3' },
    { label: 'Orange', value: '#FED7AA' },
    { label: 'Gray', value: '#E5E7EB' },
]

const FONT_FAMILIES = [
    { label: 'Inter', value: 'Inter' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Courier', value: 'Courier New' },
    { label: 'Times', value: 'Times New Roman' },
    { label: 'Mono', value: 'ui-monospace, monospace' },
]

interface RichTextEditorProps {
    content: string
    onChange: (html: string) => void
}

function ToolbarButton({ active, onClick, children, title, disabled }: {
    active?: boolean; onClick: () => void; children: React.ReactNode; title?: string; disabled?: boolean
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`p-2 rounded transition-colors ${
                active
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-paragraph hover:text-heading hover:bg-white/[0.08]'
            } ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    )
}

function Divider() {
    return <div className="w-px h-6 bg-white/[0.08] mx-1 self-center" />
}

function DropdownMenu({ trigger, children, open, onToggle }: {
    trigger: React.ReactNode; children: React.ReactNode; open: boolean; onToggle: () => void
}) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) onToggle()
        }
        if (open) document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [open, onToggle])

    return (
        <div className="relative" ref={ref}>
            <button type="button" onClick={onToggle} className="flex items-center gap-1 px-2 py-1.5 rounded text-sm text-paragraph hover:text-heading hover:bg-white/[0.08] transition-colors">
                {trigger}
                <ChevronDown size={14} />
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1 bg-dark-200 border border-white/[0.08] rounded-lg shadow-xl z-50 min-w-[160px] py-1">
                    {children}
                </div>
            )}
        </div>
    )
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showLinkPopover, setShowLinkPopover] = useState(false)
    const [showImageDialog, setShowImageDialog] = useState(false)
    const [showYoutubePopover, setShowYoutubePopover] = useState(false)
    const [showTextColor, setShowTextColor] = useState(false)
    const [showHighlight, setShowHighlight] = useState(false)
    const [showFontFamily, setShowFontFamily] = useState(false)
    const [showBlockType, setShowBlockType] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')
    const [linkNewTab, setLinkNewTab] = useState(true)
    const [imageUrl, setImageUrl] = useState('')
    const [imageTab, setImageTab] = useState<'upload' | 'url'>('upload')
    const [youtubeUrl, setYoutubeUrl] = useState('')
    const [uploading, setUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [showCtaDialog, setShowCtaDialog] = useState(false)
    const [ctaText, setCtaText] = useState('Get Started')
    const [ctaUrl, setCtaUrl] = useState('')
    const [ctaStyle, setCtaStyle] = useState<'primary' | 'secondary' | 'outline'>('primary')
    const [showTableDialog, setShowTableDialog] = useState(false)
    const [tableRows, setTableRows] = useState(3)
    const [tableCols, setTableCols] = useState(3)
    const [tableWithHeader, setTableWithHeader] = useState(true)
    const [hoverRow, setHoverRow] = useState(0)
    const [hoverCol, setHoverCol] = useState(0)
    const [imageWidth, setImageWidth] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                codeBlock: false,
            }),
            Underline,
            Superscript,
            Subscript,
            TextStyle,
            FontFamily,
            Color,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            TiptapLink.configure({ openOnClick: false, HTMLAttributes: { class: 'editor-link' } }),
            TiptapImage.configure({ allowBase64: true, HTMLAttributes: { class: 'editor-image' } }),
            Placeholder.configure({ placeholder: 'Start writing your blog post...' }),
            Youtube.configure({ width: 640, height: 360 }),
            Table.configure({ resizable: true }),
            TableRow,
            TableCell,
            TableHeader,
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose-editor outline-none min-h-[400px] p-6',
            },
        },
    })

    const closeAllDropdowns = useCallback(() => {
        setShowTextColor(false)
        setShowHighlight(false)
        setShowFontFamily(false)
        setShowBlockType(false)
    }, [])

    const setLink = useCallback(() => {
        if (!editor || !linkUrl) return
        editor.chain().focus().extendMarkRange('link').setLink({
            href: linkUrl,
            target: linkNewTab ? '_blank' : null,
        }).run()
        setShowLinkPopover(false)
        setLinkUrl('')
    }, [editor, linkUrl, linkNewTab])

    const removeLink = useCallback(() => {
        if (!editor) return
        editor.chain().focus().unsetLink().run()
    }, [editor])

    const addImage = useCallback((url: string) => {
        if (!editor || !url) return
        editor.chain().focus().setImage({ src: url }).run()
        setShowImageDialog(false)
        setImageUrl('')
    }, [editor])

    const handleImageUpload = useCallback(async (file: File) => {
        setUploading(true)
        setUploadProgress(0)
        try {
            const url = await uploadImage(
                file,
                `blog-images/${Date.now()}-${file.name}`,
                (percent) => setUploadProgress(percent)
            )
            addImage(url)
        } catch (err: any) {
            console.error('Upload failed:', err)
            const code = err?.code || ''
            if (code === 'storage/unauthorized' || code === 'storage/unauthenticated') {
                alert('Upload blocked by Firebase Storage rules. Please update your Storage Security Rules in Firebase Console to allow writes.')
            } else if (code === 'storage/canceled') {
                alert('Upload was canceled.')
            } else {
                alert(`Image upload failed: ${err?.message || 'Unknown error'}. Check browser console (F12).`)
            }
        }
        setUploading(false)
        setUploadProgress(0)
    }, [addImage])

    const addYoutube = useCallback(() => {
        if (!editor || !youtubeUrl) return
        editor.chain().focus().setYoutubeVideo({ src: youtubeUrl }).run()
        setShowYoutubePopover(false)
        setYoutubeUrl('')
    }, [editor, youtubeUrl])

    const handleCoverImageUpload = useCallback(async (file: File) => {
        setUploading(true)
        try {
            const url = await uploadImage(file, `blog-covers/${Date.now()}-${file.name}`)
            addImage(url)
        } catch (err) {
            console.error('Upload failed:', err)
        }
        setUploading(false)
    }, [addImage])

    const insertCta = useCallback(() => {
        if (!editor || !ctaUrl) return
        const styleMap = {
            primary: 'background: #00E599; color: #0a0a0a;',
            secondary: 'background: #3B82F6; color: #ffffff;',
            outline: 'background: transparent; color: #F1F5F9; border: 2px solid #3B82F6;',
        }
        const html = `<a href="${ctaUrl}" target="_blank" rel="noopener noreferrer" class="cta-button cta-${ctaStyle}" style="display: inline-block; padding: 12px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; text-align: center; margin: 1em 0; ${styleMap[ctaStyle]}">${ctaText}</a>`
        editor.chain().focus().insertContent(html).run()
        setShowCtaDialog(false)
        setCtaText('Get Started')
        setCtaUrl('')
        setCtaStyle('primary')
    }, [editor, ctaText, ctaUrl, ctaStyle])

    const insertTable = useCallback(() => {
        if (!editor) return
        editor.chain().focus().insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: tableWithHeader }).run()
        setShowTableDialog(false)
        setTableRows(3)
        setTableCols(3)
        setTableWithHeader(true)
    }, [editor, tableRows, tableCols, tableWithHeader])

    const applyImageAlign = useCallback((align: 'left' | 'center' | 'right') => {
        if (!editor) return
        const styleMap = {
            left: 'display: block; margin-right: auto;',
            center: 'display: block; margin-left: auto; margin-right: auto;',
            right: 'display: block; margin-left: auto;',
        }
        const currentStyle = (editor.getAttributes('image').style as string) || ''
        const widthMatch = currentStyle.match(/width:\s*[^;]+;?/)
        const widthPart = widthMatch ? widthMatch[0].replace(/;$/, '') + '; ' : ''
        editor.chain().focus().updateAttributes('image', { style: widthPart + styleMap[align] } as any).run()
    }, [editor])

    const applyImageWidth = useCallback((width: string) => {
        if (!editor || !width) return
        const currentStyle = (editor.getAttributes('image').style as string) || ''
        const alignMatch = currentStyle.match(/(display:\s*block;?\s*)?(margin-left:\s*[^;]+;?\s*)?(margin-right:\s*[^;]+;?\s*)?/)
        const alignPart = alignMatch ? alignMatch[0] : ''
        editor.chain().focus().updateAttributes('image', { style: `width: ${width}px; ${alignPart}`.trim() } as any).run()
    }, [editor])

    const getActiveBlockLabel = () => {
        if (!editor) return 'Paragraph'
        if (editor.isActive('heading', { level: 1 })) return 'Heading 1'
        if (editor.isActive('heading', { level: 2 })) return 'Heading 2'
        if (editor.isActive('heading', { level: 3 })) return 'Heading 3'
        return 'Paragraph'
    }

    const getActiveFontFamily = () => {
        if (!editor) return 'Inter'
        const attrs = editor.getAttributes('textStyle')
        return attrs.fontFamily || 'Inter'
    }

    if (!editor) return null

    const containerClass = isFullscreen
        ? 'fixed inset-0 z-[9999] bg-dark flex flex-col'
        : 'border border-white/[0.08] rounded-xl overflow-hidden'

    return (
        <div className={containerClass}>
            <style jsx global>{`
                .prose-editor h1 { font-size: 2em; font-weight: 800; color: #F1F5F9; margin: 1em 0 0.5em; line-height: 1.2; }
                .prose-editor h2 { font-size: 1.5em; font-weight: 700; color: #F1F5F9; margin: 0.8em 0 0.4em; line-height: 1.3; }
                .prose-editor h3 { font-size: 1.25em; font-weight: 600; color: #F1F5F9; margin: 0.6em 0 0.3em; line-height: 1.4; }
                .prose-editor p { color: #94A3B8; line-height: 1.75; margin-bottom: 0.75em; }
                .prose-editor strong { color: #F1F5F9; font-weight: 600; }
                .prose-editor em { font-style: italic; }
                .prose-editor u { text-decoration: underline; }
                .prose-editor s { text-decoration: line-through; }
                .prose-editor .editor-link { color: #3B82F6; text-decoration: underline; cursor: pointer; }
                .prose-editor .editor-link:hover { color: #60A5FA; }
                .prose-editor .editor-image { max-width: 100%; height: auto; border-radius: 0.75rem; margin: 1em 0; border: 1px solid rgba(255,255,255,0.08); }
                .prose-editor .editor-image.ProseMirror-selectednode { outline: 2px solid #3B82F6; outline-offset: 2px; }
                .prose-editor ul { list-style: disc; padding-left: 1.5em; margin: 0.5em 0; color: #94A3B8; }
                .prose-editor ol { list-style: decimal; padding-left: 1.5em; margin: 0.5em 0; color: #94A3B8; }
                .prose-editor li { margin-bottom: 0.25em; }
                .prose-editor li p { margin-bottom: 0.25em; }
                .prose-editor blockquote { border-left: 3px solid #3B82F6; padding-left: 1em; margin: 1em 0; color: #94A3B8; font-style: italic; }
                .prose-editor pre { background: #111827; border: 1px solid rgba(255,255,255,0.08); border-radius: 0.5rem; padding: 1em; overflow-x: auto; margin: 1em 0; }
                .prose-editor code { font-family: ui-monospace, monospace; font-size: 0.9em; color: #F1F5F9; }
                .prose-editor p code { background: #1E293B; padding: 0.15em 0.4em; border-radius: 0.25rem; font-size: 0.85em; }
                .prose-editor hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 1.5em 0; }
                .prose-editor table { border-collapse: collapse; width: 100%; margin: 1em 0; }
                .prose-editor th, .prose-editor td { border: 1px solid rgba(255,255,255,0.1); padding: 0.5em 0.75em; text-align: left; color: #94A3B8; }
                .prose-editor th { background: #1E293B; color: #F1F5F9; font-weight: 600; }
                .prose-editor .ProseMirror-gapcursor:after { border-top-color: #F1F5F9; }
                .prose-editor p.is-editor-empty:first-child::before { color: #475569; content: attr(data-placeholder); float: left; height: 0; pointer-events: none; }
                .prose-editor iframe { border-radius: 0.75rem; margin: 1em 0; max-width: 100%; }
                .prose-editor sup { vertical-align: super; font-size: 0.75em; }
                .prose-editor sub { vertical-align: sub; font-size: 0.75em; }
                .prose-editor mark { border-radius: 0.15em; padding: 0.05em 0.15em; }
                .prose-editor .cta-button { display: inline-block; padding: 12px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; text-align: center; margin: 1em 0; cursor: pointer; }
                .prose-editor .cta-primary { background: #00E599; color: #0a0a0a; }
                .prose-editor .cta-secondary { background: #3B82F6; color: #ffffff; }
                .prose-editor .cta-outline { background: transparent; color: #F1F5F9; border: 2px solid #3B82F6; }
            `}</style>

            {/* Toolbar */}
            <div className={`bg-[#141C2F] border-b border-white/[0.08] px-2 py-1.5 flex flex-wrap items-center gap-0.5 ${isFullscreen ? 'sticky top-0 z-10' : ''}`}>
                {/* Undo/Redo */}
                <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo" disabled={!editor.can().undo()}>
                    <Undo2 size={16} />
                </ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo" disabled={!editor.can().redo()}>
                    <Redo2 size={16} />
                </ToolbarButton>

                <Divider />

                {/* Block Type */}
                <DropdownMenu
                    open={showBlockType}
                    onToggle={() => { closeAllDropdowns(); setShowBlockType(!showBlockType) }}
                    trigger={<span className="text-sm min-w-[80px] text-left">{getActiveBlockLabel()}</span>}
                >
                    <button type="button" onClick={() => { editor.chain().focus().setParagraph().run(); setShowBlockType(false) }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-white/[0.05] flex items-center gap-2 ${editor.isActive('paragraph') ? 'text-primary-400' : 'text-paragraph hover:text-heading'}`}>
                        <Pilcrow size={14} /> Paragraph
                    </button>
                    <button type="button" onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); setShowBlockType(false) }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-white/[0.05] flex items-center gap-2 ${editor.isActive('heading', { level: 1 }) ? 'text-primary-400' : 'text-paragraph hover:text-heading'}`}>
                        <Heading1 size={14} /> Heading 1
                    </button>
                    <button type="button" onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); setShowBlockType(false) }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-white/[0.05] flex items-center gap-2 ${editor.isActive('heading', { level: 2 }) ? 'text-primary-400' : 'text-paragraph hover:text-heading'}`}>
                        <Heading2 size={14} /> Heading 2
                    </button>
                    <button type="button" onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); setShowBlockType(false) }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-white/[0.05] flex items-center gap-2 ${editor.isActive('heading', { level: 3 }) ? 'text-primary-400' : 'text-paragraph hover:text-heading'}`}>
                        <Heading3 size={14} /> Heading 3
                    </button>
                </DropdownMenu>

                <Divider />

                {/* Font Family */}
                <DropdownMenu
                    open={showFontFamily}
                    onToggle={() => { closeAllDropdowns(); setShowFontFamily(!showFontFamily) }}
                    trigger={<span className="text-sm min-w-[60px] text-left truncate">{FONT_FAMILIES.find(f => getActiveFontFamily().includes(f.value))?.label || 'Inter'}</span>}
                >
                    {FONT_FAMILIES.map(font => (
                        <button key={font.value} type="button"
                            onClick={() => { editor.chain().focus().setFontFamily(font.value).run(); setShowFontFamily(false) }}
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-white/[0.05] ${getActiveFontFamily().includes(font.value) ? 'text-primary-400' : 'text-paragraph hover:text-heading'}`}
                            style={{ fontFamily: font.value }}>
                            {font.label}
                        </button>
                    ))}
                </DropdownMenu>

                <Divider />

                {/* Basic Formatting */}
                <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
                    <Bold size={16} />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
                    <Italic size={16} />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
                    <UnderlineIcon size={16} />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
                    <Strikethrough size={16} />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('superscript')} onClick={() => editor.chain().focus().toggleSuperscript().run()} title="Superscript">
                    <SuperscriptIcon size={16} />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('subscript')} onClick={() => editor.chain().focus().toggleSubscript().run()} title="Subscript">
                    <SubscriptIcon size={16} />
                </ToolbarButton>

                <Divider />

                {/* Text Color */}
                <div className="relative">
                    <ToolbarButton onClick={() => { closeAllDropdowns(); setShowTextColor(!showTextColor) }} title="Text Color">
                        <Palette size={16} />
                    </ToolbarButton>
                    {showTextColor && (
                        <div className="absolute top-full left-0 mt-1 bg-dark-200 border border-white/[0.08] rounded-lg shadow-xl z-50 p-2">
                            <p className="text-xs text-paragraph mb-2 px-1">Text Color</p>
                            <div className="grid grid-cols-5 gap-1">
                                {TEXT_COLORS.map(c => (
                                    <button key={c.value} type="button" title={c.label}
                                        onClick={() => { editor.chain().focus().setColor(c.value).run(); setShowTextColor(false) }}
                                        className="w-7 h-7 rounded border border-white/[0.1] hover:scale-110 transition-transform"
                                        style={{ backgroundColor: c.value }} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Highlight */}
                <div className="relative">
                    <ToolbarButton active={editor.isActive('highlight')} onClick={() => { closeAllDropdowns(); setShowHighlight(!showHighlight) }} title="Highlight">
                        <Highlighter size={16} />
                    </ToolbarButton>
                    {showHighlight && (
                        <div className="absolute top-full left-0 mt-1 bg-dark-200 border border-white/[0.08] rounded-lg shadow-xl z-50 p-2">
                            <p className="text-xs text-paragraph mb-2 px-1">Highlight</p>
                            <div className="grid grid-cols-4 gap-1">
                                {HIGHLIGHT_COLORS.map(c => (
                                    <button key={c.value || 'none'} type="button" title={c.label}
                                        onClick={() => {
                                            if (c.value) editor.chain().focus().toggleHighlight({ color: c.value }).run()
                                            else editor.chain().focus().unsetHighlight().run()
                                            setShowHighlight(false)
                                        }}
                                        className="w-7 h-7 rounded border border-white/[0.1] hover:scale-110 transition-transform flex items-center justify-center"
                                        style={{ backgroundColor: c.value || 'transparent' }}>
                                        {!c.value && <X size={12} className="text-paragraph" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <Divider />

                {/* Alignment */}
                <ToolbarButton active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align Left">
                    <AlignLeft size={16} />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align Center">
                    <AlignCenter size={16} />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align Right">
                    <AlignRight size={16} />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} title="Justify">
                    <AlignJustify size={16} />
                </ToolbarButton>

                <Divider />

                {/* Lists */}
                <ToolbarButton active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
                    <List size={16} />
                </ToolbarButton>
                <ToolbarButton active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List">
                    <ListOrdered size={16} />
                </ToolbarButton>

                <Divider />

                {/* Link */}
                <div className="relative">
                    {editor.isActive('link') ? (
                        <ToolbarButton active onClick={removeLink} title="Remove Link">
                            <Unlink size={16} />
                        </ToolbarButton>
                    ) : (
                        <ToolbarButton onClick={() => {
                            const prev = editor.getAttributes('link').href || ''
                            setLinkUrl(prev)
                            setShowLinkPopover(!showLinkPopover)
                        }} title="Insert Link">
                            <LinkIcon size={16} />
                        </ToolbarButton>
                    )}
                    {showLinkPopover && (
                        <div className="absolute top-full left-0 mt-1 bg-dark-200 border border-white/[0.08] rounded-lg shadow-xl z-50 p-3 w-72">
                            <p className="text-xs text-paragraph mb-2">Insert Link</p>
                            <input type="url" value={linkUrl} onChange={e => setLinkUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full px-3 py-2 bg-dark/80 border border-white/[0.08] rounded-lg text-heading text-sm mb-2 outline-none focus:ring-1 focus:ring-primary-500/50"
                                onKeyDown={e => e.key === 'Enter' && setLink()}
                                autoFocus />
                            <label className="flex items-center gap-2 text-xs text-paragraph mb-3 cursor-pointer">
                                <input type="checkbox" checked={linkNewTab} onChange={e => setLinkNewTab(e.target.checked)}
                                    className="rounded border-white/[0.2] bg-dark" />
                                Open in new tab
                            </label>
                            <div className="flex gap-2">
                                <button type="button" onClick={setLink}
                                    className="flex-1 bg-primary-500 text-white text-xs py-1.5 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-1">
                                    <Check size={12} /> Apply
                                </button>
                                <button type="button" onClick={() => setShowLinkPopover(false)}
                                    className="flex-1 bg-white/[0.05] text-paragraph text-xs py-1.5 rounded-lg hover:bg-white/[0.08] transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Image */}
                <div className="relative">
                    <ToolbarButton onClick={() => setShowImageDialog(!showImageDialog)} title="Insert Image">
                        <ImageIcon size={16} />
                    </ToolbarButton>
                    {showImageDialog && (
                        <div className="absolute top-full right-0 mt-1 bg-dark-200 border border-white/[0.08] rounded-lg shadow-xl z-50 p-3 w-80">
                            <div className="flex gap-1 mb-3">
                                <button type="button" onClick={() => setImageTab('upload')}
                                    className={`flex-1 text-xs py-1.5 rounded-lg transition-colors ${imageTab === 'upload' ? 'bg-primary-500/20 text-primary-400' : 'text-paragraph hover:text-heading'}`}>
                                    <Upload size={12} className="inline mr-1" /> Upload
                                </button>
                                <button type="button" onClick={() => setImageTab('url')}
                                    className={`flex-1 text-xs py-1.5 rounded-lg transition-colors ${imageTab === 'url' ? 'bg-primary-500/20 text-primary-400' : 'text-paragraph hover:text-heading'}`}>
                                    <Link2 size={12} className="inline mr-1" /> URL
                                </button>
                            </div>
                            {imageTab === 'upload' ? (
                                <div>
                                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                                        onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }} />
                                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                                        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-primary-500/50') }}
                                        onDragLeave={e => { e.preventDefault(); e.currentTarget.classList.remove('border-primary-500/50') }}
                                        onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('border-primary-500/50'); const f = e.dataTransfer.files?.[0]; if (f && f.type.startsWith('image/')) handleImageUpload(f) }}
                                        className="w-full border-2 border-dashed border-white/[0.1] rounded-lg py-8 text-center text-paragraph hover:border-primary-500/30 hover:text-heading transition-colors">
                                        {uploading ? (
                                            <div className="flex flex-col items-center gap-2 px-4">
                                                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                                                <span className="text-sm">Uploading... {uploadProgress}%</span>
                                                <div className="w-full bg-white/[0.08] rounded-full h-1.5">
                                                    <div className="bg-primary-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <Upload size={24} className="mx-auto mb-2" />
                                                <span className="text-sm">Click or drag & drop image</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-3 py-2 bg-dark/80 border border-white/[0.08] rounded-lg text-heading text-sm mb-2 outline-none focus:ring-1 focus:ring-primary-500/50"
                                        onKeyDown={e => e.key === 'Enter' && addImage(imageUrl)} />
                                    <button type="button" onClick={() => addImage(imageUrl)}
                                        className="w-full bg-primary-500 text-white text-xs py-1.5 rounded-lg hover:bg-primary-600 transition-colors">
                                        Insert Image
                                    </button>
                                </div>
                            )}
                            <button type="button" onClick={() => setShowImageDialog(false)}
                                className="w-full mt-2 text-paragraph text-xs py-1 hover:text-heading transition-colors">
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                {/* YouTube */}
                <div className="relative">
                    <ToolbarButton onClick={() => setShowYoutubePopover(!showYoutubePopover)} title="Embed YouTube">
                        <YoutubeIcon size={16} />
                    </ToolbarButton>
                    {showYoutubePopover && (
                        <div className="absolute top-full right-0 mt-1 bg-dark-200 border border-white/[0.08] rounded-lg shadow-xl z-50 p-3 w-72">
                            <p className="text-xs text-paragraph mb-2">YouTube URL</p>
                            <input type="url" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)}
                                placeholder="https://youtube.com/watch?v=..."
                                className="w-full px-3 py-2 bg-dark/80 border border-white/[0.08] rounded-lg text-heading text-sm mb-2 outline-none focus:ring-1 focus:ring-primary-500/50"
                                onKeyDown={e => e.key === 'Enter' && addYoutube()}
                                autoFocus />
                            <div className="flex gap-2">
                                <button type="button" onClick={addYoutube}
                                    className="flex-1 bg-primary-500 text-white text-xs py-1.5 rounded-lg hover:bg-primary-600 transition-colors">
                                    Embed
                                </button>
                                <button type="button" onClick={() => setShowYoutubePopover(false)}
                                    className="flex-1 bg-white/[0.05] text-paragraph text-xs py-1.5 rounded-lg hover:bg-white/[0.08] transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                <div className="relative">
                    <ToolbarButton onClick={() => setShowCtaDialog(!showCtaDialog)} title="Insert CTA Button">
                        <MousePointerClick size={16} />
                    </ToolbarButton>
                    {showCtaDialog && (
                        <div className="absolute top-full right-0 mt-1 bg-dark-200 border border-white/[0.08] rounded-lg shadow-xl z-50 p-3 w-80">
                            <p className="text-xs text-paragraph mb-2">Insert CTA Button</p>
                            <input type="text" value={ctaText} onChange={e => setCtaText(e.target.value)}
                                placeholder="Button text"
                                className="w-full px-3 py-2 bg-dark/80 border border-white/[0.08] rounded-lg text-heading text-sm mb-2 outline-none focus:ring-1 focus:ring-primary-500/50"
                                autoFocus />
                            <input type="url" value={ctaUrl} onChange={e => setCtaUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full px-3 py-2 bg-dark/80 border border-white/[0.08] rounded-lg text-heading text-sm mb-3 outline-none focus:ring-1 focus:ring-primary-500/50"
                                onKeyDown={e => e.key === 'Enter' && insertCta()} />
                            <p className="text-xs text-paragraph mb-2">Style</p>
                            <div className="flex gap-2 mb-3">
                                <button type="button" onClick={() => setCtaStyle('primary')}
                                    className={`flex-1 text-xs py-2 rounded-lg font-semibold transition-colors ${ctaStyle === 'primary' ? 'ring-2 ring-primary-400' : ''}`}
                                    style={{ background: '#00E599', color: '#0a0a0a' }}>
                                    Primary
                                </button>
                                <button type="button" onClick={() => setCtaStyle('secondary')}
                                    className={`flex-1 text-xs py-2 rounded-lg font-semibold transition-colors ${ctaStyle === 'secondary' ? 'ring-2 ring-primary-400' : ''}`}
                                    style={{ background: '#3B82F6', color: '#ffffff' }}>
                                    Secondary
                                </button>
                                <button type="button" onClick={() => setCtaStyle('outline')}
                                    className={`flex-1 text-xs py-2 rounded-lg font-semibold transition-colors ${ctaStyle === 'outline' ? 'ring-2 ring-primary-400' : ''}`}
                                    style={{ background: 'transparent', color: '#F1F5F9', border: '2px solid #3B82F6' }}>
                                    Outline
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button type="button" onClick={insertCta}
                                    className="flex-1 bg-primary-500 text-white text-xs py-1.5 rounded-lg hover:bg-primary-600 transition-colors">
                                    Insert
                                </button>
                                <button type="button" onClick={() => setShowCtaDialog(false)}
                                    className="flex-1 bg-white/[0.05] text-paragraph text-xs py-1.5 rounded-lg hover:bg-white/[0.08] transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Blockquote */}
                <ToolbarButton active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">
                    <Quote size={16} />
                </ToolbarButton>

                {/* Code Block */}
                <ToolbarButton active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code Block">
                    <Code2 size={16} />
                </ToolbarButton>

                {/* Horizontal Rule */}
                <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
                    <Minus size={16} />
                </ToolbarButton>

                {/* Table */}
                <div className="relative">
                    <ToolbarButton onClick={() => setShowTableDialog(!showTableDialog)} title="Insert Table">
                        <TableIcon size={16} />
                    </ToolbarButton>
                    {showTableDialog && (
                        <div className="absolute top-full right-0 mt-1 bg-dark-200 border border-white/[0.08] rounded-lg shadow-xl z-50 p-3 w-64">
                            <p className="text-xs text-paragraph mb-2">Insert Table</p>
                            <div className="grid grid-cols-6 gap-1 mb-2 p-1"
                                onMouseLeave={() => { setHoverRow(0); setHoverCol(0) }}>
                                {Array.from({ length: 6 }, (_, r) =>
                                    Array.from({ length: 6 }, (_, c) => (
                                        <button key={`${r}-${c}`} type="button"
                                            onMouseEnter={() => { setHoverRow(r + 1); setHoverCol(c + 1) }}
                                            onClick={() => { setTableRows(r + 1); setTableCols(c + 1) }}
                                            className={`w-6 h-6 rounded-sm border transition-colors ${
                                                r < hoverRow && c < hoverCol
                                                    ? 'bg-primary-500/30 border-primary-500/50'
                                                    : 'bg-white/[0.03] border-white/[0.08]'
                                            }`} />
                                    ))
                                )}
                            </div>
                            <p className="text-xs text-center text-paragraph mb-3">
                                {hoverRow > 0 && hoverCol > 0 ? `${hoverRow} × ${hoverCol}` : `${tableRows} × ${tableCols}`}
                            </p>
                            <div className="flex gap-3 mb-3">
                                <div className="flex-1">
                                    <label className="text-xs text-paragraph block mb-1">Rows</label>
                                    <input type="number" min={1} max={20} value={tableRows} onChange={e => setTableRows(parseInt(e.target.value) || 1)}
                                        className="w-full px-2 py-1.5 bg-dark/80 border border-white/[0.08] rounded-lg text-heading text-sm outline-none focus:ring-1 focus:ring-primary-500/50" />
                                </div>
                                <div className="flex-1">
                                    <label className="text-xs text-paragraph block mb-1">Columns</label>
                                    <input type="number" min={1} max={10} value={tableCols} onChange={e => setTableCols(parseInt(e.target.value) || 1)}
                                        className="w-full px-2 py-1.5 bg-dark/80 border border-white/[0.08] rounded-lg text-heading text-sm outline-none focus:ring-1 focus:ring-primary-500/50" />
                                </div>
                            </div>
                            <label className="flex items-center gap-2 text-xs text-paragraph mb-3 cursor-pointer">
                                <input type="checkbox" checked={tableWithHeader} onChange={e => setTableWithHeader(e.target.checked)}
                                    className="rounded border-white/[0.2] bg-dark" />
                                Include header row
                            </label>
                            <div className="flex gap-2">
                                <button type="button" onClick={insertTable}
                                    className="flex-1 bg-primary-500 text-white text-xs py-1.5 rounded-lg hover:bg-primary-600 transition-colors">
                                    Insert Table
                                </button>
                                <button type="button" onClick={() => setShowTableDialog(false)}
                                    className="flex-1 bg-white/[0.05] text-paragraph text-xs py-1.5 rounded-lg hover:bg-white/[0.08] transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <Divider />

                {/* Clear Formatting */}
                <ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting">
                    <RemoveFormatting size={16} />
                </ToolbarButton>

                {/* Fullscreen */}
                <ToolbarButton onClick={() => setIsFullscreen(!isFullscreen)} title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </ToolbarButton>
            </div>

            {/* Editor Content */}
            <div className={`bg-dark/80 ${isFullscreen ? 'flex-1 overflow-y-auto' : ''}`}>
                <EditorContent editor={editor} />
            </div>

            {/* Image Resize & Align Bar - shows when image is selected */}
            {editor.isActive('image') && (
                <div className="bg-[#141C2F] border-t border-white/[0.08] px-3 py-2 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-paragraph mr-1">Size:</span>
                    {['25%', '50%', '75%', '100%'].map(w => (
                        <button key={w} type="button" onClick={() => {
                            const currentStyle = (editor.getAttributes('image').style as string) || ''
                            const alignMatch = currentStyle.match(/(display:\s*block;?\s*)?(margin-left:\s*[^;]+;?\s*)?(margin-right:\s*[^;]+;?\s*)?/)
                            const alignPart = alignMatch ? alignMatch[0] : ''
                            editor.chain().focus().updateAttributes('image', { style: `width: ${w}; ${alignPart}`.trim() } as any).run()
                        }}
                            className="text-xs px-2 py-1 rounded bg-white/[0.05] text-paragraph hover:text-heading hover:bg-white/[0.1] transition-colors border border-white/[0.08]">
                            {w}
                        </button>
                    ))}
                    <div className="flex items-center gap-1 ml-1">
                        <input type="number" placeholder="px" value={imageWidth}
                            onChange={e => setImageWidth(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') applyImageWidth(imageWidth) }}
                            onBlur={() => { if (imageWidth) applyImageWidth(imageWidth) }}
                            className="w-16 px-2 py-1 bg-dark/80 border border-white/[0.08] rounded text-heading text-xs outline-none focus:ring-1 focus:ring-primary-500/50" />
                        <span className="text-xs text-paragraph">px</span>
                    </div>

                    <div className="w-px h-5 bg-white/[0.08] mx-1" />

                    <span className="text-xs text-paragraph mr-1">Align:</span>
                    <button type="button" onClick={() => applyImageAlign('left')} title="Align Left"
                        className="p-1 rounded bg-white/[0.05] text-paragraph hover:text-heading hover:bg-white/[0.1] transition-colors border border-white/[0.08]">
                        <AlignLeft size={14} />
                    </button>
                    <button type="button" onClick={() => applyImageAlign('center')} title="Align Center"
                        className="p-1 rounded bg-white/[0.05] text-paragraph hover:text-heading hover:bg-white/[0.1] transition-colors border border-white/[0.08]">
                        <AlignCenter size={14} />
                    </button>
                    <button type="button" onClick={() => applyImageAlign('right')} title="Align Right"
                        className="p-1 rounded bg-white/[0.05] text-paragraph hover:text-heading hover:bg-white/[0.1] transition-colors border border-white/[0.08]">
                        <AlignRight size={14} />
                    </button>
                </div>
            )}
        </div>
    )
}
