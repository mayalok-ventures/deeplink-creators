import type { MetadataRoute } from 'next'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey: "AIzaSyC-GjOsncZtHG-Zq7jh-ioyFl7Phv98NO8",
    authDomain: "mayalok-ventures.firebaseapp.com",
    projectId: "mayalok-ventures",
    storageBucket: "mayalok-ventures.firebasestorage.app",
    messagingSenderId: "6750906250",
    appId: "1:6750906250:web:497b788e75f5ff1bee0a73",
}

async function getPublishedBlogSlugs(): Promise<{ slug: string; updatedAt?: any }[]> {
    try {
        const app = getApps().length === 0 ? initializeApp(firebaseConfig, 'sitemap') : getApps().find(a => a.name === 'sitemap') || initializeApp(firebaseConfig, 'sitemap')
        const db = getFirestore(app, 'deeplink')
        const q = query(collection(db, 'blogs'), where('published', '==', true))
        const snapshot = await getDocs(q)
        return snapshot.docs.map(doc => {
            const data = doc.data()
            return { slug: data.slug, updatedAt: data.updatedAt }
        })
    } catch (err) {
        console.error('Sitemap: Failed to fetch blogs', err)
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://deeplinkcreators.com'

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/services/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services/custom-saas-development/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/social-commerce/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/ai-marketing-automation/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/brand-psychology/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/conversion-web-design/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/industrial-seo/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services/performance-marketing/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/testimonials/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/results/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    const blogs = await getPublishedBlogSlugs()
    const blogRoutes: MetadataRoute.Sitemap = blogs.map(blog => ({
        url: `${baseUrl}/blog/post/?slug=${blog.slug}`,
        lastModified: blog.updatedAt?.toDate ? blog.updatedAt.toDate() : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticRoutes, ...blogRoutes]
}
