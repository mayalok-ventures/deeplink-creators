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
            <div className="min-h-screen bg-gray-50 dark:bg-[#0F1112] text-gray-600 dark:text-white/60">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/[0.06]">
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
                                    <span className="text-primary-400">Deeplink</span>{' '}
                                    <span className="text-gray-900 dark:text-white">Admin</span>
                                </h1>
                                <p className="text-xs mt-1 text-gray-400 dark:text-white/50">deeplinkcreators.com</p>
                            </div>
                            <button
                                onClick={toggleAdminTheme}
                                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg border transition-colors border-gray-200 dark:border-white/[0.1] bg-gray-50 dark:bg-white/[0.05] hover:bg-gray-100 dark:hover:bg-white/[0.1] text-gray-700 dark:text-white"
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
                                            : 'text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.03]'
                                    }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-white/[0.06]">
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
                                <h2 className="text-2xl font-bold font-heading mb-6 text-gray-900 dark:text-white">Dashboard</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div className="rounded-xl p-6 bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] shadow-sm dark:shadow-none">
                                        <p className="text-sm mb-1 text-gray-500 dark:text-white/50">Total Posts</p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
                                    </div>
                                    <div className="rounded-xl p-6 bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] shadow-sm dark:shadow-none">
                                        <p className="text-sm mb-1 text-gray-500 dark:text-white/50">Published</p>
                                        <p className="text-3xl font-bold text-accent">{stats.published}</p>
                                    </div>
                                    <div className="rounded-xl p-6 bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] shadow-sm dark:shadow-none">
                                        <p className="text-sm mb-1 text-gray-500 dark:text-white/50">Drafts</p>
                                        <p className="text-3xl font-bold text-yellow-400">{stats.drafts}</p>
                                    </div>
                                </div>
                                <div className="rounded-xl p-6 bg-white dark:bg-[#1A1B1C] border border-gray-200 dark:border-white/[0.08] shadow-sm dark:shadow-none">
                                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setActiveTab('analytics')}
                                            className="btn-primary text-sm py-2 px-4"
                                        >
                                            View Analytics
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('blogs')}
                                            className="text-sm py-2 px-4 rounded-lg transition-colors bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08]"
                                        >
                                            Manage Blog Posts
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('contact')}
                                            className="text-sm py-2 px-4 rounded-lg transition-colors bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08]"
                                        >
                                            Update Contact Info
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('seo')}
                                            className="text-sm py-2 px-4 rounded-lg transition-colors bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/[0.08]"
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
