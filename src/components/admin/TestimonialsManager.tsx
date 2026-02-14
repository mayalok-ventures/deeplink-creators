'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, ArrowLeft, Loader2, Star, Home, MessageSquare } from 'lucide-react'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, TestimonialData } from '@/lib/firestore'

type EditorMode = 'list' | 'create' | 'edit'

const inputClass = 'w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors'

const emptyForm = {
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    featured: false,
    order: 0,
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={size}
                    className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/[0.15]'}
                />
            ))}
        </div>
    )
}

export default function TestimonialsManager() {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [mode, setMode] = useState<EditorMode>('list')
    const [editId, setEditId] = useState<string | null>(null)
    const [form, setForm] = useState(emptyForm)
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

    const load = async () => {
        setLoading(true)
        try {
            const data = await getTestimonials()
            setTestimonials(data)
        } catch (err) {
            console.error('Failed to load testimonials:', err)
        }
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    const featuredCount = testimonials.filter(t => t.featured).length

    const resetForm = () => {
        setForm(emptyForm)
        setEditId(null)
    }

    const openCreate = () => {
        resetForm()
        setMode('create')
    }

    const handleSave = async () => {
        if (!form.name.trim() || !form.content.trim()) return
        setSaving(true)
        try {
            if (mode === 'edit' && editId) {
                await updateTestimonial(editId, form)
            } else {
                await createTestimonial(form)
            }
            await load()
            setMode('list')
            resetForm()
        } catch (err) {
            console.error('Save failed:', err)
            alert('Failed to save. Check console for errors.')
        }
        setSaving(false)
    }

    const handleEdit = (t: TestimonialData) => {
        setForm({
            name: t.name,
            role: t.role,
            company: t.company,
            content: t.content,
            rating: t.rating,
            featured: t.featured,
            order: t.order,
        })
        setEditId(t.id!)
        setMode('edit')
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteTestimonial(id)
            setDeleteConfirm(null)
            await load()
        } catch (err) {
            console.error('Delete failed:', err)
        }
    }

    const toggleFeatured = async (t: TestimonialData) => {
        if (!t.id) return
        if (!t.featured && featuredCount >= 3) {
            alert('Maximum 3 testimonials can be featured on the homepage. Unfeature one first.')
            return
        }
        await updateTestimonial(t.id, { featured: !t.featured })
        await load()
    }

    const canSave = form.name.trim() && form.content.trim()

    if (mode === 'create' || mode === 'edit') {
        return (
            <div>
                <button
                    onClick={() => { setMode('list'); resetForm() }}
                    className="flex items-center gap-2 text-paragraph hover:text-heading mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Testimonials
                </button>

                <h2 className="text-2xl font-bold font-heading text-heading mb-6">
                    {mode === 'create' ? 'Create New Testimonial' : 'Edit Testimonial'}
                </h2>

                <div className="space-y-6 max-w-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Name *</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className={inputClass}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Role</label>
                            <input
                                type="text"
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                className={inputClass}
                                placeholder="CEO"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Company</label>
                            <input
                                type="text"
                                value={form.company}
                                onChange={(e) => setForm({ ...form, company: e.target.value })}
                                className={inputClass}
                                placeholder="Acme Inc."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Rating</label>
                            <select
                                value={form.rating}
                                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                                className={inputClass}
                            >
                                {[5, 4, 3, 2, 1].map((r) => (
                                    <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Testimonial Content *</label>
                        <textarea
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            className={`${inputClass} min-h-[120px] resize-y`}
                            placeholder="What did the client say about your services?"
                            rows={4}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Display Order</label>
                            <input
                                type="number"
                                value={form.order}
                                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                                className={inputClass}
                                placeholder="0"
                                min={0}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={form.featured}
                                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                                    className="sr-only"
                                />
                                <div className={`w-11 h-6 rounded-full transition-colors ${form.featured ? 'bg-primary-500' : 'bg-white/[0.1]'}`}>
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${form.featured ? 'translate-x-5' : ''}`} />
                                </div>
                            </div>
                            <span className="text-heading font-medium">{form.featured ? 'Featured on Homepage' : 'Not Featured'}</span>
                        </label>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleSave}
                            disabled={saving || !canSave}
                            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                mode === 'create' ? 'Create Testimonial' : 'Update Testimonial'
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
                <h2 className="text-2xl font-bold font-heading text-heading">Testimonials</h2>
                <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
                    <Plus size={18} />
                    New Testimonial
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : testimonials.length === 0 ? (
                <div className="glass-card rounded-xl p-12 text-center">
                    <MessageSquare size={48} className="text-paragraph mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-heading mb-2">No testimonials yet</h3>
                    <p className="text-paragraph mb-6">Create your first testimonial to showcase client feedback.</p>
                    <button onClick={openCreate} className="btn-primary text-sm">Create First Testimonial</button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="text-sm text-paragraph mb-2">
                        {featuredCount}/3 featured on homepage
                    </div>
                    {testimonials.map((t) => (
                        <div key={t.id} className="glass-card rounded-xl p-5">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-heading">{t.name}</h3>
                                        {t.featured && (
                                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-500/10 text-yellow-400">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-paragraph mb-2">
                                        {t.role}{t.role && t.company ? ' @ ' : ''}{t.company}
                                    </p>
                                    <div className="flex items-center gap-3 mb-2">
                                        <StarRating rating={t.rating} />
                                    </div>
                                    <p className="text-sm text-paragraph/70 line-clamp-2">&ldquo;{t.content}&rdquo;</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleFeatured(t)}
                                        className={`p-2 rounded-lg border transition-colors ${
                                            t.featured
                                                ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                                                : 'bg-white/[0.05] border-white/[0.08] text-paragraph hover:text-heading hover:bg-white/[0.08]'
                                        }`}
                                        title={t.featured ? 'Remove from Homepage' : 'Feature on Homepage'}
                                    >
                                        <Home size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(t)}
                                        className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-paragraph hover:text-heading hover:bg-white/[0.08] transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    {deleteConfirm === t.id ? (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDelete(t.id!)}
                                                className="text-xs bg-red-500 text-white px-3 py-2 rounded-lg"
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => setDeleteConfirm(null)}
                                                className="text-xs bg-white/[0.05] text-heading px-3 py-2 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setDeleteConfirm(t.id!)}
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
