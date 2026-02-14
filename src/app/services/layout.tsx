import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Digital Marketing Services in Greater Noida & Noida | SEO, PPC & Branding',
    description: 'Full-stack digital marketing services in Greater Noida & Delhi NCR — SEO, Google Ads, PPC management, performance marketing & branding. ROI-focused campaigns designed for real revenue growth.',
    openGraph: {
        title: 'Digital Marketing Services in Greater Noida & Noida | Deeplink Creators',
        description: 'Full-stack digital marketing services — SEO, Google Ads, PPC, performance marketing & branding for Greater Noida, Noida & Delhi NCR businesses.',
        url: 'https://deeplinkcreators.com/services/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Digital Marketing Services | Deeplink Creators',
        description: 'SEO, Google Ads, PPC, performance marketing & branding for Greater Noida & Delhi NCR.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/',
    },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children
}
