'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface LocationHeroProps {
  city: string          // "Delhi" | "Noida" | "Greater Noida" | "Lucknow"
  tagline: string       // e.g. "D2C Brands & Legacy Businesses"
  subheadline: string   // e.g. "Revenue-Proven Growth Architecture."
  description: string   // paragraph text
  heroImage: string     // path like /images/hero/delhi-hero.webp
  badge?: string        // if omitted, defaults to "Premium Digital Marketing Agency in {city}"
}

export default function LocationHero({
  city,
  tagline,
  subheadline,
  description,
  heroImage,
  badge,
}: LocationHeroProps) {
  const pillText = badge ?? `Premium Digital Marketing Agency in ${city}`

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{ background: '#000' }}
    >
      {/* Cinematic dark hero image */}
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ opacity: 0.18, filter: 'saturate(1.2) brightness(0.7)' }}
      />

      {/* Radial vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 10%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Bottom fade to white (site content below is light bg) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.96))' }}
      />

      {/* Gold grain noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
          mixBlendMode: 'overlay',
          opacity: 0.6,
        }}
      />

      <div className="container-custom section-padding relative z-10 w-full">
        <div className="max-w-4xl">
          {/* Eyebrow pill */}
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 mb-8"
            style={{
              border: '1px solid rgba(201,168,76,0.35)',
              background: 'rgba(201,168,76,0.10)',
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: '#C9A84C' }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ background: '#C9A84C' }}
              />
            </span>
            <span
              className="text-sm font-medium tracking-wide"
              style={{ color: '#C9A84C' }}
            >
              {pillText}
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-extrabold mb-6 leading-[1.05] tracking-tight"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              color: '#F0EAD6',
              textShadow: '0 0 80px rgba(201,168,76,0.22), 0 8px 40px rgba(0,0,0,1)',
            }}
          >
            Scaling {city}&apos;s{' '}
            <span
              style={{
                color: '#C9A84C',
                textShadow: '0 0 50px rgba(201,168,76,0.55), 0 0 15px rgba(201,168,76,0.30)',
              }}
            >
              {tagline}
            </span>
            <br />
            With{' '}
            <span
              style={{
                color: '#C9A84C',
                textShadow: '0 0 50px rgba(201,168,76,0.55), 0 0 15px rgba(201,168,76,0.30)',
              }}
            >
              {subheadline}
            </span>
          </h1>

          {/* Description */}
          <p
            className="mb-10 max-w-2xl leading-relaxed"
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
              color: 'rgba(240,234,214,0.68)',
              letterSpacing: '0.02em',
            }}
          >
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#apply"
              className="group relative inline-flex items-center justify-center gap-2 text-base font-bold py-4 px-8 rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #D4B860 50%, #A07830 100%)',
                color: '#000',
                boxShadow: '0 0 40px rgba(201,168,76,0.35), 0 4px 20px rgba(0,0,0,0.8)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 60px rgba(201,168,76,0.55), 0 8px 30px rgba(0,0,0,0.9)'
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(201,168,76,0.35), 0 4px 20px rgba(0,0,0,0.8)'
                ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
              }}
            >
              Apply for Revenue Audit
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 text-base font-semibold py-4 px-8 rounded-full transition-all duration-300"
              style={{
                color: '#C9A84C',
                border: '1px solid rgba(201,168,76,0.45)',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.45)'
              }}
            >
              See Our Methodology
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            fontWeight: 600,
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: '3rem',
            background: 'linear-gradient(180deg, #C9A84C, transparent)',
            opacity: 0.7,
          }}
        />
      </div>
    </section>
  )
}
