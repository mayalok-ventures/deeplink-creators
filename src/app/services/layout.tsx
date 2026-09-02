import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Offerings & Commercial Growth Systems | Deeplink Creators',
    description: 'Explore Deeplink Creators’ commercial growth infrastructure: Proprietary sales software (Sahyak CRM), managed creator distribution networks, and demand acquisition systems.',
    openGraph: {
        title: 'Offerings & Commercial Growth Systems | Deeplink Creators',
        description: 'Explore Deeplink Creators’ commercial growth infrastructure: Proprietary sales software (Sahyak CRM), managed creator distribution networks, and demand acquisition systems.',
        url: 'https://deeplinkcreators.com/services/',
        type: 'website',
        images: [
            {
                url: '/images/hero-enterprise-architecture.jpg',
                width: 1200,
                height: 630,
                alt: 'Deeplink Creators Offerings & Commercial Growth Systems',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Offerings & Commercial Growth Systems | Deeplink Creators',
        description: 'Proprietary sales software (Sahyak CRM), managed creator distribution networks, and demand acquisition systems.',
        images: ['/images/hero-enterprise-architecture.jpg'],
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/',
    },
}

// Structured ItemList Schema reflecting the 3 Connected Growth Systems
const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Deeplink Creators Commercial Growth Systems",
    "description": "Operating software, creator distribution networks, and performance demand systems built by Deeplink Creators.",
    "url": "https://deeplinkcreators.com/services/",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "item": {
                "@type": "Service",
                "name": "Proprietary Operating Software (Sahyak CRM)",
                "description": "Sales pipeline operating system for multi-channel lead ingestion, qualification stage gates, rep routing, and deal conversion visibility.",
                "provider": {
                    "@id": "https://deeplinkcreators.com/#organization"
                },
                "url": "https://deeplinkcreators.com/services/#operating-software"
            }
        },
        {
            "@type": "ListItem",
            "position": 2,
            "item": {
                "@type": "Service",
                "name": "Managed Creator Distribution Networks",
                "description": "Curated creator networks structured into accountable acquisition channels connecting businesses to targeted local, regional, and industry audiences.",
                "provider": {
                    "@id": "https://deeplinkcreators.com/#organization"
                },
                "url": "https://deeplinkcreators.com/services/#creator-distribution"
            }
        },
        {
            "@type": "ListItem",
            "position": 3,
            "item": {
                "@type": "Service",
                "name": "Demand & Performance Growth Systems",
                "description": "High-intent search infrastructure (SEO), precision performance marketing, conversion web architecture, and automated pipeline workflows.",
                "provider": {
                    "@id": "https://deeplinkcreators.com/#organization"
                },
                "url": "https://deeplinkcreators.com/services/#growth-systems"
            }
        },
        {
            "@type": "ListItem",
            "position": 4,
            "item": {
                "@type": "Service",
                "name": "Custom Commercial Software & Portals",
                "description": "Engineering bespoke internal sales portals, distributor networks, business dashboards, and custom SaaS platforms for complex operations.",
                "provider": {
                    "@id": "https://deeplinkcreators.com/#organization"
                },
                "url": "https://deeplinkcreators.com/services/#custom-systems"
            }
        }
    ]
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
            />
            {children}
        </>
    )
}
