'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getBlogByShortId } from '@/lib/firestore'

export default function ShortLinkRedirect() {
    const params = useParams()
    const router = useRouter()
    const shortId = params?.id as string
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        if (!shortId) return
        getBlogByShortId(shortId).then(post => {
            if (post && post.published) {
                router.replace(`/blog/${post.slug}`)
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
