'use client'

import { useState, useEffect } from 'react'
import { getServiceCards } from '@/lib/firestore'

export default function ServiceHeroImage({ href }: { href: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    useEffect(() => {
        getServiceCards().then(cards => {
            const match = cards.find(c => c.href === href || c.href === href + '/')
            if (match?.imageUrl) setImageUrl(match.imageUrl)
        }).catch(() => {})
    }, [href])

    if (!imageUrl) return null

    return (
        <div className="mt-10 max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
            <img
                src={imageUrl}
                alt=""
                className="w-full max-h-80 object-cover"
            />
        </div>
    )
}
