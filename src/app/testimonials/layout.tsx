import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Client Testimonials & Reviews | Deeplink Creators',
    description: 'Read real client testimonials and reviews for Deeplink Creators — India\'s leading revenue-focused digital marketing agency. See how we deliver measurable SEO, performance marketing, and lead generation results.',
    keywords: ['client testimonials', 'digital marketing reviews', 'SEO agency reviews India', 'Deeplink Creators testimonials', 'performance marketing results'],
    openGraph: {
        title: 'Client Testimonials & Reviews | Deeplink Creators',
        description: 'Real reviews from businesses who trust Deeplink Creators for SEO, performance marketing, and lead generation across India.',
        url: 'https://deeplinkcreators.com/testimonials/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Client Testimonials | Deeplink Creators',
        description: 'See what businesses say about our digital marketing services across India.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/testimonials/',
    },
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
    return children
}
