import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Enterprise Briefing Intake Desk | Deeplink Creators',
    description: 'Initiate an enterprise briefing with Deeplink Creators to discuss proprietary B2B software infrastructure, Sahyak CRM deployment, or creator-led distribution channels.',
    openGraph: {
        title: 'Enterprise Briefing Intake Desk | Deeplink Creators',
        description: 'Initiate an enterprise briefing with Deeplink Creators to discuss proprietary B2B software infrastructure, Sahyak CRM deployment, or creator-led distribution channels.',
        url: 'https://deeplinkcreators.com/contact/',
        type: 'website',
        images: [
            {
                url: '/images/Revenue Architecture Office.jpeg',
                width: 1200,
                height: 630,
                alt: 'Deeplink Creators Enterprise Briefing Desk',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Enterprise Briefing Intake Desk | Deeplink Creators',
        description: 'Submit operational context for B2B SaaS engineering, Sahyak CRM, or creator distribution.',
        images: ['/images/Revenue Architecture Office.jpeg'],
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/contact/',
    },
}

const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://deeplinkcreators.com/contact/#contactpage",
    "name": "Enterprise Briefing Intake Desk — Deeplink Creators",
    "description": "Submit operational requirements and context for software infrastructure, Sahyak CRM deployment, and creator-led distribution.",
    "url": "https://deeplinkcreators.com/contact/",
    "mainEntity": {
        "@id": "https://deeplinkcreators.com/#organization"
    }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            {children}
        </>
    )
}
