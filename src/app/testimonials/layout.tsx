import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Client Testimonials & Reviews | Deeplink Creators',
    description: 'Read real client testimonials and reviews for Deeplink Creators — the trusted digital marketing agency in Greater Noida & Delhi NCR. See how we deliver measurable SEO, PPC, and branding results.',
    keywords: ['client testimonials', 'digital marketing reviews', 'SEO agency reviews Greater Noida', 'Deeplink Creators testimonials'],
    openGraph: {
        title: 'Client Testimonials & Reviews | Deeplink Creators',
        description: 'Real reviews from businesses who trust Deeplink Creators for SEO, performance marketing, and branding in Greater Noida & Delhi NCR.',
        url: 'https://deeplinkcreators.com/testimonials/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Client Testimonials | Deeplink Creators',
        description: 'See what businesses say about our digital marketing services in Greater Noida & Delhi NCR.',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/testimonials/',
    },
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
    return children
}
