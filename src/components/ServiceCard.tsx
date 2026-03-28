'use client'

import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
    icon: ReactNode
    title: string
    benefit: string
    description: string
    features: string[]
    cta: string
    href: string
    gradient?: string
    index?: number
    imageUrl?: string
    className?: string
}

const ServiceCard = ({
    icon,
    title,
    benefit,
    description,
    features,
    cta,
    href,
    gradient = 'from-[#C39A2B] to-[#D4AC55]',
    index = 0,
    imageUrl,
    className
}: ServiceCardProps) => {
    const formattedIndex = String(index + 1).padStart(2, '0')

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "group relative bg-white rounded-3xl border border-[#E8E6E1] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-[#C39A2B]/30 flex flex-col transform-gpu",
                className
            )}
        >
            {/* Visible image header */}
            {imageUrl && (
                <div className="relative h-48 md:h-52 overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className={cn("absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500")} />
                    <div className={cn("absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r transform-gpu scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left", gradient)} />
                    <span className="absolute top-4 right-4 text-5xl font-black font-heading text-white/20 group-hover:text-white/40 transition-colors duration-500">
                        {formattedIndex}
                    </span>
                </div>
            )}

            <div className="relative z-10 p-8 flex flex-col flex-1">
                <div className="flex items-start gap-4 mb-5">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br text-white shadow-sm flex-shrink-0", gradient)}>
                        {icon}
                    </div>
                    {!imageUrl && (
                        <span className="text-5xl font-black font-heading text-gray-100 group-hover:text-gray-200 transition-colors duration-300 ml-auto">
                            {formattedIndex}
                        </span>
                    )}
                </div>

                <h3 className="text-2xl font-bold font-heading text-[#0F1112] mb-2">{title}</h3>
                <p className={cn("font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r", gradient)}>
                    {benefit}
                </p>

                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{description}</p>

                <ul className="space-y-3 mb-8">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className={cn("w-1.5 h-1.5 rounded-full mt-2 bg-gradient-to-r shrink-0", gradient)} />
                            <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-[#C39A2B] font-bold group/btn relative mt-auto w-fit hover:gap-3 transition-all duration-300"
                >
                    <span>{cta}</span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    )
}

export default ServiceCard
