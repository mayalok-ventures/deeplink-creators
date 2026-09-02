'use client'

import { useState } from 'react'
import {
    Cpu,
    Network,
    TrendingUp,
    Zap,
    ArrowUpRight
} from 'lucide-react'

export default function HeroSystemVisual({
    activePillar = 'software',
    onPillarChange
}: {
    activePillar?: 'software' | 'distribution' | 'growth'
    onPillarChange?: (p: 'software' | 'distribution' | 'growth') => void
}) {
    return (
        <div className="relative w-full select-none">
            {/* Open Editorial Architectural Frame (Zero Fake Debug Chrome) */}
            <div className="space-y-4">
                {/* Minimalist Pillar Anchors */}
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#181A16]/60 backdrop-blur-xl border border-white/10 w-fit">
                    <button
                        onClick={() => onPillarChange?.('software')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                            activePillar === 'software'
                                ? 'bg-[#9B7545] text-white shadow-sm font-bold'
                                : 'text-[#AAA99F] hover:text-white'
                        }`}
                    >
                        01 Software
                    </button>
                    <button
                        onClick={() => onPillarChange?.('distribution')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                            activePillar === 'distribution'
                                ? 'bg-[#9B7545] text-white shadow-sm font-bold'
                                : 'text-[#AAA99F] hover:text-white'
                        }`}
                    >
                        02 Distribution
                    </button>
                    <button
                        onClick={() => onPillarChange?.('growth')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                            activePillar === 'growth'
                                ? 'bg-[#9B7545] text-white shadow-sm font-bold'
                                : 'text-[#AAA99F] hover:text-white'
                        }`}
                    >
                        03 Growth
                    </button>
                </div>

                {/* Spatial System Context Card */}
                <div className="p-6 rounded-3xl bg-[#181A16]/80 backdrop-blur-2xl border border-white/15 shadow-2xl text-[#F3F0E8] space-y-4">
                    {activePillar === 'software' && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-[10px] font-mono text-[#D4B270] uppercase tracking-widest font-bold">
                                    PILLAR 01 // OPERATING SOFTWARE
                                </span>
                                <a
                                    href="https://sahyak.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] font-mono text-[#D4B270] hover:underline flex items-center gap-1"
                                >
                                    <span>sahyak.com</span>
                                    <ArrowUpRight size={12} />
                                </a>
                            </div>
                            <h4 className="text-xl font-heading font-extrabold text-white">
                                Sahyak CRM: Sales Pipeline Control
                            </h4>
                            <p className="text-xs text-[#AAA99F] leading-relaxed">
                                Lead routing, pipeline qualification gates, and sales team accountability built into one operating system.
                            </p>
                        </div>
                    )}

                    {activePillar === 'distribution' && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-[10px] font-mono text-[#8FA994] uppercase tracking-widest font-bold">
                                    PILLAR 02 // CREATOR NETWORKS
                                </span>
                                <span className="text-[10px] font-mono text-[#8FA994] bg-[#3F5544]/20 px-2 py-0.5 rounded">
                                    ACQUISITION CHANNEL
                                </span>
                            </div>
                            <h4 className="text-xl font-heading font-extrabold text-white">
                                Creator-Led Market Distribution
                            </h4>
                            <p className="text-xs text-[#AAA99F] leading-relaxed">
                                Managed creator networks connecting businesses to relevant local and niche audiences as an organized distribution channel.
                            </p>
                        </div>
                    )}

                    {activePillar === 'growth' && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                <span className="text-[10px] font-mono text-[#D4B270] uppercase tracking-widest font-bold">
                                    PILLAR 03 // DEMAND SYSTEMS
                                </span>
                                <span className="text-[10px] font-mono text-[#D4B270] bg-[#9B7545]/20 px-2 py-0.5 rounded">
                                    ACQUISITION FLOW
                                </span>
                            </div>
                            <h4 className="text-xl font-heading font-extrabold text-white">
                                Performance, SEO &amp; Conversion UX
                            </h4>
                            <p className="text-xs text-[#AAA99F] leading-relaxed">
                                High-intent search acquisition, technical SEO, and conversion web architecture synchronized directly with CRM pipelines.
                            </p>
                        </div>
                    )}

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#AAA99F]">
                        <span className="flex items-center gap-1.5">
                            <Zap size={12} className="text-[#9B7545]" />
                            <span>Connected Infrastructure</span>
                        </span>
                        <span className="text-[#D4B270]">Mayalok Venture</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
