'use client'

import { useState, useEffect } from 'react'
import AdminAuth from '@/components/admin/AdminAuth'
import BlogManager from '@/components/admin/BlogManager'
import ContactManager from '@/components/admin/ContactManager'
import SocialManager from '@/components/admin/SocialManager'
import SEOManager from '@/components/admin/SEOManager'
import ServicesManager from '@/components/admin/ServicesManager'
import { clearAdminSession } from '@/lib/admin-auth'
import { getAllBlogs } from '@/lib/firestore'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'
import {
    LayoutDashboard, FileText, Phone, Share2, Search, LogOut, Menu, X, BarChart3, Layers
} from 'lucide-react'

const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'blogs', label: 'Blog Posts', icon: FileText },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'social', label: 'Social Links', icon: Share2 },
    { id: 'seo', label: 'SEO Settings', icon: Search },
]

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 })

    useEffect(() => {
        getAllBlogs().then(blogs => {
            setStats({
                total: blogs.length,
                published: blogs.filter(b => b.published).length,
                drafts: blogs.filter(b => !b.published).length,
            })
        }).catch(() => {})
    }, [activeTab])

    const handleLogout = () => {
        clearAdminSession()
        window.location.reload()
    }

    return (
        <AdminAuth>
            <div className="min-h-screen bg-dark">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/[0.06]">
                    <h1 className="text-lg font-bold font-heading text-heading">Admin Panel</h1>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-heading">
                        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div className="flex">
                    {/* Sidebar */}
                    <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-dark-200 border-r border-white/[0.06] flex-shrink-0`}>
                        <div className="p-6 border-b border-white/[0.06]">
                            <h1 className="text-xl font-bold font-heading">
                                <span className="text-primary-400">Deeplink</span>{' '}
                                <span className="text-heading">Admin</span>
                            </h1>
                            <p className="text-xs text-paragraph mt-1">deeplinkcreators.com</p>
                        </div>

                        <nav className="p-4 space-y-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); setSidebarOpen(false) }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                                            : 'text-paragraph hover:text-heading hover:bg-white/[0.03]'
                                    }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/[0.06]">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    </aside>

                    {/* Main content */}
                    <main className="flex-1 min-h-screen p-6 lg:p-8">
                        {activeTab === 'dashboard' && (
                            <div>
                                <h2 className="text-2xl font-bold font-heading text-heading mb-6">Dashboard</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="glass-card rounded-xl p-6">
                                        <p className="text-paragraph text-sm mb-1">Total Posts</p>
                                        <p className="text-3xl font-bold text-heading">{stats.total}</p>
                                    </div>
                                    <div className="glass-card rounded-xl p-6">
                                        <p className="text-paragraph text-sm mb-1">Published</p>
                                        <p className="text-3xl font-bold text-accent">{stats.published}</p>
                                    </div>
                                    <div className="glass-card rounded-xl p-6">
                                        <p className="text-paragraph text-sm mb-1">Drafts</p>
                                        <p className="text-3xl font-bold text-yellow-400">{stats.drafts}</p>
                                    </div>
                                </div>
                                <div className="glass-card rounded-xl p-6">
                                    <h3 className="text-lg font-bold text-heading mb-4">Quick Actions</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setActiveTab('analytics')}
                                            className="btn-primary text-sm py-2 px-4"
                                        >
                                            View Analytics
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('blogs')}
                                            className="bg-white/[0.05] border border-white/[0.08] text-heading text-sm py-2 px-4 rounded-lg hover:bg-white/[0.08] transition-colors"
                                        >
                                            Manage Blog Posts
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('contact')}
                                            className="bg-white/[0.05] border border-white/[0.08] text-heading text-sm py-2 px-4 rounded-lg hover:bg-white/[0.08] transition-colors"
                                        >
                                            Update Contact Info
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('seo')}
                                            className="bg-white/[0.05] border border-white/[0.08] text-heading text-sm py-2 px-4 rounded-lg hover:bg-white/[0.08] transition-colors"
                                        >
                                            SEO Settings
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'analytics' && <AnalyticsDashboard />}
                        {activeTab === 'blogs' && <BlogManager />}
                        {activeTab === 'services' && <ServicesManager />}
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
