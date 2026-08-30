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
import { getAllBlogs, getLeadSubmissions, LeadSubmission } from '@/lib/firestore'
import {
    LayoutDashboard, Inbox, FileText, Phone, Share2, Search, LogOut, Menu, X, BarChart3, Layers, MessageSquare, Sun, Moon, ArrowRight, Clock, Mail
} from 'lucide-react'

const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Inquiries & Leads', icon: Inbox, isLeadTab: true },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'blogs', label: 'Blog Posts', icon: FileText },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact Settings', icon: Phone },
    { id: 'social', label: 'Social Links', icon: Share2 },
    { id: 'seo', label: 'SEO Settings', icon: Search },
]

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [stats, setStats] = useState({ totalBlogs: 0, publishedBlogs: 0, drafts: 0, totalLeads: 0, newLeads: 0 })
    const [recentLeads, setRecentLeads] = useState<LeadSubmission[]>([])
    const [adminDark, setAdminDark] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('admin-theme')
        if (stored === 'light') setAdminDark(false)
    }, [])

    useEffect(() => {
        const root = document.documentElement
        if (adminDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        return () => {
            const siteTheme = localStorage.getItem('theme')
            if (siteTheme === 'dark') {
                root.classList.add('dark')
            } else if (siteTheme === 'light') {
                root.classList.remove('dark')
            } else {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    root.classList.add('dark')
                } else {
                    root.classList.remove('dark')
                }
            }
        }
    }, [adminDark])

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

    const toggleAdminTheme = () => {
        const next = !adminDark
        setAdminDark(next)
        localStorage.setItem('admin-theme', next ? 'dark' : 'light')
    }

    const handleLogout = () => {
        clearAdminSession()
        window.location.reload()
    }

    return (
        <AdminAuth>
            <div className="min-h-screen bg-gray-50 dark:bg-[#0F1112] text-gray-600 dark:text-white/60 font-sans">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#131415]">
                    <h1 className="text-lg font-bold font-heading text-gray-900 dark:text-white">Admin Panel</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleAdminTheme}
                            className="flex items-center justify-center w-9 h-9 rounded-lg border transition-colors border-gray-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] hover:bg-gray-100 dark:hover:bg-white/[0.1] text-gray-700 dark:text-white"
                            aria-label="Toggle admin theme"
                        >
                            {adminDark ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-900 dark:text-white">
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <div className="flex">
                    {/* Sidebar */}
                    <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:sticky top-0 left-0 z-40 w-64 h-screen flex-shrink-0 bg-white dark:bg-[#131415] border-r border-gray-200 dark:border-white/[0.06]`}>
                        <div className="p-6 border-b border-gray-200 dark:border-white/[0.06] flex items-center justify-between">
                            <div>
                                <h1 className="text-xl font-bold font-heading">
                                    <span className="text-[#D4B270]">Deeplink</span>{' '}
                                    <span className="text-gray-900 dark:text-white">Admin</span>
                                </h1>
                                <p className="text-xs mt-0.5 text-gray-400 dark:text-white/50 font-mono">deeplinkcreators.com</p>
                            </div>
                            <button
                                onClick={toggleAdminTheme}
                                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg border transition-colors border-gray-200 dark:border-white/[0.1] bg-gray-50 dark:bg-white/[0.05] hover:bg-gray-100 dark:hover:bg-white/[0.1] text-gray-700 dark:text-white"
                                aria-label="Toggle admin theme"
                            >
                                {adminDark ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        </div>

                        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
                            {tabs.map(tab => {
                                const isActive = activeTab === tab.id
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => { setActiveTab(tab.id); setSidebarOpen(false) }}
                                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                                            isActive
                                                ? 'bg-[#B99152]/15 text-[#D4B270] font-semibold border border-[#B99152]/30 shadow-sm'
                                                : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.04]'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon size={17} className={isActive ? 'text-[#D4B270]' : ''} />
                                            <span>{tab.label}</span>
                                        </div>
                                        {tab.isLeadTab && stats.newLeads > 0 && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-white">
                                                {stats.newLeads}
                                            </span>
                                        )}
                                    </button>
                                )
                            })}
                        </nav>

                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-white/[0.06] bg-white dark:bg-[#131415]">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut size={16} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main content */}
                    <main className="flex-1 min-h-screen p-6 lg:p-8 overflow-x-hidden">
                        {activeTab === 'dashboard' && (
                            <div className="space-y-8 max-w-6xl">
                                <div>
                                    <h2 className="text-2xl font-bold font-heading text-gray-900 dark:text-white">
                                        Executive Command Center
                                    </h2>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-white/50 mt-1">
                                        Operational summary of incoming briefs, content pipeline, and platform telemetry.
                                    </p>
                                </div>

                                {/* Top KPI Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                                    <div
                                        onClick={() => setActiveTab('leads')}
                                        className="rounded-2xl p-5 bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] shadow-sm hover:border-[#B99152]/40 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-mono text-gray-500 dark:text-white/50 uppercase tracking-wider">
                                                TOTAL INQUIRIES
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <Inbox size={16} />
                                            </div>
                                        </div>
                                        <div className="flex items-baseline justify-between">
                                            <p className="text-3xl font-extrabold text-gray-900 dark:text-white font-heading">
                                                {stats.totalLeads}
                                            </p>
                                            {stats.newLeads > 0 && (
                                                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                                    +{stats.newLeads} new
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setActiveTab('blogs')}
                                        className="rounded-2xl p-5 bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] shadow-sm hover:border-[#B99152]/40 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-mono text-gray-500 dark:text-white/50 uppercase tracking-wider">
                                                PUBLISHED POSTS
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <FileText size={16} />
                                            </div>
                                        </div>
                                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white font-heading">
                                            {stats.publishedBlogs}
                                        </p>
                                    </div>

                                    <div
                                        onClick={() => setActiveTab('blogs')}
                                        className="rounded-2xl p-5 bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] shadow-sm hover:border-[#B99152]/40 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-mono text-gray-500 dark:text-white/50 uppercase tracking-wider">
                                                DRAFT POSTS
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                                                <Layers size={16} />
                                            </div>
                                        </div>
                                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white font-heading">
                                            {stats.drafts}
                                        </p>
                                    </div>

                                    <div
                                        onClick={() => setActiveTab('analytics')}
                                        className="rounded-2xl p-5 bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] shadow-sm hover:border-[#B99152]/40 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-xs font-mono text-gray-500 dark:text-white/50 uppercase tracking-wider">
                                                TELEMETRY
                                            </span>
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                                <BarChart3 size={16} />
                                            </div>
                                        </div>
                                        <span className="text-xs font-mono font-bold text-[#D4B270] flex items-center gap-1">
                                            <span>Active Engine</span>
                                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </div>
                                </div>

                                {/* Recent Inquiries Snapshot */}
                                <div className="rounded-2xl p-6 bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white">
                                                Recent Inquiries &amp; Briefings
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-white/50">
                                                Latest enterprise form submissions from the website
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setActiveTab('leads')}
                                            className="text-xs font-mono font-semibold text-[#D4B270] hover:underline flex items-center gap-1"
                                        >
                                            <span>View All ({stats.totalLeads})</span>
                                            <ArrowRight size={13} />
                                        </button>
                                    </div>

                                    {recentLeads.length === 0 ? (
                                        <div className="p-8 text-center bg-gray-50 dark:bg-white/[0.02] rounded-xl border border-gray-100 dark:border-white/[0.04]">
                                            <p className="text-xs text-gray-500 dark:text-white/50">
                                                No incoming briefings recorded yet. Test the contact form at <a href="/contact" target="_blank" className="text-[#D4B270] underline">/contact</a>.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-100 dark:divide-white/[0.06]">
                                            {recentLeads.map((lead) => (
                                                <div
                                                    key={lead.id}
                                                    onClick={() => setActiveTab('leads')}
                                                    className="py-3 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] px-2 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <div className="space-y-0.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                                {lead.name}
                                                            </span>
                                                            {lead.organization && (
                                                                <span className="text-xs text-gray-500 dark:text-white/60">
                                                                    • {lead.organization}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-white/50">
                                                            <span>{lead.email}</span>
                                                            <span>•</span>
                                                            <span>{lead.service || 'Enterprise Briefing'}</span>
                                                        </div>
                                                    </div>

                                                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                                                        lead.status === 'contacted'
                                                            ? 'bg-blue-500/10 text-blue-500'
                                                            : lead.status === 'qualified'
                                                            ? 'bg-amber-500/10 text-amber-500'
                                                            : 'bg-emerald-500/10 text-emerald-500 font-bold'
                                                    }`}>
                                                        {lead.status || 'New'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Quick Shortcuts */}
                                <div className="rounded-2xl p-6 bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] shadow-sm">
                                    <h3 className="text-base font-bold font-heading text-gray-900 dark:text-white mb-4">
                                        Quick Navigation
                                    </h3>
                                    <div className="flex flex-wrap gap-2.5">
                                        <button
                                            onClick={() => setActiveTab('leads')}
                                            className="text-xs font-medium py-2 px-3.5 rounded-xl bg-[#B99152]/15 text-[#D4B270] border border-[#B99152]/30 hover:bg-[#B99152]/25 transition-colors"
                                        >
                                            Inquiries &amp; Briefings
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('blogs')}
                                            className="text-xs font-medium py-2 px-3.5 rounded-xl bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-colors"
                                        >
                                            Write Technical Briefing
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('analytics')}
                                            className="text-xs font-medium py-2 px-3.5 rounded-xl bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-colors"
                                        >
                                            View Traffic Analytics
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('contact')}
                                            className="text-xs font-medium py-2 px-3.5 rounded-xl bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-colors"
                                        >
                                            Update Contact Coordinates
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('seo')}
                                            className="text-xs font-medium py-2 px-3.5 rounded-xl bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/[0.1] transition-colors"
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
                        className="lg:hidden fixed inset-0 bg-black/50 z-30"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </div>
        </AdminAuth>
    )
}
