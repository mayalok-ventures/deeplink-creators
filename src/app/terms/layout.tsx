import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms & Conditions | Deeplink Creators',
    description: 'Terms and Conditions governing services provided by Deeplink Creators, a unit of Mayalok Venture. Read our service agreement, payment terms, and legal policies.',
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: 'Terms & Conditions | Deeplink Creators',
        description: 'Service agreement and terms governing Deeplink Creators digital marketing services.',
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
