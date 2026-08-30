'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function DisclaimerPage() {
    // Strict Anti-copy, Anti-scraping, Anti-print keyboard and context menu interceptors
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                (e.ctrlKey || e.metaKey) &&
                (e.key === 'c' || e.key === 'a' || e.key === 'u' || e.key === 's' || e.key === 'p' || e.key === 'C' || e.key === 'A' || e.key === 'U' || e.key === 'S' || e.key === 'P')
            ) {
                e.preventDefault()
            }
        }

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault()
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('contextmenu', handleContextMenu)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('contextmenu', handleContextMenu)
        }
    }, [])

    return (
        <div
            className="bg-[#EFECE6] min-h-screen py-10 sm:py-16 px-3 sm:px-6 lg:px-8 selection:bg-slate-300 selection:text-slate-900 font-sans"
            style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                WebkitTouchCallout: 'none',
            } as React.CSSProperties}
            onContextMenu={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
        >
            {/* White Paper Legal Container */}
            <div className="max-w-5xl mx-auto bg-white shadow-2xl border border-slate-300 p-6 sm:p-12 md:p-20 relative overflow-hidden text-slate-800">
                {/* Diagonal Confidentiality Watermark Overlay */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.035] select-none rotate-[-35deg] text-center"
                >
                    <p className="text-4xl sm:text-6xl md:text-7xl font-mono font-black tracking-widest leading-relaxed text-black uppercase">
                        MAYALOK VENTURE • CONFIDENTIAL LEGAL DOSSIER • STATUTORY DISCLAIMER • UNAUTHORIZED REPRODUCTION PROHIBITED
                    </p>
                </div>

                {/* Document Header & Registry Box */}
                <header className="relative z-10 border-b-2 border-slate-900 pb-8 mb-10">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
                        <span>INSTRUMENT: STATUTORY RISK DISCLAIMER</span>
                        <span>CLASSIFICATION: LIABILITY EXCLUSION CHARTER</span>
                        <span>JURISDICTION: GREATER NOIDA (NCR), INDIA</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-950 tracking-tight leading-tight">
                        LEGAL, PERFORMANCE, TECHNICAL &amp; REGULATORY RISK DISCLAIMER
                    </h1>
                    <p className="text-xs sm:text-sm font-serif italic text-slate-600 mt-2">
                        Comprehensive Statutory Liability Shield Absolving Mayalok Venture (Private Limited), Deeplink Creators, and Associated Software Holdings (Sahyak CRM) from Speculative Financial Guarantees, Upstream Cloud Outages, and Third-Party Algorithmic Volatility.
                    </p>

                    <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] sm:text-[11px] font-mono">
                        <div>
                            <span className="text-slate-400 block uppercase">Governing Entity:</span>
                            <strong className="text-slate-900">Mayalok Venture (Pvt. Ltd.)</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block uppercase">Commercial Brand:</span>
                            <strong className="text-slate-900">Deeplink Creators Holding</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block uppercase">Financial Scope:</span>
                            <strong className="text-slate-900">Zero Earnings Guarantees</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block uppercase">Revision Effective:</span>
                            <strong className="text-slate-900">February 15, 2026</strong>
                        </div>
                    </div>
                </header>

                {/* White Paper Continuous Legal Body */}
                <main className="relative z-10 text-[10.5px] sm:text-[11.5px] leading-[1.7] text-slate-800 space-y-8 text-justify font-sans">
                    {/* SECTION 1 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE I — STATUTORY PREAMBLE, CORPORATE IDENTITY &amp; SCOPE OF APPLICATION
                        </h2>
                        <p>
                            1.1. <strong className="text-slate-950">Binding Statutory Scope:</strong> This Legal, Financial, Technical, and Performance Risk Disclaimer (&ldquo;Disclaimer&rdquo;) applies unconditionally to the website <strong className="text-slate-950">deeplinkcreators.com</strong>, all subdomains, API endpoints, software interfaces, and all technical, advisory, and creator distribution services provided by <strong className="text-slate-950">Deeplink Creators</strong>, operating as an autonomous enterprise software holding, venture engineering studio, and commercial distribution division under <strong className="text-slate-950">Mayalok Venture (Private Limited)</strong> (hereinafter collectively referenced as &ldquo;Mayalok Venture,&rdquo; &ldquo;Deeplink Creators,&rdquo; &ldquo;the Holding,&rdquo; &ldquo;We,&rdquo; &ldquo;Us,&rdquo; or &ldquo;Our&rdquo;).
                        </p>
                        <p>
                            1.2. <strong className="text-slate-950">Integration with Master Terms:</strong> This Disclaimer forms an integral, non-severable part of our corporate compliance architecture and must be read in conjunction with our <Link href="/terms" className="underline font-mono text-slate-950 font-bold">Master Services Agreement (Terms &amp; Conditions)</Link> and <Link href="/privacy" className="underline font-mono text-slate-950 font-bold">Data Privacy Charter</Link>. Accessing or browsing our digital properties constitutes irrevocable acknowledgment and acceptance of these liability exclusions in their entirety.
                        </p>
                    </section>

                    {/* SECTION 2 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE II — ABSOLUTE DISCLAIMER OF FINANCIAL, REVENUE &amp; ROI PERFORMANCE GUARANTEES
                        </h2>
                        <p>
                            2.1. <strong className="text-slate-950">Complete Absence of Commercial Promises:</strong> DEEPLINK CREATORS AND MAYALOK VENTURE DO NOT MAKE ANY GUARANTEES, PROMISES, WARRANTIES, OR REPRESENTATIONS REGARDING SPECIFIC FINANCIAL OUTCOMES, RETURN ON INVESTMENT (ROI), RETURN ON AD SPEND (ROAS), REVENUE TARGETS, SALES CONVERSIONS, OR REDUCED COST-PER-ACQUISITION (CPA) FIGURES RESULTING FROM THE DEPLOYMENT OF OUR ENTERPRISE SOFTWARE (INCLUDING SAHYAK CRM) OR PARTICIPATION IN OUR CREATOR DISTRIBUTION NETWORKS.
                        </p>
                        <p>
                            2.2. <strong className="text-slate-950">Exogenous Business Variables:</strong> Commercial enterprise growth and conversion velocity are governed by a wide array of internal and exogenous variables entirely beyond our control, including but not limited to: client operational execution speed, product competitiveness, quality of client sales representatives, pricing structure, brand reputation, consumer macroeconomic liquidity, and sector adoption friction. Client acknowledges that engaging Deeplink Creators does not ensure commercial success.
                        </p>
                    </section>

                    {/* SECTION 3 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE III — ILLUSTRATIVE &amp; NON-REPLICABLE NATURE OF HISTORICAL CASE STUDIES
                        </h2>
                        <p>
                            3.1. <strong className="text-slate-950">Reference-Only Case Dossiers:</strong> All quantitative case studies, metric badges (such as &ldquo;+315% MQLs,&rdquo; &ldquo;99.98% Uptime,&rdquo; &ldquo;₹4.2 Cr ARR,&rdquo; &ldquo;5.2× ROAS&rdquo;), historical client reviews, and revenue growth narratives published across our website are shared strictly for <strong className="text-slate-950">illustrative, contextual, and reference purposes only</strong>.
                        </p>
                        <p>
                            3.2. <strong className="text-slate-950">Specific Isolated Outcomes:</strong> These metrics reflect specific historical outcomes achieved by individual organizations under isolated operational conditions, unique commercial timing, and dedicated capital investment. They are not typical and provide zero guarantee or implication that any other enterprise will achieve identical, comparable, or positive outcomes.
                        </p>
                    </section>

                    {/* SECTION 4 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE IV — DISCLAIMER OF THIRD-PARTY CLOUD INFRASTRUCTURE &amp; UPSTREAM OUTAGES
                        </h2>
                        <p>
                            4.1. <strong className="text-slate-950">Cloud Sub-Processor Dependencies:</strong> Deeplink Creators utilizes tier-1 third-party cloud infrastructure and database service providers, including <strong className="text-slate-950">Cloudflare, Inc.</strong>, <strong className="text-slate-950">MongoDB, Inc. (Atlas)</strong>, <strong className="text-slate-950">Amazon Web Services (AWS)</strong>, and <strong className="text-slate-950">Google Cloud Platform (GCP)</strong>, to deliver edge caching, multi-tenant databases, and serverless compute execution.
                        </p>
                        <p>
                            4.2. <strong className="text-slate-950">Total Outage Liability Exclusion:</strong> Mayalok Venture assumes zero legal, commercial, or consequential liability for service interruptions, latency degradation, global DNS propagation anomalies, distributed denial-of-service (DDoS) packet drops, or upstream data center outages originating from third-party cloud infrastructure or regional telecommunication carriers.
                        </p>
                    </section>

                    {/* SECTION 5 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE V — ADVERTISING PLATFORM ALGORITHMIC SHIFTS &amp; ACCOUNT RESTRICTIONS
                        </h2>
                        <p>
                            5.1. <strong className="text-slate-950">Third-Party Ecosystem Reliance:</strong> In performance marketing and creator syndication workflows, Deeplink Creators interacts with external software ecosystems owned by third parties, including Google LLC (Search, Ads, YouTube), Meta Platforms Inc. (Instagram, WhatsApp, Facebook), Microsoft Corporation (LinkedIn), and ByteDance (TikTok).
                        </p>
                        <p>
                            5.2. <strong className="text-slate-950">Algorithmic Volatility &amp; Account Bans:</strong> Search ranking algorithms, social feed distribution weights, and ad auction costs are determined exclusively by third-party platform algorithms. Deeplink Creators disclaims all liability in the event a third-party platform: (a) executes sudden algorithmic ranking updates; (b) modifies or deprecates API interfaces (e.g. WhatsApp Business Cloud API); or (c) restricts, suspends, or bans a client ad account or social handle.
                        </p>
                    </section>

                    {/* SECTION 6 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE VI — SAHYAK CRM SOFTWARE &quot;AS IS&quot; &amp; INTERNET DATA TRANSMISSION
                        </h2>
                        <p>
                            6.1. <strong className="text-slate-950">Warranty Disclaimers:</strong> Sahyak CRM and all associated software interfaces, APIs, and workflow automations are provided strictly on an <strong className="text-slate-950">&ldquo;AS IS&rdquo;</strong> and <strong className="text-slate-950">&ldquo;AS AVAILABLE&rdquo;</strong> basis. Mayalok Venture expressly disclaims all warranties of any kind, whether express, statutory, or implied, including the implied warranties of merchantability, fitness for a particular commercial purpose, uninterrupted operation, or error-free execution.
                        </p>
                        <p>
                            6.2. <strong className="text-slate-950">Internet Packet Transmission Risks:</strong> Transmission of information across the public internet involves inherent vulnerabilities. Beyond our mandatory reasonable technical safeguards under Section 43A of the IT Act 2000 and the DPDP Act 2023, Mayalok Venture assumes no liability for unauthorized data interception or packet compromise occurring on external telecommunication networks.
                        </p>
                    </section>

                    {/* SECTION 7 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE VII — EXCLUSION OF FINANCIAL, LEGAL, TAX &amp; INVESTMENT ADVICE
                        </h2>
                        <p>
                            7.1. <strong className="text-slate-950">Technical &amp; Operational Scope Only:</strong> None of the architectural blueprints, technical whitepapers, telemetry metrics, consultative briefings, or market modeling materials provided by Deeplink Creators constitute formal <strong className="text-slate-950">financial, investment, legal, accounting, or tax advisory</strong>.
                        </p>
                        <p>
                            7.2. <strong className="text-slate-950">Mandatory Independent Due Diligence:</strong> Client organizations are solely responsible for conducting their own independent technical, commercial, tax, and legal due diligence before deploying software systems or making commercial commitments.
                        </p>
                    </section>

                    {/* SECTION 8 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE VIII — CREATOR DISTRIBUTION NETWORKS &amp; EDITORIAL AUTONOMY
                        </h2>
                        <p>
                            8.1. <strong className="text-slate-950">Independent Media Entities:</strong> Independent creators participating in our syndicated distribution networks are third-party media entities. Deeplink Creators routes technical distribution tokens and performance analytics but does not exercise employment control over independent creators.
                        </p>
                        <p>
                            8.2. <strong className="text-slate-950">Disclaimer of Spontaneous Statements:</strong> Deeplink Creators disclaims all liability for spontaneous opinions, unapproved modifications, or independent personal statements made by creator partners outside authorized campaign guidelines.
                        </p>
                    </section>

                    {/* SECTION 9 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE IX — FORWARD-LOOKING INNOVATION STATEMENTS &amp; ROADMAPS
                        </h2>
                        <p>
                            9.1. <strong className="text-slate-950">Non-Binding Architectural Projections:</strong> Statements published on our website regarding upcoming software features, Sahyak CRM enhancements, studio venture expansions, or technical capabilities constitute non-binding <strong className="text-slate-950">forward-looking statements</strong>. These roadmap projections represent current engineering aspirations subject to technical evolution and do not constitute binding contractual commitments.
                        </p>
                    </section>

                    {/* SECTION 10 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE X — PROHIBITION OF AUTOMATED SCRAPING, DATA HARVESTING &amp; IP THEFT
                        </h2>
                        <p>
                            10.1. <strong className="text-slate-950">Strict Prohibition of Scraping &amp; AI Training Extraction:</strong> All contents, code architectures, legal charters, brand identifiers, and proprietary data representations published on <strong className="text-slate-950">deeplinkcreators.com</strong> constitute protected intellectual property of Mayalok Venture. Any automated scraping, bot crawling, screenshot harvesting, or data extraction for training AI models or commercial mirroring without written authorization is strictly prohibited under Sections 43 &amp; 66 of the Information Technology Act, 2000 and the Copyright Act, 1957.
                        </p>
                    </section>

                    {/* SECTION 11 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE XI — GOVERNING LAW, COMMERCIAL JURISDICTION &amp; COMPLIANCE DESK
                        </h2>
                        <p>
                            11.1. <strong className="text-slate-950">Substantive Law &amp; Exclusive Jurisdiction:</strong> This Disclaimer shall be governed by, construed, and enforced in accordance with the substantive laws of the <strong className="text-slate-950">Republic of India</strong>. All legal claims or disputes arising hereunder shall be subject to the exclusive commercial jurisdiction of the competent courts of <strong className="text-slate-950">Greater Noida / Gautam Buddha Nagar, Uttar Pradesh, India</strong>.
                        </p>
                        <div className="p-4 bg-slate-50 border border-slate-300 font-mono text-[10px] sm:text-[11px] space-y-1.5 my-2">
                            <div className="flex justify-between border-b border-slate-200 pb-1">
                                <span className="text-slate-500">Compliance Authority:</span>
                                <strong className="text-slate-950">Legal &amp; Regulatory Risk Directorate</strong>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-1">
                                <span className="text-slate-500">Contracting Entity:</span>
                                <strong className="text-slate-900">Mayalok Venture (Private Limited)</strong>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-1">
                                <span className="text-slate-500">Official Compliance Email:</span>
                                <a href="mailto:legal@deeplinkcreators.com" className="text-blue-700 font-bold underline">
                                    legal@deeplinkcreators.com
                                </a>
                            </div>
                            <div className="pt-1">
                                <span className="text-slate-500 block">Physical Corporate Seat:</span>
                                <span className="text-slate-950">
                                    Mayalok Venture Headquarters, Tech Zone 4, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201306, India
                                </span>
                            </div>
                        </div>
                    </section>
                </main>

                {/* White Paper Footer */}
                <footer className="relative z-10 border-t-2 border-slate-900 pt-6 mt-12 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
                    <div className="flex items-center gap-3">
                        <Link href="/privacy" className="text-slate-900 font-bold hover:underline">
                            PRIVACY &amp; DPDP CHARTER
                        </Link>
                        <span>•</span>
                        <Link href="/terms" className="text-slate-900 font-bold hover:underline">
                            TERMS &amp; CONDITIONS (MSA)
                        </Link>
                        <span>•</span>
                        <Link href="/contact" className="text-slate-900 font-bold hover:underline">
                            EXECUTIVE INTAKE
                        </Link>
                    </div>

                    <div>
                        © {new Date().getFullYear()} Mayalok Venture (Private Limited) • Deeplink Creators Holding. All Rights Reserved.
                    </div>
                </footer>
            </div>
        </div>
    )
}
