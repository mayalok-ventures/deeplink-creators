'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowLeft, Loader2, X, Layers, Code, TrendingUp, Target, Globe, Zap, Shield, Award, Users, BarChart, Rocket, Star, Heart, MessageCircle, Palette, Megaphone, Mail } from 'lucide-react'
import { getServiceCards, createServiceCard, updateServiceCard, deleteServiceCard, seedDefaultServiceCards, ServiceCardData, uploadImage } from '@/lib/db-client'

const ICON_OPTIONS = [
    'Code', 'Layers', 'TrendingUp', 'Target', 'Globe', 'Zap', 'Shield', 'Award', 'Users',
    'BarChart', 'Rocket', 'Star', 'Heart', 'MessageCircle', 'Palette', 'Megaphone', 'Mail',
] as const

const ICON_MAP: Record<string, React.ReactNode> = {
    Code: <Code size={16} />,
    Layers: <Layers size={16} />,
    TrendingUp: <TrendingUp size={16} />,
    Target: <Target size={16} />,
    Globe: <Globe size={16} />,
    Zap: <Zap size={16} />,
    Shield: <Shield size={16} />,
    Award: <Award size={16} />,
    Users: <Users size={16} />,
    BarChart: <BarChart size={16} />,
    Rocket: <Rocket size={16} />,
    Star: <Star size={16} />,
    Heart: <Heart size={16} />,
    MessageCircle: <MessageCircle size={16} />,
    Palette: <Palette size={16} />,
    Megaphone: <Megaphone size={16} />,
    Mail: <Mail size={16} />,
}

type EditorMode = 'list' | 'create' | 'edit'

export default function ServicesManager() {
    const [cards, setCards] = useState<ServiceCardData[]>([])
    const [loading, setLoading] = useState(true)
    const [mode, setMode] = useState<EditorMode>('list')
    const [editingCard, setEditingCard] = useState<ServiceCardData | null>(null)
    const [saving, setSaving] = useState(false)
    const [seeding, setSeeding] = useState(false)

    const [title, setTitle] = useState('')
    const [benefit, setBenefit] = useState('')
    const [description, setDescription] = useState('')
    const [iconName, setIconName] = useState<string>('Code')
    const [gradient, setGradient] = useState('from-[#9B7545] to-[#86643B]')
    const [cta, setCta] = useState('')
    const [href, setHref] = useState('')
    const [features, setFeatures] = useState<string[]>([''])
    const [visible, setVisible] = useState(true)
    const [featured, setFeatured] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    const loadCards = async () => {
        setLoading(true)
        try {
            const data = await getServiceCards()
            setCards(data)
        } catch (err) {
            console.error('Failed to load service cards:', err)
        }
        setLoading(false)
    }

    useEffect(() => { loadCards() }, [])

    const resetForm = () => {
        setTitle('')
        setBenefit('')
        setDescription('')
        setIconName('Code')
        setGradient('from-[#9B7545] to-[#86643B]')
        setCta('Request Architecture Briefing')
        setHref('/contact')
        setFeatures([''])
        setVisible(true)
        setFeatured(false)
        setImageUrl('')
        setEditingCard(null)
    }

    const openCreate = () => {
        resetForm()
        setMode('create')
    }

    const openEdit = (card: ServiceCardData) => {
        setEditingCard(card)
        setTitle(card.title)
        setBenefit(card.benefit)
        setDescription(card.description)
        setIconName(card.icon || 'Code')
        setGradient(card.gradient || 'from-[#9B7545] to-[#86643B]')
        setCta(card.cta || 'Explore Offering')
        setHref(card.href || '/contact')
        setFeatures(card.features && card.features.length > 0 ? card.features : [''])
        setVisible(card.visible)
        setFeatured(card.featured ?? false)
        setImageUrl(card.imageUrl ?? '')
        setMode('edit')
    }

    const handleFeatureChange = (index: number, val: string) => {
        const next = [...features]
        next[index] = val
        setFeatures(next)
    }

    const addFeature = () => setFeatures([...features, ''])
    const removeFeature = (idx: number) => {
        if (features.length <= 1) return
        setFeatures(features.filter((_, i) => i !== idx))
    }

    const handleSave = async () => {
        const trimmedFeatures = features.map(f => f.trim()).filter(Boolean)
        if (!title.trim() || !benefit.trim()) {
            alert('Title and Key Value Proposition are required.')
            return
        }

        setSaving(true)
        try {
            const data: Omit<ServiceCardData, 'id'> = {
                title: title.trim(),
                benefit: benefit.trim(),
                description: description.trim(),
                icon: iconName,
                gradient,
                cta: cta.trim() || 'Request Architecture Briefing',
                href: href.trim() || '/contact',
                features: trimmedFeatures.length > 0 ? trimmedFeatures : ['Enterprise Grade Security', 'High-Availability Architecture'],
                visible,
                featured,
                order: mode === 'edit' && editingCard ? editingCard.order : cards.length + 1,
                imageUrl: imageUrl || undefined,
            }

            if (mode === 'edit' && editingCard?.id) {
                await updateServiceCard(editingCard.id, data)
            } else {
                await createServiceCard(data)
            }

            await loadCards()
            setMode('list')
            resetForm()
        } catch (err) {
            console.error('Save failed:', err)
            alert('Failed to save service card.')
        }
        setSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service offering?')) return
        try {
            await deleteServiceCard(id)
            await loadCards()
        } catch (err) {
            console.error('Delete failed:', err)
        }
    }

    const toggleVisibility = async (card: ServiceCardData) => {
        if (!card.id) return
        await updateServiceCard(card.id, { visible: !card.visible })
        await loadCards()
    }

    const handleSeedDefaults = async () => {
        setSeeding(true)
        try {
            await seedDefaultServiceCards()
            await loadCards()
            alert('Default enterprise service offerings loaded!')
        } catch (err) {
            console.error('Seed failed:', err)
        }
        setSeeding(false)
    }

    if (mode === 'create' || mode === 'edit') {
        return (
            <div className="space-y-6 max-w-4xl">
                <button
                    onClick={() => { setMode('list'); resetForm() }}
                    className="inline-flex items-center gap-2 text-xs font-medium text-[#6B685F] hover:text-[#181A16] transition-colors"
                >
                    <ArrowLeft size={16} />
                    <span>Back to Services Catalog</span>
                </button>

                <h2 className="text-2xl font-bold font-heading text-[#181A16]">
                    {mode === 'create' ? 'Add Service Offering' : 'Edit Service Offering'}
                </h2>

                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Service Title *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                placeholder="e.g. Custom SaaS & Platform Engineering"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Icon Symbol</label>
                            <select
                                value={iconName}
                                onChange={(e) => setIconName(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            >
                                {ICON_OPTIONS.map((name) => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Key Value Proposition / Benefit *</label>
                        <input
                            type="text"
                            value={benefit}
                            onChange={(e) => setBenefit(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            placeholder="Institutional grade web applications engineered for horizontal scale."
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Full Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            placeholder="Architectural deep dive into what this service covers..."
                        />
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-mono font-medium text-[#6B685F] uppercase">Key Capabilities &amp; Features</label>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="text-xs font-semibold text-[#9B7545] hover:underline flex items-center gap-1"
                            >
                                <Plus size={13} /> Add Feature
                            </button>
                        </div>

                        <div className="space-y-2">
                            {features.map((feat, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={feat}
                                        onChange={(e) => handleFeatureChange(i, e.target.value)}
                                        placeholder={`Feature bullet #${i + 1}`}
                                        className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                    />
                                    {features.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(i)}
                                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">CTA Button Text</label>
                            <input
                                type="text"
                                value={cta}
                                onChange={(e) => setCta(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                placeholder="Request Architecture Briefing"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Destination URL / Link</label>
                            <input
                                type="text"
                                value={href}
                                onChange={(e) => setHref(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                placeholder="/contact or https://sahyak.com"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#181A16]">
                            <input
                                type="checkbox"
                                checked={visible}
                                onChange={(e) => setVisible(e.target.checked)}
                                className="w-4 h-4 rounded border-[#E5E0D8] text-[#9B7545] focus:ring-[#9B7545]"
                            />
                            <span>Visible on Website</span>
                        </label>

                        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#181A16]">
                            <input
                                type="checkbox"
                                checked={featured}
                                onChange={(e) => setFeatured(e.target.checked)}
                                className="w-4 h-4 rounded border-[#E5E0D8] text-[#9B7545] focus:ring-[#9B7545]"
                            />
                            <span>Featured Card (Highlighted)</span>
                        </label>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-[#E5E0D8]">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2.5 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B] transition-colors shadow-xs flex items-center gap-2"
                        >
                            {saving ? <Loader2 size={14} className="animate-spin" /> : null}
                            <span>{mode === 'create' ? 'Create Offering' : 'Save Changes'}</span>
                        </button>
                        <button
                            onClick={() => { setMode('list'); resetForm() }}
                            className="px-4 py-2.5 border border-[#E5E0D8] text-xs font-medium text-[#6B685F] hover:bg-[#F3F0E8] rounded-xl transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-[#181A16] flex items-center gap-2.5">
                        <Layers className="text-[#9B7545]" size={24} />
                        <span>Services Catalog</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B685F] mt-1">
                        Manage institutional services, software offerings, and Sahyak CRM integrations.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        onClick={handleSeedDefaults}
                        disabled={seeding}
                        className="px-3.5 py-2 bg-white border border-[#E5E0D8] text-xs font-medium text-[#6B685F] hover:text-[#181A16] hover:bg-[#F3F0E8] rounded-xl transition-colors"
                    >
                        {seeding ? 'Restoring...' : 'Reset Default Offerings'}
                    </button>
                    <button
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B] transition-colors shadow-xs"
                    >
                        <Plus size={15} />
                        <span>Add Offering</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E5E0D8]">
                    <Loader2 size={24} className="animate-spin text-[#9B7545] mx-auto mb-3" />
                    <p className="text-xs text-[#6B685F]">Loading services catalog...</p>
                </div>
            ) : cards.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E5E0D8]">
                    <Layers size={32} className="text-[#8C887B] mx-auto mb-3 opacity-40" />
                    <h3 className="text-sm font-bold text-[#181A16] mb-1">No Services Configured</h3>
                    <p className="text-xs text-[#6B685F] max-w-sm mx-auto mb-4">
                        Add service offerings or restore the default enterprise software catalog.
                    </p>
                    <button
                        onClick={handleSeedDefaults}
                        className="px-4 py-2 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B]"
                    >
                        Load Default Catalog
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs hover:border-[#9B7545]/40 transition-all flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="w-8 h-8 rounded-lg bg-[#9B7545]/10 text-[#9B7545] flex items-center justify-center border border-[#9B7545]/20">
                                        {ICON_MAP[card.icon] || <Code size={16} />}
                                    </div>
                                    <button
                                        onClick={() => toggleVisibility(card)}
                                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                                            card.visible
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                : 'bg-gray-100 text-gray-600 border-gray-200'
                                        }`}
                                    >
                                        {card.visible ? 'Visible' : 'Hidden'}
                                    </button>
                                </div>

                                <div>
                                    <h3 className="font-heading font-bold text-base text-[#181A16]">
                                        {card.title}
                                    </h3>
                                    <p className="text-xs text-[#6B685F] line-clamp-2 mt-1">
                                        {card.benefit}
                                    </p>
                                </div>

                                <div className="space-y-1 pt-1">
                                    {(card.features || []).slice(0, 3).map((f, i) => (
                                        <div key={i} className="text-[11px] text-[#8C887B] flex items-center gap-1.5">
                                            <span className="text-[#9B7545]">✓</span>
                                            <span className="truncate">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-[#E5E0D8] flex items-center justify-between">
                                <span className="text-[11px] font-mono text-[#8C887B] truncate max-w-[140px]">
                                    {card.href}
                                </span>

                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => openEdit(card)}
                                        className="p-1.5 text-[#9B7545] hover:bg-[#9B7545]/10 rounded-lg transition-colors"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(card.id!)}
                                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
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
