'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, ExternalLink, Share2, Check } from 'lucide-react'
import { getSocialLinks, saveSocialLinks, SocialLinks } from '@/lib/db-client'

export default function SocialManager() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [form, setForm] = useState<SocialLinks>({
        facebook: 'https://facebook.com/deeplinkcreators',
        instagram: 'https://instagram.com/deeplinkcreators',
        linkedin: 'https://linkedin.com/company/deeplink-creators',
        twitter: 'https://twitter.com/deeplinkcreators',
        youtube: 'https://youtube.com/@deeplinkcreators',
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
            alert('Failed to save social links.')
        }
        setSaving(false)
    }

    const update = (key: keyof SocialLinks, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 size={24} className="animate-spin text-[#9B7545]" />
            </div>
        )
    }

    const fields: { key: keyof SocialLinks; label: string; placeholder: string }[] = [
        { key: 'linkedin', label: 'LinkedIn Enterprise Page', placeholder: 'https://linkedin.com/company/deeplink-creators' },
        { key: 'twitter', label: 'Twitter / X Profile', placeholder: 'https://twitter.com/deeplinkcreators' },
        { key: 'instagram', label: 'Instagram Channel', placeholder: 'https://instagram.com/deeplinkcreators' },
        { key: 'facebook', label: 'Facebook Official Page', placeholder: 'https://facebook.com/deeplinkcreators' },
        { key: 'youtube', label: 'YouTube Broadcast Channel', placeholder: 'https://youtube.com/@deeplinkcreators' },
    ]

    return (
        <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-[#181A16] flex items-center gap-2.5">
                        <Share2 className="text-[#9B7545]" size={24} />
                        <span>Social Ecosystem</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B685F] mt-1">
                        Configure official enterprise links and creator syndication channel handles.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B] transition-colors shadow-xs"
                >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
                    <span>{saved ? 'Saved' : 'Save Social Links'}</span>
                </button>
            </div>

            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
                {fields.map(field => (
                    <div key={field.key} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">
                                {field.label}
                            </label>
                            {form[field.key] && (
                                <a
                                    href={form[field.key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] font-mono text-[#9B7545] hover:underline flex items-center gap-1"
                                >
                                    <span>Test Link</span>
                                    <ExternalLink size={10} />
                                </a>
                            )}
                        </div>
                        <input
                            type="url"
                            value={form[field.key]}
                            onChange={e => update(field.key, e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            placeholder={field.placeholder}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
