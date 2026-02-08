// Google Analytics 4 Event Tracking
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, eventParams)
    }
}

// Meta Pixel Event Tracking
export const trackFacebookEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', eventName, parameters)
    }
}

// Track Form Submission
export const trackFormSubmission = (formData: Record<string, any>) => {
    trackEvent('form_submission', {
        form_name: 'contact_form',
        budget_segment: formData.budget,
        industry: formData.industry
    })

    trackFacebookEvent('Lead', {
        content_name: 'Contact Form',
        content_category: 'Lead'
    })
}

// Track Button Clicks
export const trackCTAClick = (buttonText: string, location: string) => {
    trackEvent('cta_click', {
        button_text: buttonText,
        page_location: location
    })
}