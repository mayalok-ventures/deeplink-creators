'use client'

import { useState, useEffect, useMemo } from 'react'
import { Users, UserPlus, UserCheck, Activity, Loader2, BarChart3, TrendingUp, Globe, Smartphone, Monitor } from 'lucide-react'
import { getAnalyticsData, AnalyticsData } from '@/lib/analytics'

const PERIODS = [
    { label: '7 Days', days: 7 },
    { label: '15 Days', days: 15 },
    { label: '30 Days', days: 30 },
    { label: '6 Months', days: 180 },
]

const SOURCE_COLORS: Record<string, string> = {
    direct: '#9B7545',
    'organic search': '#2563EB',
    'social media': '#7C3AED',
    'linkedin / social': '#0A66C2',
    'messaging / chat': '#16A34A',
    email: '#DC2626',
    referral: '#4B5563',
}

function getSourceColor(source: string): string {
    const key = source.toLowerCase().trim()
    return SOURCE_COLORS[key] || '#9B7545'
}

function formatDate(dateStr: string): string {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatNumber(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
    return n.toLocaleString()
}

export default function AnalyticsDashboard() {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedPeriod, setSelectedPeriod] = useState(30)
    const [chartTab, setChartTab] = useState<'visitors' | 'pageViews'>('visitors')

    const loadData = async (days: number) => {
        setLoading(true)
        try {
            const result = await getAnalyticsData(days)
            setData(result)
        } catch (err: any) {
            console.error('Analytics load error:', err)
        }
        setLoading(false)
    }

    useEffect(() => { loadData(selectedPeriod) }, [selectedPeriod])

    const maxChartValue = useMemo(() => {
        if (!data?.dailyData?.length) return 10
        const key = chartTab === 'visitors' ? 'visitors' : 'pageViews'
        const max = Math.max(...data.dailyData.map((d) => d[key]))
        return max > 0 ? max : 10
    }, [data, chartTab])

    const summaryCards = useMemo(() => {
        if (!data) return []
        return [
            {
                title: 'Total Audience',
                value: formatNumber(data.totalVisitors),
                icon: Users,
                color: 'text-[#9B7545]',
                bgColor: 'bg-[#9B7545]/10',
                borderColor: 'border-[#9B7545]/20',
            },
            {
                title: 'New Visitors',
                value: formatNumber(data.newVisitors),
                icon: UserPlus,
                color: 'text-blue-700',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
            },
            {
                title: 'Returning Cadence',
                value: formatNumber(data.returningVisitors),
                icon: UserCheck,
                color: 'text-amber-700',
                bgColor: 'bg-amber-50',
                borderColor: 'border-amber-200',
            },
            {
                title: 'Live Today',
                value: formatNumber(data.todayVisitors),
                icon: Activity,
                color: 'text-emerald-700',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
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
                        Anonymous visitor volume, syndication channel attribution, and device breakdown.
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
                        <p className="text-xs text-[#6B685F]">Daily volume over the selected observation window</p>
                    </div>

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
                </div>

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
            </div>

            {/* Bottom Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Traffic Channels */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs space-y-3">
                    <h4 className="font-heading font-bold text-sm text-[#181A16] flex items-center gap-2">
                        <Globe size={15} className="text-[#9B7545]" />
                        <span>Channel Attribution</span>
                    </h4>
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
                </div>

                {/* Top Routes */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs space-y-3">
                    <h4 className="font-heading font-bold text-sm text-[#181A16] flex items-center gap-2">
                        <TrendingUp size={15} className="text-[#9B7545]" />
                        <span>Top Landing Pages</span>
                    </h4>
                    <div className="space-y-2 pt-2 divide-y divide-[#E5E0D8]">
                        {data.topPages.map((p, idx) => (
                            <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                                <span className="font-mono text-[#181A16] truncate max-w-[170px]">{p.page}</span>
                                <span className="font-mono text-[#8C887B]">{formatNumber(p.views)} views</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Devices */}
                <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 shadow-xs space-y-3">
                    <h4 className="font-heading font-bold text-sm text-[#181A16] flex items-center gap-2">
                        <Monitor size={15} className="text-[#9B7545]" />
                        <span>Client Hardware</span>
                    </h4>
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
                </div>
            </div>
        </div>
    )
}
