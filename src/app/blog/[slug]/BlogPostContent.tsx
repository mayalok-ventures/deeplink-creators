'use client'

import { useState } from 'react'
import { Copy, Check, Share2 } from 'lucide-react'

interface BlogPostContentProps {
    shortId: string
    slug: string
}

export default function BlogPostContent({ shortId, slug }: BlogPostContentProps) {
    const [copied, setCopied] = useState(false)

    const copyLink = (url: string) => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="max-w-3xl mt-12 pt-8 border-t border-[#4A4A4A]/10">
            <div className="bg-white rounded-2xl border border-[#E8E6E1] shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <p className="font-bold text-heading mb-1">Share this post</p>
                    <p className="text-sm text-paragraph">deeplinkcreators.com/b/?id={shortId}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => copyLink(`https://deeplinkcreators.com/blog/${slug}/`)}
                        className="flex items-center gap-2 text-[#C39A2B] hover:text-[#A9791B] transition-colors text-sm"
                    >
                        {copied ? <Check size={16} /> : <Share2 size={16} />}
                        {copied ? 'Copied!' : 'Share'}
                    </button>
                    <button
                        onClick={() => copyLink(`https://deeplinkcreators.com/b/?id=${shortId}`)}
                        className="btn-primary flex items-center gap-2 text-sm"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied!' : 'Copy Short Link'}
                    </button>
                </div>
            </div>
        </div>
    )
}
