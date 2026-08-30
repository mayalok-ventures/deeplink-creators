import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms & Conditions | Deeplink Creators',
    description: 'Terms and Conditions governing services and software platforms provided by Deeplink Creators (A Unit of Mayalok Venture).',
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Terms & Conditions | Deeplink Creators',
        description: 'Service agreement and terms governing Deeplink Creators enterprise engagements.',
        url: 'https://deeplinkcreators.com/terms/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/terms/',
    },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return children
}
