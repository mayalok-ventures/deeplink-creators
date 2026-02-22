import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Performance Marketing & Digital Marketing Agency in Greater Noida | Deeplink Creators',
    description: 'Scaling Greater Noida\'s Real Estate, Education & B2B brands with data-driven revenue architecture. Enterprise SEO, performance marketing & lead generation agency in Greater Noida.',
    keywords: [
        'digital marketing agency in greater noida',
        'digital marketing company in greater noida',
        'performance marketing agency in greater noida',
        'seo company in greater noida',
        'seo services in greater noida',
        'google ads agency in greater noida',
        'b2b lead generation company in greater noida',
        'real estate digital marketing agency Greater Noida',
        'enterprise SEO services Greater Noida',
        'ROI driven digital marketing Greater Noida',
        'revenue marketing agency Greater Noida',
        'lead generation for builders Greater Noida',
        'growth marketing agency in greater noida',
    ],
    openGraph: {
        title: 'Performance Marketing & Digital Marketing Agency in Greater Noida | Deeplink Creators',
        description: 'Scaling Greater Noida\'s Real Estate, Education & B2B brands with data-driven revenue architecture.',
        url: 'https://deeplinkcreators.com/locations/greater-noida/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Digital Marketing Agency in Greater Noida | Deeplink Creators',
        description: 'Enterprise SEO, performance marketing & lead generation for Greater Noida businesses.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/locations/greater-noida/',
    },
}

export default function GreaterNoidaLayout({ children }: { children: React.ReactNode }) {
    return children
}
