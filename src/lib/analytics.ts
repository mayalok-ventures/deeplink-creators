import {
    collection, addDoc, getDocs, query, where, Timestamp, doc, setDoc, increment
} from 'firebase/firestore'
import { db } from './firebase'

export interface VisitRecord {
    visitorId: string
    page: string
    referrer: string
    source: string
    device: string
    browser: string
    country: string
    isNew: boolean
    timestamp: Timestamp
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

    if (hostname === window.location.hostname) return 'Direct'

    const sourceMap: [string[], string][] = [
        [['google.com', 'google.co.in'], 'Google'],
        [['facebook.com', 'fb.com', 'm.facebook.com', 'l.facebook.com'], 'Facebook'],
        [['instagram.com', 'l.instagram.com'], 'Instagram'],
        [['linkedin.com', 'lnkd.in'], 'LinkedIn'],
        [['wa.me', 'api.whatsapp.com', 'web.whatsapp.com', 'whatsapp.com'], 'WhatsApp'],
        [['twitter.com', 't.co', 'x.com'], 'Twitter / X'],
        [['youtube.com', 'youtu.be'], 'YouTube'],
        [['pinterest.com'], 'Pinterest'],
        [['reddit.com'], 'Reddit'],
        [['t.me', 'telegram.org'], 'Telegram'],
        [['snapchat.com'], 'Snapchat'],
        [['tiktok.com'], 'TikTok'],
        [['bing.com'], 'Bing'],
        [['yahoo.com'], 'Yahoo'],
    ]

    for (const [domains, source] of sourceMap) {
        for (const domain of domains) {
            if (hostname === domain || hostname.endsWith('.' + domain)) {
                return source
            }
        }
    }

    if (hostname.includes('mail') || hostname.includes('outlook') || hostname.includes('gmail')) {
        return 'Email'
    }

    return 'Other'
}

export function detectDevice(): string {
    const ua = navigator.userAgent
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet'
    if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/i.test(ua)) return 'Mobile'
    return 'Desktop'
}

export function detectBrowser(): string {
    const ua = navigator.userAgent
    if (/SamsungBrowser/i.test(ua)) return 'Samsung'
    if (/OPR|Opera/i.test(ua)) return 'Opera'
    if (/Edg/i.test(ua)) return 'Edge'
    if (/Firefox/i.test(ua)) return 'Firefox'
    if (/Chrome/i.test(ua)) return 'Chrome'
    if (/Safari/i.test(ua)) return 'Safari'
    return 'Other'
}

function getTodayDate(): string {
    const now = new Date()
    return now.toISOString().split('T')[0]
}

export async function trackVisit(page: string): Promise<void> {
    const visitorId = generateVisitorId()
    const stored = localStorage.getItem('dlc_visitor')
    const isNew = !stored || stored !== visitorId

    if (isNew) {
        localStorage.setItem('dlc_visitor', visitorId)
    }

    const referrer = document.referrer || ''
    const source = parseTrafficSource(referrer)
    const date = getTodayDate()

    const record: VisitRecord = {
        visitorId,
        page,
        referrer,
        source,
        device: detectDevice(),
        browser: detectBrowser(),
        country: '',
        isNew,
        timestamp: Timestamp.now(),
        date,
    }

    await addDoc(collection(db, 'visits'), record)

    const dailyRef = doc(db, 'analytics', date)
    await setDoc(dailyRef, {
        totalVisits: increment(1),
        [`sources.${source}`]: increment(1),
    }, { merge: true })
}

export async function getAnalyticsData(days: number): Promise<AnalyticsData> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    const startDateStr = startDate.toISOString().split('T')[0]
    const todayStr = getTodayDate()

    const visitsQuery = query(
        collection(db, 'visits'),
        where('date', '>=', startDateStr)
    )

    const snapshot = await getDocs(visitsQuery)
    const visits: VisitRecord[] = []
    snapshot.forEach((d) => {
        visits.push(d.data() as VisitRecord)
    })

    const allVisitorIds = new Set<string>()
    const newVisitorIds = new Set<string>()
    const todayVisitorIds = new Set<string>()
    const sourceCounts: Record<string, number> = {}
    const deviceCounts: Record<string, number> = {}
    const pageCounts: Record<string, number> = {}
    const dailyMap: Record<string, { visitors: Set<string>; pageViews: number }> = {}

    for (const visit of visits) {
        allVisitorIds.add(visit.visitorId)

        if (visit.isNew) {
            newVisitorIds.add(visit.visitorId)
        }

        if (visit.date === todayStr) {
            todayVisitorIds.add(visit.visitorId)
        }

        sourceCounts[visit.source] = (sourceCounts[visit.source] || 0) + 1
        deviceCounts[visit.device] = (deviceCounts[visit.device] || 0) + 1
        pageCounts[visit.page] = (pageCounts[visit.page] || 0) + 1

        if (!dailyMap[visit.date]) {
            dailyMap[visit.date] = { visitors: new Set(), pageViews: 0 }
        }
        dailyMap[visit.date].visitors.add(visit.visitorId)
        dailyMap[visit.date].pageViews += 1
    }

    const totalVisitors = allVisitorIds.size
    const totalPageViews = visits.length

    const sources = Object.entries(sourceCounts)
        .map(([source, count]) => ({
            source,
            count,
            percentage: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count)

    const devices = Object.entries(deviceCounts)
        .map(([device, count]) => ({
            device,
            count,
            percentage: totalPageViews > 0 ? Math.round((count / totalPageViews) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count)

    const topPages = Object.entries(pageCounts)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10)

    const dailyData = Object.entries(dailyMap)
        .map(([date, data]) => ({
            date,
            visitors: data.visitors.size,
            pageViews: data.pageViews,
        }))
        .sort((a, b) => a.date.localeCompare(b.date))

    const returningVisitors = totalVisitors - newVisitorIds.size

    return {
        totalVisitors,
        newVisitors: newVisitorIds.size,
        returningVisitors,
        todayVisitors: todayVisitorIds.size,
        sources,
        dailyData,
        topPages,
        devices,
    }
}
