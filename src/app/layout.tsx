import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import LayoutShell from '@/components/LayoutShell'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
    metadataBase: new URL('https://deeplinkcreators.com'),
    title: {
        default: 'Deeplink Creators | Revenue-Focused Digital Marketing Agency',
        template: '%s | Deeplink Creators'
    },
    description: 'Deeplink Creators is a data-driven digital marketing agency specializing in Enterprise SEO, Performance Marketing, Lead Generation, and Revenue-Focused Growth Systems for enterprises and high-ticket businesses across India.',
    keywords: [
        'digital marketing agency india', 'revenue focused digital marketing',
        'enterprise seo services india', 'performance marketing agency india',
        'lead generation company india', 'b2b lead generation agency india',
        'google ads management india', 'ppc agency india',
        'data driven digital marketing', 'conversion rate optimization india',
        'predictive seo services', 'growth marketing agency india',
        'digital marketing for enterprises', 'neuro-marketing agency',
        'ROI focused marketing agency', 'revenue engineering firm',
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
        title: 'Deeplink Creators | Revenue-Focused Digital Marketing Agency',
        description: 'Data-driven digital marketing agency in India. Enterprise SEO, Performance Marketing, PPC, Lead Generation, and Revenue-Focused Growth Systems for enterprises and high-ticket businesses.',
        images: [
            {
                url: '/android-chrome-512x512.png',
                width: 512,
                height: 512,
                alt: 'Deeplink Creators - Revenue-Focused Digital Marketing Agency',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Deeplink Creators | Revenue-Focused Digital Marketing Agency',
        description: 'Data-driven digital marketing agency. Enterprise SEO, Performance Marketing, Lead Generation & Revenue-Focused strategies that deliver real ROI.',
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
    "description": "Revenue-focused digital marketing agency specializing in Enterprise SEO, Performance Marketing & Lead Generation for businesses across India.",
    "telephone": "+919719364834",
    "email": "kunal@deeplinkcreators.com",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Alpha 1, Pari Chowk",
        "addressLocality": "Greater Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201310",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "28.4744",
        "longitude": "77.5040"
    },
    "areaServed": [
        { "@type": "Country", "name": "India" }
    ],
    "serviceType": ["Enterprise SEO", "Predictive SEO", "Performance Marketing", "Google Ads Management", "PPC Services", "Lead Generation", "Revenue Marketing", "Conversion Rate Optimization", "Neuro-Marketing", "Next.js Web Development"],
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "18:00"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+919719364834",
        "contactType": "sales",
        "areaServed": ["India"],
        "availableLanguage": ["English", "Hindi"]
    },
    "founder": [
        { "@type": "Person", "name": "Kunal Pratap Singh", "jobTitle": "Founder & Strategy Lead" },
        { "@type": "Person", "name": "Dileep Yadav", "jobTitle": "Co-Founder & Operations Head" }
    ]
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
    "knowsAbout": ["Enterprise SEO", "Predictive SEO", "Performance Marketing", "Google Ads", "PPC", "Lead Generation", "Revenue Marketing", "Conversion Rate Optimization", "Neuro-Marketing", "Next.js Web Development"]
}

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Deeplink Creators",
    "url": "https://deeplinkcreators.com",
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

                {/* Additional SEO meta */}
                <meta name="geo.region" content="IN-UP" />
                <meta name="geo.placename" content="Greater Noida, Uttar Pradesh" />
                <meta name="geo.position" content="28.4744;77.5040" />
                <meta name="ICBM" content="28.4744, 77.5040" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="rating" content="general" />
                <meta name="distribution" content="global" />

                {/* Dublin Core metadata */}
                <meta name="DC.title" content="Deeplink Creators - Revenue-Focused Digital Marketing Agency" />
                <meta name="DC.creator" content="Deeplink Creators" />
                <meta name="DC.subject" content="Digital Marketing, Enterprise SEO, Performance Marketing, Lead Generation, Revenue Marketing" />
                <meta name="DC.description" content="Revenue-focused digital marketing agency specializing in Enterprise SEO, Performance Marketing, Lead Generation, and Growth Systems for enterprises across India." />
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
