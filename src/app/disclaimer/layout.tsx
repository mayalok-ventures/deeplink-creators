import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Disclaimer | Deeplink Creators',
    description: 'Disclaimer for Deeplink Creators, a unit of Mayalok Venture. Earnings disclaimer, liability waiver, and third-party platform disclaimers for our digital marketing services.',
    robots: {
        index: false,
        follow: true,
    },
    openGraph: {
        title: 'Disclaimer | Deeplink Creators',
        description: 'Earnings disclaimer and liability waiver for Deeplink Creators digital marketing services.',
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
