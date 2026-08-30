import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import '@/styles/animations.css'
import LayoutShell from '@/components/LayoutShell'
import GlobalScrollWrapper from '@/components/GlobalScrollWrapper'
import AnimationProvider from '@/components/AnimationProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
    metadataBase: new URL('https://deeplinkcreators.com'),
    title: {
        default: 'Enterprise Software & Creator-Led Distribution | Deeplink Creators',
        template: '%s | Deeplink Creators'
    },
    description: 'Deeplink Creators, backed by Mayalok Venture, builds B2B software infrastructure including Sahyak CRM and creator-led distribution systems for enterprises.',
    keywords: [
        'Deeplink Creators',
        'Enterprise Software Holding',
        'Venture Studio',
        'Mayalok Venture',
        'Sahyak CRM',
        'B2B SaaS Engineering',
        'Creator-Led Distribution',
        'Revenue Infrastructure',
        'Enterprise Workflow Automation',
        'Multi-tenant SaaS Architecture'
    ],
    authors: [{ name: 'Deeplink Creators', url: 'https://deeplinkcreators.com' }],
    creator: 'Deeplink Creators',
    publisher: 'Deeplink Creators',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://deeplinkcreators.com',
        siteName: 'Deeplink Creators',
        title: 'Enterprise Software & Creator-Led Distribution | Deeplink Creators',
        description: 'Deeplink Creators, backed by Mayalok Venture, builds B2B software infrastructure including Sahyak CRM and creator-led distribution systems for enterprises.',
        images: [
            {
                url: '/images/hero-enterprise-architecture.jpg',
                width: 1200,
                height: 630,
                alt: 'Deeplink Creators — Enterprise Software Holding & Creator-Led Distribution',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Enterprise Software & Creator-Led Distribution | Deeplink Creators',
        description: 'Deeplink Creators, backed by Mayalok Venture, builds B2B software infrastructure including Sahyak CRM and creator-led distribution systems for enterprises.',
        images: ['/images/hero-enterprise-architecture.jpg'],
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/',
    },
    verification: {
        google: 'RQdag9sYAeymMOf0hRU0xM9u9PZchznqgnhnyt-6uEI',
    },
}

// Consolidated, Verified Organization and WebSite Schema Graph
const rootSchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": "https://deeplinkcreators.com/#organization",
            "name": "Deeplink Creators",
            "legalName": "Deeplink Creators (A Unit of Mayalok Venture)",
            "alternateName": ["Deeplink Creators Holding", "Deeplink Venture Studio"],
            "url": "https://deeplinkcreators.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://deeplinkcreators.com/images/logo.svg",
                "caption": "Deeplink Creators"
            },
            "image": "https://deeplinkcreators.com/images/hero-enterprise-architecture.jpg",
            "description": "Deeplink Creators is an enterprise software holding and venture studio operating under Mayalok Venture. It builds B2B software infrastructure, including Sahyak CRM, and creator-led distribution systems for enterprises.",
            "telephone": "+91 97116 10928",
            "email": "kunal@deeplinkcreators.com",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Greater Noida",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "201310",
                "addressCountry": "IN"
            },
            "parentOrganization": {
                "@type": "Organization",
                "name": "Mayalok Venture",
                "url": "https://mayalokventures.com"
            },
            "founder": [
                {
                    "@type": "Person",
                    "name": "Kunal Pratap Singh",
                    "jobTitle": "Founder"
                },
                {
                    "@type": "Person",
                    "name": "Dileep Yadav",
                    "jobTitle": "Co-founder"
                }
            ],
            "sameAs": [
                "https://mayalokventures.com",
                "https://sahyak.com"
            ],
            "knowsAbout": [
                "B2B SaaS Engineering",
                "Sahyak CRM",
                "Creator-Led Distribution",
                "Revenue Infrastructure",
                "Multi-tenant SaaS Architecture",
                "Enterprise Systems Advisory"
            ]
        },
        {
            "@type": "WebSite",
            "@id": "https://deeplinkcreators.com/#website",
            "url": "https://deeplinkcreators.com",
            "name": "Deeplink Creators",
            "publisher": {
                "@id": "https://deeplinkcreators.com/#organization"
            },
            "inLanguage": "en-US"
        }
    ]
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
                <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="theme-color" content="#171816" />
                <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
                <link rel="dns-prefetch" href="https://deeplinkcreators.com" />

                {/* Local & Geographic Entity Metadata */}
                <meta name="geo.region" content="IN-UP" />
                <meta name="geo.placename" content="Greater Noida, Uttar Pradesh" />
                <meta name="language" content="English" />
                <meta name="google-site-verification" content="RQdag9sYAeymMOf0hRU0xM9u9PZchznqgnhnyt-6uEI" />

                {/* Consolidated Schema.org JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchemaGraph) }}
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js')})}`
                    }}
                />
            </head>
            <body className={inter.className}>
                <AnimationProvider>
                    <GlobalScrollWrapper>
                        <LayoutShell>{children}</LayoutShell>
                    </GlobalScrollWrapper>
                </AnimationProvider>
            </body>
        </html>
    )
}
