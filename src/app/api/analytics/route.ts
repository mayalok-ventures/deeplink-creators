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
        const now = new Date()
        const since = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
        const sinceDateStr = since.toISOString().split('T')[0]

        const collection = await getCollection('visits')

        // 1. Fetch visits within the selected timeframe
        const visits = await collection.find({
            $or: [
                { timestamp: { $gte: since } },
                { createdAt: { $gte: since } },
                { date: { $gte: sinceDateStr } }
            ]
        }).sort({ timestamp: -1 }).toArray()

        // 2. Identify first-ever visit date per visitorId in database history
        const firstVisitsByVisitor = await collection.aggregate([
            {
                $group: {
                    _id: "$visitorId",
                    firstTimestamp: { $min: "$timestamp" },
                    firstDate: { $min: "$date" }
                }
            }
        ]).toArray()

        // Set of visitorIds whose VERY FIRST visit in history happened inside the selected timeframe
        const newVisitorIds = new Set(
            firstVisitsByVisitor
                .filter(item => {
                    const firstTime = item.firstTimestamp ? new Date(item.firstTimestamp) : (item.firstDate ? new Date(item.firstDate) : null)
                    return firstTime && firstTime >= since
                })
                .map(item => item._id)
        )

        // METRIC 1: Total Audience (All visits in the selected timeframe)
        const totalVisitors = visits.length

        // METRIC 2: New Visitors (Unique visitors whose first visit in history happened in this timeframe)
        const newVisitors = newVisitorIds.size

        // METRIC 3: Returning Cadence (Visits from returning / repeat users in this timeframe)
        const returningVisitors = Math.max(0, totalVisitors - newVisitors)

        // METRIC 4: Live Today / Live Active (Users active in the last 5 minutes)
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)
        const liveVisitorIds = new Set(
            visits
                .filter(v => {
                    const visitTime = v.timestamp ? new Date(v.timestamp) : (v.createdAt ? new Date(v.createdAt) : null)
                    return visitTime && visitTime >= fiveMinutesAgo
                })
                .map(v => v.visitorId)
        )
        const todayVisitors = liveVisitorIds.size

        // 3. Traffic source attribution breakdown
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

        // 4. Hardware device breakdown
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

        // 5. Top landing pages
        const pageMap: Record<string, number> = {}
        visits.forEach((v) => {
            const pg = v.page || '/'
            pageMap[pg] = (pageMap[pg] || 0) + 1
        })
        const topPages = Object.entries(pageMap)
            .map(([page, views]) => ({ page, views }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 10)

        // 6. Daily trend breakdown
        const dailyMap: Record<string, { visitors: Set<string>; views: number }> = {}
        visits.forEach((v) => {
            const dt = v.date || (v.timestamp ? new Date(v.timestamp).toISOString().split('T')[0] : 'unknown')
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
