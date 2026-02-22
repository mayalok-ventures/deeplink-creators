import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Deeplink Creators | Free ROI Audit & Strategy Session',
    description: 'Get in touch with India\'s leading revenue-focused digital marketing agency. Book a free ROI audit, request a custom SEO or performance marketing proposal, or schedule a strategy call.',
    openGraph: {
        title: 'Contact Deeplink Creators | Free ROI Audit & Strategy Session',
        description: 'Book a free ROI audit or schedule a strategy call with Deeplink Creators — revenue-focused digital marketing agency.',
        url: 'https://deeplinkcreators.com/contact/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Deeplink Creators | Free Strategy Session',
        description: 'Book a free ROI audit with Deeplink Creators — revenue-focused digital marketing agency.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/contact/',
    },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children
}
