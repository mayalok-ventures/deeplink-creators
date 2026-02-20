import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us | Data-Driven Neuro-Marketing Agency',
    description: 'Learn about Deeplink Creators — the best digital marketing company in India. We combine data science with neuro-marketing to deliver enterprise SEO, performance marketing, and lead generation for businesses across India.',
    openGraph: {
        title: 'About Deeplink Creators | Best Digital Marketing Company in India',
        description: 'We combine data science with neuro-marketing to deliver enterprise SEO, performance marketing, and lead generation for businesses across India.',
        url: 'https://deeplinkcreators.com/about/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Deeplink Creators | Best Digital Marketing Company in India',
        description: 'Data science + neuro-marketing. Enterprise SEO, performance marketing & lead generation for businesses across India.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/about/',
    },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return children
}
