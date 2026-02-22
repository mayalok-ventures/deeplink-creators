import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where, limit } from 'firebase/firestore/lite'
import { firebaseConfig } from './firebase-config'

function getDb() {
    const app = getApps().find(a => a.name === 'server') || initializeApp(firebaseConfig, 'server')
    return getFirestore(app, 'deeplink')
}

export interface BlogPostData {
    title: string
    slug: string
    shortId: string
    content: string
    excerpt: string
    coverImage: string
    author: string
    tags: string[]
    published: boolean
    publishedAt: any
    updatedAt: any
    seoTitle: string
    seoDescription: string
    keywords: string
}

export async function getPublishedBlogSlugs(): Promise<{ slug: string; updatedAt?: any }[]> {
    try {
        const db = getDb()
        const q = query(collection(db, 'blogs'), where('published', '==', true))
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => {
            const data = doc.data()
            return { slug: data.slug, updatedAt: data.updatedAt }
        })
    } catch (err) {
        console.error('Server: Failed to fetch blog slugs', err)
        return []
    }
}

export async function getBlogBySlugServer(slug: string): Promise<BlogPostData | null> {
    try {
        const db = getDb()
        const q = query(collection(db, 'blogs'), where('slug', '==', slug), where('published', '==', true), limit(1))
        const snapshot = await getDocs(q)
        if (snapshot.empty) return null
        return snapshot.docs[0].data() as BlogPostData
    } catch (err) {
        console.error('Server: Failed to fetch blog by slug', err)
        return null
    }
}

export async function getAllPublishedBlogs(): Promise<BlogPostData[]> {
    try {
        const db = getDb()
        const q = query(collection(db, 'blogs'), where('published', '==', true))
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => doc.data() as BlogPostData)
    } catch (err) {
        console.error('Server: Failed to fetch blogs', err)
        return []
    }
}
