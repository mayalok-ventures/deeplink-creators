/**
 * MongoDB Data Layer for Deeplink Creators
 * Fully replaces Firestore with MongoDB Atlas database: deeplink-data
 */

export interface BlogPost {
    id?: string
    title: string
    slug: string
    shortId: string
    content: string
    excerpt: string
    coverImage: string
    author: string
    category?: string
    tags: string[]
    published: boolean
    publishedAt: any
    updatedAt: any
    seoTitle: string
    seoDescription: string
    keywords: string
    readTime?: string
}

export interface SiteSettings {
    phone: string
    email: string
    address: string
    city: string
    state: string
    pincode: string
    workingHoursWeekdays: string
    workingHoursSaturday: string
    workingHoursSunday: string
}

export interface SocialLinks {
    facebook: string
    instagram: string
    linkedin: string
    twitter: string
    youtube: string
}

export interface SEOSettings {
    siteTitle: string
    siteDescription: string
    siteKeywords: string
    ogImage: string
    googleAnalyticsId: string
    metaPixelId: string
}

export interface ServiceCardData {
    id?: string
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
    id?: string
    name: string
    role: string
    company: string
    content: string
    rating: number
    featured: boolean
    order: number
    createdAt: any
}

export interface LeadSubmission {
    id?: string
    name: string
    organization?: string
    email: string
    phone: string
    service?: string
    timeline?: string
    scope?: string
    budget?: string
    source?: string
    status?: 'new' | 'contacted' | 'qualified' | 'closed'
    notes?: string
    createdAt: any
}

function generateShortId(): string {
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

// ─── Blog Operations (MongoDB API) ───────────────────────────────

export async function getPublishedBlogs(): Promise<BlogPost[]> {
    try {
        const res = await fetch('/api/blogs', { cache: 'no-store' })
        if (!res.ok) return []
        const data = await res.json()
        return data.blogs || []
    } catch (err) {
        console.error('getPublishedBlogs error:', err)
        return []
    }
}

export async function getAllBlogs(): Promise<BlogPost[]> {
    try {
        const res = await fetch('/api/blogs?all=true', { cache: 'no-store' })
        if (!res.ok) return []
        const data = await res.json()
        return data.blogs || []
    } catch (err) {
        console.error('getAllBlogs error:', err)
        return []
    }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`, { cache: 'no-store' })
        if (!res.ok) return null
        const data = await res.json()
        return data.blog || null
    } catch (err) {
        console.error('getBlogBySlug error:', err)
        return null
    }
}

export async function getBlogByShortId(shortId: string): Promise<BlogPost | null> {
    return getBlogBySlug(shortId)
}

export async function createBlog(data: Omit<BlogPost, 'id' | 'shortId' | 'updatedAt'>): Promise<string> {
    const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...data,
            shortId: generateShortId(),
        }),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Failed to create blog in MongoDB')
    return json.id
}

export async function updateBlog(id: string, data: Partial<BlogPost>): Promise<void> {
    const res = await fetch(`/api/blogs/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Failed to update blog in MongoDB')
}

export async function deleteBlog(id: string): Promise<void> {
    const res = await fetch(`/api/blogs/${encodeURIComponent(id)}`, {
        method: 'DELETE',
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Failed to delete blog in MongoDB')
}

// ─── Settings Operations ─────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
    try {
        const res = await fetch('/api/settings?type=contact', { cache: 'no-store' })
        const json = await res.json()
        return json.data || null
    } catch {
        return null
    }
}

export async function saveSiteSettings(data: SiteSettings): Promise<void> {
    await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', data }),
    })
}

export async function getSocialLinks(): Promise<SocialLinks | null> {
    try {
        const res = await fetch('/api/settings?type=social', { cache: 'no-store' })
        const json = await res.json()
        return json.data || null
    } catch {
        return null
    }
}

export async function saveSocialLinks(data: SocialLinks): Promise<void> {
    await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'social', data }),
    })
}

export async function getSEOSettings(): Promise<SEOSettings | null> {
    try {
        const res = await fetch('/api/settings?type=seo', { cache: 'no-store' })
        const json = await res.json()
        return json.data || null
    } catch {
        return null
    }
}

export async function saveSEOSettings(data: SEOSettings): Promise<void> {
    await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'seo', data }),
    })
}

// ─── Service Card Operations ─────────────────────────────────────

export async function getServiceCards(): Promise<ServiceCardData[]> {
    try {
        const res = await fetch('/api/services', { cache: 'no-store' })
        const json = await res.json()
        return json.services || []
    } catch {
        return []
    }
}

export async function getVisibleServiceCards(): Promise<ServiceCardData[]> {
    const all = await getServiceCards()
    return all.filter((c) => c.visible === true)
}

export async function getFeaturedServiceCards(): Promise<ServiceCardData[]> {
    const all = await getServiceCards()
    return all.filter((c) => c.visible === true && (c.featured === true || (c.pages ?? []).includes('homepage')))
}

export async function getServiceCardsByPage(page: string): Promise<ServiceCardData[]> {
    const all = await getServiceCards()
    return all.filter((c) => c.visible === true && (c.pages ?? []).includes(page))
}

export async function createServiceCard(data: Omit<ServiceCardData, 'id'>): Promise<string> {
    const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    const json = await res.json()
    return json.id
}

export async function updateServiceCard(id: string, data: Partial<ServiceCardData>): Promise<void> {
    await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
    })
}

export async function deleteServiceCard(id: string): Promise<void> {
    await fetch(`/api/services?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export async function seedDefaultServiceCards(): Promise<void> {
    // Handled dynamically if empty
}

// ─── Testimonial Operations ──────────────────────────────────────

export async function getTestimonials(): Promise<TestimonialData[]> {
    try {
        const res = await fetch('/api/testimonials', { cache: 'no-store' })
        const json = await res.json()
        return json.testimonials || []
    } catch {
        return []
    }
}

export async function getFeaturedTestimonials(): Promise<TestimonialData[]> {
    const all = await getTestimonials()
    return all.filter((t) => t.featured === true).slice(0, 3)
}

export async function createTestimonial(data: Omit<TestimonialData, 'id' | 'createdAt'>): Promise<string> {
    const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    const json = await res.json()
    return json.id
}

export async function updateTestimonial(id: string, data: Partial<TestimonialData>): Promise<void> {
    await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...data }),
    })
}

export async function deleteTestimonial(id: string): Promise<void> {
    await fetch(`/api/testimonials?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
}

// ─── Lead & Inquiry Operations (MongoDB) ─────────────────────────

export async function saveLeadSubmission(data: Omit<LeadSubmission, 'id' | 'createdAt'>): Promise<string> {
    const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Failed to save lead in MongoDB')
    return json.id
}

export async function getLeadSubmissions(): Promise<LeadSubmission[]> {
    try {
        const res = await fetch('/api/leads', { cache: 'no-store' })
        if (!res.ok) return []
        const json = await res.json()
        return json.leads || []
    } catch (err) {
        console.error('getLeadSubmissions error:', err)
        return []
    }
}

export async function updateLeadStatus(
    id: string,
    status: 'new' | 'contacted' | 'qualified' | 'closed',
    notes?: string
): Promise<void> {
    const res = await fetch(`/api/leads/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, notes }),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Failed to update lead status in MongoDB')
}

export async function deleteLeadSubmission(id: string): Promise<void> {
    const res = await fetch(`/api/leads/${encodeURIComponent(id)}`, {
        method: 'DELETE',
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json.error || 'Failed to delete lead from MongoDB')
}

// ─── Image Upload (Direct Base64 Data URL) ───────────────────────

export function uploadImage(
    file: File,
    path: string,
    onProgress?: (percent: number) => void
): Promise<string> {
    return new Promise((resolve, reject) => {
        onProgress?.(20)
        const reader = new FileReader()
        reader.onload = () => {
            onProgress?.(100)
            resolve(reader.result as string)
        }
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
    })
}
