'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import {
    Cpu,
    Network,
    TrendingUp,
    Zap,
    MousePointer2,
    Activity
} from 'lucide-react'

// Dynamically import the Liquid Growth Field Canvas with ssr: false
const LiquidGrowthField = dynamic(
    () => import('@/components/canvas/LiquidGrowthField'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center bg-[#121310] rounded-3xl border border-[#9B7545]/20">
                <div className="w-8 h-8 rounded-full border-2 border-[#D4B270] border-t-transparent animate-spin" />
            </div>
        )
    }
)

export default function HeroSystemVisual() {
    const [activePillar, setActivePillar] = useState<'software' | 'distribution' | 'growth'>('software')

    return (
        <div className="relative w-full max-w-2xl mx-auto lg:max-w-none select-none">
            {/* Ambient Background Aura */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-[#9B7545]/25 via-[#181A16]/50 to-[#3F5544]/20 rounded-3xl blur-3xl pointer-events-none" />

            <div className="relative rounded-3xl bg-[#181A16] border border-[#9B7545]/30 shadow-2xl overflow-hidden transition-all duration-300">
                {/* Visual Header / Kernel Bar */}
                <div className="px-5 py-3.5 bg-[#121310] border-b border-white/10 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D4B270] animate-pulse" />
                        <span className="text-white font-bold tracking-wider text-[11px]">
                            LIVING GROWTH FIELD // GLSL FLUID
                        </span>
                    </div>

                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                        <button
                            onClick={() => setActivePillar('software')}
                            className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                                activePillar === 'software'
                                    ? 'bg-[#9B7545] text-white font-bold shadow-xs'
                                    : 'text-[#AAA99F] hover:text-white'
                            }`}
                        >
                            Software
                        </button>
                        <button
                            onClick={() => setActivePillar('distribution')}
                            className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                                activePillar === 'distribution'
                                    ? 'bg-[#9B7545] text-white font-bold shadow-xs'
                                    : 'text-[#AAA99F] hover:text-white'
                            }`}
                        >
                            Distribution
                        </button>
                        <button
                            onClick={() => setActivePillar('growth')}
                            className={`px-3 py-1 rounded-lg text-[11px] font-mono transition-all ${
                                activePillar === 'growth'
                                    ? 'bg-[#9B7545] text-white font-bold shadow-xs'
                                    : 'text-[#AAA99F] hover:text-white'
                            }`}
                        >
                            Growth
                        </button>
                    </div>
                </div>

                {/* Living Liquid WebGL Field */}
                <div className="relative w-full">
                    <LiquidGrowthField activePillar={activePillar} />

                    {/* Floating Overlay Indicator */}
                    <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#121310]/85 backdrop-blur-md border border-white/10 text-xs font-mono flex items-center justify-between text-[#AAA99F] z-10 shadow-lg">
                        {activePillar === 'software' && (
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <Cpu size={14} className="text-[#D4B270]" />
                                    <span className="text-white font-semibold">Sahyak Operating Matrix</span>
                                </div>
                                <span className="text-[#D4B270] text-[11px]">Structured Conduit</span>
                            </div>
                        )}
                        {activePillar === 'distribution' && (
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <Network size={14} className="text-[#8FA994]" />
                                    <span className="text-white font-semibold">Creator Network Field</span>
                                </div>
                                <span className="text-[#8FA994] text-[11px]">Radial Resonance</span>
                            </div>
                        )}
                        {activePillar === 'growth' && (
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={14} className="text-[#D4B270]" />
                                    <span className="text-white font-semibold">Continuous Demand Flow</span>
                                </div>
                                <span className="text-[#D4B270] text-[11px]">Laminar Stream</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Interactive Prompt */}
                <div className="px-5 py-3 bg-[#121310] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#AAA99F]">
                    <div className="flex items-center gap-2">
                        <MousePointer2 size={13} className="text-[#D4B270] animate-bounce" />
                        <span>Move cursor across liquid field to deform material</span>
                    </div>
                    <span className="text-[#8FA994] hidden sm:inline">Viscous Force Tracking</span>
                </div>
            </div>
        </div>
    )
}
