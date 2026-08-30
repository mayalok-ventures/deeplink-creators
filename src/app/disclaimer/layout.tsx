import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Disclaimer | Deeplink Creators',
    description: 'Disclaimer and enterprise engagement policies for Deeplink Creators (A Unit of Mayalok Venture).',
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Disclaimer | Deeplink Creators',
        description: 'Enterprise engagement disclaimer for Deeplink Creators.',
        url: 'https://deeplinkcreators.com/disclaimer/',
        type: 'website',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/disclaimer/',
    },
}

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
    return children
}
