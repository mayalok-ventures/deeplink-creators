import {
    collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
    query, where, orderBy, limit, Timestamp, setDoc
} from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app, db } from './firebase'

export interface BlogPost {
    id?: string
    title: string
    slug: string
    shortId: string
    content: string
    excerpt: string
    coverImage: string
    author: string
    tags: string[]
    published: boolean
    publishedAt: Timestamp | null
    updatedAt: Timestamp
    seoTitle: string
    seoDescription: string
    keywords: string
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

// ─── Blog Operations ─────────────────────────────────────────────

export async function getPublishedBlogs(): Promise<BlogPost[]> {
    const q = query(
        collection(db, 'blogs'),
        where('published', '==', true)
    )
    const snapshot = await getDocs(q)
    const blogs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost))
    return blogs.sort((a, b) => {
        const aTime = a.publishedAt?.toMillis?.() ?? 0
        const bTime = b.publishedAt?.toMillis?.() ?? 0
        return bTime - aTime
    })
}

export async function getAllBlogs(): Promise<BlogPost[]> {
    const q = query(collection(db, 'blogs'), orderBy('updatedAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost))
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
    const q = query(collection(db, 'blogs'), where('slug', '==', slug), limit(1))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    const d = snapshot.docs[0]
    return { id: d.id, ...d.data() } as BlogPost
}

export async function getBlogByShortId(shortId: string): Promise<BlogPost | null> {
    const q = query(collection(db, 'blogs'), where('shortId', '==', shortId), limit(1))
    const snapshot = await getDocs(q)
    if (snapshot.empty) return null
    const d = snapshot.docs[0]
    return { id: d.id, ...d.data() } as BlogPost
}

export async function createBlog(data: Omit<BlogPost, 'id' | 'shortId' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'blogs'), {
        ...data,
        shortId: generateShortId(),
        updatedAt: Timestamp.now(),
        publishedAt: data.published ? Timestamp.now() : null,
    })
    return docRef.id
}

export async function updateBlog(id: string, data: Partial<BlogPost>): Promise<void> {
    const ref = doc(db, 'blogs', id)
    const updateData: Record<string, any> = { ...data, updatedAt: Timestamp.now() }
    if (data.published && !data.publishedAt) {
        updateData.publishedAt = Timestamp.now()
    }
    await updateDoc(ref, updateData)
}

export async function deleteBlog(id: string): Promise<void> {
    await deleteDoc(doc(db, 'blogs', id))
}

// ─── Settings Operations ─────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
    const snap = await getDoc(doc(db, 'settings', 'contact'))
    if (!snap.exists()) return null
    return snap.data() as SiteSettings
}

export async function saveSiteSettings(data: SiteSettings): Promise<void> {
    await setDoc(doc(db, 'settings', 'contact'), data)
}

export async function getSocialLinks(): Promise<SocialLinks | null> {
    const snap = await getDoc(doc(db, 'settings', 'social'))
    if (!snap.exists()) return null
    return snap.data() as SocialLinks
}

export async function saveSocialLinks(data: SocialLinks): Promise<void> {
    await setDoc(doc(db, 'settings', 'social'), data)
}

export async function getSEOSettings(): Promise<SEOSettings | null> {
    const snap = await getDoc(doc(db, 'settings', 'seo'))
    if (!snap.exists()) return null
    return snap.data() as SEOSettings
}

export async function saveSEOSettings(data: SEOSettings): Promise<void> {
    await setDoc(doc(db, 'settings', 'seo'), data)
}

// ─── Service Card Operations ─────────────────────────────────────────

export async function getServiceCards(): Promise<ServiceCardData[]> {
    const snapshot = await getDocs(collection(db, 'services'))
    const cards = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ServiceCardData))
    return cards.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export async function getVisibleServiceCards(): Promise<ServiceCardData[]> {
    const all = await getServiceCards()
    return all.filter(c => c.visible === true)
}

export async function getFeaturedServiceCards(): Promise<ServiceCardData[]> {
    const all = await getServiceCards()
    return all.filter(c => c.visible === true && c.featured === true)
}

export async function createServiceCard(data: Omit<ServiceCardData, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'services'), data)
    return docRef.id
}

export async function updateServiceCard(id: string, data: Partial<ServiceCardData>): Promise<void> {
    await updateDoc(doc(db, 'services', id), data)
}

export async function deleteServiceCard(id: string): Promise<void> {
    await deleteDoc(doc(db, 'services', id))
}

export async function seedDefaultServiceCards(): Promise<void> {
    const snapshot = await getDocs(collection(db, 'services'))
    if (!snapshot.empty) return

    const defaults: Omit<ServiceCardData, 'id'>[] = [
        {
            icon: 'Search',
            title: 'Neuro-SEO',
            benefit: 'Free Traffic from Google That Actually Converts',
            description: "Our proprietary Neuro-SEO method doesn't just rank pages - it ranks pages that actually convert visitors into customers.",
            features: ['Local SEO for Greater Noida', 'Conversion-Optimized Pages', 'Competitor Analysis', 'Monthly Performance Reports'],
            cta: 'Get SEO Audit',
            href: '/services/seo-greater-noida',
            gradient: 'from-primary-400 to-cyan-400',
            order: 0,
            visible: true,
            featured: true,
        },
        {
            icon: 'TrendingUp',
            title: 'Performance Marketing',
            benefit: 'Paid Ads That Make More Than They Cost',
            description: 'Stop wasting money on clicks. We build complete funnel systems that guarantee positive ROI on every rupee spent.',
            features: ['Facebook/Google Ads', 'ROI-Focused Campaigns', 'Conversion Tracking', 'Weekly Optimization'],
            cta: 'Optimize My Ads',
            href: '/services/performance-marketing',
            gradient: 'from-accent to-emerald-400',
            order: 1,
            visible: true,
            featured: true,
        },
        {
            icon: 'Target',
            title: 'Conversion Rate Optimization',
            benefit: 'Turn Visitors into Paying Customers',
            description: 'Why pay for more traffic when you can convert more of your existing visitors? We specialize in fixing leaky funnels.',
            features: ['Funnel Analysis', 'A/B Testing', 'Landing Page Design', 'Checkout Optimization'],
            cta: 'Fix My Funnel',
            href: '/services/conversion-optimization',
            gradient: 'from-orange-400 to-red-400',
            order: 2,
            visible: true,
            featured: false,
        },
        {
            icon: 'Globe',
            title: 'Brand Authority',
            benefit: 'Become The Industry Leader in Greater Noida',
            description: 'Build a brand that commands premium prices. We position you as the expert that customers trust automatically.',
            features: ['Content Strategy', 'PR & Outreach', 'Social Proof Systems', 'Industry Authority'],
            cta: 'Build My Brand',
            href: '/services/branding',
            gradient: 'from-purple-400 to-pink-400',
            order: 3,
            visible: true,
            featured: true,
        },
    ]

    for (const card of defaults) {
        await addDoc(collection(db, 'services'), card)
    }
}

// ─── Storage Operations ─────────────────────────────────────────

let _storage: ReturnType<typeof getStorage> | null = null
function getStorageInstance() {
    if (!_storage) {
        _storage = getStorage(app, 'gs://mayalok-ventures.firebasestorage.app')
    }
    return _storage
}

export function uploadImage(
    file: File,
    path: string,
    onProgress?: (percent: number) => void
): Promise<string> {
    const storage = getStorageInstance()
    const storageRef = ref(storage, path)

    return new Promise((resolve, reject) => {
        const task = uploadBytesResumable(storageRef, file)

        task.on('state_changed',
            (snapshot) => {
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                onProgress?.(percent)
            },
            (error) => {
                console.error('Firebase Storage upload error:', error.code, error.message)
                reject(error)
            },
            async () => {
                try {
                    const url = await getDownloadURL(task.snapshot.ref)
                    resolve(url)
                } catch (err) {
                    console.error('getDownloadURL error:', err)
                    reject(err)
                }
            }
        )
    })
}
