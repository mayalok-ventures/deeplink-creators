export const COMPANY_INFO = {
    name: "Deeplink Creators",
    parentCompany: "Mayalok Venture",
    tagline: "Revenue Machines for Greater Noida Businesses",
    description: "We combine Data Science with Human Psychology to build predictable revenue systems for businesses in Greater Noida.",
    phone: "+91 123 456 7890",
    email: "growth@deeplinkcreators.com",
    address: {
        street: "Sector Alpha 1",
        city: "Greater Noida",
        state: "Uttar Pradesh",
        pincode: "201310",
        country: "India"
    },
    workingHours: {
        weekdays: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 2:00 PM",
        sunday: "Closed"
    }
}

export const NAVIGATION = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Results", href: "/results" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
]

export const SERVICES = [
    {
        id: "seo",
        name: "Neuro-SEO",
        slug: "seo-greater-noida",
        description: "Free Traffic from Google That Actually Converts",
        icon: "Search",
        features: [
            "Local SEO for Greater Noida",
            "Conversion-Optimized Pages",
            "Competitor Analysis",
            "Monthly Performance Reports"
        ]
    },
    {
        id: "performance-marketing",
        name: "Performance Marketing",
        slug: "performance-marketing",
        description: "Paid Ads That Make More Than They Cost",
        icon: "TrendingUp",
        features: [
            "Facebook/Google Ads",
            "ROI-Focused Campaigns",
            "Conversion Tracking",
            "Weekly Optimization"
        ]
    },
    {
        id: "branding",
        name: "Brand Authority",
        slug: "branding",
        description: "Become The Industry Leader in Greater Noida",
        icon: "Award",
        features: [
            "Content Strategy",
            "PR & Outreach",
            "Social Proof Systems",
            "Industry Authority"
        ]
    }
]

export const SOCIAL_LINKS = {
    facebook: "https://facebook.com/deeplinkcreators",
    linkedin: "https://linkedin.com/company/deeplinkcreators",
    instagram: "https://instagram.com/deeplinkcreators",
    twitter: "https://twitter.com/deeplinkcreate"
}

export const BUDGET_OPTIONS = [
    { value: "under-20k", label: "Under ₹20k", description: "Just starting" },
    { value: "20k-50k", label: "₹20k - ₹50k", description: "Growing business" },
    { value: "50k-1l", label: "₹50k - ₹1L", description: "Established business" },
    { value: "1l-plus", label: "₹1L+", description: "Enterprise level" }
]

export const INDUSTRIES = [
    "Manufacturing/Industrial",
    "Real Estate/Construction",
    "Education/Training",
    "Healthcare/Medical",
    "E-commerce/Retail",
    "Professional Services",
    "Technology/IT",
    "Hospitality/Travel",
    "Other"
]

export const SEO_KEYWORDS = {
    local: [
        "Greater Noida digital marketing",
        "SEO agency Greater Noida",
        "Greater Noida marketing agency",
        "Digital marketing Greater Noida",
        "Facebook ads Greater Noida",
        "Google ads Greater Noida",
        "Branding agency Greater Noida"
    ],
    serviceSpecific: [
        "Neuro-SEO Greater Noida",
        "Performance marketing Greater Noida",
        "Brand strategy Greater Noida",
        "Lead generation Greater Noida",
        "ROI focused marketing",
        "Conversion rate optimization"
    ],
    industrial: [
        "Industrial marketing agency",
        "Manufacturing digital marketing",
        "B2B marketing Greater Noida",
        "Factory marketing solutions",
        "Industrial equipment marketing"
    ]
}

export const CASE_STUDY_METRICS = {
    averageROI: "5.7X",
    revenueGenerated: "₹15+ Crore",
    clientGrowth: "300%",
    leadIncrease: "0 → 47/month"
}

export const CONTACT_FORM_FIELDS = {
    required: ["name", "company", "email", "phone", "budget", "challenge"],
    optional: ["website", "industry", "message"]
}