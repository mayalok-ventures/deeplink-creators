'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2 } from 'lucide-react'
import { getSiteSettings, saveSiteSettings, SiteSettings } from '@/lib/firestore'

export default function ContactManager() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [form, setForm] = useState<SiteSettings>({
        phone: '', email: '', address: '', city: 'Greater Noida',
        state: 'Uttar Pradesh', pincode: '', workingHoursWeekdays: '9:00 AM - 6:00 PM',
        workingHoursSaturday: '10:00 AM - 2:00 PM', workingHoursSunday: 'Closed',
    })

    useEffect(() => {
        getSiteSettings().then(data => {
            if (data) setForm(data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    const handleSave = async () => {
        setSaving(true)
        try {
            await saveSiteSettings(form)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (err) {
            console.error('Save failed:', err)
            alert('Failed to save. Check console.')
        }
        setSaving(false)
    }

    const update = (key: keyof SiteSettings, value: string) => {
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
            <h2 className="text-2xl font-bold font-heading text-heading mb-6">Contact Settings</h2>
            <div className="max-w-2xl space-y-6">
                <div className="glass-card rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-heading">Contact Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Phone</label>
                            <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                placeholder="+91 XXXXX XXXXX" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Email</label>
                            <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                placeholder="growth@deeplinkcreators.com" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-heading mb-2">Address</label>
                        <input type="text" value={form.address} onChange={e => update('address', e.target.value)}
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="Street address" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">City</label>
                            <input type="text" value={form.city} onChange={e => update('city', e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">State</label>
                            <input type="text" value={form.state} onChange={e => update('state', e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Pincode</label>
                            <input type="text" value={form.pincode} onChange={e => update('pincode', e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                                placeholder="201310" />
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-xl p-6 space-y-4">
                    <h3 className="text-lg font-bold text-heading">Working Hours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Weekdays</label>
                            <input type="text" value={form.workingHoursWeekdays} onChange={e => update('workingHoursWeekdays', e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Saturday</label>
                            <input type="text" value={form.workingHoursSaturday} onChange={e => update('workingHoursSaturday', e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-heading mb-2">Sunday</label>
                            <input type="text" value={form.workingHoursSunday} onChange={e => update('workingHoursSunday', e.target.value)}
                                className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                    {saved && <span className="text-accent text-sm font-medium">Settings saved!</span>}
                </div>
            </div>
        </div>
    )
}
