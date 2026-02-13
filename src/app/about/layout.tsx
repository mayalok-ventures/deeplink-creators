import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us | Data-Driven Neuro-Marketing Agency',
    description: 'Learn about Deeplink Creators — the best digital marketing agency in Greater Noida & Noida. We combine data science with neuro-marketing to deliver SEO, performance marketing, and branding for businesses in Delhi NCR.',
    openGraph: {
        title: 'About Deeplink Creators | Digital Marketing Agency Greater Noida',
        description: 'We combine data science with neuro-marketing to deliver SEO, performance marketing, and branding for businesses in Greater Noida, Noida & Delhi NCR.',
        url: 'https://deeplinkcreators.com/about/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Deeplink Creators | Digital Marketing Agency Greater Noida',
        description: 'Data science + neuro-marketing. SEO, performance marketing & branding for Greater Noida & Delhi NCR businesses.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/about/',
    },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children
}
