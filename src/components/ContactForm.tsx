'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [budget, setBudget] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.target as HTMLFormElement)

        setTimeout(() => {
            setIsSubmitting(false)
            alert('Thank you! We\'ll contact you within 24 hours.')
        }, 1500)
    }

    return (
        <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-heading mb-4">
                    Get Your <span className="text-primary-400">FREE ROI Audit</span>
                </h3>
                <p className="text-paragraph">
                    Fill this form to schedule your audit. We only work with serious businesses.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-heading mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-heading mb-2">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            required
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="Your business name"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-heading mb-2">
                            Business Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="you@company.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-heading mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                            placeholder="+91 123 456 7890"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-heading mb-2">
                        Monthly Marketing Budget *
                        <span className="text-xs text-paragraph ml-2">(Helps us prepare relevant recommendations)</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { value: 'under-20k', label: 'Under ₹20k', description: 'Just starting' },
                            { value: '50k-1l', label: '₹50k - ₹1L', description: 'Growing business' },
                            { value: '1l-plus', label: '₹1L+', description: 'Established business' }
                        ].map((option) => (
                            <label
                                key={option.value}
                                className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all ${budget === option.value
                                        ? 'border-primary-500/50 bg-primary-500/10 ring-1 ring-primary-500/30'
                                        : 'border-white/[0.08] hover:border-white/[0.15] bg-dark/60'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="budget"
                                    value={option.value}
                                    checked={budget === option.value}
                                    onChange={(e) => setBudget(e.target.value)}
                                    className="sr-only"
                                    required
                                />
                                <span className="font-semibold text-heading">{option.label}</span>
                                <span className="text-sm text-paragraph mt-1">{option.description}</span>
                                {budget === option.value && (
                                    <div className="absolute top-2 right-2 w-3 h-3 bg-primary-500 rounded-full"></div>
                                )}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="challenge" className="block text-sm font-medium text-heading mb-2">
                        What's Your Biggest Business Challenge Right Now? *
                        <span className="text-xs text-paragraph ml-2">(This helps us prepare specific solutions)</span>
                    </label>
                    <textarea
                        id="challenge"
                        name="challenge"
                        rows={3}
                        required
                        className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                        placeholder="Example: We're getting website traffic but no leads. OR Our ads are expensive but not converting..."
                    />
                    <p className="text-xs text-paragraph mt-2">
                        Be specific. The more details you provide, the better we can help.
                    </p>
                </div>

                <div>
                    <label htmlFor="website" className="block text-sm font-medium text-heading mb-2">
                        Website URL (if any)
                    </label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading placeholder-paragraph/50 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                        placeholder="https://yourwebsite.com"
                    />
                </div>

                <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-heading mb-2">
                        Industry *
                    </label>
                    <select
                        id="industry"
                        name="industry"
                        required
                        className="w-full px-4 py-3 bg-dark/80 border border-white/[0.08] rounded-lg text-heading focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                    >
                        <option value="" className="bg-dark">Select your industry</option>
                        <option value="manufacturing" className="bg-dark">Manufacturing/Industrial</option>
                        <option value="real-estate" className="bg-dark">Real Estate/Construction</option>
                        <option value="education" className="bg-dark">Education/Training</option>
                        <option value="healthcare" className="bg-dark">Healthcare/Medical</option>
                        <option value="ecommerce" className="bg-dark">E-commerce/Retail</option>
                        <option value="services" className="bg-dark">Professional Services</option>
                        <option value="other" className="bg-dark">Other</option>
                    </select>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Sending...
                            </>
                        ) : (
                            <>
                                Get My Free ROI Audit
                                <Send size={20} />
                            </>
                        )}
                    </button>
                    <p className="text-center text-sm text-paragraph mt-4">
                        By submitting, you agree to our Privacy Policy. We'll contact you within 24 hours.
                    </p>
                </div>
            </form>

            {budget === 'under-20k' && (
                <div className="mt-6 p-4 bg-gold/10 border border-gold/20 rounded-lg">
                    <p className="text-sm text-gold-light">
                        <span className="font-semibold">Note:</span> With budgets under ₹20k, we typically recommend starting
                        with specific, high-ROI strategies rather than full-service management. We'll discuss the most
                        cost-effective options for your business.
                    </p>
                </div>
            )}
        </div>
    )
}
