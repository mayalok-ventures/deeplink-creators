'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2 } from 'lucide-react'
import { getSEOSettings, saveSEOSettings, SEOSettings } from '@/lib/firestore'

export default function SEOManager() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [form, setForm] = useState<SEOSettings>({
        siteTitle: 'Deeplink Creators | Digital Marketing Agency in Greater Noida',
        siteDescription: 'Deeplink Creators is a digital marketing agency in Greater Noida specializing in SEO, Performance Marketing, and Branding.',
        siteKeywords: 'digital marketing Greater Noida, SEO agency Greater Noida, performance marketing, branding agency',
        ogImage: '',
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
            alert('Failed to save. Check console.')
        }
        setSaving(false)
    }

    const update = (key: keyof SEOSettings, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div>
            <h2 className="text-2xl font-bold font-heading text-heading mb-6">SEO Settings</h2>
            <div className="max-w-2xl space-y-6">
                <div className="glass-card rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-heading">Global Meta Tags</h3>
                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Site Title</label>
                        <input type="text" value={form.siteTitle} onChange={e => update('siteTitle', e.target.value)}
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="Site title for search engines" />
                        <p className="text-xs text-paragraph mt-1">{form.siteTitle.length}/60 characters</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Site Description</label>
                        <textarea value={form.siteDescription} onChange={e => update('siteDescription', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="Meta description" />
                        <p className="text-xs text-paragraph mt-1">{form.siteDescription.length}/160 characters</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Keywords (comma separated)</label>
                        <textarea value={form.siteKeywords} onChange={e => update('siteKeywords', e.target.value)}
                            rows={2}
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="keyword1, keyword2, keyword3" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">OG Image URL</label>
                        <input type="url" value={form.ogImage} onChange={e => update('ogImage', e.target.value)}
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="https://deeplinkcreators.com/og-image.jpg" />
                    </div>
                </div>

                <div className="glass-card rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-heading">Analytics & Tracking</h3>
                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Google Analytics Measurement ID</label>
                        <input type="text" value={form.googleAnalyticsId} onChange={e => update('googleAnalyticsId', e.target.value)}
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="G-XXXXXXXXXX" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Meta Pixel ID</label>
                        <input type="text" value={form.metaPixelId} onChange={e => update('metaPixelId', e.target.value)}
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="XXXXXXXXXXXXXXX" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {saving ? 'Saving...' : 'Save SEO Settings'}
                    </button>
                    {saved && <span className="text-accent text-sm font-medium">SEO settings saved!</span>}
                </div>
            </div>
        </div>
    )
}
