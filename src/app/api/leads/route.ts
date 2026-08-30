import { NextRequest, NextResponse } from 'next/server'
import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

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

export async function PUT(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')
        const body = await req.json()
        const targetId = id || body.id

        if (!targetId || !ObjectId.isValid(targetId)) {
            return NextResponse.json({ success: false, error: 'Invalid lead ID' }, { status: 400 })
        }

        const updateDoc: Record<string, any> = { updatedAt: new Date() }
        if (body.status !== undefined) updateDoc.status = body.status
        if (body.notes !== undefined) updateDoc.notes = body.notes

        const collection = await getCollection('leads')
        const result = await collection.updateOne({ _id: new ObjectId(targetId) }, { $set: updateDoc })

        if (result.matchedCount === 0) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Lead updated' })
    } catch (err: any) {
        console.error('API /api/leads PUT Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to update lead' },
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id')

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, error: 'Invalid lead ID' }, { status: 400 })
        }

        const collection = await getCollection('leads')
        const result = await collection.deleteOne({ _id: new ObjectId(id) })

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: 'Lead deleted' })
    } catch (err: any) {
        console.error('API /api/leads DELETE Error:', err)
        return NextResponse.json(
            { success: false, error: err.message || 'Failed to delete lead' },
            { status: 500 }
        )
    }
}
