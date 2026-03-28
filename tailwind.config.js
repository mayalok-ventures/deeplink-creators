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
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
                'marquee-slow': 'marquee 40s linear infinite',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}