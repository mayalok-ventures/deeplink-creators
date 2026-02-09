'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getBlogByShortId } from '@/lib/firestore'

function ShortLinkResolver() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const shortId = searchParams.get('id')
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (!shortId) { setNotFound(true); return }
        getBlogByShortId(shortId).then(post => {
            if (post && post.published) {
                router.replace(`/blog/post/?slug=${post.slug}`)
            } else {
                setNotFound(true)
            }
        }).catch(() => setNotFound(true))
    }, [shortId, router])

    if (notFound) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-heading mb-4">Link Not Found</h1>
                    <p className="text-paragraph mb-6">This short link is invalid or expired.</p>
                    <a href="/" className="btn-primary">Go Home</a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
    )
}

export default function ShortLinkPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ShortLinkResolver />
        </Suspense>
    )
}
