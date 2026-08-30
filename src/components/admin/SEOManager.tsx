'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Search, Check } from 'lucide-react'
import { getSEOSettings, saveSEOSettings, SEOSettings } from '@/lib/db-client'

export default function SEOManager() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [form, setForm] = useState<SEOSettings>({
        siteTitle: 'Deeplink Creators | Enterprise Software Holding & Creator Ecosystem',
        siteDescription: 'Deeplink Creators builds, operates, and scales proprietary software products and hyper-scaled creator networks under Mayalok Venture.',
        siteKeywords: 'Deeplink Creators, Mayalok Venture, Sahyak CRM, Enterprise Software, Creator Economy, Venture Studio',
        ogImage: '/images/hero-enterprise-architecture.jpg',
        googleAnalyticsId: '',
        metaPixelId: '',
    })

    useEffect(() => {
        getSEOSettings().then(data => {
            if (data) setForm(data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            await saveSEOSettings(form)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (err) {
            console.error('Save failed:', err)
            alert('Failed to save SEO settings.')
        }
        setSaving(false)
    }

    const update = (key: keyof SEOSettings, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 size={24} className="animate-spin text-[#9B7545]" />
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-[#181A16] flex items-center gap-2.5">
                        <Search className="text-[#9B7545]" size={24} />
                        <span>SEO &amp; Semantic Graph Metadata</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B685F] mt-1">
                        Global entity markup, search graph indexation, and tracking IDs.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B] transition-colors shadow-xs"
                >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
                    <span>{saved ? 'Saved' : 'Save SEO Graph'}</span>
                </button>
            </div>

            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">
                            Global Site Title
                        </label>
                        <span className="text-[11px] font-mono text-[#8C887B]">{form.siteTitle.length}/70 chars</span>
                    </div>
                    <input
                        type="text"
                        value={form.siteTitle}
                        onChange={e => update('siteTitle', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                        placeholder="Deeplink Creators | Enterprise Software Holding"
                    />
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">
                            Global Meta Description
                        </label>
                        <span className="text-[11px] font-mono text-[#8C887B]">{form.siteDescription.length}/160 chars</span>
                    </div>
                    <textarea
                        rows={3}
                        value={form.siteDescription}
                        onChange={e => update('siteDescription', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                        placeholder="Primary summary displayed in search and AI citations..."
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">
                        Keywords (Comma-separated)
                    </label>
                    <input
                        type="text"
                        value={form.siteKeywords}
                        onChange={e => update('siteKeywords', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                        placeholder="Deeplink Creators, Mayalok Venture, Sahyak CRM, Enterprise Software"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">
                        OpenGraph Share Image URL
                    </label>
                    <input
                        type="text"
                        value={form.ogImage}
                        onChange={e => update('ogImage', e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                        placeholder="/images/hero-enterprise-architecture.jpg"
                    />
                </div>

                <h3 className="text-sm font-bold font-heading text-[#181A16] uppercase tracking-wider border-b border-[#E5E0D8] pb-3 pt-2">
                    Telemetry &amp; Tracking Identifiers
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Google Analytics ID (G-XXXXX)</label>
                        <input
                            type="text"
                            value={form.googleAnalyticsId}
                            onChange={e => update('googleAnalyticsId', e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            placeholder="G-XXXXXXXXXX"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Meta Pixel ID</label>
                        <input
                            type="text"
                            value={form.metaPixelId}
                            onChange={e => update('metaPixelId', e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            placeholder="XXXXXXXXXXXXXXXX"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
