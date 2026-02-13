import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Our Services | SEO, PPC & Branding',
    description: 'Explore our high-ROI marketing services: Search Engine Optimization, Pay-Per-Click, and Corporate Identity Design.',
    openGraph: {
        title: 'Our Services | SEO, PPC & Branding - Deeplink Creators',
        description: 'Explore our high-ROI marketing services: Search Engine Optimization, Pay-Per-Click, and Corporate Identity Design.',
        url: 'https://deeplinkcreators.com/services/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Services | SEO, PPC & Branding - Deeplink Creators',
        description: 'Explore our high-ROI marketing services: SEO, PPC, and Corporate Identity Design.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/',
    },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children
}
