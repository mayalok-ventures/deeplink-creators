import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Digital Marketing & Performance Marketing Agency in Noida | Deeplink Creators',
    description: 'Noida\'s premium B2B digital marketing agency. Enterprise SEO, performance marketing, lead generation & pipeline-focused revenue architecture for IT, SaaS & corporate brands in Noida.',
    keywords: [
        'digital marketing agency in noida',
        'digital marketing company in noida',
        'performance marketing agency in noida',
        'seo company in noida',
        'seo services in noida',
        'google ads agency in noida',
        'ppc services in noida',
        'b2b lead generation company in noida',
        'enterprise SEO services Noida',
        'ROI driven digital marketing Noida',
        'revenue marketing agency Noida',
        'SaaS marketing agency Noida',
        'growth marketing agency in noida',
        'lead generation agency in noida',
    ],
    openGraph: {
        title: 'Digital Marketing & Performance Marketing Agency in Noida | Deeplink Creators',
        description: 'Noida\'s premium B2B digital marketing agency. Enterprise SEO, performance marketing & pipeline-focused revenue architecture.',
        url: 'https://deeplinkcreators.com/locations/noida/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Digital Marketing Agency in Noida | Deeplink Creators',
        description: 'Enterprise SEO, performance marketing & B2B lead generation for Noida businesses.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/locations/noida/',
    },
}

export default function NoidaLayout({ children }: { children: React.ReactNode }) {
    return children
}
