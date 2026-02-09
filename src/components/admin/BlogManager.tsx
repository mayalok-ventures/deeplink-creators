'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, Copy, Check, ArrowLeft, ExternalLink, FileText, Upload, Loader2, X } from 'lucide-react'
import { getAllBlogs, createBlog, updateBlog, deleteBlog, createSlug, BlogPost, uploadImage } from '@/lib/firestore'
import { Timestamp } from 'firebase/firestore'
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false, loading: () => (
    <div className="border border-white/[0.08] rounded-xl p-12 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
) })

type EditorMode = 'list' | 'create' | 'edit'

export default function BlogManager() {
    const [blogs, setBlogs] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [mode, setMode] = useState<EditorMode>('list')
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
    const [saving, setSaving] = useState(false)
    const [copied, setCopied] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState('')

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [content, setContent] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [author, setAuthor] = useState('Deeplink Creators')
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
        setTitle(''); setSlug(''); setContent(''); setExcerpt('')
        setCoverImage(''); setAuthor('Deeplink Creators'); setTags('')
        setKeywords(''); setPublished(false); setSeoTitle(''); setSeoDescription('')
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
        setCoverImage(blog.coverImage)
        setAuthor(blog.author)
        setTags(blog.tags.join(', '))
        setKeywords(blog.keywords || '')
        setPublished(blog.published)
        setSeoTitle(blog.seoTitle)
        setSeoDescription(blog.seoDescription)
        setMode('edit')
    }

    const handleTitleChange = (value: string) => {
        setTitle(value)
        if (mode === 'create') {
            setSlug(createSlug(value))
            if (!seoTitle) setSeoTitle(value)
        }
    }

    const handleCoverUpload = async (file: File) => {
        setUploadingCover(true)
        try {
            const url = await uploadImage(file, `blog-covers/${Date.now()}-${file.name}`)
            setCoverImage(url)
        } catch (err) {
            console.error('Cover upload failed:', err)
            alert('Failed to upload cover image.')
        }
        setUploadingCover(false)
    }

    const stripHtmlForExcerpt = (html: string) => {
        const div = document.createElement('div')
        div.innerHTML = html
        return div.textContent || div.innerText || ''
    }

    const handleSave = async () => {
        if (!title.trim() || !slug.trim() || !content.trim()) return
        setSaving(true)
        try {
            const plainText = stripHtmlForExcerpt(content)
            const data = {
                title: title.trim(),
                slug: slug.trim(),
                content,
                excerpt: excerpt.trim() || plainText.substring(0, 160).trim(),
                coverImage: coverImage.trim(),
                author: author.trim(),
                tags: tags.split(',').map(t => t.trim()).filter(Boolean),
                keywords: keywords.trim(),
                published,
                publishedAt: published ? Timestamp.now() : null,
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
            alert('Failed to save. Check console for errors.')
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
            publishedAt: !blog.published ? Timestamp.now() : blog.publishedAt,
        })
        await loadBlogs()
    }

    const copyLink = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopied(id)
        setTimeout(() => setCopied(''), 2000)
    }

    if (mode === 'create' || mode === 'edit') {
        return (
            <div>
                <button
                    onClick={() => { setMode('list'); resetForm() }}
                    className="flex items-center gap-2 text-paragraph hover:text-heading mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Posts
                </button>

                <h2 className="text-2xl font-bold font-heading text-heading mb-6">
                    {mode === 'create' ? 'Create New Post' : 'Edit Post'}
                </h2>

                <div className="space-y-6 max-w-5xl">
                    {/* Title & Slug */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Title *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                placeholder="Post title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Slug *</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                placeholder="url-friendly-slug"
                            />
                        </div>
                    </div>

                    {/* Hero / Cover Image */}
                    <div className="glass-card rounded-xl p-6">
                        <h3 className="text-lg font-bold text-heading mb-4">Hero Image</h3>
                        <input ref={coverInputRef} type="file" accept="image/*" className="hidden"
                            onChange={e => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f) }} />

                        {coverImage ? (
                            <div className="relative group">
                                <img src={coverImage} alt="Cover" className="w-full max-h-[300px] object-cover rounded-lg border border-white/[0.08]" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-3">
                                    <button type="button" onClick={() => coverInputRef.current?.click()}
                                        className="bg-primary-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2">
                                        <Upload size={14} /> Replace
                                    </button>
                                    <button type="button" onClick={() => setCoverImage('')}
                                        className="bg-red-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                                        <X size={14} /> Remove
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-4">
                                <button type="button" onClick={() => coverInputRef.current?.click()} disabled={uploadingCover}
                                    className="flex-1 border-2 border-dashed border-white/[0.1] rounded-lg py-10 text-center text-paragraph hover:border-primary-500/30 hover:text-heading transition-colors cursor-pointer">
                                    {uploadingCover ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 size={20} className="animate-spin" />
                                            <span className="text-sm">Uploading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload size={28} className="mx-auto mb-2" />
                                            <span className="text-sm block">Upload hero image</span>
                                            <span className="text-xs text-paragraph/60">JPG, PNG, WebP</span>
                                        </>
                                    )}
                                </button>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-heading mb-2">Or paste URL</label>
                                    <input
                                        type="url"
                                        value={coverImage}
                                        onChange={(e) => setCoverImage(e.target.value)}
                                        className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rich Text Editor */}
                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Content *</label>
                        <RichTextEditor content={content} onChange={setContent} />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Excerpt</label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="Brief summary (auto-generated from content if empty)"
                        />
                    </div>

                    {/* Author & Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Author</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                placeholder="Author name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Tags (comma separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                placeholder="SEO, Marketing, Greater Noida"
                            />
                        </div>
                    </div>

                    {/* SEO Settings */}
                    <div className="glass-card rounded-xl p-6">
                        <h3 className="text-lg font-bold text-heading mb-4">SEO Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-heading mb-2">SEO Title</label>
                                <input
                                    type="text"
                                    value={seoTitle}
                                    onChange={(e) => setSeoTitle(e.target.value)}
                                    className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                    placeholder="SEO title (auto-filled from title)"
                                />
                                <p className="text-xs text-paragraph mt-1">{seoTitle.length}/60 characters</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-heading mb-2">SEO Description</label>
                                <textarea
                                    value={seoDescription}
                                    onChange={(e) => setSeoDescription(e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                    placeholder="Meta description for search engines"
                                />
                                <p className="text-xs text-paragraph mt-1">{seoDescription.length}/160 characters</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-heading mb-2">Keywords</label>
                                <input
                                    type="text"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                    className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                    placeholder="seo, digital marketing, web development, greater noida"
                                />
                                <p className="text-xs text-paragraph mt-1">Comma-separated keywords for search engines</p>
                            </div>
                        </div>
                    </div>

                    {/* Publish Toggle */}
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={published}
                                    onChange={(e) => setPublished(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-11 h-6 rounded-full transition-colors ${published ? 'bg-accent' : 'bg-white/[0.1]'}`}>
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${published ? 'translate-x-5' : ''}`} />
                                </div>
                            </div>
                            <span className="text-heading font-medium">{published ? 'Published' : 'Draft'}</span>
                        </label>
                    </div>

                    {/* Save/Cancel */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleSave}
                            disabled={saving || !title.trim() || !slug.trim() || !content.trim()}
                            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                mode === 'create' ? 'Create Post' : 'Update Post'
                            )}
                        </button>
                        <button
                            onClick={() => { setMode('list'); resetForm() }}
                            className="bg-white/[0.05] border border-white/[0.08] text-heading py-3 px-6 rounded-lg hover:bg-white/[0.08] transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-heading text-heading">Blog Posts</h2>
                <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
                    <Plus size={18} />
                    New Post
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : blogs.length === 0 ? (
                <div className="glass-card rounded-xl p-12 text-center">
                    <FileText size={48} className="text-paragraph mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-heading mb-2">No blog posts yet</h3>
                    <p className="text-paragraph mb-6">Create your first blog post to get started.</p>
                    <button onClick={openCreate} className="btn-primary text-sm">Create First Post</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {blogs.map(blog => (
                        <div key={blog.id} className="glass-card rounded-xl p-5">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-heading">{blog.title}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            blog.published
                                                ? 'bg-accent/10 text-accent'
                                                : 'bg-yellow-500/10 text-yellow-400'
                                        }`}>
                                            {blog.published ? 'Published' : 'Draft'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-paragraph mb-2">{blog.excerpt?.substring(0, 100)}...</p>
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-paragraph">
                                        <span>/{blog.slug}</span>
                                        <span>·</span>
                                        <button
                                            onClick={() => copyLink(`https://deeplinkcreators.com/blog/post/?slug=${blog.slug}`, `full-${blog.id}`)}
                                            className="flex items-center gap-1 text-primary-400 hover:text-primary-300"
                                        >
                                            {copied === `full-${blog.id}` ? <Check size={12} /> : <Copy size={12} />}
                                            Copy Link
                                        </button>
                                        <span>·</span>
                                        <button
                                            onClick={() => copyLink(`https://deeplinkcreators.com/b/?id=${blog.shortId}`, `short-${blog.id}`)}
                                            className="flex items-center gap-1 text-accent hover:text-accent-300"
                                        >
                                            {copied === `short-${blog.id}` ? <Check size={12} /> : <Copy size={12} />}
                                            Short Link
                                        </button>
                                        {blog.published && (
                                            <>
                                                <span>·</span>
                                                <a
                                                    href={`/blog/post/?slug=${blog.slug}`}
                                                    target="_blank"
                                                    className="flex items-center gap-1 text-paragraph hover:text-heading"
                                                >
                                                    <ExternalLink size={12} /> View
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => togglePublish(blog)}
                                        className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-paragraph hover:text-heading hover:bg-white/[0.08] transition-colors"
                                        title={blog.published ? 'Unpublish' : 'Publish'}
                                    >
                                        {blog.published ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button
                                        onClick={() => openEdit(blog)}
                                        className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-paragraph hover:text-heading hover:bg-white/[0.08] transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    {deleteConfirm === blog.id ? (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDelete(blog.id!)}
                                                className="text-xs bg-red-500 text-white px-3 py-2 rounded-lg"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm('')}
                                                className="text-xs bg-white/[0.05] text-heading px-3 py-2 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setDeleteConfirm(blog.id!)}
                                            className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-red-400 hover:bg-red-500/10 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
