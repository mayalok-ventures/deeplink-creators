import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
    title: 'Deeplink Creators | Revenue Machines for Greater Noida Businesses',
    description: 'Stop burning money on ads. We build revenue machines for Greater Noida businesses. Get your free ROI audit today.',
    keywords: 'digital marketing, SEO Greater Noida, performance marketing, branding, neuro-marketing',
}

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Deeplink Creators",
    "image": "https://deeplinkcreators.com/images/logo.png",
    "@id": "https://deeplinkcreators.com",
    "url": "https://deeplinkcreators.com",
    "telephone": "+911234567890",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector Alpha 1",
        "addressLocality": "Greater Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201310",
        "addressCountry": "IN"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.4744,
        "longitude": 77.5040
    },
    "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
    },
    "sameAs": [
        "https://facebook.com/deeplinkcreators",
        "https://linkedin.com/company/deeplinkcreators"
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
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={inter.className}>
                <Header />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
