import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Digital Marketing & Growth Marketing Agency in Delhi | Deeplink Creators',
    description: 'Delhi\'s premium digital marketing agency for D2C, legacy brands & startups. Performance marketing, enterprise SEO, brand authority & revenue-focused growth architecture in Delhi NCR.',
    keywords: [
        'digital marketing agency in delhi',
        'digital marketing company in delhi',
        'performance marketing agency in delhi',
        'seo company in delhi',
        'seo services in delhi',
        'google ads agency in delhi',
        'b2b lead generation company in delhi',
        'D2C marketing agency in delhi',
        'enterprise SEO services Delhi',
        'ROI driven digital marketing Delhi',
        'revenue marketing agency Delhi',
        'growth marketing agency in delhi',
        'lead generation agency in delhi',
        'digital marketing agency delhi NCR',
    ],
    openGraph: {
        title: 'Digital Marketing & Growth Marketing Agency in Delhi | Deeplink Creators',
        description: 'Delhi\'s premium digital marketing agency for D2C, legacy brands & startups. Performance marketing & revenue-focused growth architecture.',
        url: 'https://deeplinkcreators.com/locations/delhi/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Digital Marketing Agency in Delhi | Deeplink Creators',
        description: 'Performance marketing, enterprise SEO & brand authority for Delhi businesses.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/locations/delhi/',
    },
}

export default function DelhiLayout({ children }: { children: React.ReactNode }) {
    return children
}
