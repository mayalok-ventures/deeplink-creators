import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'

export const metadata: Metadata = {
    title: {
        absolute: 'Deeplink Creators | Best Digital Marketing Company in India',
    },
    description: 'Scale your revenue with enterprise SEO, performance marketing, and lead generation. India\'s premier revenue-focused digital marketing agency for enterprises and startups.',
    openGraph: {
        title: 'Deeplink Creators | Best Digital Marketing Company in India',
        description: 'Scale your revenue with enterprise SEO, performance marketing, and lead generation. India\'s premier revenue-focused digital marketing agency for enterprises and startups.',
        url: 'https://deeplinkcreators.com/',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/',
    },
}

export default function Page() {
    return <HomePage />
}
