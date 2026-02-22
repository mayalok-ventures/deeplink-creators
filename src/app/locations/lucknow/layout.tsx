import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Digital Marketing Agency in Lucknow | Deeplink Creators',
    description: 'Lucknow\'s trusted digital marketing agency for local businesses, retailers & service providers. Local SEO, Google Ads, lead generation & conversion-focused digital marketing in Lucknow, UP.',
    keywords: [
        'digital marketing agency in lucknow',
        'digital marketing company in lucknow',
        'performance marketing agency in lucknow',
        'seo company in lucknow',
        'seo services in lucknow',
        'google ads agency in lucknow',
        'lead generation company in lucknow',
        'local seo services lucknow',
        'google maps optimization lucknow',
        'ROI driven digital marketing Lucknow',
        'growth marketing agency lucknow',
    ],
    openGraph: {
        title: 'Digital Marketing Agency in Lucknow | Deeplink Creators',
        description: 'Lucknow\'s trusted digital marketing agency. Local SEO, Google Ads & conversion-focused lead generation for businesses in Lucknow.',
        url: 'https://deeplinkcreators.com/locations/lucknow/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Digital Marketing Agency in Lucknow | Deeplink Creators',
        description: 'Local SEO, Google Ads & lead generation for Lucknow businesses.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/locations/lucknow/',
    },
}

export default function LucknowLayout({ children }: { children: React.ReactNode }) {
    return children
}
