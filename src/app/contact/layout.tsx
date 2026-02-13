import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us | Start Your Growth Journey',
    description: 'Book a free consultation audit. Located in Greater Noida. Call us for SEO & Marketing services.',
    openGraph: {
        title: 'Contact Us | Start Your Growth Journey - Deeplink Creators',
        description: 'Book a free consultation audit. Located in Greater Noida. Call us for SEO & Marketing services.',
        url: 'https://deeplinkcreators.com/contact/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Us | Start Your Growth Journey - Deeplink Creators',
        description: 'Book a free consultation audit. Located in Greater Noida. Call us for SEO & Marketing services.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/contact/',
    },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children
}
