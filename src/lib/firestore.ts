import {
    collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
    query, where, orderBy, limit, Timestamp, setDoc
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
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
        where('published', '==', true),
        orderBy('publishedAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as BlogPost))
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

// ─── Storage Operations ─────────────────────────────────────────

const storage = getStorage(app)

export async function uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
}
