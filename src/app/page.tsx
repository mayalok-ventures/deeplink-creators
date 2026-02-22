import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'

export const metadata: Metadata = {
    title: {
        absolute: 'Deeplink Creators | Revenue-Focused Digital Marketing Agency',
    },
    description: 'Scale your revenue with Enterprise SEO, Performance Marketing, and Lead Generation. Deeplink Creators builds predictable growth systems for enterprises and high-ticket businesses across India.',
    openGraph: {
        title: 'Deeplink Creators | Revenue-Focused Digital Marketing Agency',
        description: 'Scale your revenue with Enterprise SEO, Performance Marketing, and Lead Generation. Predictable growth systems for enterprises and high-ticket businesses across India.',
        url: 'https://deeplinkcreators.com/',
    },
    alternates: {
        canonical: 'https://deeplinkcreators.com/',
    },
}

export default function Page() {
    return <HomePage />
}
