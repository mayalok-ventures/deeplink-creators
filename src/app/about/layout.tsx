import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us | Premier Revenue Engineering Firm in NCR',
    description: 'Learn about Deeplink Creators — a premier revenue-engineering unit of Mayalok Venture. We combine Data Science with Neuro-Marketing to build predictable growth systems for Enterprise & High-Ticket Businesses.',
    openGraph: {
        title: 'About Deeplink Creators | Revenue Engineering & Growth Systems',
        description: 'We combine Data Science with Neuro-Marketing to build predictable growth systems for Enterprise & High-Ticket Businesses in NCR and across India.',
        url: 'https://deeplinkcreators.com/about/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Deeplink Creators | Revenue Engineering & Growth Systems',
        description: 'Data Science + Neuro-Marketing. Predictable growth systems for Enterprise & High-Ticket Businesses in NCR.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/about/',
    },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children
}
