'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Phone, Check } from 'lucide-react'
import { getSiteSettings, saveSiteSettings, SiteSettings } from '@/lib/firestore'

export default function ContactManager() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [form, setForm] = useState<SiteSettings>({
        phone: '+91 99999 88888',
        email: 'kunal@deeplinkcreators.com',
        address: 'Mayalok Venture Studio, Knowledge Park III',
        city: 'Greater Noida',
        state: 'Uttar Pradesh',
        pincode: '201306',
        workingHoursWeekdays: '09:00 - 19:00 IST',
        workingHoursSaturday: '10:00 - 17:00 IST',
        workingHoursSunday: 'Closed',
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
            alert('Failed to save contact settings.')
        }
        setSaving(false)
    }

    const update = (key: keyof SiteSettings, value: string) => {
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
                        <Phone className="text-[#9B7545]" size={24} />
                        <span>Contact Coordinates</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B685F] mt-1">
                        Global headquarters address, support email, and operational timings.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9B7545] text-white text-xs font-semibold rounded-xl hover:bg-[#86643B] transition-colors shadow-xs"
                >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <Check size={14} /> : <Save size={14} />}
                    <span>{saved ? 'Saved Successfully' : 'Save Coordinates'}</span>
                </button>
            </div>

            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                <h3 className="text-sm font-bold font-heading text-[#181A16] uppercase tracking-wider border-b border-[#E5E0D8] pb-3">
                    Corporate Direct Lines
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Phone Number</label>
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={e => update('phone', e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            placeholder="+91 99999 88888"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Executive Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => update('email', e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            placeholder="kunal@deeplinkcreators.com"
                        />
                    </div>
                </div>

                <h3 className="text-sm font-bold font-heading text-[#181A16] uppercase tracking-wider border-b border-[#E5E0D8] pb-3 pt-2">
                    Physical Office Coordinates
                </h3>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Studio Address</label>
                        <input
                            type="text"
                            value={form.address}
                            onChange={e => update('address', e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                            placeholder="Mayalok Venture Studio, Knowledge Park III"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">City</label>
                            <input
                                type="text"
                                value={form.city}
                                onChange={e => update('city', e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                placeholder="Greater Noida"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">State</label>
                            <input
                                type="text"
                                value={form.state}
                                onChange={e => update('state', e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                placeholder="Uttar Pradesh"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Pincode</label>
                            <input
                                type="text"
                                value={form.pincode}
                                onChange={e => update('pincode', e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-sm text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                                placeholder="201306"
                            />
                        </div>
                    </div>
                </div>

                <h3 className="text-sm font-bold font-heading text-[#181A16] uppercase tracking-wider border-b border-[#E5E0D8] pb-3 pt-2">
                    Operating Hours
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Mon - Fri</label>
                        <input
                            type="text"
                            value={form.workingHoursWeekdays}
                            onChange={e => update('workingHoursWeekdays', e.target.value)}
                            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Saturday</label>
                        <input
                            type="text"
                            value={form.workingHoursSaturday}
                            onChange={e => update('workingHoursSaturday', e.target.value)}
                            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#6B685F] uppercase">Sunday</label>
                        <input
                            type="text"
                            value={form.workingHoursSunday}
                            onChange={e => update('workingHoursSunday', e.target.value)}
                            className="w-full px-3.5 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
