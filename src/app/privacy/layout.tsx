import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | Deeplink Creators',
    description: 'Privacy Policy of Deeplink Creators, a unit of Mayalok Venture. Learn how we collect, use, and protect your personal data in compliance with Indian data protection laws.',
    robots: {
        index: false,
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
