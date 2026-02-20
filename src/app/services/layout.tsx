import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Digital Marketing Services in India | SEO, Performance Marketing & Lead Generation',
    description: 'Full-stack digital marketing services in India — enterprise SEO, Google Ads, PPC management, performance marketing, lead generation & revenue-focused strategies. ROI-driven campaigns designed for real revenue growth.',
    openGraph: {
        title: 'Digital Marketing Services in India | Deeplink Creators',
        description: 'Full-stack digital marketing services — enterprise SEO, Google Ads, PPC, performance marketing & lead generation for businesses across India.',
        url: 'https://deeplinkcreators.com/services/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Digital Marketing Services | Deeplink Creators',
        description: 'Enterprise SEO, Google Ads, PPC, performance marketing & lead generation across India.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/',
    },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children
}
