import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const type = searchParams.get('type') || 'contact'
        const collection = await getCollection('settings')

        const doc = await collection.findOne({ key: type })

        return NextResponse.json({ success: true, data: doc ? doc.data : null })
    } catch (err: any) {
        console.error('API /api/settings GET Error:', err)
        return NextResponse.json({ success: false, error: err.message, data: null }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { type = 'contact', data } = body
        const collection = await getCollection('settings')

        await collection.updateOne(
            { key: type },
            { $set: { key: type, data, updatedAt: new Date() } },
            { upsert: true }
        )

        return NextResponse.json({ success: true, message: 'Settings saved' })
    } catch (err: any) {
        console.error('API /api/settings POST Error:', err)
        return NextResponse.json({ success: false, error: err.message }, { status: 500 })
    }
}
