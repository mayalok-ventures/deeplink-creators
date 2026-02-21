import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Best Digital Marketing & Performance Marketing Agency in Noida | Deeplink Creators',
    description: 'Noida\'s premium B2B digital marketing agency. Enterprise SEO, performance marketing, lead generation & pipeline-focused revenue architecture for IT, SaaS & corporate brands in Noida.',
    keywords: [
        'best digital marketing agency in noida',
        'digital marketing company in noida',
        'digital marketing services in noida',
        'performance marketing agency in noida',
        'seo company in noida',
        'seo services in noida',
        'best seo agency in noida',
        'google ads agency in noida',
        'ppc services in noida',
        'b2b lead generation company in noida',
        'digital marketing agency for IT companies in noida',
        'enterprise SEO services Noida',
        'ROI driven digital marketing Noida',
        'customer acquisition agency Noida',
        'revenue marketing agency Noida',
        'top digital marketing agency in noida',
        'SaaS marketing agency Noida',
        'corporate digital marketing agency Noida',
        'website development company in noida',
        'growth marketing agency in noida',
        'lead generation agency in noida',
        'social media marketing agency noida',
    ],
    openGraph: {
        title: 'Best Digital Marketing & Performance Marketing Agency in Noida | Deeplink Creators',
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
