import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'

export const metadata: Metadata = {
    title: {
        absolute: 'Deeplink Creators | Top Digital Marketing Agency in Greater Noida & Delhi',
    },
    description: 'Scale your revenue with AI-driven SEO, Google Ads, and Social Media Marketing. The preferred agency for Noida Real Estate & Tech Startups.',
    openGraph: {
        title: 'Deeplink Creators | Top Digital Marketing Agency in Greater Noida & Delhi',
        description: 'Scale your revenue with AI-driven SEO, Google Ads, and Social Media Marketing. The preferred agency for Noida Real Estate & Tech Startups.',
        url: 'https://deeplinkcreators.com/',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/',
    },
}

export default function Page() {
    return <HomePage />
}
