import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Digital Marketing Blog & Insights | SEO Tips & Case Studies | Deeplink Creators',
    description: 'Digital marketing insights, SEO tips, Google Ads strategies, and case studies for businesses in India. Learn how to grow your business online with data-driven strategies.',
    keywords: ['digital marketing blog', 'SEO tips India', 'digital marketing case studies', 'Google Ads tips India', 'SEO strategies India', 'performance marketing insights'],
    openGraph: {
        title: 'Blog & Insights | SEO Tips & Case Studies | Deeplink Creators',
        description: 'Digital marketing insights, SEO tips, and case studies for businesses across India.',
        url: 'https://deeplinkcreators.com/blog/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog & Insights | Deeplink Creators',
        description: 'Digital marketing insights, SEO tips & case studies for businesses across India.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/blog/',
    },
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
    return children
}
