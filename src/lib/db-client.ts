/**
 * Unified MongoDB Database Client for Deeplink Creators
 * Interacts with MongoDB-backed REST endpoints with resilient client-side caching.
 */

// ─── Interfaces ───────────────────────────────────────────────────

export interface BlogPost {
    id: string
    title: string
    slug: string
    shortId: string
    content: string
    excerpt: string
    coverImage?: string
    author: string
    category?: string
    tags?: string[]
    published: boolean
    publishedAt: any
    updatedAt: any
    seoTitle?: string
    seoDescription?: string
    keywords?: string
    readTime?: string
}

export interface LeadSubmission {
    id: string
    name: string
    email: string
    phone?: string
    company?: string
    organization?: string
    service?: string
    scope?: string
    budget?: string
    timeline?: string
    message?: string
    status?: 'new' | 'contacted' | 'qualified' | 'closed'
    source?: string
    notes?: string
    createdAt: any
}

export interface SiteSettings {
    phone?: string
    contactPhone?: string
    email?: string
    contactEmail?: string
    whatsappNumber?: string
    address?: string
    officeAddress?: string
    city?: string
    officeCity?: string
    state?: string
    officeState?: string
    pincode?: string
    officeZip?: string
    officeCountry?: string
    workingHoursWeekdays?: string
    workingHoursSaturday?: string
    workingHoursSunday?: string
    businessHours?: string
    supportEmail?: string
    salesEmail?: string
    consultationNotice?: string
    updatedAt?: any
}

export interface SocialLinks {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
    youtube?: string
    github?: string
    telegram?: string
    discord?: string
    updatedAt?: any
}

export interface SEOSettings {
    siteTitle: string
    siteDescription: string
    siteKeywords?: string
    keywords?: string
    googleAnalyticsId?: string
    metaPixelId?: string
    ogImage?: string
    twitterCard?: string
    googleVerification?: string
    bingVerification?: string
    robotsIndex?: boolean
    canonicalUrl?: string
    updatedAt?: any
}

export interface ServiceCardData {
    id: string
    title: string
    benefit: string
    description: string
    features: string[]
    cta: string
    href: string
    gradient: string
    icon: string
    order: number
    visible: boolean
    featured: boolean
    pages?: string[]
    imageUrl?: string
}

export interface TestimonialData {
    id: string
    name: string
    role: string
    company: string
    content: string
    avatar?: string
    rating: number
    order?: number
    featured: boolean
    project?: string
    metrics?: string
    createdAt?: any
}

// ─── Helper Functions ─────────────────────────────────────────────

export function generateShortId(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let result = ''
    for (let i = 0; i < 7; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

export function createSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 80)
}

// ─── Default Seed Data ─────────────────────────────────────────────

const DEFAULT_BLOGS: BlogPost[] = []

const DEFAULT_SERVICES: ServiceCardData[] = [
    {
        id: 'srv-1',
        title: 'Custom SaaS & Platform Engineering',
        benefit: 'Institutional grade web applications engineered for horizontal scale and zero downtime.',
        description: 'We architect and build bespoke enterprise software, multi-tenant SaaS platforms, and distributed systems using Next.js 14, Node.js, and MongoDB.',
        features: ['Multi-Tenant Tenant Isolation', 'Role-Based Access Control', 'High-Throughput APIs', 'Real-Time Telemetry'],
        cta: 'Request Architecture Briefing',
        href: '/contact',
        gradient: 'from-amber-500 to-amber-700',
        icon: 'Code',
        order: 1,
        visible: true,
        featured: true,
        pages: ['homepage', 'services'],
        imageUrl: '/images/hero-enterprise-architecture.jpg',
    },
    {
        id: 'srv-2',
        title: 'Sahyak CRM Integration & Deployment',
        benefit: 'Deploy our proprietary CRM engine to orchestrate your sales pipelines and client communications.',
        description: 'End-to-end rollout, custom integration pipelines, and dedicated workspace configuration for Sahyak CRM.',
        features: ['Automated Lead Intake', 'Custom Pipeline Stages', 'Team Analytics & Attribution', 'Secure Data Migration'],
        cta: 'Explore Sahyak CRM',
        href: 'https://sahyak.com',
        gradient: 'from-blue-500 to-indigo-700',
        icon: 'Layers',
        order: 2,
        visible: true,
        featured: true,
        pages: ['homepage', 'services'],
        imageUrl: '/images/sahyak-crm-mockup.jpg',
    },
    {
        id: 'srv-3',
        title: 'Creator Network Syndication & Distribution',
        benefit: 'Amplify proprietary software and digital offerings across hyper-scaled creator channels.',
        description: 'Programmatic syndication pipelines connecting software products with high-engagement audiences and distribution channels.',
        features: ['Creator Portfolio Management', 'Cross-Platform Syndication', 'Attribution Tracking', 'Performance Analytics'],
        cta: 'Syndicate Distribution',
        href: '/contact',
        gradient: 'from-emerald-500 to-teal-700',
        icon: 'TrendingUp',
        order: 3,
        visible: true,
        featured: true,
        pages: ['homepage', 'services'],
        imageUrl: '/images/creator-network-distribution.jpg',
    }
]

const DEFAULT_TESTIMONIALS: TestimonialData[] = [
    {
        id: 'test-1',
        name: 'Aman Sharma',
        role: 'Chief Technology Officer',
        company: 'NexGen Logistics',
        content: 'Deeplink Creators transformed our digital operations. Their architectural rigor and Sahyak CRM implementation eliminated lead leakage within weeks.',
        rating: 5,
        order: 1,
        featured: true,
        project: 'Sahyak CRM Multi-Tenant Deployment',
        metrics: '99.98% Uptime | 3.4x Pipeline Velocity',
    },
    {
        id: 'test-2',
        name: 'Priya Verma',
        role: 'Managing Director',
        company: 'Apex Media Holdings',
        content: 'The custom enterprise platform engineered by Deeplink handles millions of monthly engagements without latency degradation. Truly exceptional work.',
        rating: 5,
        order: 2,
        featured: true,
        project: 'Creator Distribution Engine',
        metrics: '2.1M Audience Reached',
    }
]

const DEFAULT_SETTINGS: SiteSettings = {
    phone: '+91 97116 10928',
    contactPhone: '+91 97116 10928',
    email: 'contact@deeplinkcreators.com',
    contactEmail: 'contact@deeplinkcreators.com',
    whatsappNumber: '+91 97116 10928',
    address: 'Mayalok Venture Headquarters, Tech Zone 4, Greater Noida',
    officeAddress: 'Mayalok Venture Headquarters, Tech Zone 4, Greater Noida',
    city: 'Greater Noida',
    officeCity: 'Greater Noida',
    state: 'Uttar Pradesh',
    officeState: 'Uttar Pradesh',
    pincode: '201306',
    officeZip: '201306',
    officeCountry: 'India',
    workingHoursWeekdays: '9:00 AM - 6:00 PM IST',
    workingHoursSaturday: '10:00 AM - 4:00 PM IST',
    workingHoursSunday: 'Closed',
    businessHours: 'Mon - Fri: 9:00 AM - 6:00 PM IST',
    supportEmail: 'support@deeplinkcreators.com',
    salesEmail: 'sales@deeplinkcreators.com',
    consultationNotice: 'Direct advisory & enterprise onboarding strictly by appointment or qualified inquiry.',
}

const DEFAULT_SOCIAL: SocialLinks = {
    linkedin: 'https://linkedin.com/company/deeplinkcreators',
    twitter: 'https://twitter.com/deeplinkcreator',
    instagram: 'https://instagram.com/deeplinkcreators',
    youtube: 'https://youtube.com/@deeplinkcreators',
    github: 'https://github.com/mayalok-ventures',
    facebook: '',
    telegram: 'https://t.me/deeplinkcreators',
    discord: '',
}

const DEFAULT_SEO: SEOSettings = {
    siteTitle: 'Deeplink Creators | Enterprise Software Holding & Creator Ecosystem',
    siteDescription: 'Deeplink Creators builds, operates, and scales proprietary software products and hyper-scaled creator networks under Mayalok Venture.',
    siteKeywords: 'Enterprise Software, SaaS Development, Sahyak CRM, Creator Network, Next.js, MongoDB',
    keywords: 'Enterprise Software, SaaS Development, Sahyak CRM, Creator Network, Next.js, MongoDB',
    googleAnalyticsId: '',
    metaPixelId: '',
    ogImage: '/og-image.jpg',
    twitterCard: 'summary_large_image',
    googleVerification: '',
    bingVerification: '',
    robotsIndex: true,
    canonicalUrl: 'https://deeplinkcreators.com',
}

// ─── Local Storage Cache Helpers ──────────────────────────────────

function getLocal<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback
    try {
        const item = localStorage.getItem(`__dlc_${key}`)
        return item ? JSON.parse(item) : fallback
    } catch {
        return fallback
    }
}

function setLocal<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(`__dlc_${key}`, JSON.stringify(value))
    } catch {
        // storage quota exceeded or disabled
    }
}

// ─── Image Upload Helper ──────────────────────────────────────────

export async function uploadImage(file: File, _path?: string, onProgress?: (percent: number) => void): Promise<string> {
    if (onProgress) onProgress(50)
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                if (onProgress) onProgress(100)
                resolve(reader.result)
            } else {
                reject(new Error('Failed to read image'))
            }
        }
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
    })
}

// ─── Blog Operations ──────────────────────────────────────────────

export async function getPublishedBlogs(): Promise<BlogPost[]> {
    try {
        const res = await fetch('/api/blogs', { cache: 'no-store' })
        if (res.ok) {
            const data = await res.json()
            if (Array.isArray(data.blogs)) {
                setLocal('blogs', data.blogs)
                return data.blogs.filter((b: BlogPost) => b.published)
            }
        }
    } catch {
        // fallback to local
    }
    const cached = getLocal<BlogPost[]>('blogs', [])
    return cached.filter(b => b.published)
}

export async function getAllBlogs(): Promise<BlogPost[]> {
    try {
        const res = await fetch('/api/blogs?all=true', { cache: 'no-store' })
        if (res.ok) {
            const data = await res.json()
            if (Array.isArray(data.blogs)) {
                setLocal('blogs', data.blogs)
                return data.blogs
            }
        }
    } catch {
        // fallback to local
    }
    return getLocal<BlogPost[]>('blogs', [])
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const res = await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })
        if (res.ok) {
            const data = await res.json()
            if (data.blog) return data.blog
        }
    } catch {
        // fallback
    }
    const blogs = getLocal<BlogPost[]>('blogs', [])
    return blogs.find(b => b.slug === slug || b.shortId === slug || b.id === slug) || null
}

export async function getBlogByShortId(shortId: string): Promise<BlogPost | null> {
    return getBlogBySlug(shortId)
}

export async function createBlog(data: Omit<BlogPost, 'id' | 'shortId' | 'updatedAt'>): Promise<string> {
    const newId = 'blog-' + Date.now()
    const shortId = generateShortId()
    const newBlog: BlogPost = {
        ...data,
        id: newId,
        shortId,
        slug: data.slug || createSlug(data.title),
        publishedAt: data.published ? (data.publishedAt || new Date().toISOString()) : null,
        updatedAt: new Date().toISOString(),
    }

    // Save locally first
    const current = getLocal<BlogPost[]>('blogs', [])
    const updated = [newBlog, ...current]
    setLocal('blogs', updated)

    // Sync with MongoDB API
    try {
        fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBlog),
        }).catch(() => {})
    } catch {}

    return newId
}

export async function updateBlog(id: string, data: Partial<BlogPost>): Promise<void> {
    const current = getLocal<BlogPost[]>('blogs', [])
    const updated = current.map(b => (b.id === id || b.slug === id || b.shortId === id) ? { ...b, ...data, updatedAt: new Date().toISOString() } : b)
    setLocal('blogs', updated)

    try {
        fetch(`/api/blogs?id=${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }).catch(() => {})
    } catch {}
}

export async function deleteBlog(id: string): Promise<void> {
    const current = getLocal<BlogPost[]>('blogs', [])
    const updated = current.filter(b => b.id !== id && b.slug !== id && b.shortId !== id)
    setLocal('blogs', updated)

    try {
        fetch(`/api/blogs?id=${encodeURIComponent(id)}`, {
            method: 'DELETE',
        }).catch(() => {})
    } catch {}
}

// ─── Settings Operations ─────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        const res = await fetch('/api/settings?type=contact', { cache: 'no-store' })
        if (res.ok) {
            const json = await res.json()
            if (json.data) {
                setLocal('settings_contact', json.data)
                return json.data
            }
        }
    } catch {}
    return getLocal<SiteSettings>('settings_contact', DEFAULT_SETTINGS)
}

export async function saveSiteSettings(data: SiteSettings): Promise<void> {
    setLocal('settings_contact', data)
    try {
        fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'contact', data }),
        }).catch(() => {})
    } catch {}
}

export async function getSocialLinks(): Promise<SocialLinks | null> {
    try {
        const res = await fetch('/api/settings?type=social', { cache: 'no-store' })
        if (res.ok) {
            const json = await res.json()
            if (json.data) {
                setLocal('settings_social', json.data)
                return json.data
            }
        }
    } catch {}
    return getLocal<SocialLinks>('settings_social', DEFAULT_SOCIAL)
}

export async function saveSocialLinks(data: SocialLinks): Promise<void> {
    setLocal('settings_social', data)
    try {
        fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'social', data }),
        }).catch(() => {})
    } catch {}
}

export async function getSEOSettings(): Promise<SEOSettings | null> {
    try {
        const res = await fetch('/api/settings?type=seo', { cache: 'no-store' })
        if (res.ok) {
            const json = await res.json()
            if (json.data) {
                setLocal('settings_seo', json.data)
                return json.data
            }
        }
    } catch {}
    return getLocal<SEOSettings>('settings_seo', DEFAULT_SEO)
}

export async function saveSEOSettings(data: SEOSettings): Promise<void> {
    setLocal('settings_seo', data)
    try {
        fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'seo', data }),
        }).catch(() => {})
    } catch {}
}

// ─── Service Cards Operations ────────────────────────────────────

export async function getServiceCards(): Promise<ServiceCardData[]> {
    try {
        const res = await fetch('/api/services', { cache: 'no-store' })
        if (res.ok) {
            const json = await res.json()
            if (Array.isArray(json.services) && json.services.length > 0) {
                setLocal('services', json.services)
                return json.services
            }
        }
    } catch {}
    return getLocal<ServiceCardData[]>('services', DEFAULT_SERVICES)
}

export async function createServiceCard(data: Omit<ServiceCardData, 'id'>): Promise<string> {
    const newId = 'srv-' + Date.now()
    const newService: ServiceCardData = { ...data, id: newId }
    const current = getLocal<ServiceCardData[]>('services', DEFAULT_SERVICES)
    setLocal('services', [...current, newService])

    try {
        fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newService),
        }).catch(() => {})
    } catch {}
    return newId
}

export async function updateServiceCard(id: string, data: Partial<ServiceCardData>): Promise<void> {
    const current = getLocal<ServiceCardData[]>('services', DEFAULT_SERVICES)
    const updated = current.map(s => s.id === id ? { ...s, ...data } : s)
    setLocal('services', updated)

    try {
        fetch('/api/services', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...data }),
        }).catch(() => {})
    } catch {}
}

export async function deleteServiceCard(id: string): Promise<void> {
    const current = getLocal<ServiceCardData[]>('services', DEFAULT_SERVICES)
    const updated = current.filter(s => s.id !== id)
    setLocal('services', updated)

    try {
        fetch(`/api/services?id=${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => {})
    } catch {}
}

export async function seedDefaultServiceCards(): Promise<void> {
    setLocal('services', DEFAULT_SERVICES)
    for (const card of DEFAULT_SERVICES) {
        try {
            await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(card),
            })
        } catch {}
    }
}

export async function getServiceCardsByPage(page: string): Promise<ServiceCardData[]> {
    const all = await getServiceCards()
    return all.filter(c => c.visible && (c.pages?.includes(page) || c.pages?.includes('all') || !c.pages || c.pages.length === 0))
}

export async function getFeaturedServiceCards(): Promise<ServiceCardData[]> {
    const all = await getServiceCards()
    return all.filter(c => c.visible && c.featured)
}

// ─── Testimonials Operations ─────────────────────────────────────

export async function getTestimonials(): Promise<TestimonialData[]> {
    try {
        const res = await fetch('/api/testimonials', { cache: 'no-store' })
        if (res.ok) {
            const json = await res.json()
            if (Array.isArray(json.testimonials) && json.testimonials.length > 0) {
                setLocal('testimonials', json.testimonials)
                return json.testimonials
            }
        }
    } catch {}
    return getLocal<TestimonialData[]>('testimonials', DEFAULT_TESTIMONIALS)
}

export async function getFeaturedTestimonials(): Promise<TestimonialData[]> {
    const all = await getTestimonials()
    return all.filter(t => t.featured)
}

export async function createTestimonial(data: Omit<TestimonialData, 'id' | 'createdAt'>): Promise<string> {
    const newId = 'test-' + Date.now()
    const newTestimonial: TestimonialData = {
        ...data,
        id: newId,
        createdAt: new Date().toISOString(),
    }
    const current = getLocal<TestimonialData[]>('testimonials', DEFAULT_TESTIMONIALS)
    setLocal('testimonials', [...current, newTestimonial])

    try {
        fetch('/api/testimonials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTestimonial),
        }).catch(() => {})
    } catch {}
    return newId
}

export async function updateTestimonial(id: string, data: Partial<TestimonialData>): Promise<void> {
    const current = getLocal<TestimonialData[]>('testimonials', DEFAULT_TESTIMONIALS)
    const updated = current.map(t => t.id === id ? { ...t, ...data } : t)
    setLocal('testimonials', updated)

    try {
        fetch('/api/testimonials', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...data }),
        }).catch(() => {})
    } catch {}
}

export async function deleteTestimonial(id: string): Promise<void> {
    const current = getLocal<TestimonialData[]>('testimonials', DEFAULT_TESTIMONIALS)
    const updated = current.filter(t => t.id !== id)
    setLocal('testimonials', updated)

    try {
        fetch(`/api/testimonials?id=${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => {})
    } catch {}
}

// ─── Lead & Inquiry Operations ───────────────────────────────────

export async function saveLeadSubmission(data: Omit<LeadSubmission, 'id' | 'createdAt'>): Promise<string> {
    const newId = 'lead-' + Date.now()
    const newLead: LeadSubmission = {
        ...data,
        id: newId,
        status: data.status || 'new',
        createdAt: new Date().toISOString(),
    }
    const current = getLocal<LeadSubmission[]>('leads', [])
    setLocal('leads', [newLead, ...current])

    try {
        fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLead),
        }).catch(() => {})
    } catch {}
    return newId
}

export async function getLeadSubmissions(): Promise<LeadSubmission[]> {
    const localLeads = getLocal<LeadSubmission[]>('leads', [])
    try {
        const res = await fetch('/api/leads', { cache: 'no-store' })
        if (res.ok) {
            const json = await res.json()
            if (Array.isArray(json.leads)) {
                const serverLeads: LeadSubmission[] = json.leads
                const all = [...serverLeads]
                localLeads.forEach((l) => {
                    if (!all.some((s) => s.id === l.id || (s.email === l.email && s.name === l.name))) {
                        all.push(l)
                    }
                })
                setLocal('leads', all)
                return all
            }
        }
    } catch {}
    return localLeads
}

export async function updateLeadStatus(
    id: string,
    status: 'new' | 'contacted' | 'qualified' | 'closed',
    notes?: string
): Promise<void> {
    const current = getLocal<LeadSubmission[]>('leads', [])
    const updated = current.map(l => l.id === id ? { ...l, status, notes: notes !== undefined ? notes : l.notes } : l)
    setLocal('leads', updated)

    try {
        fetch(`/api/leads?id=${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status, notes }),
        }).catch(() => {})
    } catch {}
}

export async function deleteLeadSubmission(id: string): Promise<void> {
    const current = getLocal<LeadSubmission[]>('leads', [])
    const updated = current.filter(l => l.id !== id)
    setLocal('leads', updated)

    try {
        fetch(`/api/leads?id=${encodeURIComponent(id)}`, {
            method: 'DELETE',
        }).catch(() => {})
    } catch {}
}
