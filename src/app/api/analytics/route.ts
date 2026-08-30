import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const collection = await getCollection('visits')

        const now = new Date()
        const visitDoc = {
            visitorId: body.visitorId || 'anonymous',
            page: body.page || '/',
            referrer: body.referrer || '',
            source: body.source || 'Direct',
            device: body.device || 'Desktop',
            browser: body.browser || 'Unknown',
            country: body.country || 'IN',
            isNew: Boolean(body.isNew),
            date: now.toISOString().split('T')[0],
            timestamp: now,
        }

        await collection.insertOne(visitDoc)

        return NextResponse.json({ success: true })
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const days = parseInt(searchParams.get('days') || '30', 10)
        const since = new Date()
        since.setDate(since.getDate() - days)

        const collection = await getCollection('visits')
        const visits = await collection.find({
            $or: [
                { timestamp: { $gte: since } },
                { createdAt: { $gte: since } },
                { date: { $gte: since.toISOString().split('T')[0] } }
            ]
        }).sort({ timestamp: -1 }).toArray()

        const totalVisitors = visits.length
        const newVisitors = visits.filter((v) => v.isNew).length
        const returningVisitors = Math.max(0, totalVisitors - newVisitors)

        const now = new Date()
        const todayStr = now.toISOString().split('T')[0]
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        const todayVisitors = visits.filter((v) => {
            if (v.date === todayStr) return true
            if (v.timestamp && new Date(v.timestamp) >= startOfToday) return true
            return false
        }).length

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
        const dailyMap: Record<string, number> = {}
        visits.forEach((v) => {
            const dt = v.date || todayStr
            dailyMap[dt] = (dailyMap[dt] || 0) + 1
        })
        const dailyData = Object.entries(dailyMap)
            .map(([date, visitors]) => ({
                date,
                visitors,
                pageViews: visitors,
            }))
            .sort((a, b) => a.date.localeCompare(b.date))

        return NextResponse.json({
            success: true,
            analytics: {
                totalVisitors,
                newVisitors,
                returningVisitors,
                todayVisitors,
                sources,
                dailyData,
                topPages,
                devices,
            },
        })
    } catch (err: any) {
        console.error('API /api/analytics GET Error:', err)
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}
