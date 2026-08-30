'use client'

import { useState, useEffect } from 'react'
import {
    Inbox, Search, Filter, Trash2, Mail, Phone, Building2, Calendar,
    Clock, CheckCircle2, AlertCircle, RefreshCw, Download, ExternalLink,
    ChevronDown, UserCheck, MessageSquare, Copy, Check
} from 'lucide-react'
import { getLeadSubmissions, updateLeadStatus, deleteLeadSubmission, LeadSubmission } from '@/lib/firestore'

type StatusType = 'new' | 'contacted' | 'qualified' | 'closed'

const STATUS_CONFIG: Record<StatusType, { label: string; bg: string; text: string; border: string }> = {
    new: {
        label: 'New Inquiry',
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        text: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/30',
    },
    contacted: {
        label: 'Contacted',
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        border: 'border-blue-500/30',
    },
    qualified: {
        label: 'Qualified',
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/30',
    },
    closed: {
        label: 'Closed / Archived',
        bg: 'bg-gray-500/10 dark:bg-gray-500/20',
        text: 'text-gray-600 dark:text-gray-400',
        border: 'border-gray-500/30',
    },
}

export default function LeadsManager() {
    const [leads, setLeads] = useState<LeadSubmission[]>([])
    const [loading, setLoading] = useState(true)
    const [filterStatus, setFilterStatus] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedLead, setSelectedLead] = useState<LeadSubmission | null>(null)
    const [updatingId, setUpdatingId] = useState<string | null>(null)
    const [copiedField, setCopiedField] = useState<string | null>(null)
    const [notesDraft, setNotesDraft] = useState<Record<string, string>>({})

    const loadLeads = async () => {
        setLoading(true)
        try {
            const data = await getLeadSubmissions()
            setLeads(data)
        } catch (err) {
            console.error('Failed to load lead submissions:', err)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadLeads()
    }, [])

    const handleStatusChange = async (id: string, newStatus: StatusType) => {
        setUpdatingId(id)
        try {
            await updateLeadStatus(id, newStatus, notesDraft[id])
            setLeads(prev =>
                prev.map(item => item.id === id ? { ...item, status: newStatus, notes: notesDraft[id] ?? item.notes } : item)
            )
            if (selectedLead?.id === id) {
                setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null)
            }
        } catch (err) {
            console.error('Failed to update lead status:', err)
            alert('Failed to update status.')
        }
        setUpdatingId(null)
    }

    const handleNotesSave = async (id: string) => {
        setUpdatingId(id)
        try {
            const currentStatus = (leads.find(l => l.id === id)?.status || 'new') as StatusType
            await updateLeadStatus(id, currentStatus, notesDraft[id])
            setLeads(prev =>
                prev.map(item => item.id === id ? { ...item, notes: notesDraft[id] } : item)
            )
            alert('Notes saved successfully!')
        } catch (err) {
            console.error('Failed to save notes:', err)
            alert('Failed to save notes.')
        }
        setUpdatingId(null)
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete the briefing from "${name}"? This action cannot be undone.`)) {
            return
        }
        try {
            await deleteLeadSubmission(id)
            setLeads(prev => prev.filter(item => item.id !== id))
            if (selectedLead?.id === id) setSelectedLead(null)
        } catch (err) {
            console.error('Failed to delete lead:', err)
            alert('Failed to delete lead.')
        }
    }

    const copyToClipboard = (text: string, fieldId: string) => {
        navigator.clipboard.writeText(text)
        setCopiedField(fieldId)
        setTimeout(() => setCopiedField(null), 2000)
    }

    const exportToCSV = () => {
        if (leads.length === 0) return
        const headers = ['Date', 'Name', 'Organization', 'Email', 'Phone', 'Service / Offering', 'Timeline', 'Scope', 'Status', 'Notes']
        const rows = leads.map(l => [
            l.createdAt?.toDate ? l.createdAt.toDate().toISOString() : '',
            `"${(l.name || '').replace(/"/g, '""')}"`,
            `"${(l.organization || '').replace(/"/g, '""')}"`,
            `"${(l.email || '').replace(/"/g, '""')}"`,
            `"${(l.phone || '').replace(/"/g, '""')}"`,
            `"${(l.service || '').replace(/"/g, '""')}"`,
            `"${(l.timeline || '').replace(/"/g, '""')}"`,
            `"${(l.scope || '').replace(/"/g, '""')}"`,
            l.status || 'new',
            `"${(l.notes || '').replace(/"/g, '""')}"`,
        ])
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
        const encodedUri = encodeURI(csvContent)
        const link = document.createElement('a')
        link.setAttribute('href', encodedUri)
        link.setAttribute('download', `deeplink_inquiries_${new Date().toISOString().slice(0, 10)}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // Filter & search logic
    const filteredLeads = leads.filter(lead => {
        const matchesStatus = filterStatus === 'all' || (lead.status || 'new') === filterStatus
        const q = searchQuery.toLowerCase()
        const matchesSearch =
            !searchQuery ||
            lead.name?.toLowerCase().includes(q) ||
            lead.organization?.toLowerCase().includes(q) ||
            lead.email?.toLowerCase().includes(q) ||
            lead.phone?.toLowerCase().includes(q) ||
            lead.service?.toLowerCase().includes(q) ||
            lead.scope?.toLowerCase().includes(q)
        return matchesStatus && matchesSearch
    })

    const stats = {
        total: leads.length,
        new: leads.filter(l => (l.status || 'new') === 'new').length,
        contacted: leads.filter(l => l.status === 'contacted').length,
        qualified: leads.filter(l => l.status === 'qualified').length,
        closed: leads.filter(l => l.status === 'closed').length,
    }

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'Recent'
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp)
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="space-y-6">
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white flex items-center gap-2.5">
                        <Inbox className="text-primary-500" size={24} />
                        <span>Inquiries &amp; Enterprise Briefings</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-white/50 mt-1">
                        Real-time lead submissions captured from the website contact forms.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        onClick={loadLeads}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.1] text-xs font-medium text-gray-700 dark:text-white/80 hover:bg-gray-50 dark:hover:bg-white/[0.1] transition-colors"
                        title="Refresh submissions"
                    >
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        <span>Refresh</span>
                    </button>
                    <button
                        onClick={exportToCSV}
                        disabled={leads.length === 0}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary-500/10 text-primary-500 dark:text-primary-400 border border-primary-500/20 text-xs font-medium hover:bg-primary-500/20 transition-colors disabled:opacity-50"
                    >
                        <Download size={14} />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div
                    onClick={() => setFilterStatus('all')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        filterStatus === 'all'
                            ? 'bg-primary-500/10 border-primary-500/30'
                            : 'bg-white dark:bg-[#1A1B1C] border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.2]'
                    }`}
                >
                    <span className="text-xs text-gray-500 dark:text-white/50 block mb-1">Total Inquiries</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</span>
                </div>

                <div
                    onClick={() => setFilterStatus('new')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        filterStatus === 'new'
                            ? 'bg-emerald-500/10 border-emerald-500/30'
                            : 'bg-white dark:bg-[#1A1B1C] border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.2]'
                    }`}
                >
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 block mb-1 font-medium">New / Unread</span>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.new}</span>
                </div>

                <div
                    onClick={() => setFilterStatus('contacted')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        filterStatus === 'contacted'
                            ? 'bg-blue-500/10 border-blue-500/30'
                            : 'bg-white dark:bg-[#1A1B1C] border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.2]'
                    }`}
                >
                    <span className="text-xs text-blue-600 dark:text-blue-400 block mb-1 font-medium">In Discussion</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.contacted}</span>
                </div>

                <div
                    onClick={() => setFilterStatus('qualified')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        filterStatus === 'qualified'
                            ? 'bg-amber-500/10 border-amber-500/30'
                            : 'bg-white dark:bg-[#1A1B1C] border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.2]'
                    }`}
                >
                    <span className="text-xs text-amber-600 dark:text-amber-400 block mb-1 font-medium">Qualified</span>
                    <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.qualified}</span>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08]">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name, company, email, phone, or scope..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-lg text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter size={15} className="text-gray-400 dark:text-white/40 hidden sm:block" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-lg text-xs font-medium text-gray-700 dark:text-white/80 focus:outline-none"
                    >
                        <option value="all">All Statuses ({leads.length})</option>
                        <option value="new">New ({stats.new})</option>
                        <option value="contacted">Contacted ({stats.contacted})</option>
                        <option value="qualified">Qualified ({stats.qualified})</option>
                        <option value="closed">Closed ({stats.closed})</option>
                    </select>
                </div>
            </div>

            {/* Inquiries List & Detail Split View */}
            {loading ? (
                <div className="p-12 text-center rounded-xl bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08]">
                    <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-xs font-mono text-gray-500 dark:text-white/50">Fetching lead database...</p>
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="p-12 text-center rounded-xl bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/[0.05] flex items-center justify-center mx-auto text-gray-400 dark:text-white/30">
                        <Inbox size={24} />
                    </div>
                    <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                        No Inquiries Found
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-white/50 max-w-sm mx-auto">
                        {searchQuery || filterStatus !== 'all'
                            ? 'No inquiries match your filter criteria. Try resetting filters.'
                            : 'Form submissions from /contact and other pages will automatically appear here.'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Submissions Table / Cards (lg:col-span-7) */}
                    <div className="lg:col-span-7 space-y-3">
                        {filteredLeads.map((lead) => {
                            const status = (lead.status || 'new') as StatusType
                            const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.new
                            const isSelected = selectedLead?.id === lead.id

                            return (
                                <div
                                    key={lead.id}
                                    onClick={() => setSelectedLead(lead)}
                                    className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                                        isSelected
                                            ? 'bg-primary-500/10 border-primary-500/40 shadow-sm'
                                            : 'bg-white dark:bg-[#1A1B1C] border-gray-200 dark:border-white/[0.08] hover:border-gray-300 dark:hover:border-white/[0.2]'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-3 mb-2.5">
                                        <div>
                                            <h3 className="text-sm sm:text-base font-bold font-heading text-gray-900 dark:text-white flex items-center gap-2">
                                                <span>{lead.name}</span>
                                                {lead.organization && (
                                                    <span className="text-xs font-normal text-gray-500 dark:text-white/60">
                                                        ({lead.organization})
                                                    </span>
                                                )}
                                            </h3>
                                            <span className="text-[11px] font-mono text-gray-400 dark:text-white/40 block mt-0.5">
                                                {formatDate(lead.createdAt)}
                                            </span>
                                        </div>

                                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.text} ${cfg.border} flex-shrink-0`}>
                                            {cfg.label}
                                        </span>
                                    </div>

                                    {/* Contact & Service Row */}
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-white/70 pt-1">
                                        <div className="flex items-center gap-1.5">
                                            <Mail size={13} className="text-primary-500 flex-shrink-0" />
                                            <span>{lead.email}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Phone size={13} className="text-primary-500 flex-shrink-0" />
                                            <span>{lead.phone}</span>
                                        </div>
                                        {lead.service && (
                                            <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-white/[0.05] text-[11px] font-mono text-gray-700 dark:text-white/80">
                                                {lead.service}
                                            </span>
                                        )}
                                    </div>

                                    {/* Scope Excerpt */}
                                    {lead.scope && (
                                        <p className="text-xs text-gray-500 dark:text-white/50 mt-2.5 line-clamp-2 leading-relaxed bg-gray-50 dark:bg-white/[0.02] p-2.5 rounded-lg border border-gray-100 dark:border-white/[0.04]">
                                            &ldquo;{lead.scope}&rdquo;
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Right: Selected Lead Detailed Inspector (lg:col-span-5) */}
                    <div className="lg:col-span-5">
                        {selectedLead ? (
                            <div className="sticky top-24 rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#1A1B1C] p-5 sm:p-6 space-y-5 shadow-lg">
                                <div className="flex items-start justify-between gap-3 pb-4 border-b border-gray-200 dark:border-white/[0.08]">
                                    <div>
                                        <span className="text-[10px] font-mono text-primary-500 uppercase tracking-widest block mb-1">
                                            BRIEFING INSPECTOR
                                        </span>
                                        <h3 className="text-lg font-bold font-heading text-gray-900 dark:text-white">
                                            {selectedLead.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-white/50 mt-0.5">
                                            {selectedLead.organization || 'Individual Principal'}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(selectedLead.id!, selectedLead.name)}
                                        className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                                        title="Delete briefing"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {/* Status Switcher */}
                                <div>
                                    <label className="block text-xs font-mono font-medium text-gray-500 dark:text-white/60 mb-2 uppercase">
                                        Pipeline Status
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(['new', 'contacted', 'qualified', 'closed'] as StatusType[]).map((st) => {
                                            const cfg = STATUS_CONFIG[st]
                                            const isActive = (selectedLead.status || 'new') === st
                                            return (
                                                <button
                                                    key={st}
                                                    disabled={updatingId === selectedLead.id}
                                                    onClick={() => handleStatusChange(selectedLead.id!, st)}
                                                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all border text-center ${
                                                        isActive
                                                            ? `${cfg.bg} ${cfg.text} ${cfg.border} shadow-sm`
                                                            : 'bg-gray-50 dark:bg-white/[0.03] text-gray-600 dark:text-white/50 border-gray-200 dark:border-white/[0.06] hover:text-gray-900 dark:hover:text-white'
                                                    }`}
                                                >
                                                    {cfg.label}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Contact Coordinates */}
                                <div className="space-y-2.5 p-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-xs">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 dark:text-white/50 font-mono">Email:</span>
                                        <div className="flex items-center gap-2">
                                            <a href={`mailto:${selectedLead.email}`} className="text-primary-500 font-mono hover:underline">
                                                {selectedLead.email}
                                            </a>
                                            <button
                                                onClick={() => copyToClipboard(selectedLead.email, 'email')}
                                                className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-0.5"
                                                title="Copy email"
                                            >
                                                {copiedField === 'email' ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 dark:text-white/50 font-mono">Phone:</span>
                                        <div className="flex items-center gap-2">
                                            <a href={`tel:${selectedLead.phone}`} className="text-primary-500 font-mono hover:underline">
                                                {selectedLead.phone}
                                            </a>
                                            <button
                                                onClick={() => copyToClipboard(selectedLead.phone, 'phone')}
                                                className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-0.5"
                                                title="Copy phone"
                                            >
                                                {copiedField === 'phone' ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                                            </button>
                                        </div>
                                    </div>

                                    {selectedLead.service && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500 dark:text-white/50 font-mono">Service:</span>
                                            <span className="font-semibold text-gray-800 dark:text-white/90">{selectedLead.service}</span>
                                        </div>
                                    )}

                                    {selectedLead.timeline && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500 dark:text-white/50 font-mono">Timeline:</span>
                                            <span className="font-semibold text-gray-800 dark:text-white/90">{selectedLead.timeline}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500 dark:text-white/50 font-mono">Received:</span>
                                        <span className="text-gray-600 dark:text-white/70">{formatDate(selectedLead.createdAt)}</span>
                                    </div>
                                </div>

                                {/* Full Project Scope */}
                                <div>
                                    <label className="block text-xs font-mono font-medium text-gray-500 dark:text-white/60 mb-1.5 uppercase">
                                        Operational Context / Scope
                                    </label>
                                    <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-xs text-gray-700 dark:text-white/80 leading-relaxed max-h-48 overflow-y-auto">
                                        {selectedLead.scope || 'No specific scope notes provided.'}
                                    </div>
                                </div>

                                {/* Internal Notes */}
                                <div>
                                    <label className="block text-xs font-mono font-medium text-gray-500 dark:text-white/60 mb-1.5 uppercase">
                                        Internal Notes / Next Steps
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={notesDraft[selectedLead.id!] !== undefined ? notesDraft[selectedLead.id!] : (selectedLead.notes || '')}
                                        onChange={(e) => setNotesDraft({ ...notesDraft, [selectedLead.id!]: e.target.value })}
                                        placeholder="Add internal remarks, meeting notes, or qualification details..."
                                        className="w-full p-3 bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] rounded-xl text-xs text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary-500"
                                    />
                                    <button
                                        onClick={() => handleNotesSave(selectedLead.id!)}
                                        disabled={updatingId === selectedLead.id}
                                        className="mt-2 w-full py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-heading font-semibold text-xs transition-colors hover:bg-gray-800 dark:hover:bg-white/90"
                                    >
                                        Save Internal Notes
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 text-center rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#1A1B1C] text-gray-400 dark:text-white/40">
                                <UserCheck size={32} className="mx-auto mb-2 opacity-50" />
                                <p className="text-xs font-mono">Select an inquiry on the left to inspect details.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
