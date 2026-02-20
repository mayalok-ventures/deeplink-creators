/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    DEFAULT: '#0F1112',
                    50: '#1A1B1C',
                    100: '#161718',
                    200: '#131415',
                    300: '#0F1112',
                    400: '#0B0C0D',
                    500: '#0F1112',
                    600: '#0A0B0C',
                    700: '#080909',
                    800: '#050606',
                    900: '#030303',
                },
                primary: {
                    50: '#FBF6EB',
                    100: '#F5EACF',
                    200: '#EDD9A3',
                    300: '#E0C27A',
                    400: '#D4AC55',
                    500: '#C39A2B',
                    600: '#A9791B',
                    700: '#8E6516',
                    800: '#735111',
                    900: '#583D0D',
                },
                accent: {
                    DEFAULT: '#C39A2B',
                    50: '#FBF6EB',
                    100: '#F5EACF',
                    200: '#EDD9A3',
                    300: '#E0C27A',
                    400: '#D4AC55',
                    500: '#C39A2B',
                    600: '#A9791B',
                    700: '#8E6516',
                    800: '#735111',
                    900: '#583D0D',
                },
                gold: {
                    DEFAULT: '#C39A2B',
                    light: '#E0C27A',
                    dark: '#A9791B',
                },
                gray: {
                    mid: '#4A4A4A',
                    soft: '#F4F5F6',
                },
                heading: '#0F1112',
                paragraph: '#4A4A4A',
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
