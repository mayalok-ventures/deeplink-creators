import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Enterprise Offerings & Software Holdings | Deeplink Creators',
    description: 'Explore Deeplink Creators’ enterprise capabilities: Proprietary B2B SaaS engineering, creator-led distribution networks, high-ticket revenue systems, and 30-day Sahyak CRM client deployment.',
    openGraph: {
        title: 'Enterprise Offerings & Software Holdings | Deeplink Creators',
        description: 'Explore Deeplink Creators’ enterprise capabilities: Proprietary B2B SaaS engineering, creator-led distribution networks, high-ticket revenue systems, and 30-day Sahyak CRM client deployment.',
        url: 'https://deeplinkcreators.com/services/',
        type: 'website',
        images: [
            {
                url: '/images/hero-enterprise-architecture.jpg',
                width: 1200,
                height: 630,
                alt: 'Deeplink Creators Enterprise Offerings & Software Holdings',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Enterprise Offerings & Software Holdings | Deeplink Creators',
        description: 'B2B SaaS engineering, creator-led distribution, revenue systems, and Sahyak CRM deployment.',
        images: ['/images/hero-enterprise-architecture.jpg'],
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/services/',
    },
}

// Service ItemList Schema
const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Enterprise Offerings & Software Holdings",
    "description": "Core software infrastructure and creator-led distribution offerings by Deeplink Creators",
    "url": "https://deeplinkcreators.com/services/",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "item": {
                "@type": "Service",
                "name": "Proprietary B2B SaaS Engineering",
                "description": "Design and engineering of multi-tenant, mobile-ready software platforms, workflow automation, and role-based access systems.",
                "provider": {
                    "@id": "https://deeplinkcreators.com/#organization"
                },
                "url": "https://deeplinkcreators.com/services/#software-engineering"
            }
        },
        {
            "@type": "ListItem",
            "position": 2,
            "item": {
                "@type": "Service",
                "name": "Creator-Led Distribution",
                "description": "Structuring curated creator ecosystems into accountable distribution channels connecting enterprise offerings with niche audiences.",
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
                "name": "High-Ticket Revenue & Pipeline Systems",
                "description": "Lead routing, follow-up discipline, and pipeline visibility systems designed to stop revenue leakage in high-ticket enterprise sales.",
                "provider": {
                    "@id": "https://deeplinkcreators.com/#organization"
                },
                "url": "https://deeplinkcreators.com/services/#revenue-systems"
            }
        },
        {
            "@type": "ListItem",
            "position": 4,
            "item": {
                "@type": "Service",
                "name": "Enterprise Systems Advisory",
                "description": "Strategic guidance on software architecture, operational workflow design, and distribution infrastructure backed by Mayalok Venture.",
                "provider": {
                    "@id": "https://deeplinkcreators.com/#organization"
                },
                "url": "https://deeplinkcreators.com/services/#systems-advisory"
            }
        },
        {
            "@type": "ListItem",
            "position": 5,
            "item": {
                "@type": "Service",
                "name": "Sahyak CRM Client Deployment Benefit",
                "description": "Complimentary 30-day access to Sahyak CRM included with eligible service engagements to centralize lead ownership and follow-up discipline.",
                "provider": {
                    "@id": "https://deeplinkcreators.com/#organization"
                },
                "url": "https://deeplinkcreators.com/services/#sahyak-crm"
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
