import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Deeplink Creators | Free ROI Audit & Strategy Session',
    description: 'Get in touch with the top digital marketing agency in Greater Noida. Book a free ROI audit, request a custom SEO or PPC proposal, or schedule a strategy call for your business in Noida & Delhi NCR.',
    openGraph: {
        title: 'Contact Deeplink Creators | Free ROI Audit & Strategy Session',
        description: 'Book a free ROI audit or schedule a strategy call with the top digital marketing agency in Greater Noida & Delhi NCR.',
        url: 'https://deeplinkcreators.com/contact/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Deeplink Creators | Free Strategy Session',
        description: 'Book a free ROI audit with the best digital marketing agency in Greater Noida & Delhi NCR.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/contact/',
    },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children
}
