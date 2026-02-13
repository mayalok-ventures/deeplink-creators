import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import LayoutShell from '@/components/LayoutShell'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
    metadataBase: new URL('https://deeplinkcreators.com'),
    title: {
        default: 'Deeplink Creators | AI-Driven Digital Marketing Agency in Greater Noida',
        template: '%s | Deeplink Creators'
    },
    description: 'Deeplink Creators is a data-driven digital marketing agency in Greater Noida & Delhi NCR specializing in SEO, Performance Marketing, and Branding for Real Estate & Startups.',
    keywords: [
        'digital marketing agency in Greater Noida', 'digital marketing agency in Noida', 'SEO company in Greater Noida', 'SEO company in Noida',
        'SEO services in Greater Noida', 'SEO services in Noida', 'local SEO services Greater Noida', 'best digital marketing company in Delhi NCR',
        'digital marketing agency in Delhi', 'SEO consultant in Greater Noida', 'SEO consultant in Noida', 'website SEO services Delhi NCR',
        'affordable SEO services Noida', 'SEO company near me Greater Noida', 'top SEO agency in Noida',
        'small business SEO services Greater Noida', 'Google My Business optimization Greater Noida', 'SEO & social media marketing Greater Noida',
        'ecommerce SEO services Noida', 'digital marketing for startups Delhi NCR', 'SEO for local businesses Noida',
        'content marketing services in Noida', 'website SEO audit Greater Noida', 'SEO expert in Delhi NCR', 'technical SEO services Noida',
        'performance marketing', 'branding agency Greater Noida', 'neuro-marketing', 'lead generation Greater Noida', 'ROI focused marketing',
        'PPC services Greater Noida', 'Google Ads expert Delhi NCR', 'Facebook Ads agency Noida',
    ],
    authors: [{ name: 'Deeplink Creators' }],
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
        title: 'Deeplink Creators | AI-Driven Digital Marketing Agency in Greater Noida',
        description: 'Data-driven digital marketing agency in Greater Noida & Delhi NCR. SEO, Performance Marketing, PPC, Google Ads, and Branding for Real Estate & Startups.',
        images: [
            {
                url: '/images/logo.svg',
                width: 1200,
                height: 630,
                alt: 'Deeplink Creators - AI-Driven Digital Marketing Agency in Greater Noida',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Deeplink Creators | AI-Driven Digital Marketing Agency',
        description: 'Data-driven digital marketing agency in Greater Noida & Delhi NCR. SEO, Performance Marketing & Branding that delivers real ROI.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com',
    },
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": "Deeplink Creators",
    "alternateName": "Deeplink Creators - A Unit of Mayalok Venture",
    "@id": "https://deeplinkcreators.com",
    "url": "https://deeplinkcreators.com",
    "logo": "https://deeplinkcreators.com/logo.png",
    "description": "AI-Driven Digital Marketing Agency in Greater Noida.",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Greater Noida",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.4744",
        "longitude": "77.5040"
    },
    "areaServed": [
        { "@type": "City", "name": "Greater Noida" },
        { "@type": "City", "name": "Noida" },
        { "@type": "AdministrativeArea", "name": "Delhi NCR" }
    ],
    "serviceType": ["SEO Services", "Local SEO", "Performance Marketing", "Google Ads Management", "Facebook Ads", "PPC Services", "Branding", "Digital Marketing", "Content Marketing", "Social Media Marketing", "Ecommerce SEO", "Technical SEO", "Google My Business Optimization", "Lead Generation"],
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "areaServed": ["Noida", "Greater Noida", "Delhi"]
    },
    "sameAs": []
}

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Deeplink Creators",
    "url": "https://deeplinkcreators.com",
    "parentOrganization": {
        "@type": "Organization",
        "name": "Mayalok Venture"
    },
    "areaServed": "Greater Noida, Noida, Delhi NCR, Uttar Pradesh, India",
    "knowsAbout": ["SEO", "Local SEO", "Performance Marketing", "Google Ads", "Facebook Ads", "PPC", "Branding", "Neuro-Marketing", "Digital Marketing", "Content Marketing", "Social Media Marketing", "Ecommerce SEO", "Technical SEO", "Lead Generation", "Google My Business Optimization"]
}

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Deeplink Creators",
    "url": "https://deeplinkcreators.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://deeplinkcreators.com/?s={search_term_string}",
        "query-input": "required name=search_term_string"
    }
}

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the best digital marketing agency in Greater Noida?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators is the best digital marketing agency in Greater Noida, specializing in SEO services, performance marketing, Google Ads, PPC, and branding with a focus on delivering measurable ROI for local businesses."
            }
        },
        {
            "@type": "Question",
            "name": "How much do SEO services cost in Greater Noida?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators offers affordable SEO services in Greater Noida starting from customized plans based on your business needs. Contact us for a free SEO audit and custom quote."
            }
        },
        {
            "@type": "Question",
            "name": "Do you provide Google Ads management in Noida?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Deeplink Creators provides expert Google Ads management and PPC services in Noida and Greater Noida with a focus on ROI-positive campaigns for businesses across Delhi NCR."
            }
        },
        {
            "@type": "Question",
            "name": "What digital marketing services do you offer in Delhi NCR?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer SEO services, local SEO, Google Ads, Facebook Ads, performance marketing, branding, content marketing, social media marketing, ecommerce SEO, technical SEO, and Google My Business optimization for businesses in Greater Noida, Noida, and Delhi NCR."
            }
        }
    ]
}

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://deeplinkcreators.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://deeplinkcreators.com/services/" },
        { "@type": "ListItem", "position": 3, "name": "About", "item": "https://deeplinkcreators.com/about/" },
        { "@type": "ListItem", "position": 4, "name": "Contact", "item": "https://deeplinkcreators.com/contact/" }
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
                <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

                {/* Bing / Yahoo / DuckDuckGo verification (replace with actual code from Bing Webmaster Tools) */}
                <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />

                {/* Yandex verification (replace with actual code from Yandex Webmaster) */}
                <meta name="yandex-verification" content="YOUR_YANDEX_VERIFICATION_CODE" />

                {/* Additional SEO meta for all crawlers */}
                <meta name="geo.region" content="IN-UP" />
                <meta name="geo.placename" content="Greater Noida" />
                <meta name="geo.position" content="28.4744;77.5040" />
                <meta name="ICBM" content="28.4744, 77.5040" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="rating" content="general" />
                <meta name="distribution" content="global" />

                {/* Dublin Core metadata for academic/advanced crawlers */}
                <meta name="DC.title" content="Deeplink Creators - Digital Marketing Agency in Greater Noida" />
                <meta name="DC.creator" content="Deeplink Creators" />
                <meta name="DC.subject" content="Digital Marketing, SEO, Performance Marketing, Branding" />
                <meta name="DC.description" content="Best digital marketing agency in Greater Noida & Noida specializing in SEO, PPC, Google Ads, and branding for Delhi NCR businesses." />
                <meta name="DC.language" content="en" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            </head>
            <body className={inter.className}>
                <LayoutShell>{children}</LayoutShell>
            </body>
        </html>
    )
}
