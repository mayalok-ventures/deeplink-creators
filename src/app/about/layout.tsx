import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Deeplink Creators | Commercial Growth Infrastructure',
    description: 'Learn about Deeplink Creators—a technology and growth company building connected commercial systems: proprietary operating software (Sahyak CRM), managed creator distribution, and performance demand systems.',
    openGraph: {
        title: 'About Deeplink Creators | Commercial Growth Infrastructure',
        description: 'Software, creator distribution, and demand growth systems engineered to connect customer acquisition directly to sales execution.',
        url: 'https://deeplinkcreators.com/about/',
        type: 'website',
        images: [
            {
                url: '/images/hero-enterprise-architecture.jpg',
                width: 1200,
                height: 630,
                alt: 'Deeplink Creators — Software, Distribution & Growth Systems',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Deeplink Creators | Commercial Growth Infrastructure',
        description: 'Software, creator distribution, and demand growth systems connecting acquisition to sales execution.',
        images: ['/images/hero-enterprise-architecture.jpg'],
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/about/',
    },
}

const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://deeplinkcreators.com/about/#aboutpage",
    "name": "About Deeplink Creators",
    "description": "Deeplink Creators builds and operates connected commercial growth infrastructure, combining proprietary sales operating software (Sahyak CRM), managed creator distribution networks, and demand growth systems.",
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

