'use client'

import { useState, useEffect } from 'react'
import {
    Inbox, Search, Filter, Trash2, Mail, Phone, Building2, Calendar,
    Clock, CheckCircle2, AlertCircle, RefreshCw, Download, ExternalLink,
    ChevronDown, UserCheck, MessageSquare, Copy, Check, X
} from 'lucide-react'
import { getLeadSubmissions, updateLeadStatus, deleteLeadSubmission, LeadSubmission } from '@/lib/db-client'

type StatusType = 'new' | 'contacted' | 'qualified' | 'closed'

const STATUS_CONFIG: Record<StatusType, { label: string; bg: string; text: string; border: string }> = {
    new: {
        label: 'New Briefing',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
    },
    contacted: {
        label: 'Contacted',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
    },
    qualified: {
        label: 'Qualified',
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
    },
    closed: {
        label: 'Closed / Archived',
        bg: 'bg-gray-100',
        text: 'text-gray-700',
        border: 'border-gray-300',
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
            formatDate(l.createdAt),
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
        try {
            const date = timestamp?.toDate ? timestamp.toDate() : new Date(timestamp?.seconds ? timestamp.seconds * 1000 : timestamp)
            if (isNaN(date.getTime())) return 'Recent'
            return date.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        } catch {
            return 'Recent'
        }
    }

    return (
        <div className="space-y-6 max-w-6xl">
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-[#181A16] flex items-center gap-2.5">
                        <Inbox className="text-[#9B7545]" size={24} />
                        <span>Inquiries &amp; Enterprise Briefings</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B685F] mt-1">
                        Real-time lead submissions captured from the website contact forms.
                    </p>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        onClick={loadLeads}
                        disabled={loading}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E5E0D8] text-xs font-medium text-[#181A16] hover:bg-[#F3F0E8] transition-colors shadow-xs"
                        title="Refresh submissions"
                    >
                        <RefreshCw size={13} className={loading ? 'animate-spin text-[#9B7545]' : 'text-[#8C887B]'} />
                        <span>Refresh</span>
                    </button>
                    <button
                        onClick={exportToCSV}
                        disabled={leads.length === 0}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9B7545] text-white text-xs font-medium hover:bg-[#86643B] transition-colors shadow-xs disabled:opacity-50"
                    >
                        <Download size={13} />
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
                            ? 'bg-[#9B7545]/10 border-[#9B7545]/40 shadow-xs'
                            : 'bg-white border-[#E5E0D8] hover:border-[#9B7545]/30'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#8C887B] uppercase tracking-wider">ALL BRIEFS</span>
                        <Inbox size={14} className="text-[#8C887B]" />
                    </div>
                    <p className="text-2xl font-bold text-[#181A16] mt-2 font-heading">{stats.total}</p>
                </div>

                <div
                    onClick={() => setFilterStatus('new')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        filterStatus === 'new'
                            ? 'bg-emerald-50 border-emerald-300 shadow-xs'
                            : 'bg-white border-[#E5E0D8] hover:border-emerald-200'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider">NEW</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <p className="text-2xl font-bold text-emerald-700 mt-2 font-heading">{stats.new}</p>
                </div>

                <div
                    onClick={() => setFilterStatus('contacted')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        filterStatus === 'contacted'
                            ? 'bg-blue-50 border-blue-300 shadow-xs'
                            : 'bg-white border-[#E5E0D8] hover:border-blue-200'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-blue-700 uppercase tracking-wider">CONTACTED</span>
                        <Clock size={14} className="text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-700 mt-2 font-heading">{stats.contacted}</p>
                </div>

                <div
                    onClick={() => setFilterStatus('qualified')}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        filterStatus === 'qualified'
                            ? 'bg-amber-50 border-amber-300 shadow-xs'
                            : 'bg-white border-[#E5E0D8] hover:border-amber-200'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-amber-700 uppercase tracking-wider">QUALIFIED</span>
                        <CheckCircle2 size={14} className="text-amber-600" />
                    </div>
                    <p className="text-2xl font-bold text-amber-700 mt-2 font-heading">{stats.qualified}</p>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-white border border-[#E5E0D8] rounded-xl p-3 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
                <div className="relative w-full sm:w-80">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C887B]" />
                    <input
                        type="text"
                        placeholder="Search name, org, email, service..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#FDFBF7] border border-[#E5E0D8] rounded-lg text-xs text-[#181A16] placeholder-[#8C887B] focus:outline-none focus:border-[#9B7545] focus:ring-1 focus:ring-[#9B7545]"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1 text-xs text-[#8C887B] font-mono">
                        <Filter size={13} />
                        <span>Filter:</span>
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-1.5 bg-[#FDFBF7] border border-[#E5E0D8] rounded-lg text-xs text-[#181A16] focus:outline-none focus:border-[#9B7545]"
                    >
                        <option value="all">All Inquiries ({stats.total})</option>
                        <option value="new">New ({stats.new})</option>
                        <option value="contacted">Contacted ({stats.contacted})</option>
                        <option value="qualified">Qualified ({stats.qualified})</option>
                        <option value="closed">Closed / Archived ({stats.closed})</option>
                    </select>
                </div>
            </div>

            {/* Leads Table / List */}
            {loading ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E5E0D8] shadow-xs">
                    <RefreshCw size={24} className="animate-spin text-[#9B7545] mx-auto mb-3" />
                    <p className="text-xs text-[#6B685F]">Loading incoming briefs...</p>
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-[#E5E0D8] shadow-xs">
                    <Inbox size={32} className="text-[#8C887B] mx-auto mb-3 opacity-40" />
                    <h3 className="text-sm font-bold text-[#181A16] mb-1">No Inquiries Found</h3>
                    <p className="text-xs text-[#6B685F] max-w-sm mx-auto">
                        {searchQuery || filterStatus !== 'all'
                            ? 'No inquiries match your current search or filter criteria.'
                            : 'No incoming enterprise form submissions recorded yet.'}
                    </p>
                </div>
            ) : (
                <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#E5E0D8] bg-[#FDFBF7] text-[11px] font-mono text-[#8C887B] uppercase tracking-wider">
                                    <th className="py-3 px-4">Contact &amp; Org</th>
                                    <th className="py-3 px-4">Offering / Scope</th>
                                    <th className="py-3 px-4">Timeline</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E5E0D8] text-xs">
                                {filteredLeads.map((lead) => {
                                    const statusConfig = STATUS_CONFIG[(lead.status || 'new') as StatusType] || STATUS_CONFIG.new
                                    return (
                                        <tr
                                            key={lead.id}
                                            className="hover:bg-[#FDFBF7]/80 transition-colors"
                                        >
                                            {/* Contact & Org */}
                                            <td className="py-4 px-4">
                                                <div className="space-y-0.5">
                                                    <div className="font-semibold text-[#181A16] text-sm">
                                                        {lead.name}
                                                    </div>
                                                    {lead.organization && (
                                                        <div className="flex items-center gap-1.5 text-[#6B685F]">
                                                            <Building2 size={11} className="text-[#8C887B]" />
                                                            <span>{lead.organization}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-2 pt-1">
                                                        <a
                                                            href={`mailto:${lead.email}`}
                                                            className="text-[11px] text-[#9B7545] hover:underline flex items-center gap-1"
                                                        >
                                                            <Mail size={10} />
                                                            <span>{lead.email}</span>
                                                        </a>
                                                        {lead.phone && (
                                                            <>
                                                                <span className="text-[#8C887B]">•</span>
                                                                <a
                                                                    href={`tel:${lead.phone}`}
                                                                    className="text-[11px] text-[#6B685F] hover:underline flex items-center gap-1"
                                                                >
                                                                    <Phone size={10} />
                                                                    <span>{lead.phone}</span>
                                                                </a>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Service & Scope */}
                                            <td className="py-4 px-4 max-w-xs">
                                                <div className="font-medium text-[#181A16]">
                                                    {lead.service || 'General Briefing'}
                                                </div>
                                                {lead.scope && (
                                                    <p className="text-[11px] text-[#6B685F] line-clamp-2 mt-0.5">
                                                        {lead.scope}
                                                    </p>
                                                )}
                                            </td>

                                            {/* Timeline */}
                                            <td className="py-4 px-4 text-[#6B685F] font-mono text-[11px]">
                                                {lead.timeline || 'Immediate'}
                                            </td>

                                            {/* Date */}
                                            <td className="py-4 px-4 text-[#8C887B] font-mono text-[11px] whitespace-nowrap">
                                                {formatDate(lead.createdAt)}
                                            </td>

                                            {/* Status Dropdown */}
                                            <td className="py-4 px-4">
                                                <select
                                                    value={lead.status || 'new'}
                                                    onChange={(e) => handleStatusChange(lead.id!, e.target.value as StatusType)}
                                                    disabled={updatingId === lead.id}
                                                    className={`text-[11px] font-mono font-semibold py-1 px-2.5 rounded-full border cursor-pointer focus:outline-none transition-colors ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                                                >
                                                    <option value="new">New</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="qualified">Qualified</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => setSelectedLead(lead)}
                                                        className="p-1.5 text-[#6B685F] hover:text-[#181A16] hover:bg-[#F3F0E8] rounded-lg transition-colors"
                                                        title="View Details"
                                                    >
                                                        <MessageSquare size={15} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(lead.id!, lead.name)}
                                                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                                                        title="Delete Lead"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Lead Detail Modal */}
            {selectedLead && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                    <div className="bg-white border border-[#E5E0D8] rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-6">
                        <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
                            <div>
                                <h3 className="text-lg font-bold font-heading text-[#181A16]">
                                    Briefing Details
                                </h3>
                                <p className="text-xs text-[#8C887B] font-mono">
                                    Received: {formatDate(selectedLead.createdAt)}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="p-1 text-[#8C887B] hover:text-[#181A16] rounded-lg hover:bg-[#F3F0E8]"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E5E0D8]">
                                <span className="text-[10px] font-mono text-[#8C887B] uppercase block mb-1">Client Name</span>
                                <p className="text-sm font-semibold text-[#181A16]">{selectedLead.name}</p>
                            </div>
                            <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E5E0D8]">
                                <span className="text-[10px] font-mono text-[#8C887B] uppercase block mb-1">Organization</span>
                                <p className="text-sm font-semibold text-[#181A16]">{selectedLead.organization || 'Not Specified'}</p>
                            </div>
                            <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E5E0D8]">
                                <span className="text-[10px] font-mono text-[#8C887B] uppercase block mb-1">Email Address</span>
                                <div className="flex items-center justify-between">
                                    <a href={`mailto:${selectedLead.email}`} className="text-xs font-mono text-[#9B7545] hover:underline">
                                        {selectedLead.email}
                                    </a>
                                    <button
                                        onClick={() => copyToClipboard(selectedLead.email, 'email')}
                                        className="text-[#8C887B] hover:text-[#181A16]"
                                    >
                                        {copiedField === 'email' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                                    </button>
                                </div>
                            </div>
                            <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E5E0D8]">
                                <span className="text-[10px] font-mono text-[#8C887B] uppercase block mb-1">Phone Contact</span>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-mono text-[#181A16]">{selectedLead.phone || 'N/A'}</span>
                                    {selectedLead.phone && (
                                        <button
                                            onClick={() => selectedLead.phone && copyToClipboard(selectedLead.phone, 'phone')}
                                            className="text-[#8C887B] hover:text-[#181A16]"
                                        >
                                            {copiedField === 'phone' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#E5E0D8] space-y-2">
                            <span className="text-[10px] font-mono text-[#8C887B] uppercase block">Engagement Scope &amp; Notes</span>
                            <p className="text-xs text-[#181A16] leading-relaxed whitespace-pre-wrap">
                                {selectedLead.scope || 'No project description provided.'}
                            </p>
                        </div>

                        {/* Internal Team Notes */}
                        <div className="space-y-2">
                            <label className="text-xs font-mono font-medium text-[#6B685F] uppercase block">
                                Internal Notes &amp; Follow-up
                            </label>
                            <textarea
                                rows={3}
                                value={notesDraft[selectedLead.id!] ?? (selectedLead.notes || '')}
                                onChange={(e) => setNotesDraft({ ...notesDraft, [selectedLead.id!]: e.target.value })}
                                placeholder="Add team notes on lead progress, calls scheduled, etc..."
                                className="w-full p-3 bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl text-xs text-[#181A16] placeholder-[#8C887B] focus:outline-none focus:border-[#9B7545]"
                            />
                            <button
                                onClick={() => handleNotesSave(selectedLead.id!)}
                                className="px-4 py-2 bg-[#9B7545] text-white text-xs font-medium rounded-xl hover:bg-[#86643B] transition-colors"
                            >
                                Save Notes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
