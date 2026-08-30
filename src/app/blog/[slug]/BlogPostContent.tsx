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
        <div className="max-w-3xl mt-12 pt-8 border-t border-[#181A16]/10">
            <div className="bg-[#FAF8F5] rounded-2xl border border-[#181A16]/10 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <p className="font-bold text-[#181A16] font-heading mb-0.5">Share this technical briefing</p>
                    <p className="text-xs font-mono text-[#65675F]">deeplinkcreators.com/b/?id={shortId}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => copyLink(`https://deeplinkcreators.com/blog/${slug}/`)}
                        className="flex items-center gap-1.5 text-[#9B7545] hover:text-[#181A16] transition-colors text-xs font-mono font-semibold"
                    >
                        {copied ? <Check size={14} className="text-[#3F5544]" /> : <Share2 size={14} />}
                        <span>{copied ? 'Copied' : 'Share'}</span>
                    </button>
                    <button
                        onClick={() => copyLink(`https://deeplinkcreators.com/b/?id=${shortId}`)}
                        className="tactile-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#181A16] text-[#F3F0E8] text-xs font-mono font-medium hover:bg-[#252720] shadow-sm"
                    >
                        {copied ? <Check size={14} className="text-[#D4B270]" /> : <Copy size={14} />}
                        <span>{copied ? 'Copied Link' : 'Copy Short Link'}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
