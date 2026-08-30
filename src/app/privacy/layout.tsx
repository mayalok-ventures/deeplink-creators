import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | Deeplink Creators',
    description: 'Privacy Policy of Deeplink Creators (A Unit of Mayalok Venture). Learn how we collect, use, and protect your personal data in compliance with the Digital Personal Data Protection (DPDP) Act.',
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Privacy Policy | Deeplink Creators',
        description: 'How Deeplink Creators collects, uses, and protects your personal data.',
        url: 'https://deeplinkcreators.com/privacy/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/privacy/',
    },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return children
}
