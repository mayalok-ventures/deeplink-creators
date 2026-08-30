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

function getLocalVisits(): VisitRecord[] {
    if (typeof window === 'undefined') return []
    try {
        const raw = localStorage.getItem('dlc_local_visits')
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveLocalVisit(visit: VisitRecord) {
    if (typeof window === 'undefined') return
    try {
        const current = getLocalVisits()
        const updated = [visit, ...current].slice(0, 1000) // retain last 1000
        localStorage.setItem('dlc_local_visits', JSON.stringify(updated))
    } catch {}
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
        const now = new Date()

        const visitRecord: VisitRecord = {
            visitorId,
            page: path,
            referrer,
            source,
            device,
            browser,
            country: 'IN',
            isNew,
            date: now.toISOString().split('T')[0],
            timestamp: now.toISOString(),
        }

        // 1. Save to local storage cache immediately
        saveLocalVisit(visitRecord)

        // 2. Transmit to MongoDB backend
        await fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visitRecord),
        }).catch(() => {})
    } catch {
        // Analytics non-blocking
    }
}

function computeAnalyticsFromVisits(allVisits: VisitRecord[], days: number = 30): AnalyticsData {
    const now = Date.now()
    const sinceTimestamp = now - days * 24 * 60 * 60 * 1000
    const sinceDateStr = new Date(sinceTimestamp).toISOString().split('T')[0]

    // Filter visits within the timeframe
    const visits = allVisits.filter((v) => {
        if (v.timestamp) {
            return new Date(v.timestamp).getTime() >= sinceTimestamp
        }
        if (v.date) {
            return v.date >= sinceDateStr
        }
        return true
    })

    // Find first-ever visit date per visitor across ALL stored visits in history
    const firstSeenMap: Record<string, number> = {}
    allVisits.forEach((v) => {
        const time = v.timestamp ? new Date(v.timestamp).getTime() : 0
        if (!firstSeenMap[v.visitorId] || (time > 0 && time < firstSeenMap[v.visitorId])) {
            firstSeenMap[v.visitorId] = time
        }
    })

    // METRIC 1: Total Audience (All visits in the selected period)
    const totalVisitors = visits.length

    // METRIC 2: New Visitors (Unique visitors whose very first visit occurred in this timeframe)
    const newVisitorIds = new Set<string>()
    visits.forEach((v) => {
        const firstTime = firstSeenMap[v.visitorId]
        if (firstTime && firstTime >= sinceTimestamp) {
            newVisitorIds.add(v.visitorId)
        } else if (v.isNew) {
            newVisitorIds.add(v.visitorId)
        }
    })
    const newVisitors = newVisitorIds.size

    // METRIC 3: Returning Cadence (Visits from repeat/returning users in this timeframe)
    const returningVisitors = Math.max(0, totalVisitors - newVisitors)

    // METRIC 4: Live Today / Live Active (Active within last 5 minutes)
    const fiveMinutesAgo = now - 5 * 60 * 1000
    const liveVisitorIds = new Set<string>()
    allVisits.forEach((v) => {
        if (v.timestamp && new Date(v.timestamp).getTime() >= fiveMinutesAgo) {
            liveVisitorIds.add(v.visitorId)
        }
    })
    const todayVisitors = liveVisitorIds.size

    // Source breakdown
    const sourceMap: Record<string, number> = {}
    visits.forEach((v) => {
        const src = v.source || 'Direct'
        sourceMap[src] = (sourceMap[src] || 0) + 1
    })
    const sources = Object.entries(sourceMap)
        .map(([source, count]) => ({
            source,
            count,
            percentage: totalVisitors > 0 ? Math.round((count / totalVisitors) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count)

    // Device breakdown
    const deviceMap: Record<string, number> = {}
    visits.forEach((v) => {
        const dev = v.device || 'Desktop'
        deviceMap[dev] = (deviceMap[dev] || 0) + 1
    })
    const devices = Object.entries(deviceMap)
        .map(([device, count]) => ({
            device,
            count,
            percentage: totalVisitors > 0 ? Math.round((count / totalVisitors) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count)

    // Top pages
    const pageMap: Record<string, number> = {}
    visits.forEach((v) => {
        const pg = v.page || '/'
        pageMap[pg] = (pageMap[pg] || 0) + 1
    })
    const topPages = Object.entries(pageMap)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10)

    // Daily trend
    const dailyMap: Record<string, { visitors: Set<string>; views: number }> = {}
    visits.forEach((v) => {
        const dt = v.date || (v.timestamp ? new Date(v.timestamp).toISOString().split('T')[0] : 'today')
        if (!dailyMap[dt]) {
            dailyMap[dt] = { visitors: new Set(), views: 0 }
        }
        dailyMap[dt].views += 1
        if (v.visitorId) {
            dailyMap[dt].visitors.add(v.visitorId)
        }
    })
    const dailyData = Object.entries(dailyMap)
        .map(([date, item]) => ({
            date,
            visitors: item.visitors.size,
            pageViews: item.views,
        }))
        .sort((a, b) => a.date.localeCompare(b.date))

    return {
        totalVisitors,
        newVisitors,
        returningVisitors,
        todayVisitors,
        sources,
        dailyData,
        topPages,
        devices,
    }
}

export async function getAnalytics(days: number = 30): Promise<AnalyticsData> {
    try {
        const res = await fetch(`/api/analytics?days=${days}`, { cache: 'no-store' })
        if (res.ok) {
            const data = await res.json()
            if (data.success && data.analytics) {
                return data.analytics
            }
        }
    } catch (err) {
        console.warn('Backend analytics fetch warning (falling back to client cache):', err)
    }

    // Resilient fallback to local browser visits
    const localVisits = getLocalVisits()
    if (localVisits.length > 0) {
        return computeAnalyticsFromVisits(localVisits, days)
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
