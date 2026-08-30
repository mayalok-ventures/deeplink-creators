'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    AlertOctagon,
    ShieldAlert,
    Scale,
    TrendingDown,
    ServerOff,
    FileWarning,
    Building2,
    Lock,
    Cpu,
    Ban,
    ExternalLink,
    HelpCircle,
    ArrowUpRight
} from 'lucide-react'

export default function DisclaimerPage() {
    const [activeSection, setActiveSection] = useState<string>('preamble')

    // Anti-scraping / Anti-theft deterrent listeners
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'a' || e.key === 'u' || e.key === 's' || e.key === 'p')) {
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
            className="bg-[#0F1112] text-[#AAA99F] min-h-screen pt-28 pb-20 selection:bg-[#9B7545]/30 selection:text-[#F3F0E8] font-sans antialiased"
            style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
            } as React.CSSProperties}
            onContextMenu={(e) => e.preventDefault()}
            onCopy={(e) => e.preventDefault()}
        >
            {/* Subtle Engineering Grid Backdrop */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Document Header ── */}
                <div className="border-b border-white/10 pb-8 mb-10">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181A16] border border-[#9B7545]/30 text-[11px] font-mono font-bold tracking-widest uppercase text-[#D4B270]">
                            <ShieldAlert size={13} className="text-[#9B7545]" />
                            <span>STATUTORY PERFORMANCE &amp; RISK CHARTER</span>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] font-mono text-[#65675F]">
                            <span>STATUS: <strong className="text-amber-400">STRICTLY BINDING</strong></span>
                            <span>•</span>
                            <span>VERSION: 4.0 (2026 REVISION)</span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                        Legal, Financial &amp; Technical Risk Disclaimer.
                    </h1>

                    <p className="text-xs sm:text-sm text-[#AAA99F] max-w-4xl mt-3 leading-relaxed">
                        Comprehensive statutory liability shield governing Mayalok Venture, Deeplink Creators, Sahyak CRM SaaS software, edge telemetry pipelines, creator distribution syndication, and third-party algorithmic infrastructure under Indian and international commercial statutes.
                    </p>

                    {/* Metadata Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 p-4 rounded-xl bg-[#141618] border border-white/08 text-[11px] font-mono">
                        <div>
                            <span className="text-[#65675F] block">Governing Entity:</span>
                            <span className="text-white font-semibold">Mayalok Venture (Private Limited)</span>
                        </div>
                        <div>
                            <span className="text-[#65675F] block">Commercial Scope:</span>
                            <span className="text-white font-semibold">Enterprise SaaS &amp; Studio Distribution</span>
                        </div>
                        <div>
                            <span className="text-[#65675F] block">Statutory Basis:</span>
                            <span className="text-white font-semibold">IT Act 2000 • Contract Act 1872</span>
                        </div>
                        <div>
                            <span className="text-[#65675F] block">Effective Date:</span>
                            <span className="text-[#D4B270] font-semibold">February 15, 2026</span>
                        </div>
                    </div>
                </div>

                {/* ── Main Layout: Sidebar Navigation + Legal Body ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sticky Table of Contents (lg:col-span-3) */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-32 p-4 rounded-2xl bg-[#141618] border border-white/08 space-y-1.5 text-[11px] font-mono">
                            <div className="text-[10px] uppercase font-bold tracking-widest text-[#9B7545] pb-2 mb-2 border-b border-white/08">
                                Risk Disclaimer Index
                            </div>

                            {[
                                { id: 'preamble', label: '1. Institutional Scope & Preamble' },
                                { id: 'no-guarantee', label: '2. No Financial / ROI Guarantees' },
                                { id: 'illustrative-cases', label: '3. Illustrative Past Performance' },
                                { id: 'third-party-risk', label: '4. Third-Party Cloud & API Risk' },
                                { id: 'algorithm-shifts', label: '5. Ad Platform Algorithm Volatility' },
                                { id: 'saas-availability', label: '6. Sahyak CRM &quot;AS IS&quot; Disclaimer' },
                                { id: 'no-advice', label: '7. No Financial / Legal Advice' },
                                { id: 'creator-autonomy', label: '8. Creator Syndication Autonomy' },
                                { id: 'forward-looking', label: '9. Forward-Looking Statements' },
                                { id: 'anti-scraping', label: '10. Anti-Scraping & IP Shield' },
                                { id: 'jurisdiction', label: '11. Governing Law & Jurisdiction' },
                            ].map((sec) => (
                                <a
                                    key={sec.id}
                                    href={`#${sec.id}`}
                                    onClick={() => setActiveSection(sec.id)}
                                    className={`block px-2.5 py-1.5 rounded-lg transition-all ${
                                        activeSection === sec.id
                                            ? 'bg-[#9B7545]/20 text-[#D4B270] font-bold border border-[#9B7545]/30'
                                            : 'text-[#AAA99F] hover:text-white hover:bg-white/05'
                                    }`}
                                >
                                    {sec.label}
                                </a>
                            ))}

                            <div className="pt-3 mt-3 border-t border-white/08 text-[10px] text-[#65675F]">
                                Legal Risk Registry • Mayalok Venture Compliance
                            </div>
                        </div>
                    </aside>

                    {/* Legal Sections Container (lg:col-span-9) */}
                    <main className="lg:col-span-9 space-y-10 text-[11px] sm:text-xs leading-relaxed text-[#AAA99F]">
                        {/* SECTION 1: PREAMBLE */}
                        <section id="preamble" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Building2 size={15} />
                                <span>1. Institutional Scope &amp; Legal Framework</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                1.1 Scope of Enterprise Operations &amp; Disclaimers
                            </h2>

                            <p>
                                This Legal Disclaimer (&ldquo;Disclaimer&rdquo;) applies unconditionally to the website <strong className="text-white">deeplinkcreators.com</strong>, all associated subdomains, API endpoints, software interfaces, and all technical, advisory, and creator distribution services provided by <strong className="text-white">Deeplink Creators</strong>, operating as an autonomous enterprise software holding, venture studio, and distribution division under <strong className="text-white">Mayalok Venture (Private Limited)</strong> (&ldquo;the Holding,&rdquo; &ldquo;We,&rdquo; &ldquo;Us,&rdquo; &ldquo;Our&rdquo;).
                            </p>

                            <p>
                                By accessing, browsing, evaluating, or interacting with our digital assets, documentation, or client intake portals, you acknowledge and agree that your access is subject to this Disclaimer, our <Link href="/terms" className="text-[#D4B270] hover:underline font-semibold">Terms &amp; Conditions</Link>, and our <Link href="/privacy" className="text-[#D4B270] hover:underline font-semibold">Privacy Policy</Link>.
                            </p>
                        </section>

                        {/* SECTION 2: NO FINANCIAL / ROI GUARANTEES */}
                        <section id="no-guarantee" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-[#9B7545]/40 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#D4B270] font-bold uppercase tracking-wider">
                                <AlertOctagon size={15} className="text-[#9B7545]" />
                                <span>2. Absolute Disclaimer of Financial, Revenue &amp; ROI Guarantees</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                2.1 No Guarantee of Commercial Outcomes or Earnings
                            </h2>

                            <div className="p-4 rounded-xl bg-[#0F1112] border border-[#9B7545]/30 text-[#D0CBBF] space-y-3 font-mono text-[11px]">
                                <p className="font-bold text-white uppercase tracking-wider">
                                    STATUTORY EARNINGS &amp; OUTCOME DISCLAIMER:
                                </p>
                                <p>
                                    DEEPLINK CREATORS AND MAYALOK VENTURE DO NOT MAKE ANY GUARANTEES, PROMISES, WARRANTIES, OR REPRESENTATIONS REGARDING SPECIFIC FINANCIAL OUTCOMES, RETURN ON INVESTMENT (ROI), RETURN ON AD SPEND (ROAS), REVENUE GENERATION, LEAD CONVERSION VOLUMES, COST-PER-ACQUISITION (CPA) FIGURES, OR COMMERCIAL VALUATION LIFTS RESULTING FROM THE USE OF OUR SOFTWARE OR ENGAGEMENT WITH OUR VENTURE STUDIO.
                                </p>
                                <p>
                                    ANY COMMERCIAL SUCCESS, ENTERPRISE GROWTH, OR REVENUE EXPANSION DEPENDS ON A WIDE VARIETY OF EXOGENOUS AND INTERNAL BUSINESS VARIABLES ENTIRELY BEYOND OUR DIRECT CONTROL, INCLUDING BUT NOT LIMITED TO: CLIENT OPERATIONAL SPEED, PRODUCT QUALITY, PRICING COMPETITIVENESS, PRODUCT-MARKET FIT, MARKET ADOPTION VELOCITY, AND MACROECONOMIC CONDITIONS.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 3: ILLUSTRATIVE CASES */}
                        <section id="illustrative-cases" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <TrendingDown size={15} />
                                <span>3. Illustrative Nature of Case Studies &amp; Historical Performance</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                3.1 Non-Replicable Historical References
                            </h2>

                            <p>
                                All case studies, quantitative metric callouts (such as &ldquo;+315% MQLs,&rdquo; &ldquo;99.98% Uptime,&rdquo; &ldquo;₹4.2 Cr ARR,&rdquo; &ldquo;5.2× ROAS&rdquo;), historical client endorsements, and anonymized growth dossiers published across this website or in corporate decks are shared strictly for <strong className="text-white">illustrative, educational, and reference purposes only</strong>.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white font-mono block">A. Non-Typical Experiences:</strong>
                                    <p>Case study results represent specific historical outcomes achieved by individual organizations under isolated market conditions and budget allocations.</p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white font-mono block">B. Zero Implied Performance:</strong>
                                    <p>Past commercial achievements by any portfolio venture or client partner provide zero assurance or guarantee of future performance for other enterprise deployments.</p>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 4: THIRD-PARTY INFRASTRUCTURE RISK */}
                        <section id="third-party-risk" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <ServerOff size={15} />
                                <span>4. Third-Party Cloud Infrastructure &amp; Network Outages</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                4.1 Disclaimer of Upstream Infrastructure Disruptions
                            </h2>

                            <p>
                                Our web applications, telemetry engines, and Sahyak CRM platforms rely on enterprise cloud infrastructure providers, including <strong className="text-white">Cloudflare Inc.</strong>, <strong className="text-white">MongoDB Inc. (Atlas)</strong>, <strong className="text-white">Amazon Web Services (AWS)</strong>, and <strong className="text-white">Google Cloud Platform (GCP)</strong>.
                            </p>

                            <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                <span className="font-mono text-[#D4B270] font-bold block">Exclusion of Cloud Outage Liability:</span>
                                <p>
                                    Mayalok Venture and Deeplink Creators assume zero legal or financial liability for service interruptions, latency spikes, DDoS-related packet drops, global DNS propagation delays, or cloud data center outages caused by upstream sub-processors, telecommunication backbones, or regional ISP routing failures.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 5: AD PLATFORM ALGORITHM VOLATILITY */}
                        <section id="algorithm-shifts" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Cpu size={15} />
                                <span>5. Search Engine &amp; Ad Platform Algorithmic Volatility</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                5.1 Third-Party Platform Shifts Beyond Commercial Control
                            </h2>

                            <p>
                                In performance engineering and creator syndication workflows, Deeplink Creators interacts with external software ecosystems owned by third parties, including Google LLC (Search, YouTube, Ads), Meta Platforms Inc. (Instagram, WhatsApp, Facebook), Microsoft Corporation (LinkedIn), and ByteDance (TikTok):
                            </p>

                            <ul className="space-y-2 list-disc list-inside text-[#AAA99F]">
                                <li><strong className="text-white">Algorithmic Volatility:</strong> Search engine core updates, feed ranking changes, and ad auction pricing fluctuations are entirely determined by third-party platform algorithms.</li>
                                <li><strong className="text-white">Account Restrictions &amp; Bans:</strong> In the event a third-party platform restricts, suspends, or bans a client ad account or social handle due to policy violations, automated detection, or platform review, Deeplink Creators bears zero liability.</li>
                                <li><strong className="text-white">API Deprecations:</strong> Sudden modifications or deprecations of third-party APIs (e.g. WhatsApp Business Cloud API, Meta Graph API) are disclaimed.</li>
                            </ul>
                        </section>

                        {/* SECTION 6: SAHYAK CRM "AS IS" DISCLAIMER */}
                        <section id="saas-availability" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Lock size={15} />
                                <span>6. Sahyak CRM Software &quot;AS IS&quot; &amp; Internet Vulnerability</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                6.1 Warranty Disclaimers &amp; Data Transmission Risks
                            </h2>

                            <p>
                                While Sahyak CRM and our technical platforms are engineered with bank-grade multi-tenant isolation, TLS 1.3 encryption, and AES-256 rest security, the software is provided strictly on an <strong className="text-white">&ldquo;AS IS&rdquo;</strong> and <strong className="text-white">&ldquo;AS AVAILABLE&rdquo;</strong> basis:
                            </p>

                            <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-2 font-mono text-[11px]">
                                <p className="text-white font-bold">
                                    DISCLAIMER OF IMPLIED WARRANTIES:
                                </p>
                                <p>
                                    WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR COMMERCIAL PURPOSE, UNINTERRUPTED ERROR-FREE OPERATION, AND NON-INFRINGEMENT.
                                </p>
                                <p className="text-[#AAA99F]">
                                    Transmission of data across public internet backbones carries inherent security vulnerabilities. Beyond our mandatory reasonable security practices under Section 43A of the IT Act, 2000 and DPDP Act 2023, Mayalok Venture assumes no liability for unauthorized packet interception occurring beyond our edge security perimeter.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 7: NO FINANCIAL / LEGAL ADVICE */}
                        <section id="no-advice" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <FileWarning size={15} />
                                <span>7. Exclusion of Financial, Legal &amp; Investment Advisory</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                7.1 Strictly Technical &amp; Operational Subject Matter
                            </h2>

                            <p>
                                None of the information, whitepapers, architectural blueprints, telemetry metrics, market models, or consultative sessions provided by Deeplink Creators or Mayalok Venture constitutes formal <strong className="text-white">financial, investment, legal, tax, or accounting advice</strong>.
                            </p>

                            <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                <strong className="text-[#D4B270] font-mono block">Independent Counsel Mandatory:</strong>
                                <p>
                                    Client organizations are solely responsible for conducting their own independent technical, commercial, tax, and legal due diligence before making enterprise investments or commercial software deployments.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 8: CREATOR AUTONOMY */}
                        <section id="creator-autonomy" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Scale size={15} />
                                <span>8. Creator Syndication &amp; Editorial Autonomy</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                8.1 Independent Creator Network Relationship
                            </h2>

                            <p>
                                Creator partners participating in our syndicated distribution networks are independent third-party creators and media channels. Deeplink Creators structures distribution routing and performance tracking, but does not exercise employment control over independent creators:
                            </p>

                            <ul className="space-y-1.5 list-disc list-inside text-[#AAA99F]">
                                <li>Creators are solely responsible for ensuring sponsored content complies with the Advertising Standards Council of India (ASCI) guidelines.</li>
                                <li>Deeplink Creators disclaims liability for spontaneous statements, personal opinions, or unauthorized claims made by creator partners outside verified campaign briefs.</li>
                            </ul>
                        </section>

                        {/* SECTION 9: FORWARD-LOOKING STATEMENTS */}
                        <section id="forward-looking" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Cpu size={15} />
                                <span>9. Forward-Looking Innovation Statements</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                9.1 Non-Binding Roadmap Projections
                            </h2>

                            <p>
                                Statements on this website regarding upcoming software releases, Sahyak CRM feature updates, studio venture expansions, or technical capabilities are <strong className="text-white">forward-looking statements</strong> reflecting current expectations. These projections are subject to technical risks and commercial evolution and do not constitute binding engineering commitments.
                            </p>
                        </section>

                        {/* SECTION 10: ANTI-SCRAPING & IP PROHIBITION */}
                        <section id="anti-scraping" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-[#9B7545]/40 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#D4B270] font-bold uppercase tracking-wider">
                                <Ban size={15} className="text-[#9B7545]" />
                                <span>10. Anti-Scraping, Anti-Screenshot &amp; Legal Remedies</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                10.1 Automated Harvest &amp; Content Mining Prohibition
                            </h2>

                            <div className="p-4 rounded-xl bg-[#0F1112] border border-[#9B7545]/20 text-[#D0CBBF] space-y-2">
                                <p className="font-semibold text-white">
                                    STATUTORY COPYRIGHT &amp; CYBER LAW NOTICE:
                                </p>
                                <p>
                                    All contents, structural designs, visual styling, legal charters, and proprietary data representations on <strong className="text-white">deeplinkcreators.com</strong> are protected intellectual property of Mayalok Venture.
                                </p>
                                <p>
                                    Any automated scraping, programmatic crawling, data mining, screenshot extraction, or unauthorized reproduction is strictly prohibited under Sections 43 and 66 of the Information Technology Act, 2000 and the Copyright Act, 1957.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 11: JURISDICTION */}
                        <section id="jurisdiction" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Scale size={15} />
                                <span>11. Governing Law &amp; Exclusive Jurisdiction</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                11.1 Commercial Forum Selection
                            </h2>

                            <p>
                                This Disclaimer shall be governed by, construed, and enforced in accordance with the substantive laws of the <strong className="text-white">Republic of India</strong>. All disputes or claims arising hereunder shall be subject to the exclusive commercial jurisdiction of the competent courts of <strong className="text-[#D4B270]">Greater Noida / Gautam Buddha Nagar, Uttar Pradesh, India</strong>.
                            </p>

                            <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-2 font-mono text-[11px]">
                                <span className="text-white font-bold block">Official Compliance Coordinates:</span>
                                <p className="text-[#AAA99F]">
                                    Mayalok Venture (Private Limited) — Legal &amp; Compliance Directorate<br />
                                    Email: <a href="mailto:legal@deeplinkcreators.com" className="text-[#D4B270] hover:underline">legal@deeplinkcreators.com</a> • Phone: +91 97116 10928<br />
                                    Headquarters: Tech Zone 4, Greater Noida, Uttar Pradesh 201306, India
                                </p>
                            </div>
                        </section>

                        {/* ── Document Footer Links ── */}
                        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#65675F]">
                            <div className="flex items-center gap-4">
                                <Link href="/privacy" className="text-[#D4B270] hover:underline">
                                    Privacy Policy
                                </Link>
                                <span>•</span>
                                <Link href="/terms" className="text-[#D4B270] hover:underline">
                                    Terms &amp; Conditions
                                </Link>
                                <span>•</span>
                                <Link href="/contact" className="text-[#D4B270] hover:underline">
                                    Corporate Contact
                                </Link>
                            </div>

                            <p className="text-[10px]">
                                © {new Date().getFullYear()} Deeplink Creators. All rights reserved. Registered under Mayalok Venture.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
