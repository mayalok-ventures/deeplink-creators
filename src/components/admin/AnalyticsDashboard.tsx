'use client'

import { useState, useEffect, useMemo } from 'react'
import { Users, UserPlus, UserCheck, Activity, Loader2, BarChart3 } from 'lucide-react'
import { getAnalyticsData, AnalyticsData } from '@/lib/analytics'

const PERIODS = [
    { label: '7 Days', days: 7 },
    { label: '15 Days', days: 15 },
    { label: '30 Days', days: 30 },
    { label: '6 Months', days: 180 },
]

const SOURCE_COLORS: Record<string, string> = {
    google: '#EF4444',
    facebook: '#1877F2',
    instagram: '#E4405F',
    linkedin: '#0A66C2',
    whatsapp: '#25D366',
    twitter: '#F1F5F9',
    x: '#F1F5F9',
    youtube: '#FF0000',
    direct: '#94A3B8',
}

function getSourceColor(source: string): string {
    const key = source.toLowerCase().replace(/\s+/g, '')
    return SOURCE_COLORS[key] || '#60a5fa'
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
        } catch {
            setData(null)
        }
        setLoading(false)
    }

    useEffect(() => { loadData(selectedPeriod) }, [selectedPeriod])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        )
    }

    if (!data) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center">
                <BarChart3 className="w-16 h-16 text-paragraph/30 mb-4" />
                <p className="text-heading text-lg font-medium mb-2">No visitor data yet</p>
                <p className="text-paragraph text-sm max-w-md">
                    Analytics will appear once visitors start arriving.
                </p>
            </div>
        )
    }

    const sortedSources = [...data.sources].sort((a, b) => b.count - a.count)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-heading font-heading">Analytics</h2>
                <div className="flex items-center gap-1 bg-white/[0.03] rounded-xl p-1">
                    {PERIODS.map(p => (
                        <button
                            key={p.days}
                            onClick={() => setSelectedPeriod(p.days)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                selectedPeriod === p.days
                                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/20'
                                    : 'text-paragraph hover:text-heading hover:bg-white/[0.03] border border-transparent'
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            <StatCards data={data} />
            <TrafficChart dailyData={data.dailyData} chartTab={chartTab} setChartTab={setChartTab} />

            <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-heading mb-4">Traffic Sources</h3>
                <div className="space-y-3">
                    {sortedSources.map(s => (
                        <div key={s.source} className="flex items-center gap-3">
                            <span
                                className="w-3 h-3 rounded-full flex-shrink-0"
                                style={{ backgroundColor: getSourceColor(s.source) }}
                            />
                            <span className="text-sm text-heading w-28 flex-shrink-0 truncate">{s.source}</span>
                            <div className="flex-1 relative h-2 bg-white/[0.04] rounded-full overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                                    style={{
                                        width: `${s.percentage}%`,
                                        backgroundColor: getSourceColor(s.source),
                                        opacity: 0.7,
                                    }}
                                />
                            </div>
                            <span className="text-sm text-paragraph w-16 text-right flex-shrink-0">
                                {formatNumber(s.count)}
                            </span>
                            <span className="text-sm text-paragraph w-12 text-right flex-shrink-0">
                                {s.percentage}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DevicesCard devices={data.devices} />
                <TopPagesCard topPages={data.topPages} />
            </div>
        </div>
    )
}

function StatCards({ data }: { data: AnalyticsData }) {
    const cards = [
        { label: 'Total Visitors', value: data.totalVisitors, subtitle: 'All time unique visitors', icon: Users, color: '#60a5fa' },
        { label: 'New Visitors', value: data.newVisitors, subtitle: 'First time visitors', icon: UserPlus, color: '#00E599' },
        { label: 'Returning Visitors', value: data.returningVisitors, subtitle: 'Came back again', icon: UserCheck, color: '#8B5CF6' },
        { label: 'Today\'s Visitors', value: data.todayVisitors, subtitle: 'Active today', icon: Activity, color: '#F59E0B' },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map(c => (
                <div key={c.label} className="glass-card rounded-xl p-6 relative">
                    <div
                        className="absolute top-4 right-4 p-2 rounded-lg"
                        style={{ backgroundColor: c.color + '1A' }}
                    >
                        <c.icon className="w-5 h-5" style={{ color: c.color }} />
                    </div>
                    <p className="text-sm text-paragraph mb-1">{c.label}</p>
                    <p className="text-3xl font-bold text-heading">{formatNumber(c.value)}</p>
                    <p className="text-sm text-paragraph mt-1">{c.subtitle}</p>
                </div>
            ))}
        </div>
    )
}

function TrafficChart({
    dailyData,
    chartTab,
    setChartTab,
}: {
    dailyData: AnalyticsData['dailyData']
    chartTab: 'visitors' | 'pageViews'
    setChartTab: (tab: 'visitors' | 'pageViews') => void
}) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    const values = dailyData.map(d => (chartTab === 'visitors' ? d.visitors : d.pageViews))
    const maxValue = Math.max(...values, 1)
    const dataCount = dailyData.length
    const skipLabels = dataCount > 15

    const yTicks = useMemo(() => {
        const step = Math.ceil(maxValue / 4)
        return [0, step, step * 2, step * 3, step * 4].filter(v => v <= maxValue * 1.1)
    }, [maxValue])

    const topTick = yTicks[yTicks.length - 1] || maxValue

    return (
        <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-heading">Visitor Analytics</h3>
                <div className="flex items-center gap-1 bg-white/[0.03] rounded-lg p-1">
                    {(['visitors', 'pageViews'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setChartTab(tab)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                                chartTab === tab
                                    ? 'bg-primary-500/20 text-primary-400'
                                    : 'text-paragraph hover:text-heading'
                            }`}
                        >
                            {tab === 'visitors' ? 'Visitors' : 'Page Views'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative" style={{ height: 300 }}>
                <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-xs text-paragraph">
                    {[...yTicks].reverse().map(tick => (
                        <span key={tick}>{formatNumber(tick)}</span>
                    ))}
                </div>

                <div className="absolute inset-0 left-12 bottom-6">
                    {yTicks.map(tick => (
                        <div
                            key={tick}
                            className="absolute left-0 right-0 border-t border-white/[0.04]"
                            style={{ bottom: `${(tick / topTick) * 100}%` }}
                        />
                    ))}
                </div>

                <div className="absolute left-12 right-0 top-0 bottom-6 flex items-end gap-[2px]">
                    {dailyData.map((d, i) => {
                        const val = chartTab === 'visitors' ? d.visitors : d.pageViews
                        const pct = (val / topTick) * 100

                        return (
                            <div
                                key={d.date}
                                className="flex-1 flex flex-col items-center group relative"
                                style={{ minWidth: 0 }}
                            >
                                <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                                    <div className="bg-dark-300 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-heading whitespace-nowrap shadow-xl">
                                        <p className="font-medium">{formatDate(d.date)}</p>
                                        <p className="text-paragraph">
                                            {chartTab === 'visitors' ? 'Visitors' : 'Views'}: {val.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="w-full rounded-t-sm transition-all duration-700 ease-out"
                                    style={{
                                        height: mounted ? `${pct}%` : '0%',
                                        background:
                                            chartTab === 'visitors'
                                                ? 'linear-gradient(to top, #3b82f6, #60a5fa)'
                                                : 'linear-gradient(to top, #00E599, #4dffb8)',
                                        maxWidth: dataCount > 30 ? 12 : dataCount > 15 ? 18 : 28,
                                        margin: '0 auto',
                                        minHeight: val > 0 ? 2 : 0,
                                    }}
                                />
                            </div>
                        )
                    })}
                </div>

                <div className="absolute left-12 right-0 bottom-0 flex">
                    {dailyData.map((d, i) => (
                        <div
                            key={d.date}
                            className="flex-1 text-center"
                            style={{ minWidth: 0 }}
                        >
                            {(!skipLabels || i % 2 === 0) && (
                                <span className="text-[10px] text-paragraph truncate block">
                                    {formatDate(d.date)}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function DevicesCard({ devices }: { devices: AnalyticsData['devices'] }) {
    const colorMap: Record<string, string> = {
        mobile: '#3b82f6',
        desktop: '#00E599',
        tablet: '#8B5CF6',
    }

    return (
        <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-heading mb-4">Devices</h3>
            <div className="space-y-4">
                {devices.map(d => {
                    const color = colorMap[d.device.toLowerCase()] || '#60a5fa'
                    return (
                        <div key={d.device}>
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-sm text-heading">{d.device}</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-paragraph">{formatNumber(d.count)}</span>
                                    <span className="text-sm font-medium" style={{ color }}>{d.percentage}%</span>
                                </div>
                            </div>
                            <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${d.percentage}%`, backgroundColor: color }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function TopPagesCard({ topPages }: { topPages: AnalyticsData['topPages'] }) {
    const pages = topPages.slice(0, 10)

    return (
        <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-heading mb-4">Top Pages</h3>
            <div className="space-y-0">
                {pages.map((p, i) => (
                    <div
                        key={p.page}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-lg ${
                            i % 2 === 0 ? 'bg-white/[0.02]' : ''
                        }`}
                    >
                        <span className="text-sm text-heading truncate flex-1 mr-4" title={p.page}>
                            {p.page}
                        </span>
                        <span className="text-sm text-paragraph flex-shrink-0">
                            {formatNumber(p.views)} views
                        </span>
                    </div>
                ))}
                {pages.length === 0 && (
                    <p className="text-sm text-paragraph text-center py-4">No page data available</p>
                )}
            </div>
        </div>
    )
}
