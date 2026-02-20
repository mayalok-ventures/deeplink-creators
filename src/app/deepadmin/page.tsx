'use client'

import { useState, useEffect } from 'react'
import AdminAuth from '@/components/admin/AdminAuth'
import BlogManager from '@/components/admin/BlogManager'
import ContactManager from '@/components/admin/ContactManager'
import SocialManager from '@/components/admin/SocialManager'
import SEOManager from '@/components/admin/SEOManager'
import ServicesManager from '@/components/admin/ServicesManager'
import TestimonialsManager from '@/components/admin/TestimonialsManager'
import { clearAdminSession } from '@/lib/admin-auth'
import { getAllBlogs } from '@/lib/firestore'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'
import {
    LayoutDashboard, FileText, Phone, Share2, Search, LogOut, Menu, X, BarChart3, Layers, MessageSquare, Sun, Moon
} from 'lucide-react'

const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'blogs', label: 'Blog Posts', icon: FileText },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'social', label: 'Social Links', icon: Share2 },
    { id: 'seo', label: 'SEO Settings', icon: Search },
]

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 })
    const [adminDark, setAdminDark] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('admin-theme')
        if (stored === 'light') setAdminDark(false)
    }, [])

    useEffect(() => {
        getAllBlogs().then(blogs => {
            setStats({
                total: blogs.length,
                published: blogs.filter(b => b.published).length,
                drafts: blogs.filter(b => !b.published).length,
            })
        }).catch(() => {})
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
            <div className={`min-h-screen ${adminDark ? 'bg-[#0F1112] text-white/60' : 'bg-gray-50 text-gray-600'}`}>
                {/* Mobile header */}
                <div className={`lg:hidden flex items-center justify-between p-4 border-b ${adminDark ? 'border-white/[0.06]' : 'border-gray-200'}`}>
                    <h1 className={`text-lg font-bold font-heading ${adminDark ? 'text-white' : 'text-gray-900'}`}>Admin Panel</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleAdminTheme}
                            className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-colors ${adminDark ? 'border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] text-white' : 'border-gray-200 bg-white hover:bg-gray-100 text-gray-700'}`}
                            aria-label="Toggle admin theme"
                        >
                            {adminDark ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={adminDark ? 'text-white' : 'text-gray-900'}>
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                <div className="flex">
                    {/* Sidebar */}
                    <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:sticky top-0 left-0 z-40 w-64 h-screen flex-shrink-0 ${adminDark ? 'bg-[#131415] border-r border-white/[0.06]' : 'bg-white border-r border-gray-200'}`}>
                        <div className={`p-6 border-b ${adminDark ? 'border-white/[0.06]' : 'border-gray-200'} flex items-center justify-between`}>
                            <div>
                                <h1 className="text-xl font-bold font-heading">
                                    <span className="text-primary-400">Deeplink</span>{' '}
                                    <span className={adminDark ? 'text-white' : 'text-gray-900'}>Admin</span>
                                </h1>
                                <p className={`text-xs mt-1 ${adminDark ? 'text-white/50' : 'text-gray-400'}`}>deeplinkcreators.com</p>
                            </div>
                            <button
                                onClick={toggleAdminTheme}
                                className={`hidden lg:flex items-center justify-center w-9 h-9 rounded-lg border transition-colors ${adminDark ? 'border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] text-white' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'}`}
                                aria-label="Toggle admin theme"
                            >
                                {adminDark ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        </div>

                        <nav className="p-4 space-y-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => { setActiveTab(tab.id); setSidebarOpen(false) }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                                            : adminDark
                                                ? 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className={`absolute bottom-0 left-0 right-0 p-4 border-t ${adminDark ? 'border-white/[0.06]' : 'border-gray-200'}`}>
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
                                <h2 className={`text-2xl font-bold font-heading mb-6 ${adminDark ? 'text-white' : 'text-gray-900'}`}>Dashboard</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className={`rounded-xl p-6 ${adminDark ? 'bg-[#1A1B1C] border border-white/[0.08]' : 'bg-white border border-gray-200 shadow-sm'}`}>
                                        <p className={`text-sm mb-1 ${adminDark ? 'text-white/50' : 'text-gray-500'}`}>Total Posts</p>
                                        <p className={`text-3xl font-bold ${adminDark ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
                                    </div>
                                    <div className={`rounded-xl p-6 ${adminDark ? 'bg-[#1A1B1C] border border-white/[0.08]' : 'bg-white border border-gray-200 shadow-sm'}`}>
                                        <p className={`text-sm mb-1 ${adminDark ? 'text-white/50' : 'text-gray-500'}`}>Published</p>
                                        <p className="text-3xl font-bold text-accent">{stats.published}</p>
                                    </div>
                                    <div className={`rounded-xl p-6 ${adminDark ? 'bg-[#1A1B1C] border border-white/[0.08]' : 'bg-white border border-gray-200 shadow-sm'}`}>
                                        <p className={`text-sm mb-1 ${adminDark ? 'text-white/50' : 'text-gray-500'}`}>Drafts</p>
                                        <p className="text-3xl font-bold text-yellow-400">{stats.drafts}</p>
                                    </div>
                                </div>
                                <div className={`rounded-xl p-6 ${adminDark ? 'bg-[#1A1B1C] border border-white/[0.08]' : 'bg-white border border-gray-200 shadow-sm'}`}>
                                    <h3 className={`text-lg font-bold mb-4 ${adminDark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setActiveTab('analytics')}
                                            className="btn-primary text-sm py-2 px-4"
                                        >
                                            View Analytics
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('blogs')}
                                            className={`text-sm py-2 px-4 rounded-lg transition-colors ${adminDark ? 'bg-white/[0.05] border border-white/[0.08] text-white hover:bg-white/[0.08]' : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            Manage Blog Posts
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('contact')}
                                            className={`text-sm py-2 px-4 rounded-lg transition-colors ${adminDark ? 'bg-white/[0.05] border border-white/[0.08] text-white hover:bg-white/[0.08]' : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'}`}
                                        >
                                            Update Contact Info
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('seo')}
                                            className={`text-sm py-2 px-4 rounded-lg transition-colors ${adminDark ? 'bg-white/[0.05] border border-white/[0.08] text-white hover:bg-white/[0.08]' : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'}`}
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
