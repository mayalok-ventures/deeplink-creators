/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    DEFAULT: '#0F172A',
                    50: '#1E293B',
                    100: '#182036',
                    200: '#141C2F',
                    300: '#111827',
                    400: '#0D1321',
                    500: '#0F172A',
                    600: '#0B1120',
                    700: '#080E1A',
                    800: '#060A14',
                    900: '#03050A',
                },
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93bbfd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                accent: {
                    DEFAULT: '#00E599',
                    50: '#e6fff5',
                    100: '#b3ffe0',
                    200: '#80ffcc',
                    300: '#4dffb8',
                    400: '#1affa3',
                    500: '#00E599',
                    600: '#00cc88',
                    700: '#00b377',
                    800: '#009966',
                    900: '#008055',
                },
                gold: {
                    DEFAULT: '#D4A853',
                    light: '#E8C97A',
                    dark: '#B8903E',
                },
                heading: '#F1F5F9',
                paragraph: '#94A3B8',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'gradient-shift': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                gradient: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                pulse_glow: {
                    '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.05)' },
                },
                'float-orb': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(5%, -5%)' },
                },
                'grid-pulse': {
                    '0%, 100%': { opacity: '0.03' },
                    '50%': { opacity: '0.06' },
                },
            },
            animation: {
                shimmer: 'shimmer 3s linear infinite',
                float: 'float 6s ease-in-out infinite',
                'float-slow': 'float 8s ease-in-out infinite',
                'float-slower': 'float 10s ease-in-out infinite',
                'gradient-shift': 'gradient-shift 6s ease infinite',
                gradient: 'gradient 4s ease infinite',
                pulse_glow: 'pulse_glow 2s ease-in-out infinite',
                'float-orb': 'float-orb 8s ease-in-out infinite',
                'grid-pulse': 'grid-pulse 4s ease-in-out infinite',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
