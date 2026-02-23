import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { getSEOSettingsServer } from '@/lib/firebase-server'

const DEFAULT_TITLE = 'Deeplink Creators | Revenue-Focused Digital Marketing Agency'
const DEFAULT_DESCRIPTION = 'Scale your revenue with Enterprise SEO, Performance Marketing, and Lead Generation. Deeplink Creators builds predictable growth systems for enterprises and high-ticket businesses across India.'

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSEOSettingsServer()
    const title = seo?.siteTitle || DEFAULT_TITLE
    const description = seo?.siteDescription || DEFAULT_DESCRIPTION

    return {
        title: { absolute: title },
        description,
        openGraph: {
            title,
            description,
            url: 'https://deeplinkcreators.com/',
        },
        alternates: {
            canonical: 'https://deeplinkcreators.com/',
        },
    }
}

export default function Page() {
    return <HomePage />
}
