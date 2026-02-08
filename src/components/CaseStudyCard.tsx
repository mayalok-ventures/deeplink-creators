'use client'

import { ReactNode } from 'react'
import { ArrowRight, TrendingUp, Target, Users, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface CaseStudyCardProps {
    title: string
    industry: string
    challenge: string
    solution: string
    results: Array<{
        metric: string
        value: string
        icon: ReactNode
    }>
    ctaText: string
    href: string
    featured?: boolean
}

const CaseStudyCard = ({
    title,
    industry,
    challenge,
    solution,
    results,
    ctaText,
    href,
    featured = false
}: CaseStudyCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`glass-card-hover rounded-xl overflow-hidden ${featured ? 'md:col-span-2' : ''}`}
        >
            <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 bg-accent rounded-full"></div>
                            <span className="text-sm font-semibold text-accent">PROVEN RESULTS</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold font-heading text-heading">{title}</h3>
                        <p className="text-paragraph mt-1">Industry: {industry}</p>
                    </div>

                    {featured && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary-500/10 text-primary-400 border border-primary-500/20">
                            Featured Case Study
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <h4 className="font-bold text-heading mb-3 flex items-center gap-2">
                            <Target size={18} className="text-red-400" />
                            The Challenge
                        </h4>
                        <p className="text-paragraph">{challenge}</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-heading mb-3 flex items-center gap-2">
                            <TrendingUp size={18} className="text-accent" />
                            Our Solution
                        </h4>
                        <p className="text-paragraph">{solution}</p>
                    </div>
                </div>

                <div className="bg-white/[0.03] rounded-lg p-6 mb-6 border border-white/[0.06]">
                    <h4 className="font-bold text-heading mb-4">Results Achieved</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {results.map((result, index) => (
                            <div key={index} className="text-center">
                                <div className="flex justify-center mb-2">
                                    <div className="text-primary-400">
                                        {result.icon}
                                    </div>
                                </div>
                                <div className="text-xl font-bold font-heading text-heading">{result.value}</div>
                                <div className="text-sm text-paragraph">{result.metric}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
                    <p className="text-paragraph text-sm">
                        Want similar results for your business?
                    </p>
                    <Link
                        href={href}
                        className="inline-flex items-center gap-2 text-primary-400 font-semibold hover:text-primary-300 group"
                    >
                        {ctaText}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default CaseStudyCard
