'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'

const ThemeToggle = () => {
    const [theme, setTheme] = useState<Theme>('system')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const stored = localStorage.getItem('theme') as Theme | null
        if (stored) {
            setTheme(stored)
            applyTheme(stored)
        } else {
            applyTheme('system')
        }
    }, [])

    const applyTheme = (t: Theme) => {
        const root = document.documentElement
        if (t === 'dark') {
            root.classList.add('dark')
        } else if (t === 'light') {
            root.classList.remove('dark')
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.classList.add('dark')
            } else {
                root.classList.remove('dark')
            }
        }
    }

    useEffect(() => {
        if (!mounted) return
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = () => {
            if (theme === 'system') applyTheme('system')
        }
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [theme, mounted])

    const cycle = () => {
        const order: Theme[] = ['light', 'dark', 'system']
        const next = order[(order.indexOf(theme) + 1) % order.length]
        setTheme(next)
        localStorage.setItem('theme', next)
        applyTheme(next)
    }

    if (!mounted) {
        return (
            <button
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#4A4A4A]/15 bg-[#F4F5F6] dark:bg-white/[0.05] dark:border-white/[0.1]"
                aria-label="Toggle theme"
            >
                <Monitor size={16} />
            </button>
        )
    }

    const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor

    return (
        <button
            onClick={cycle}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#4A4A4A]/15 bg-[#F4F5F6] hover:border-[#C39A2B]/30 hover:bg-[#C39A2B]/10 dark:bg-white/[0.05] dark:border-white/[0.1] dark:hover:border-[#C39A2B]/30 dark:hover:bg-[#C39A2B]/10 transition-all duration-200"
            aria-label={`Theme: ${theme}`}
            title={`Theme: ${theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}`}
        >
            <Icon size={16} className="text-heading dark:text-white" />
        </button>
    )
}

export default ThemeToggle
