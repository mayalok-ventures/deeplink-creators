import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Insights & Technical Briefings | Deeplink Creators',
    description: 'Technical perspectives and strategic briefings on enterprise software architecture, creator-led distribution networks, pipeline systems, and venture execution.',
    openGraph: {
        title: 'Insights & Technical Briefings | Deeplink Creators',
        description: 'Technical perspectives and strategic briefings on enterprise software architecture, creator-led distribution networks, pipeline systems, and venture execution.',
        url: 'https://deeplinkcreators.com/blog/',
        type: 'website',
        images: [
            {
                url: '/images/hero/hero-blog.webp',
                width: 1200,
                height: 630,
                alt: 'Deeplink Creators Insights & Technical Briefings',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Insights & Technical Briefings | Deeplink Creators',
        description: 'Strategic briefings on software architecture, creator distribution, and venture execution.',
        images: ['/images/hero/hero-blog.webp'],
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/blog/',
    },
}

const blogIndexSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://deeplinkcreators.com/blog/#collectionpage",
    "name": "Insights & Technical Briefings — Deeplink Creators",
    "description": "Technical perspectives on enterprise software architecture, creator-led distribution, and venture execution.",
    "url": "https://deeplinkcreators.com/blog/",
    "publisher": {
        "@id": "https://deeplinkcreators.com/#organization"
    }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema) }}
            />
            {children}
        </>
    )
}
