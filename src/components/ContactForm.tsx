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

        // Here you would typically send to your FormsPere endpoint
        // For now, we'll simulate submission
        setTimeout(() => {
            setIsSubmitting(false)
            alert('Thank you! We\'ll contact you within 24 hours.')
        }, 1500)
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Get Your <span className="text-primary-600">FREE ROI Audit</span>
                </h3>
                <p className="text-gray-600">
                    Fill this form to schedule your audit. We only work with serious businesses.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name *
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Your business name"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Business Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="you@company.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="+91 123 456 7890"
                        />
                    </div>
                </div>

                {/* Strategic Filter Fields */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Marketing Budget *
                        <span className="text-xs text-gray-500 ml-2">(Helps us prepare relevant recommendations)</span>
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
                                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                                        : 'border-gray-300 hover:border-gray-400'
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
                                <span className="font-semibold text-gray-900">{option.label}</span>
                                <span className="text-sm text-gray-500 mt-1">{option.description}</span>
                                {budget === option.value && (
                                    <div className="absolute top-2 right-2 w-3 h-3 bg-primary-500 rounded-full"></div>
                                )}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Business Challenge - The Key Question */}
                <div>
                    <label htmlFor="challenge" className="block text-sm font-medium text-gray-700 mb-2">
                        What's Your Biggest Business Challenge Right Now? *
                        <span className="text-xs text-gray-500 ml-2">(This helps us prepare specific solutions)</span>
                    </label>
                    <textarea
                        id="challenge"
                        name="challenge"
                        rows={3}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Example: We're getting website traffic but no leads. OR Our ads are expensive but not converting..."
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Be specific. The more details you provide, the better we can help.
                    </p>
                </div>

                {/* Website URL */}
                <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                        Website URL (if any)
                    </label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="https://yourwebsite.com"
                    />
                </div>

                {/* Industry */}
                <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                        Industry *
                    </label>
                    <select
                        id="industry"
                        name="industry"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                        <option value="">Select your industry</option>
                        <option value="manufacturing">Manufacturing/Industrial</option>
                        <option value="real-estate">Real Estate/Construction</option>
                        <option value="education">Education/Training</option>
                        <option value="healthcare">Healthcare/Medical</option>
                        <option value="ecommerce">E-commerce/Retail</option>
                        <option value="services">Professional Services</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Submit Button */}
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
                    <p className="text-center text-sm text-gray-500 mt-4">
                        By submitting, you agree to our Privacy Policy. We'll contact you within 24 hours.
                    </p>
                </div>
            </form>

            {/* Warning for low-budget clients */}
            {budget === 'under-20k' && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                        <span className="font-semibold">Note:</span> With budgets under ₹20k, we typically recommend starting
                        with specific, high-ROI strategies rather than full-service management. We'll discuss the most
                        cost-effective options for your business.
                    </p>
                </div>
            )}
        </div>
    )
}