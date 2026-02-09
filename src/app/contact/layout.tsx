import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us | Deeplink Creators — Digital Marketing Agency Greater Noida',
    description: 'Contact Deeplink Creators for SEO services, performance marketing, Google Ads, PPC, and branding in Greater Noida, Noida & Delhi NCR. Get your FREE ROI Audit today.',
    keywords: ['contact digital marketing agency Greater Noida', 'SEO services contact Noida', 'free SEO audit Greater Noida', 'digital marketing consultation Delhi NCR'],
    openGraph: {
        title: 'Contact Deeplink Creators | Free ROI Audit',
        description: 'Get your FREE ROI Audit. SEO, performance marketing & branding for businesses in Greater Noida, Noida & Delhi NCR.',
        url: 'https://deeplinkcreators.com/contact/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Deeplink Creators | Free ROI Audit',
        description: 'Get your FREE ROI Audit. SEO, performance marketing & branding for Greater Noida & Delhi NCR businesses.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/contact/',
    },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children
}
