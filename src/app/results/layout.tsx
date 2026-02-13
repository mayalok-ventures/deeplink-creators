import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Digital Marketing Blog & Insights | SEO Tips & Case Studies | Deeplink Creators',
    description: 'Digital marketing insights, SEO tips, Google Ads strategies, and case studies for businesses in Greater Noida, Noida & Delhi NCR. Learn how to grow your business online.',
    keywords: ['digital marketing blog', 'SEO tips Greater Noida', 'digital marketing case studies', 'Google Ads tips Delhi NCR', 'SEO strategies Noida'],
    openGraph: {
        title: 'Blog & Insights | SEO Tips & Case Studies | Deeplink Creators',
        description: 'Digital marketing insights, SEO tips, and case studies for Greater Noida & Delhi NCR businesses.',
        url: 'https://deeplinkcreators.com/results/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog & Insights | Deeplink Creators',
        description: 'Digital marketing insights, SEO tips & case studies for Greater Noida & Delhi NCR.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/results/',
    },
}

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
    return children
}
