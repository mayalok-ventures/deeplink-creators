'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowLeft, ChevronUp, ChevronDown, Loader2, X, Layers, Home } from 'lucide-react'
import { getServiceCards, createServiceCard, updateServiceCard, deleteServiceCard, seedDefaultServiceCards, ServiceCardData } from '@/lib/firestore'
import {
    Search, TrendingUp, Target, Globe, Zap, Shield, Award, Users,
    BarChart, Rocket, Star, Heart, MessageCircle, Code, Palette, Megaphone, Mail
} from 'lucide-react'

const ICON_OPTIONS = [
    'Search', 'TrendingUp', 'Target', 'Globe', 'Zap', 'Shield', 'Award', 'Users',
    'BarChart', 'Layers', 'Rocket', 'Star', 'Heart', 'MessageCircle', 'Code', 'Palette', 'Megaphone', 'Mail',
] as const

const ICON_MAP: Record<string, React.ReactNode> = {
    Search: <Search size={16} />,
    TrendingUp: <TrendingUp size={16} />,
    Target: <Target size={16} />,
    Globe: <Globe size={16} />,
    Zap: <Zap size={16} />,
    Shield: <Shield size={16} />,
    Award: <Award size={16} />,
    Users: <Users size={16} />,
    BarChart: <BarChart size={16} />,
    Layers: <Layers size={16} />,
    Rocket: <Rocket size={16} />,
    Star: <Star size={16} />,
    Heart: <Heart size={16} />,
    MessageCircle: <MessageCircle size={16} />,
    Code: <Code size={16} />,
    Palette: <Palette size={16} />,
    Megaphone: <Megaphone size={16} />,
    Mail: <Mail size={16} />,
}

const GRADIENT_OPTIONS = [
    { value: 'from-primary-400 to-cyan-400', label: 'Blue → Cyan' },
    { value: 'from-accent to-emerald-400', label: 'Green → Emerald' },
    { value: 'from-orange-400 to-red-400', label: 'Orange → Red' },
    { value: 'from-purple-400 to-pink-400', label: 'Purple → Pink' },
    { value: 'from-blue-500 to-primary-600', label: 'Blue → Indigo' },
    { value: 'from-green-500 to-emerald-600', label: 'Green → Dark Green' },
    { value: 'from-yellow-400 to-orange-400', label: 'Yellow → Orange' },
    { value: 'from-rose-400 to-red-500', label: 'Rose → Red' },
    { value: 'from-indigo-400 to-violet-500', label: 'Indigo → Violet' },
    { value: 'from-teal-400 to-cyan-500', label: 'Teal → Cyan' },
]

type EditorMode = 'list' | 'create' | 'edit'

const inputClass = 'w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors'

export default function ServicesManager() {
    const [cards, setCards] = useState<ServiceCardData[]>([])
    const [loading, setLoading] = useState(true)
    const [mode, setMode] = useState<EditorMode>('list')
    const [editingCard, setEditingCard] = useState<ServiceCardData | null>(null)
    const [saving, setSaving] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState('')
    const [seeding, setSeeding] = useState(false)

    const [title, setTitle] = useState('')
    const [benefit, setBenefit] = useState('')
    const [description, setDescription] = useState('')
    const [iconName, setIconName] = useState<string>('Search')
    const [gradient, setGradient] = useState(GRADIENT_OPTIONS[0].value)
    const [cta, setCta] = useState('')
    const [href, setHref] = useState('')
    const [features, setFeatures] = useState<string[]>([''])
    const [visible, setVisible] = useState(true)
    const [featured, setFeatured] = useState(false)

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
        setTitle(''); setBenefit(''); setDescription('')
        setIconName('Search'); setGradient(GRADIENT_OPTIONS[0].value)
        setCta(''); setHref(''); setFeatures(['']); setVisible(true); setFeatured(false)
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
        setIconName(card.icon)
        setGradient(card.gradient)
        setCta(card.cta)
        setHref(card.href)
        setFeatures(card.features.length > 0 ? card.features : [''])
        setVisible(card.visible)
        setFeatured(card.featured ?? false)
        setMode('edit')
    }

    const handleSave = async () => {
        const trimmedFeatures = features.map(f => f.trim()).filter(Boolean)
        if (!title.trim() || !benefit.trim() || !description.trim() || !cta.trim() || !href.trim() || trimmedFeatures.length === 0) return

        setSaving(true)
        try {
            const data: Omit<ServiceCardData, 'id'> = {
                title: title.trim(),
                benefit: benefit.trim(),
                description: description.trim(),
                icon: iconName,
                gradient,
                cta: cta.trim(),
                href: href.trim(),
                features: trimmedFeatures,
                visible,
                featured,
                order: mode === 'edit' && editingCard ? editingCard.order : cards.length,
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
            alert('Failed to save. Check console for errors.')
        }
        setSaving(false)
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteServiceCard(id)
            await loadCards()
            setDeleteConfirm('')
        } catch (err) {
            console.error('Delete failed:', err)
        }
    }

    const toggleVisibility = async (card: ServiceCardData) => {
        if (!card.id) return
        await updateServiceCard(card.id, { visible: !card.visible })
        await loadCards()
    }

    const toggleFeatured = async (card: ServiceCardData) => {
        if (!card.id) return
        await updateServiceCard(card.id, { featured: !(card.featured ?? false) })
        await loadCards()
    }

    const handleSeed = async () => {
        setSeeding(true)
        try {
            await seedDefaultServiceCards()
            await loadCards()
        } catch (err) {
            console.error('Seed failed:', err)
        }
        setSeeding(false)
    }

    const moveCard = async (index: number, direction: 'up' | 'down') => {
        const swapIndex = direction === 'up' ? index - 1 : index + 1
        if (swapIndex < 0 || swapIndex >= cards.length) return

        const cardA = cards[index]
        const cardB = cards[swapIndex]
        if (!cardA.id || !cardB.id) return

        await updateServiceCard(cardA.id, { order: cardB.order })
        await updateServiceCard(cardB.id, { order: cardA.order })
        await loadCards()
    }

    const addFeature = () => setFeatures([...features, ''])

    const updateFeature = (index: number, value: string) => {
        const updated = [...features]
        updated[index] = value
        setFeatures(updated)
    }

    const removeFeature = (index: number) => {
        if (features.length <= 1) return
        setFeatures(features.filter((_, i) => i !== index))
    }

    if (mode === 'create' || mode === 'edit') {
        const trimmedFeatures = features.map(f => f.trim()).filter(Boolean)
        const canSave = title.trim() && benefit.trim() && description.trim() && cta.trim() && href.trim() && trimmedFeatures.length > 0

        return (
            <div>
                <button
                    onClick={() => { setMode('list'); resetForm() }}
                    className="flex items-center gap-2 text-paragraph hover:text-heading mb-6 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Cards
                </button>

                <h2 className="text-2xl font-bold font-heading text-heading mb-6">
                    {mode === 'create' ? 'Create New Card' : 'Edit Card'}
                </h2>

                <div className="space-y-6 max-w-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Title *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className={inputClass}
                                placeholder="Service title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Benefit Tagline *</label>
                            <input
                                type="text"
                                value={benefit}
                                onChange={(e) => setBenefit(e.target.value)}
                                className={inputClass}
                                placeholder="Short benefit statement"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Description *</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className={inputClass}
                            placeholder="Service description"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Icon Name</label>
                            <select
                                value={iconName}
                                onChange={(e) => setIconName(e.target.value)}
                                className={inputClass}
                            >
                                {ICON_OPTIONS.map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Gradient</label>
                            <select
                                value={gradient}
                                onChange={(e) => setGradient(e.target.value)}
                                className={inputClass}
                            >
                                {GRADIENT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <div className={`mt-2 h-3 rounded-full w-full bg-gradient-to-r ${gradient}`} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">CTA Button Text *</label>
                            <input
                                type="text"
                                value={cta}
                                onChange={(e) => setCta(e.target.value)}
                                className={inputClass}
                                placeholder="Get Started"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Link / href *</label>
                            <input
                                type="text"
                                value={href}
                                onChange={(e) => setHref(e.target.value)}
                                className={inputClass}
                                placeholder="/services/my-service"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Features *</label>
                        <div className="space-y-3">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => updateFeature(i, e.target.value)}
                                        className={inputClass}
                                        placeholder={`Feature ${i + 1}`}
                                    />
                                    <button
                                        onClick={() => removeFeature(i)}
                                        disabled={features.length <= 1}
                                        className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addFeature}
                            className="mt-3 text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors"
                        >
                            <Plus size={16} />
                            Add Feature
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={visible}
                                    onChange={(e) => setVisible(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-11 h-6 rounded-full transition-colors ${visible ? 'bg-accent' : 'bg-white/[0.1]'}`}>
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${visible ? 'translate-x-5' : ''}`} />
                                </div>
                            </div>
                            <span className="text-heading font-medium">{visible ? 'Visible on Services Page' : 'Hidden'}</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={featured}
                                    onChange={(e) => setFeatured(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-11 h-6 rounded-full transition-colors ${featured ? 'bg-primary-500' : 'bg-white/[0.1]'}`}>
                                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${featured ? 'translate-x-5' : ''}`} />
                                </div>
                            </div>
                            <span className="text-heading font-medium">{featured ? 'Show on Homepage' : 'Not on Homepage'}</span>
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
                                mode === 'create' ? 'Create Card' : 'Update Card'
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
                <h2 className="text-2xl font-bold font-heading text-heading">Service Cards</h2>
                <div className="flex items-center gap-3">
                    {cards.length === 0 && !loading && (
                        <button
                            onClick={handleSeed}
                            disabled={seeding}
                            className="bg-white/[0.05] border border-white/[0.08] text-heading py-2 px-4 rounded-lg hover:bg-white/[0.08] transition-colors text-sm flex items-center gap-2 disabled:opacity-50"
                        >
                            {seeding ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Layers size={16} />
                            )}
                            Seed Defaults
                        </button>
                    )}
                    <button onClick={openCreate} className="btn-primary flex items-center gap-2 text-sm">
                        <Plus size={18} />
                        New Card
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : cards.length === 0 ? (
                <div className="glass-card rounded-xl p-12 text-center">
                    <Layers size={48} className="text-paragraph mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-heading mb-2">No service cards yet</h3>
                    <p className="text-paragraph mb-6">Seed defaults or create your first service card.</p>
                    <button onClick={openCreate} className="btn-primary text-sm">Create First Card</button>
                </div>
            ) : (
                <div className="space-y-4">
                    {cards.map((card, index) => (
                        <div key={card.id} className="glass-card rounded-xl p-5">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-heading">{card.title}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                            card.visible
                                                ? 'bg-accent/10 text-accent'
                                                : 'bg-yellow-500/10 text-yellow-400'
                                        }`}>
                                            {card.visible ? 'Visible' : 'Hidden'}
                                        </span>
                                        {card.featured && (
                                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-primary-500/10 text-primary-400">
                                                Homepage
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-paragraph mb-2">{card.benefit}</p>
                                    <div className="flex items-center gap-3 text-xs text-paragraph">
                                        <span className="flex items-center gap-1">
                                            {ICON_MAP[card.icon] || card.icon}
                                            <span>{card.icon}</span>
                                        </span>
                                        <span>·</span>
                                        <div className={`h-3 w-16 rounded-full bg-gradient-to-r ${card.gradient}`} />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => moveCard(index, 'up')}
                                        disabled={index === 0}
                                        className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-paragraph hover:text-heading hover:bg-white/[0.08] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Move Up"
                                    >
                                        <ChevronUp size={16} />
                                    </button>
                                    <button
                                        onClick={() => moveCard(index, 'down')}
                                        disabled={index === cards.length - 1}
                                        className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-paragraph hover:text-heading hover:bg-white/[0.08] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Move Down"
                                    >
                                        <ChevronDown size={16} />
                                    </button>
                                    <button
                                        onClick={() => toggleFeatured(card)}
                                        className={`p-2 rounded-lg border transition-colors ${
                                            card.featured
                                                ? 'bg-primary-500/20 border-primary-500/30 text-primary-400'
                                                : 'bg-white/[0.05] border-white/[0.08] text-paragraph hover:text-heading hover:bg-white/[0.08]'
                                        }`}
                                        title={card.featured ? 'Remove from Homepage' : 'Show on Homepage'}
                                    >
                                        <Home size={16} />
                                    </button>
                                    <button
                                        onClick={() => toggleVisibility(card)}
                                        className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-paragraph hover:text-heading hover:bg-white/[0.08] transition-colors"
                                        title={card.visible ? 'Hide' : 'Show'}
                                    >
                                        {card.visible ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button
                                        onClick={() => openEdit(card)}
                                        className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-paragraph hover:text-heading hover:bg-white/[0.08] transition-colors"
                                        title="Edit"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    {deleteConfirm === card.id ? (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDelete(card.id!)}
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
                                            onClick={() => setDeleteConfirm(card.id!)}
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
