'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, Copy, Check, ArrowLeft, ExternalLink, FileText, Upload, Loader2, X, Search, Filter } from 'lucide-react'
import { getAllBlogs, createBlog, updateBlog, deleteBlog, createSlug, BlogPost, uploadImage } from '@/lib/db-client'
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
    ssr: false,
    loading: () => (
        <div className="border border-[#E5E0D8] rounded-xl p-12 flex items-center justify-center bg-white">
            <div className="w-6 h-6 border-2 border-[#9B7545] border-t-transparent rounded-full animate-spin" />
        </div>
    )
})

type EditorMode = 'list' | 'create' | 'edit'

export default function BlogManager() {
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [mode, setMode] = useState<EditorMode>('list')
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
    const [saving, setSaving] = useState(false)
    const [copied, setCopied] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [filterCategory, setFilterCategory] = useState('all')

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [author, setAuthor] = useState('Deeplink Creators')
    const [category, setCategory] = useState('Architecture')
    const [tags, setTags] = useState('')
    const [keywords, setKeywords] = useState('')
    const [published, setPublished] = useState(false)
    const [seoTitle, setSeoTitle] = useState('')
    const [seoDescription, setSeoDescription] = useState('')
    const [uploadingCover, setUploadingCover] = useState(false)
    const coverInputRef = useRef<HTMLInputElement>(null)

    const loadBlogs = async () => {
        setLoading(true)
        try {
            const data = await getAllBlogs()
            setBlogs(data)
        } catch (err) {
            console.error('Failed to load blogs:', err)
        }
        setLoading(false)
    }

    useEffect(() => { loadBlogs() }, [])

    const resetForm = () => {
        setTitle('')
        setSlug('')
        setContent('')
        setExcerpt('')
        setCoverImage('')
        setAuthor('Deeplink Creators')
        setCategory('Architecture')
        setTags('')
        setKeywords('')
        setPublished(false)
        setSeoTitle('')
        setSeoDescription('')
        setEditingBlog(null)
    }

    const openCreate = () => {
        resetForm()
        setMode('create')
    }

    const openEdit = (blog: BlogPost) => {
        setEditingBlog(blog)
        setTitle(blog.title)
        setSlug(blog.slug)
        setContent(blog.content)
        setExcerpt(blog.excerpt)
        setCoverImage(blog.coverImage || '')
        setAuthor(blog.author || 'Deeplink Creators')
        setCategory(blog.category || 'Architecture')
        setTags((blog.tags || []).join(', '))
        setKeywords(blog.keywords || '')
        setPublished(blog.published)
        setSeoTitle(blog.seoTitle || '')
        setSeoDescription(blog.seoDescription || '')
        setMode('edit')
    }

    const handleTitleChange = (val: string) => {
        setTitle(val)
        if (mode === 'create') {
            setSlug(createSlug(val))
            setSeoTitle(val)
        }
    }

    const handleCoverUpload = async (file: File) => {
        if (!file) return
        setUploadingCover(true)
        try {
            const url = await uploadImage(file)
            setCoverImage(url)
        } catch (err: any) {
            console.error('Upload failed:', err)
            alert(`Cover upload failed: ${err?.message || 'Unknown error'}`)
        }
        setUploadingCover(false)
    }

    const stripHtmlForExcerpt = (html: string) => {
        if (typeof window === 'undefined') return ''
        const div = document.createElement('div')
        div.innerHTML = html
        return div.textContent || div.innerText || ''
    }

    const handleSave = async () => {
        if (!title.trim() || !slug.trim() || !content.trim()) {
            alert('Please provide title, slug, and content.')
            return
        }
        setSaving(true)
        try {
            const plainText = stripHtmlForExcerpt(content)
            const data: any = {
                title: title.trim(),
                slug: slug.trim(),
                content,
                excerpt: excerpt.trim() || plainText.substring(0, 160).trim(),
                coverImage: coverImage.trim(),
                author: author.trim(),
                category: category.trim(),
                tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                keywords: keywords.trim(),
                published,
                seoTitle: seoTitle.trim() || title.trim(),
                seoDescription: seoDescription.trim() || excerpt.trim() || plainText.substring(0, 160).trim(),
            }

            if (mode === 'edit' && editingBlog?.id) {
                await updateBlog(editingBlog.id, data)
            } else {
                await createBlog(data)
            }

            await loadBlogs()
            setMode('list')
            resetForm()
        } catch (err) {
            console.error('Save failed:', err)
            alert('Failed to save briefing.')
        }
        setSaving(false)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteBlog(id)
            await loadBlogs()
            setDeleteConfirm('')
        } catch (err) {
            console.error('Delete failed:', err)
        }
    }

    const togglePublish = async (blog: BlogPost) => {
        if (!blog.id) return
        await updateBlog(blog.id, {
            published: !blog.published,
            publishedAt: !blog.published ? new Date().toISOString() : blog.publishedAt,
        })
        await loadBlogs()
    }

    const copyLink = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(''), 2000)
    }

    const filteredBlogs = blogs.filter(b => {
        const matchesCategory = filterCategory === 'all' || (b.category || 'Architecture') === filterCategory
        const q = searchQuery.toLowerCase()
        const matchesQuery = !searchQuery || b.title.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q) || (b.tags || []).some(t => t.toLowerCase().includes(q))
        return matchesCategory && matchesQuery
    })

    if (mode === 'create' || mode === 'edit') {
        return (
            <div className="space-y-6 max-w-5xl">
                <button
                    onClick={() => { setMode('list'); resetForm() }}
                    className="inline-flex items-center gap-2 text-xs font-medium text-[#6B685F] hover:text-[#181A16] transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Briefings</span>
                </button>

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold font-heading text-[#181A16]">
                            {mode === 'create' ? 'Compose Technical Briefing' : 'Edit Briefing'}
                        </h2>
                        <p className="text-xs text-[#6B685F] mt-0.5">
                            Publish research, venture studio telemetry, or product architecture updates.
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Title & Slug */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-2">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">
                                Briefing Title *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] placeholder-[#8C887B] focus:outline-none focus:border-[#9B7545] focus:ring-1 focus:ring-[#9B7545]"
                                placeholder="Enter title"
                            />
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-2">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">
                                Canonical Slug *
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm font-mono text-[#181A16] placeholder-[#8C887B] focus:outline-none focus:border-[#9B7545] focus:ring-1 focus:ring-[#9B7545]"
                                placeholder="url-slug-example"
                            />
                        </div>
                    </div>

                    {/* Hero Cover Image */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold font-heading text-[#181A16]">
                                Header / Cover Visual
                            </h3>
                            <span className="text-[11px] font-mono text-[#8C887B]">Optional image asset</span>
                        </div>

                        <input
                            ref={coverInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f) }}
                        />

                        {coverImage ? (
                            <div className="relative group rounded-xl overflow-hidden border border-[#E5E0D8] max-h-[260px]">
                                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => coverInputRef.current?.click()}
                                        className="bg-[#9B7545] text-white text-xs px-3.5 py-2 rounded-lg hover:bg-[#86643B] transition-colors flex items-center gap-1.5 font-medium"
                                    >
                                        <Upload size={13} /> Replace Image
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCoverImage('')}
                                        className="bg-rose-600 text-white text-xs px-3.5 py-2 rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-1.5 font-medium"
                                    >
                                        <X size={13} /> Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => coverInputRef.current?.click()}
                                    disabled={uploadingCover}
                                    className="border-2 border-dashed border-[#E5E0D8] hover:border-[#9B7545]/50 bg-[#FDFBF7] rounded-xl py-8 text-center text-[#6B685F] hover:text-[#181A16] transition-colors cursor-pointer"
                                >
                                    {uploadingCover ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 size={18} className="animate-spin text-[#9B7545]" />
                                            <span className="text-xs">Uploading visual...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload size={22} className="mx-auto mb-1.5 text-[#8C887B]" />
                                            <span className="text-xs font-semibold block">Click to upload cover image</span>
                                            <span className="text-[10px] text-[#8C887B]">JPG, PNG, WebP (auto-optimized)</span>
                                        </>
                                    )}
                                </button>
                                <div className="space-y-1.5 flex flex-col justify-center">
                                    <label className="block text-xs font-mono text-[#6B685F] uppercase">Or Paste Image URL</label>
                                    <input
                                        type="url"
                                        value={coverImage}
                                        onChange={(e) => setCoverImage(e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] placeholder-[#8C887B] focus:outline-none focus:border-[#9B7545]"
                                        placeholder="https://images.unsplash.com/..."
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rich Text Editor */}
                    <div className="bg-white p-6 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-3">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">
                            Article Body &amp; Markdown *
                        </label>
                        <RichTextEditor content={content} onChange={setContent} />
                    </div>

                    {/* Excerpt, Category & Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-2 md:col-span-2">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">
                                Excerpt &amp; Lead Summary
                            </label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={3}
                                className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] placeholder-[#8C887B] focus:outline-none focus:border-[#9B7545]"
                                placeholder="Brief summary (auto-generated from text if empty)"
                            />
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-4">
                            <div className="space-y-1">
                                <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                >
                                    <option value="Architecture">Architecture</option>
                                    <option value="Product">Product &amp; CRM</option>
                                    <option value="Distribution">Distribution &amp; Creator</option>
                                    <option value="Venture">Venture Studio</option>
                                    <option value="Engineering">Software Engineering</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Author</label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                    placeholder="Author name"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tags & Keywords */}
                    <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                    placeholder="Architecture, CRM, Next.js, Scale"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Keywords</label>
                                <input
                                    type="text"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                    placeholder="enterprise saas, sahyak crm, venture studio"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs space-y-3">
                        <h3 className="text-xs font-mono font-bold text-[#181A16] uppercase tracking-wider">
                            SEO &amp; Generative Engine Metadata
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-[11px] font-mono text-[#6B685F] mb-1">SEO Title</label>
                                <input
                                    type="text"
                                    value={seoTitle}
                                    onChange={(e) => setSeoTitle(e.target.value)}
                                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                    placeholder="SEO Title"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-mono text-[#6B685F] mb-1">Meta Description</label>
                                <textarea
                                    value={seoDescription}
                                    onChange={(e) => setSeoDescription(e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                    placeholder="Search description"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Publish Switch & Actions */}
                    <div className="bg-white p-5 rounded-2xl border border-[#E5E0D8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={published}
                                onChange={(e) => setPublished(e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`w-11 h-6 rounded-full transition-colors relative ${published ? 'bg-emerald-600' : 'bg-gray-300'}`}>
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${published ? 'translate-x-5' : ''}`} />
                            </div>
                            <span className="text-xs font-semibold text-[#181A16]">
                                {published ? 'Published to Website' : 'Draft / Private'}
                            </span>
                        </label>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => { setMode('list'); resetForm() }}
                                className="px-4 py-2.5 rounded-xl border border-[#E5E0D8] text-xs font-medium text-[#6B685F] hover:bg-[#F3F0E8] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving || !title.trim() || !slug.trim() || !content.trim()}
                                className="px-6 py-2.5 rounded-xl bg-[#9B7545] text-white text-xs font-semibold hover:bg-[#86643B] transition-colors shadow-xs disabled:opacity-50 flex items-center gap-2"
                            >
                                {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                                <span>{mode === 'create' ? 'Publish Briefing' : 'Save Changes'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-[#181A16] flex items-center gap-2.5">
                        <FileText className="text-[#9B7545]" size={24} />
                        <span>Technical Briefings &amp; Blog</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B685F] mt-1">
                        Publish and manage editorial research, system architecture breakdowns, and company updates.
                    </p>
                </div>

                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B] transition-colors shadow-xs"
                >
                    <Plus size={15} />
                    <span>Compose New Briefing</span>
                </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white border border-[#E5E0D8] rounded-xl p-3 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
                <div className="relative w-full sm:w-80">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C887B]" />
                    <input
                        type="text"
                        placeholder="Search briefings by title, tag, slug..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-lg text-xs text-[#181A16] placeholder-[#8C887B] focus:outline-none focus:border-[#9B7545]"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs text-[#8C887B] font-mono">Category:</span>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-3 py-1.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-lg text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                    >
                        <option value="all">All Categories ({blogs.length})</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Product">Product</option>
                        <option value="Distribution">Distribution</option>
                        <option value="Venture">Venture</option>
                        <option value="Engineering">Engineering</option>
                    </select>
                </div>
            </div>

            {/* Blog List */}
            {loading ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E5E0D8] shadow-xs">
                    <Loader2 size={24} className="animate-spin text-[#9B7545] mx-auto mb-3" />
                    <p className="text-xs text-[#6B685F]">Loading briefings from database...</p>
                </div>
            ) : filteredBlogs.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E5E0D8] shadow-xs">
                    <FileText size={32} className="text-[#8C887B] mx-auto mb-3 opacity-40" />
                    <h3 className="text-sm font-bold text-[#181A16] mb-1">No Briefings Found</h3>
                    <p className="text-xs text-[#6B685F] max-w-sm mx-auto mb-4">
                        {searchQuery ? 'No posts match your search.' : 'Create your first technical briefing to publish to the website.'}
                    </p>
                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B]"
                    >
                        <Plus size={14} /> Compose Briefing
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {filteredBlogs.map((blog) => (
                        <div
                            key={blog.id || blog.slug}
                            className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs hover:border-[#9B7545]/40 transition-all flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-md font-semibold bg-[#9B7545]/10 text-[#9B7545] border border-[#9B7545]/20">
                                        {blog.category || 'Architecture'}
                                    </span>
                                    <button
                                        onClick={() => togglePublish(blog)}
                                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold border transition-colors ${
                                            blog.published
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                                : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                                        }`}
                                    >
                                        {blog.published ? '● Live' : '○ Draft'}
                                    </button>
                                </div>

                                <div>
                                    <h3 className="font-heading font-bold text-base text-[#181A16] line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-xs text-[#6B685F] line-clamp-2 mt-1">
                                        {blog.excerpt || 'No summary provided.'}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    {(blog.tags || []).slice(0, 3).map((tag, i) => (
                                        <span key={i} className="text-[10px] font-mono text-[#8C887B] bg-[#FDFBF7] px-2 py-0.5 rounded border border-[#E5E0D8]">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                                <span className="text-[11px] font-mono text-[#8C887B]">
                                    /blog/{blog.slug}
                                </span>

                                <div className="flex items-center gap-1.5">
                                    <a
                                        href={`/blog/${blog.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1.5 text-[#8C887B] hover:text-[#181A16] hover:bg-[#F3F0E8] rounded-lg transition-colors"
                                        title="View Live Post"
                                    >
                                        <ExternalLink size={14} />
                                    </a>
                                    <button
                                        onClick={() => openEdit(blog)}
                                        className="p-1.5 text-[#9B7545] hover:bg-[#9B7545]/10 rounded-lg transition-colors"
                                        title="Edit Briefing"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm(`Delete briefing "${blog.title}"?`)) {
                                                handleDelete(blog.id!)
                                            }
                                        }}
                                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                        title="Delete Briefing"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
