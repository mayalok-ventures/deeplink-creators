import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import LayoutShell from '@/components/LayoutShell'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
    metadataBase: new URL('https://deeplinkcreators.com'),
    title: {
        default: 'Deeplink Creators | Best Digital Marketing Company in India',
        template: '%s | Deeplink Creators'
    },
    description: 'Deeplink Creators is a data-driven digital marketing agency in India specializing in SEO, Performance Marketing, Lead Generation, and Revenue-Focused Digital Transformation for enterprises and startups.',
    keywords: [
        'best digital marketing company in india', 'digital marketing agency in india', 'top digital marketing company in india',
        'digital marketing services in india', 'digital marketing firm in india', 'online marketing company in india',
        'performance marketing agency in india', 'growth marketing agency in india', 'ROI focused digital marketing agency india',
        'seo company in india', 'seo agency in india', 'enterprise seo services india',
        'ppc agency in india', 'google ads agency in india', 'performance marketing company india',
        'lead generation company in india', 'b2b lead generation agency india', 'high ticket lead generation india',
        'website development company india', 'conversion focused web design india',
        'data driven digital marketing agency india', 'revenue focused digital marketing company india',
        'enterprise digital marketing agency india', 'predictive seo company india',
        'B2B performance marketing agency India', 'enterprise lead generation company India',
        'revenue marketing agency India', 'customer acquisition agency for startups',
        'conversion rate optimization agency India', 'predictive SEO services India',
        'real estate digital marketing agency India', 'digital marketing for SaaS companies India',
        'healthcare performance marketing India', 'premium digital marketing agency in India',
        'Next.js web development agency India',
        'best agency for digital marketing in india', 'digital marketing company for businesses in india',
        'scalable digital marketing solutions india', 'digital marketing agency for startups in india',
        'performance marketing', 'neuro-marketing', 'ROI focused marketing',
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
        title: 'Deeplink Creators | Best Digital Marketing Company in India',
        description: 'Data-driven digital marketing agency in India. SEO, Performance Marketing, PPC, Google Ads, Lead Generation, and Revenue-Focused Digital Transformation for enterprises and startups.',
        images: [
            {
                url: '/images/logo.svg',
                width: 1200,
                height: 630,
                alt: 'Deeplink Creators - Best Digital Marketing Company in India',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Deeplink Creators | Best Digital Marketing Company in India',
        description: 'Data-driven digital marketing agency in India. SEO, Performance Marketing, Lead Generation & Revenue-Focused strategies that deliver real ROI.',
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
    "description": "Best Digital Marketing Company in India — Revenue-Focused SEO, Performance Marketing & Lead Generation.",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "India",
        "addressRegion": "India",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "20.5937",
        "longitude": "78.9629"
    },
    "areaServed": [
        { "@type": "Country", "name": "India" }
    ],
    "serviceType": ["SEO Services", "Enterprise SEO Services", "Predictive SEO", "Performance Marketing", "B2B Performance Marketing", "Google Ads Management", "PPC Services", "Lead Generation", "Revenue Marketing", "Conversion Rate Optimization", "Customer Acquisition", "Digital Marketing", "Content Marketing", "Social Media Marketing", "Next.js Web Development"],
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "areaServed": ["India"]
    }
}

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Deeplink Creators",
    "url": "https://deeplinkcreators.com",
    "parentOrganization": {
        "@type": "Organization",
        "name": "Mayalok Venture",
        "url": "https://mayalokventures.com"
    },
    "areaServed": "India",
    "knowsAbout": ["SEO", "Enterprise SEO", "Predictive SEO", "Performance Marketing", "B2B Performance Marketing", "Google Ads", "PPC", "Lead Generation", "Revenue Marketing", "Conversion Rate Optimization", "Customer Acquisition for Startups", "Digital Marketing", "Content Marketing", "Social Media Marketing", "Next.js Web Development"]
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
            "name": "What is the best digital marketing company in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators is the best digital marketing company in India, specializing in Enterprise SEO, Predictive SEO, B2B Performance Marketing, Lead Generation, Revenue Marketing, and Conversion Rate Optimization with a focus on delivering measurable ROI for enterprises and startups."
            }
        },
        {
            "@type": "Question",
            "name": "How much do SEO services cost in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Deeplink Creators offers affordable and enterprise-grade SEO services in India with customized plans based on your business needs. Contact us for a free SEO audit and custom quote."
            }
        },
        {
            "@type": "Question",
            "name": "Do you provide Google Ads management in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Deeplink Creators provides expert Google Ads management and PPC services across India with a focus on ROI-positive campaigns for enterprises and startups."
            }
        },
        {
            "@type": "Question",
            "name": "What digital marketing services do you offer in India?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer Enterprise SEO, Predictive SEO, B2B Performance Marketing, Google Ads, PPC, Lead Generation, Revenue Marketing, Conversion Rate Optimization, Customer Acquisition, Content Marketing, Social Media Marketing, and Next.js Web Development for businesses across India."
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

const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
        {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Home",
            "url": "https://deeplinkcreators.com/"
        },
        {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Services",
            "url": "https://deeplinkcreators.com/services/"
        },
        {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Blog & Insights",
            "url": "https://deeplinkcreators.com/blog/"
        },
        {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "About Us",
            "url": "https://deeplinkcreators.com/about/"
        },
        {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "Contact",
            "url": "https://deeplinkcreators.com/contact/"
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
                <meta name="theme-color" content="#C39A2B" />
                <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
                <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
                <link rel="dns-prefetch" href="https://deeplinkcreators.com" />

                {/* Additional SEO meta for all crawlers */}
                <meta name="geo.region" content="IN" />
                <meta name="geo.placename" content="India" />
                <meta name="geo.position" content="20.5937;78.9629" />
                <meta name="ICBM" content="20.5937, 78.9629" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="rating" content="general" />
                <meta name="distribution" content="global" />

                {/* Dublin Core metadata for academic/advanced crawlers */}
                <meta name="DC.title" content="Deeplink Creators - Best Digital Marketing Company in India" />
                <meta name="DC.creator" content="Deeplink Creators" />
                <meta name="DC.subject" content="Digital Marketing, SEO, Performance Marketing, Lead Generation, Revenue Marketing, B2B Marketing" />
                <meta name="DC.description" content="Best digital marketing company in India specializing in SEO, Performance Marketing, Lead Generation, PPC, Google Ads, and revenue-focused strategies for enterprises and startups." />
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||((!t||t==='system')&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js')})}`
                    }}
                />
            </head>
            <body className={inter.className}>
                <LayoutShell>{children}</LayoutShell>
            </body>
        </html>
    )
}
