import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Institutional Prospectus & Holding Profile | Deeplink Creators',
    description: 'Learn about Deeplink Creators—an enterprise software holding and venture studio operating under Mayalok Venture, engineering durable software and creator distribution systems.',
    openGraph: {
        title: 'Institutional Prospectus & Holding Profile | Deeplink Creators',
        description: 'Deeplink Creators is an AI-first enterprise software holding and venture studio operating under Mayalok Venture, building proprietary B2B SaaS and creator-led distribution.',
        url: 'https://deeplinkcreators.com/about/',
        type: 'website',
        images: [
            {
                url: '/images/Revenue Architecture Office.jpeg',
                width: 1200,
                height: 630,
                alt: 'Deeplink Creators Holding Profile & Prospectus',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Institutional Prospectus & Holding Profile | Deeplink Creators',
        description: 'Enterprise software holding & venture studio backed by Mayalok Venture.',
        images: ['/images/Revenue Architecture Office.jpeg'],
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/about/',
    },
}

const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://deeplinkcreators.com/about/#aboutpage",
    "name": "Institutional Prospectus — Deeplink Creators",
    "description": "Deeplink Creators is an enterprise software holding and venture studio operating under Mayalok Venture.",
    "url": "https://deeplinkcreators.com/about/",
    "mainEntity": {
        "@id": "https://deeplinkcreators.com/#organization"
    }
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />
            {children}
        </>
    )
}
