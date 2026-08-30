'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function BlogPostRedirector() {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const slug = searchParams.get('slug')
        if (slug) {
            // Clean legacy slugs mapping
            if (slug === 'fake-seo-agency-scams-google-warning-list' ||
                slug === 'business-growth-strategies-entrepreneurs-2026' ||
                slug === 'digital-marketing-strategy-india-leads-revenue' ||
                slug === 'google-seo-starter-guide-simplified-for-business' ||
                slug === 'advanced-website-seo-maintenance-guide' ||
                slug === 'post') {
                router.replace('/blog/')
            } else {
                router.replace(`/blog/${encodeURIComponent(slug)}/`)
            }
        } else {
            router.replace('/blog/')
        }
    }, [searchParams, router])

    return (
        <div className="min-h-screen bg-[#0F1112] text-[#AAA99F] flex items-center justify-center font-mono text-xs">
            <div className="text-center space-y-2">
                <div className="inline-block animate-spin w-5 h-5 border-2 border-[#9B7545] border-t-transparent rounded-full" />
                <p>Redirecting to canonical publication...</p>
            </div>
        </div>
    )
}

export default function BlogPostLegacyRoute() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0F1112] text-[#AAA99F] flex items-center justify-center font-mono text-xs">
                <p>Loading publication route...</p>
            </div>
        }>
            <BlogPostRedirector />
        </Suspense>
    )
}
