'use client'

import { useState, useEffect } from 'react'
import AdminAuth from '@/components/admin/AdminAuth'
import LeadsManager from '@/components/admin/LeadsManager'
import BlogManager from '@/components/admin/BlogManager'
import ContactManager from '@/components/admin/ContactManager'
import SocialManager from '@/components/admin/SocialManager'
import SEOManager from '@/components/admin/SEOManager'
import ServicesManager from '@/components/admin/ServicesManager'
import TestimonialsManager from '@/components/admin/TestimonialsManager'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'
import { clearAdminSession } from '@/lib/admin-auth'
import { getAllBlogs, getLeadSubmissions, LeadSubmission } from '@/lib/db-client'
import {
    LayoutDashboard, Inbox, FileText, Phone, Share2, Search, LogOut, Menu, X, BarChart3, Layers, MessageSquare, ArrowRight, ExternalLink, ShieldCheck
} from 'lucide-react'

const tabs = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Inquiries & Leads', icon: Inbox, isLeadTab: true },
    { id: 'analytics', label: 'Telemetry & Traffic', icon: BarChart3 },
    { id: 'blogs', label: 'Technical Briefings', icon: FileText },
    { id: 'services', label: 'Services Catalog', icon: Layers },
    { id: 'testimonials', label: 'Client Proof', icon: MessageSquare },
    { id: 'contact', label: 'Contact Coordinates', icon: Phone },
    { id: 'social', label: 'Social Ecosystem', icon: Share2 },
    { id: 'seo', label: 'SEO & Graph', icon: Search },
]

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [stats, setStats] = useState({ totalBlogs: 0, publishedBlogs: 0, drafts: 0, totalLeads: 0, newLeads: 0 })
    const [recentLeads, setRecentLeads] = useState<LeadSubmission[]>([])

    const loadStats = async () => {
        try {
            const [blogs, leads] = await Promise.all([
                getAllBlogs().catch(() => []),
                getLeadSubmissions().catch(() => []),
            ])

            setStats({
                totalBlogs: blogs.length,
                publishedBlogs: blogs.filter(b => b.published).length,
                drafts: blogs.filter(b => !b.published).length,
                totalLeads: leads.length,
                newLeads: leads.filter(l => (l.status || 'new') === 'new').length,
            })
            setRecentLeads(leads.slice(0, 5))
        } catch (e) {
            console.error('Error loading dashboard stats:', e)
        }
    }

    useEffect(() => {
        loadStats()
    }, [activeTab])

    const handleLogout = () => {
        clearAdminSession()
        window.location.reload()
    }

    return (
        <AdminAuth>
            <div className="min-h-screen bg-[#FDFBF7] text-[#181A16] font-sans antialiased">
                {/* Mobile Top Header */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#E5E0D8] bg-white sticky top-0 z-50">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#F3F0E8] border border-[#E5E0D8] flex items-center justify-center text-[#9B7545] font-serif font-bold text-base">
                            D
                        </div>
                        <span className="font-heading font-bold text-base text-[#181A16]">Deeplink Admin</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 text-[#181A16] hover:bg-[#F3F0E8] rounded-lg transition-colors"
                        aria-label="Toggle navigation menu"
                    >
                        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                <div className="flex min-h-screen">
                    {/* Desktop & Mobile Sidebar */}
                    <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out fixed lg:sticky top-0 left-0 z-40 w-64 h-screen flex-shrink-0 bg-white border-r border-[#E5E0D8] flex flex-col justify-between`}>
                        <div>
                            {/* Brand Header */}
                            <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-md bg-[#9B7545] text-white flex items-center justify-center font-serif font-bold text-sm shadow-sm">
                                            D
                                        </div>
                                        <h1 className="text-lg font-bold font-heading text-[#181A16] tracking-tight">
                                            Deeplink <span className="text-[#9B7545]">Admin</span>
                                        </h1>
                                    </div>
                                    <p className="text-[11px] mt-1 text-[#8C887B] font-mono">deeplinkcreators.com</p>
                                </div>
                                <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#9B7545]/10 text-[#9B7545] text-[10px] font-mono font-medium">
                                    <ShieldCheck size={11} />
                                    <span>Auth</span>
                                </div>
                            </div>

                            {/* Nav Tabs */}
                            <nav className="p-3.5 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
                                {tabs.map(tab => {
                                    const isActive = activeTab === tab.id
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => { setActiveTab(tab.id); setSidebarOpen(false) }}
                                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                                                isActive
                                                    ? 'bg-[#9B7545]/10 text-[#9B7545] font-semibold border border-[#9B7545]/20 shadow-xs'
                                                    : 'text-[#6B685F] hover:text-[#181A16] hover:bg-[#F3F0E8]/70'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <tab.icon size={16} className={isActive ? 'text-[#9B7545]' : 'text-[#8C887B]'} />
                                                <span>{tab.label}</span>
                                            </div>
                                            {tab.isLeadTab && stats.newLeads > 0 && (
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-600 text-white">
                                                    {stats.newLeads}
                                                </span>
                                            )}
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>

                        {/* Bottom Actions */}
                        <div className="p-4 border-t border-[#E5E0D8] bg-[#FDFBF7]/50 space-y-2">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-medium text-[#6B685F] hover:text-[#181A16] hover:bg-[#F3F0E8] transition-colors"
                            >
                                <span className="flex items-center gap-2">
                                    <ExternalLink size={14} className="text-[#8C887B]" />
                                    <span>View Live Website</span>
                                </span>
                                <span className="text-[10px] font-mono text-[#8C887B]">↗</span>
                            </a>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                                <LogOut size={14} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Workspace Area */}
                    <main className="flex-1 min-h-screen p-6 lg:p-10 overflow-x-hidden">
                        {activeTab === 'dashboard' && (
                            <div className="space-y-8 max-w-6xl">
                                <div>
                                    <h2 className="text-2xl font-bold font-heading text-[#181A16] tracking-tight">
                                        Executive Command Center
                                    </h2>
                                    <p className="text-xs sm:text-sm text-[#6B685F] mt-1">
                                        Operational summary of incoming briefs, content pipeline, and platform telemetry.
                                    </p>
                                </div>

                                {/* Top KPI Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                                    <div
                                        onClick={() => setActiveTab('leads')}
                                        className="rounded-2xl p-5 bg-white border border-[#E5E0D8] shadow-xs hover:border-[#9B7545]/50 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-mono text-[#8C887B] uppercase tracking-wider">
                                                TOTAL INQUIRIES
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                                                <Inbox size={16} />
                                            </div>
                                        </div>
                                        <div className="flex items-baseline justify-between">
                                            <p className="text-3xl font-extrabold text-[#181A16] font-heading">
                                                {stats.totalLeads}
                                            </p>
                                            {stats.newLeads > 0 && (
                                                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200">
                                                    +{stats.newLeads} new
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setActiveTab('blogs')}
                                        className="rounded-2xl p-5 bg-white border border-[#E5E0D8] shadow-xs hover:border-[#9B7545]/50 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-mono text-[#8C887B] uppercase tracking-wider">
                                                PUBLISHED BRIEFS
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                                                <FileText size={16} />
                                            </div>
                                        </div>
                                        <p className="text-3xl font-extrabold text-[#181A16] font-heading">
                                            {stats.publishedBlogs}
                                        </p>
                                    </div>

                                    <div
                                        onClick={() => setActiveTab('blogs')}
                                        className="rounded-2xl p-5 bg-white border border-[#E5E0D8] shadow-xs hover:border-[#9B7545]/50 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-mono text-[#8C887B] uppercase tracking-wider">
                                                DRAFTS PIPELINE
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                                                <Layers size={16} />
                                            </div>
                                        </div>
                                        <p className="text-3xl font-extrabold text-[#181A16] font-heading">
                                            {stats.drafts}
                                        </p>
                                    </div>

                                    <div
                                        onClick={() => setActiveTab('analytics')}
                                        className="rounded-2xl p-5 bg-white border border-[#E5E0D8] shadow-xs hover:border-[#9B7545]/50 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-mono text-[#8C887B] uppercase tracking-wider">
                                                TELEMETRY
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-[#9B7545]/10 text-[#9B7545] flex items-center justify-center border border-[#9B7545]/20">
                                                <BarChart3 size={16} />
                                            </div>
                                        </div>
                                        <span className="text-xs font-mono font-semibold text-[#9B7545] flex items-center gap-1 mt-2">
                                            <span>Active Engine</span>
                                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>

                                {/* Recent Inquiries Snapshot */}
                                <div className="rounded-2xl p-6 bg-white border border-[#E5E0D8] shadow-xs space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-bold font-heading text-[#181A16]">
                                                Recent Inquiries &amp; Briefings
                                            </h3>
                                            <p className="text-xs text-[#6B685F]">
                                                Latest enterprise form submissions from the website
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setActiveTab('leads')}
                                            className="text-xs font-mono font-semibold text-[#9B7545] hover:underline flex items-center gap-1"
                                        >
                                            <span>View All ({stats.totalLeads})</span>
                                            <ArrowRight size={13} />
                                        </button>
                                    </div>

                                    {recentLeads.length === 0 ? (
                                        <div className="p-8 text-center bg-[#FDFBF7] rounded-xl border border-[#E5E0D8]/60">
                                            <p className="text-xs text-[#6B685F]">
                                                No incoming briefings recorded yet. Test the contact form at <a href="/contact" target="_blank" className="text-[#9B7545] font-semibold underline">/contact</a>.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-[#E5E0D8]">
                                            {recentLeads.map((lead) => (
                                                <div
                                                    key={lead.id}
                                                    onClick={() => setActiveTab('leads')}
                                                    className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#FDFBF7] px-3 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <div className="space-y-0.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-semibold text-[#181A16]">
                                                                {lead.name}
                                                            </span>
                                                            {lead.organization && (
                                                                <span className="text-xs text-[#6B685F]">
                                                                    • {lead.organization}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-3 text-xs text-[#8C887B]">
                                                            <span>{lead.email}</span>
                                                            <span>•</span>
                                                            <span>{lead.service || 'Enterprise Briefing'}</span>
                                                        </div>
                                                    </div>

                                                    <span className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full font-semibold border ${
                                                        lead.status === 'contacted'
                                                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                                                            : lead.status === 'qualified'
                                                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                    }`}>
                                                        {lead.status || 'New'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Quick Shortcuts */}
                                <div className="rounded-2xl p-6 bg-white border border-[#E5E0D8] shadow-xs">
                                    <h3 className="text-base font-bold font-heading text-[#181A16] mb-4">
                                        Quick Navigation
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        <button
                                            onClick={() => setActiveTab('leads')}
                                            className="text-xs font-medium py-2 px-3.5 rounded-xl bg-[#9B7545]/10 text-[#9B7545] border border-[#9B7545]/20 hover:bg-[#9B7545]/20 transition-colors"
                                        >
                                            Inquiries &amp; Briefings
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('blogs')}
                                            className="text-xs font-medium py-2 px-3.5 rounded-xl bg-[#F3F0E8] border border-[#E5E0D8] text-[#181A16] hover:bg-[#EAE5DA] transition-colors"
                                        >
                                            Write Technical Briefing
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('analytics')}
                                            className="text-xs font-medium py-2 px-3.5 rounded-xl bg-[#F3F0E8] border border-[#E5E0D8] text-[#181A16] hover:bg-[#EAE5DA] transition-colors"
                                        >
                                            View Traffic Analytics
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('contact')}
                                            className="text-xs font-medium py-2 px-3.5 rounded-xl bg-[#F3F0E8] border border-[#E5E0D8] text-[#181A16] hover:bg-[#EAE5DA] transition-colors"
                                        >
                                            Update Contact Coordinates
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('seo')}
                                            className="text-xs font-medium py-2 px-3.5 rounded-xl bg-[#F3F0E8] border border-[#E5E0D8] text-[#181A16] hover:bg-[#EAE5DA] transition-colors"
                                        >
                                            SEO &amp; Meta Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'leads' && <LeadsManager />}
                        {activeTab === 'analytics' && <AnalyticsDashboard />}
                        {activeTab === 'blogs' && <BlogManager />}
                        {activeTab === 'services' && <ServicesManager />}
                        {activeTab === 'testimonials' && <TestimonialsManager />}
                        {activeTab === 'contact' && <ContactManager />}
                        {activeTab === 'social' && <SocialManager />}
                        {activeTab === 'seo' && <SEOManager />}
                    </main>
                </div>

                {/* Overlay for mobile sidebar */}
                {sidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black/30 z-30"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </div>
        </AdminAuth>
    )
}
