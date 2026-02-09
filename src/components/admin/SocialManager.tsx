'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, ExternalLink } from 'lucide-react'
import { getSocialLinks, saveSocialLinks, SocialLinks } from '@/lib/firestore'

export default function SocialManager() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [form, setForm] = useState<SocialLinks>({
        facebook: '', instagram: '', linkedin: '', twitter: '', youtube: '',
    })

    useEffect(() => {
        getSocialLinks().then(data => {
            if (data) setForm(data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            await saveSocialLinks(form)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (err) {
            console.error('Save failed:', err)
            alert('Failed to save. Check console.')
        }
        setSaving(false)
    }

    const update = (key: keyof SocialLinks, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    const fields: { key: keyof SocialLinks; label: string; placeholder: string }[] = [
        { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/deeplinkcreators' },
        { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/deeplinkcreators' },
        { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/deeplinkcreators' },
        { key: 'twitter', label: 'Twitter / X', placeholder: 'https://twitter.com/deeplinkcreators' },
        { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/@deeplinkcreators' },
    ]

    return (
        <div>
            <h2 className="text-2xl font-bold font-heading text-heading mb-6">Social Links</h2>
            <div className="max-w-2xl">
                <div className="glass-card rounded-xl p-6 space-y-4">
                    {fields.map(field => (
                        <div key={field.key}>
                            <label className="block text-sm font-medium text-heading mb-2">{field.label}</label>
                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    value={form[field.key]}
                                    onChange={e => update(field.key, e.target.value)}
                                    className="flex-1 px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                    placeholder={field.placeholder}
                                />
                                {form[field.key] && (
                                    <a href={form[field.key]} target="_blank" rel="noopener noreferrer"
                                        className="flex items-center justify-center w-12 bg-white/[0.05] border border-white/[0.08] rounded-lg text-paragraph hover:text-heading transition-colors">
                                        <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4 mt-6">
                    <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {saving ? 'Saving...' : 'Save Social Links'}
                    </button>
                    {saved && <span className="text-accent text-sm font-medium">Links saved!</span>}
                </div>
            </div>
        </div>
    )
}
