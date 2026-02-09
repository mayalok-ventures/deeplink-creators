import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Digital Marketing Services in Greater Noida & Noida | SEO, PPC, Branding | Deeplink Creators',
    description: 'Full-service digital marketing agency in Greater Noida & Noida. SEO services, performance marketing, Google Ads, Facebook Ads, PPC, branding, and lead generation for businesses in Delhi NCR.',
    keywords: ['digital marketing services Greater Noida', 'SEO services Noida', 'performance marketing Greater Noida', 'PPC services Noida', 'Google Ads Greater Noida', 'branding agency Delhi NCR', 'lead generation Noida'],
    openGraph: {
        title: 'Digital Marketing Services | SEO, PPC, Branding | Deeplink Creators',
        description: 'Full-service digital marketing in Greater Noida & Noida. SEO, Google Ads, PPC, branding for Delhi NCR businesses.',
        url: 'https://deeplinkcreators.com/services/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Digital Marketing Services | Deeplink Creators',
        description: 'SEO, PPC, Google Ads, branding for Greater Noida, Noida & Delhi NCR businesses.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/',
    },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children
}
