export interface VisitRecord {
    visitorId: string
    page: string
    referrer: string
    source: string
    device: string
    browser: string
    country: string
    isNew: boolean
    timestamp: any
    date: string
}

export interface AnalyticsData {
    totalVisitors: number
    newVisitors: number
    returningVisitors: number
    todayVisitors: number
    sources: { source: string; count: number; percentage: number }[]
    dailyData: { date: string; visitors: number; pageViews: number }[]
    topPages: { page: string; views: number }[]
    devices: { device: string; count: number; percentage: number }[]
}

function simpleHash(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash
    }
    return Math.abs(hash).toString(36)
}

export function generateVisitorId(): string {
    if (typeof window === 'undefined') return 'server'
    const ua = navigator.userAgent || ''
    const screen = `${window.screen.width}x${window.screen.height}`
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const language = navigator.language || ''
    return simpleHash(`${ua}|${screen}|${timezone}|${language}`)
}

export function parseTrafficSource(referrer: string): string {
    if (!referrer) return 'Direct'

    let hostname = ''
    try {
        hostname = new URL(referrer).hostname.toLowerCase()
    } catch {
        return 'Other'
    }

    if (typeof window !== 'undefined' && hostname === window.location.hostname) return 'Direct'

    const sourceMap: [string[], string][] = [
        [['google.', 'bing.', 'yahoo.', 'duckduckgo.', 'baidu.', 'ecosia.'], 'Organic Search'],
        [['facebook.', 'fb.com', 'instagram.', 'twitter.', 't.co', 'x.com', 'linkedin.', 'youtube.', 'pinterest.', 'reddit.', 'tiktok.'], 'Social Media'],
        [['wa.me', 'whatsapp.', 'telegram.', 't.me', 'signal.'], 'Messaging / Chat'],
        [['mail.google.', 'outlook.', 'mail.yahoo.'], 'Email'],
    ]

    for (const [patterns, sourceName] of sourceMap) {
        if (patterns.some(p => hostname.includes(p))) {
            return sourceName
        }
    }

    return 'Referral'
}

export function detectDevice(): string {
    if (typeof window === 'undefined') return 'Desktop'
    const ua = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'Tablet'
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) return 'Mobile'
    return 'Desktop'
}

export function detectBrowser(): string {
    if (typeof window === 'undefined') return 'Unknown'
    const ua = navigator.userAgent
    if (ua.includes('Firefox/')) return 'Firefox'
    if (ua.includes('Edg/')) return 'Edge'
    if (ua.includes('Chrome/')) return 'Chrome'
    if (ua.includes('Safari/') && !ua.includes('Chrome/')) return 'Safari'
    if (ua.includes('OPR/') || ua.includes('Opera/')) return 'Opera'
    return 'Other'
}

export async function recordVisit(pagePath?: string): Promise<void> {
    if (typeof window === 'undefined') return

    try {
        const path = pagePath || window.location.pathname
        if (path.startsWith('/deepadmin') || path.startsWith('/api')) return

        const visitorId = generateVisitorId()
        const isNew = !localStorage.getItem('dlc_visited')
        localStorage.setItem('dlc_visited', '1')

        const referrer = document.referrer || ''
        const source = parseTrafficSource(referrer)
        const device = detectDevice()
        const browser = detectBrowser()

        await fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                visitorId,
                page: path,
                referrer,
                source,
                device,
                browser,
                country: 'IN',
                isNew,
            }),
        })
    } catch {
        // Analytics non-blocking
    }
}

export async function getAnalytics(days: number = 30): Promise<AnalyticsData> {
    try {
        const res = await fetch(`/api/analytics?days=${days}`, { cache: 'no-store' })
        if (res.ok) {
            const data = await res.json()
            if (data.success && data.analytics) return data.analytics
        }
    } catch (err) {
        console.error('getAnalytics error:', err)
    }

    return {
        totalVisitors: 0,
        newVisitors: 0,
        returningVisitors: 0,
        todayVisitors: 0,
        sources: [],
        dailyData: [],
        topPages: [],
        devices: [],
    }
}

export const trackVisit = recordVisit
export const getAnalyticsData = getAnalytics
