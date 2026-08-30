import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'

export async function GET() {
    try {
        const collection = await getCollection('leads')
        const leads = await collection.find({}).sort({ createdAt: -1 }).toArray()

        const normalized = leads.map((lead) => ({
            ...lead,
            id: lead._id.toString(),
            _id: undefined,
        }))

        return NextResponse.json({ success: true, leads: normalized })
    } catch (err: any) {
        console.error('API /api/leads GET Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to fetch leads', leads: [] },
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const collection = await getCollection('leads')

        const now = new Date()
        const leadDoc = {
            name: body.name || '',
            organization: body.organization || '',
            email: body.email || '',
            phone: body.phone || '',
            service: body.service || body.interest || 'Enterprise Software / SaaS',
            timeline: body.timeline || '1-3 Months',
            scope: body.scope || '',
            budget: body.budget || '',
            source: body.source || 'Enterprise Briefing (/contact)',
            status: body.status || 'new',
            notes: body.notes || '',
            createdAt: now,
            updatedAt: now,
        }

        const result = await collection.insertOne(leadDoc)

        return NextResponse.json({
            success: true,
            id: result.insertedId.toString(),
            lead: { ...leadDoc, id: result.insertedId.toString() },
        })
    } catch (err: any) {
        console.error('API /api/leads POST Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to save lead' },
            { status: 500 }
        )
    }
}
