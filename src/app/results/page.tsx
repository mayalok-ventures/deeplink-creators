'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ResultsRedirect() {
    const router = useRouter()

    useEffect(() => {
        router.replace('/blog')
    }, [router])

    return (
        <>
            <meta httpEquiv="refresh" content="0;url=/blog/" />
            <link rel="canonical" href="https://deeplinkcreators.com/blog/" />
            <div className="min-h-screen bg-dark flex items-center justify-center">
                <p className="text-paragraph">Redirecting to <a href="/blog/">Blog</a>…</p>
            </div>
        </>
    )
}
