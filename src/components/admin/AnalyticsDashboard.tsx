'use client'

import { useState, useEffect, useMemo } from 'react'
import {
    BarChart3, Users, Eye, TrendingUp, Globe, Monitor, Smartphone,
    Calendar, ArrowUpRight, ArrowDownRight, Activity, Clock, ShieldCheck, RefreshCw, Loader2
} from 'lucide-react'
import { getAnalyticsData, AnalyticsData } from '@/lib/analytics'

const PERIODS = [
    { label: '7 Days', days: 7 },
    { label: '30 Days', days: 30 },
    { label: '90 Days', days: 90 },
]

function formatNumber(num: number): string {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'
    return num.toString()
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const SOURCE_COLORS: Record<string, string> = {
    'Direct': '#9B7545',
    'Organic Search': '#2563EB',
    'LinkedIn / Social': '#0A66C2',
    'Social Media': '#E1306C',
    'Messaging / Chat': '#25D366',
    'Email': '#EA4335',
    'Referral': '#64748B',
    'Other': '#94A3B8',
}

function getSourceColor(source: string): string {
    return SOURCE_COLORS[source] || '#9B7545'
}

export default function AnalyticsDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedPeriod, setSelectedPeriod] = useState(30)
    const [chartTab, setChartTab] = useState<'visitors' | 'pageViews'>('visitors')

    const loadData = async () => {
        setLoading(true)
        try {
            const result = await getAnalyticsData(selectedPeriod)
            setData(result)
        } catch (err) {
            console.error('Analytics load error:', err)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadData()
    }, [selectedPeriod])

    const maxChartValue = useMemo(() => {
        if (!data || !data.dailyData || data.dailyData.length === 0) return 10
        const values = data.dailyData.map((d) => (chartTab === 'visitors' ? d.visitors : d.pageViews))
        return Math.max(...values, 10)
    }, [data, chartTab])

    const summaryCards = useMemo(() => {
        if (!data) return []
        return [
            {
                title: 'Total Audience',
                value: formatNumber(data.totalVisitors),
                icon: Users,
                color: 'text-[#181A16]',
                bgColor: 'bg-[#F3F0E8]',
                borderColor: 'border-[#E5E0D8]',
            },
            {
                title: 'New Visitors',
                value: formatNumber(data.newVisitors),
                icon: Eye,
                color: 'text-emerald-700',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
            },
            {
                title: 'Returning Cadence',
                value: formatNumber(data.returningVisitors),
                icon: RefreshCw,
                color: 'text-[#9B7545]',
                bgColor: 'bg-[#9B7545]/10',
                borderColor: 'border-[#9B7545]/20',
            },
            {
                title: 'Live Today',
                value: formatNumber(data.todayVisitors),
                icon: Activity,
                color: 'text-blue-700',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
            },
        ]
    }, [data])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32 bg-white rounded-2xl border border-[#E5E0D8]">
                <Loader2 className="w-8 h-8 text-[#9B7545] animate-spin" />
            </div>
        )
    }

    if (!data) return null

    const hasVisits = data.totalVisitors > 0

    return (
        <div className="space-y-6 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-heading text-[#181A16] flex items-center gap-2.5">
                        <BarChart3 className="text-[#9B7545]" size={24} />
                        <span>Platform Telemetry &amp; Analytics</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6B685F] mt-1">
                        Live visitor volume, syndication channel attribution, and device breakdown recorded directly in MongoDB.
                    </p>
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-[#E5E0D8] p-1 rounded-xl shadow-xs">
                    {PERIODS.map((period) => (
                        <button
                            key={period.days}
                            onClick={() => setSelectedPeriod(period.days)}
                            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors ${
                                selectedPeriod === period.days
                                    ? 'bg-[#9B7545] text-white'
                                    : 'text-[#6B685F] hover:text-[#181A16] hover:bg-[#F3F0E8]'
                            }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card, i) => (
                    <div key={i} className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-mono text-[#8C887B] uppercase tracking-wider">{card.title}</span>
                            <div className={`w-8 h-8 rounded-lg ${card.bgColor} ${card.color} flex items-center justify-center border ${card.borderColor}`}>
                                <card.icon size={16} />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold font-heading text-[#181A16]">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Chart Area */}
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E0D8] pb-4">
                    <div>
                        <h3 className="font-heading font-bold text-base text-[#181A16]">Traffic Trajectory</h3>
                        <p className="text-xs text-[#6B685F]">
                            {hasVisits ? 'Daily volume over the selected observation window' : 'Telemetry engine is active and awaiting site traffic'}
                        </p>
                    </div>

                    {hasVisits && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setChartTab('visitors')}
                                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                                    chartTab === 'visitors'
                                        ? 'bg-[#9B7545]/10 text-[#9B7545] border border-[#9B7545]/30'
                                        : 'text-[#6B685F] hover:bg-[#F3F0E8]'
                                }`}
                            >
                                Unique Visitors
                            </button>
                            <button
                                onClick={() => setChartTab('pageViews')}
                                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                                    chartTab === 'pageViews'
                                        ? 'bg-[#9B7545]/10 text-[#9B7545] border border-[#9B7545]/30'
                                        : 'text-[#6B685F] hover:bg-[#F3F0E8]'
                                }`}
                            >
                                Page Impressions
                            </button>
                        </div>
                    )}
                </div>

                {!hasVisits ? (
                    <div className="py-16 text-center">
                        <Activity className="w-10 h-10 text-[#8C887B] mx-auto mb-3 opacity-40" />
                        <h4 className="text-sm font-bold text-[#181A16] mb-1">Live Telemetry Active</h4>
                        <p className="text-xs text-[#6B685F] max-w-md mx-auto">
                            No visits have been recorded in the database yet. When users navigate through public pages, visit counts, referrers, and device stats will appear here in real time.
                        </p>
                    </div>
                ) : (
                    <div className="h-56 flex items-end gap-1.5 pt-6 pb-2 px-2 overflow-x-auto">
                        {data.dailyData.map((d, i) => {
                            const val = chartTab === 'visitors' ? d.visitors : d.pageViews
                            const heightPct = Math.max(8, Math.round((val / maxChartValue) * 100))
                            return (
                                <div key={i} className="flex-1 min-w-[20px] flex flex-col items-center gap-1 group relative">
                                    <div
                                        style={{ height: `${heightPct}%` }}
                                        className="w-full bg-[#9B7545]/80 hover:bg-[#9B7545] rounded-t transition-all cursor-pointer relative"
                                    >
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#181A16] text-white text-[10px] font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none">
                                            {formatDate(d.date)}: {val} {chartTab}
                                        </div>
                                    </div>
                                    <span className="text-[9px] font-mono text-[#8C887B] truncate w-full text-center">
                                        {i % Math.ceil(data.dailyData.length / 10) === 0 ? formatDate(d.date) : ''}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Bottom Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Traffic Channels */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs space-y-3">
                    <h4 className="font-heading font-bold text-sm text-[#181A16] flex items-center gap-2">
                        <Globe size={15} className="text-[#9B7545]" />
                        <span>Channel Attribution</span>
                    </h4>
                    {data.sources.length === 0 ? (
                        <p className="text-xs text-[#8C887B] pt-2">No attribution records logged yet.</p>
                    ) : (
                        <div className="space-y-2.5 pt-2">
                            {data.sources.map((s, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-[#181A16]">{s.source}</span>
                                        <span className="font-mono text-[#6B685F]">{s.percentage}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#F3F0E8] rounded-full overflow-hidden">
                                        <div
                                            style={{ width: `${s.percentage}%`, backgroundColor: getSourceColor(s.source) }}
                                            className="h-full rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Top Routes */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs space-y-3">
                    <h4 className="font-heading font-bold text-sm text-[#181A16] flex items-center gap-2">
                        <TrendingUp size={15} className="text-[#9B7545]" />
                        <span>Top Landing Pages</span>
                    </h4>
                    {data.topPages.length === 0 ? (
                        <p className="text-xs text-[#8C887B] pt-2">No landing page views logged yet.</p>
                    ) : (
                        <div className="space-y-2 pt-2 divide-y divide-[#E5E0D8]">
                            {data.topPages.map((p, idx) => (
                                <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                                    <span className="font-mono text-[#181A16] truncate max-w-[170px]">{p.page}</span>
                                    <span className="font-mono text-[#8C887B]">{formatNumber(p.views)} views</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Devices */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs space-y-3">
                    <h4 className="font-heading font-bold text-sm text-[#181A16] flex items-center gap-2">
                        <Monitor size={15} className="text-[#9B7545]" />
                        <span>Client Hardware</span>
                    </h4>
                    {data.devices.length === 0 ? (
                        <p className="text-xs text-[#8C887B] pt-2">No device logs recorded yet.</p>
                    ) : (
                        <div className="space-y-2.5 pt-2">
                            {data.devices.map((d, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-[#181A16] flex items-center gap-1.5">
                                            {d.device === 'Desktop' ? <Monitor size={12} /> : <Smartphone size={12} />}
                                            <span>{d.device}</span>
                                        </span>
                                        <span className="font-mono text-[#6B685F]">{d.percentage}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#F3F0E8] rounded-full overflow-hidden">
                                        <div
                                            style={{ width: `${d.percentage}%` }}
                                            className="h-full bg-[#9B7545] rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
