'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, ArrowLeft, Loader2, Star, MessageSquare } from 'lucide-react'
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, TestimonialData } from '@/lib/db-client'

type EditorMode = 'list' | 'create' | 'edit'

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
                    className={i <= rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}
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

    const loadData = async () => {
        setLoading(true)
        try {
            const data = await getTestimonials()
            setTestimonials(data)
        } catch (err) {
            console.error('Failed to load testimonials:', err)
        }
        setLoading(false)
    }

    useEffect(() => { loadData() }, [])

    const openCreate = () => {
        setForm(emptyForm)
        setEditId(null)
        setMode('create')
    }

    const openEdit = (item: TestimonialData) => {
        setForm({
            name: item.name,
            role: item.role,
            company: item.company,
            content: item.content,
            rating: item.rating,
            featured: item.featured,
            order: item.order || 0,
        })
        setEditId(item.id || null)
        setMode('edit')
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name.trim() || !form.content.trim()) {
            alert('Name and review content are required.')
            return
        }

        setSaving(true)
        try {
            if (mode === 'edit' && editId) {
                await updateTestimonial(editId, form)
            } else {
                await createTestimonial(form)
            }
            await loadData()
            setMode('list')
            setForm(emptyForm)
            setEditId(null)
        } catch (err) {
            console.error('Save failed:', err)
            alert('Failed to save testimonial.')
        }
        setSaving(false)
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Delete testimonial from "${name}"?`)) return
        try {
            await deleteTestimonial(id)
            await loadData()
        } catch (err) {
            console.error('Delete failed:', err)
        }
    }

    if (mode === 'create' || mode === 'edit') {
        return (
            <div className="space-y-6 max-w-2xl">
                <button
                    onClick={() => { setMode('list'); setForm(emptyForm) }}
                    className="inline-flex items-center gap-2 text-xs font-medium text-[#6B685F] hover:text-[#181A16] transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Testimonials</span>
                </button>

                <h2 className="text-2xl font-bold font-heading text-[#181A16]">
                    {mode === 'create' ? 'Add Testimonial' : 'Edit Testimonial'}
                </h2>

                <form onSubmit={handleSave} className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Client Name *</label>
                            <input
                                type="text"
                                required
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                placeholder="e.g. Aman Sharma"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Designation / Role</label>
                            <input
                                type="text"
                                value={form.role}
                                onChange={e => setForm({ ...form, role: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                placeholder="e.g. Chief Technology Officer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Company / Organization</label>
                            <input
                                type="text"
                                value={form.company}
                                onChange={e => setForm({ ...form, company: e.target.value })}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                placeholder="e.g. NexGen Logistics"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Star Rating</label>
                            <select
                                value={form.rating}
                                onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            >
                                <option value={5}>★★★★★ (5 Stars)</option>
                                <option value={4}>★★★★☆ (4 Stars)</option>
                                <option value={3}>★★★☆☆ (3 Stars)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Endorsement Content *</label>
                        <textarea
                            rows={4}
                            required
                            value={form.content}
                            onChange={e => setForm({ ...form, content: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            placeholder="Quote or endorsement statement..."
                        />
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={form.featured}
                            onChange={e => setForm({ ...form, featured: e.target.checked })}
                            className="w-4 h-4 rounded border-[#E5E0D8] text-[#9B7545] focus:ring-[#9B7545]"
                        />
                        <label htmlFor="featured" className="text-xs font-medium text-[#181A16] cursor-pointer">
                            Feature this endorsement prominently on the homepage
                        </label>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-[#E5E0D8]">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B] transition-colors shadow-xs flex items-center gap-2"
                        >
                            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                            <span>{mode === 'create' ? 'Save Testimonial' : 'Update Testimonial'}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => { setMode('list'); setForm(emptyForm) }}
                            className="px-4 py-2.5 border border-[#E5E0D8] text-xs font-medium text-[#6B685F] hover:bg-[#F3F0E8] rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-[#181A16] flex items-center gap-2.5">
                        <MessageSquare className="text-[#9B7545]" size={24} />
                        <span>Client Endorsements &amp; Proof</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B685F] mt-1">
                        Manage executive reviews, enterprise client feedback, and partner testimonials.
                    </p>
                </div>

                <button
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B] transition-colors shadow-xs"
                >
                    <Plus size={15} />
                    <span>Add Testimonial</span>
                </button>
            </div>

            {loading ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E5E0D8]">
                    <Loader2 size={24} className="animate-spin text-[#9B7545] mx-auto mb-3" />
                    <p className="text-xs text-[#6B685F]">Loading testimonials...</p>
                </div>
            ) : testimonials.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E5E0D8]">
                    <MessageSquare size={32} className="text-[#8C887B] mx-auto mb-3 opacity-40" />
                    <h3 className="text-sm font-bold text-[#181A16] mb-1">No Testimonials Added</h3>
                    <p className="text-xs text-[#6B685F] max-w-sm mx-auto mb-4">
                        Add client quotes to display social proof on the website.
                    </p>
                    <button
                        onClick={openCreate}
                        className="px-4 py-2 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B]"
                    >
                        Add First Review
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs hover:border-[#9B7545]/40 transition-all flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <StarRating rating={item.rating || 5} />
                                    {item.featured && (
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                            Featured
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs text-[#181A16] italic leading-relaxed">
                                    &ldquo;{item.content}&rdquo;
                                </p>

                                <div>
                                    <h4 className="font-heading font-bold text-sm text-[#181A16]">{item.name}</h4>
                                    <p className="text-[11px] text-[#6B685F]">
                                        {item.role}{item.company ? ` • ${item.company}` : ''}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-[#E5E0D8] flex items-center justify-end gap-1.5">
                                <button
                                    onClick={() => openEdit(item)}
                                    className="p-1.5 text-[#9B7545] hover:bg-[#9B7545]/10 rounded-lg transition-colors"
                                >
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id!, item.name)}
                                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
