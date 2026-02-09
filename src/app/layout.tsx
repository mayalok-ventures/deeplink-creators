import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import LayoutShell from '@/components/LayoutShell'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
    metadataBase: new URL('https://deeplinkcreators.com'),
    title: {
        default: 'Deeplink Creators | Digital Marketing Agency in Greater Noida',
        template: '%s | Deeplink Creators',
    },
    description: 'Deeplink Creators is the best digital marketing agency in Greater Noida & Noida, specializing in SEO services, performance marketing, Google Ads, Facebook Ads, and branding. Affordable SEO company in Delhi NCR delivering real ROI for local businesses and startups.',
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
        title: 'Deeplink Creators | Digital Marketing Agency in Greater Noida',
        description: 'Best digital marketing agency in Greater Noida & Noida. SEO services, performance marketing, PPC, Google Ads management, and branding for businesses in Delhi NCR. Get a free SEO audit today.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Deeplink Creators | Digital Marketing Agency',
        description: 'Top digital marketing agency in Greater Noida. SEO services, performance marketing & branding that delivers real ROI for Delhi NCR businesses.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com',
    },
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Deeplink Creators",
    "alternateName": "Deeplink Creators - A Unit of Mayalok Venture",
    "@id": "https://deeplinkcreators.com",
    "url": "https://deeplinkcreators.com",
    "description": "Best digital marketing agency in Greater Noida and Noida specializing in SEO services, performance marketing, Google Ads, PPC, branding, and lead generation for businesses in Delhi NCR.",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Greater Noida",
        "addressRegion": "Uttar Pradesh",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.4744,
        "longitude": 77.5040
    },
    "areaServed": [
        { "@type": "City", "name": "Greater Noida" },
        { "@type": "City", "name": "Noida" },
        { "@type": "AdministrativeArea", "name": "Delhi NCR" }
    ],
    "serviceType": ["SEO Services", "Local SEO", "Performance Marketing", "Google Ads Management", "Facebook Ads", "PPC Services", "Branding", "Digital Marketing", "Content Marketing", "Social Media Marketing", "Ecommerce SEO", "Technical SEO", "Google My Business Optimization", "Lead Generation"],
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <head>
                <link rel="canonical" href="https://deeplinkcreators.com" />
                <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
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
            </head>
            <body className={inter.className}>
                <LayoutShell>{children}</LayoutShell>
            </body>
        </html>
    )
}
