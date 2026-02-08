'use client'

import { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

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
}

const ServiceCard = ({
    icon,
    title,
    benefit,
    description,
    features,
    cta,
    href,
    gradient = 'from-primary-500 to-primary-600',
    index = 0,
}: ServiceCardProps) => {
    const formattedIndex = String(index + 1).padStart(2, '0')

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
            whileHover={{ y: -8 }}
            className="group relative bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
        >
            <div className={`h-1 bg-gradient-to-r ${gradient}`} />

            <div className="absolute top-4 right-4">
                <span className={`text-4xl font-black bg-gradient-to-br ${gradient} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
                    {formattedIndex}
                </span>
            </div>

            <div
                className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-500 pointer-events-none -z-10`}
            />

            <div className="p-6 pt-5">
                <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                    whileHover={{ rotate: 8, scale: 1.15 }}
                >
                    <div className="text-primary-600">
                        {icon}
                    </div>
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className={`font-semibold mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {benefit}
                </p>

                <p className="text-gray-600 mb-6">{description}</p>

                <ul className="space-y-2 mb-6">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`} />
                            <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-primary-600 font-semibold group/btn relative"
                >
                    <span className="relative">
                        {cta}
                        <span className={`absolute left-0 -bottom-0.5 w-0 h-0.5 bg-gradient-to-r ${gradient} group-hover/btn:w-full transition-all duration-300`} />
                    </span>
                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    )
}

export default ServiceCard
