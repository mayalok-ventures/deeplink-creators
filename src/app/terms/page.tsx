'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function TermsPage() {
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
                        MAYALOK VENTURE • CONFIDENTIAL LEGAL DOSSIER • MASTER SERVICES AGREEMENT • UNAUTHORIZED REPRODUCTION PROHIBITED
                    </p>
                </div>

                {/* Document Header & Registry Box */}
                <header className="relative z-10 border-b-2 border-slate-900 pb-8 mb-10">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
                        <span>INSTRUMENT: MASTER SERVICES AGREEMENT (MSA)</span>
                        <span>CLASSIFICATION: ENTERPRISE CONTRACT</span>
                        <span>FORUM: GREATER NOIDA, NCR, INDIA</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-950 tracking-tight leading-tight">
                        MASTER SERVICES AGREEMENT, SAAS LICENSING &amp; PLATFORM TERMS
                    </h1>
                    <p className="text-xs sm:text-sm font-serif italic text-slate-600 mt-2">
                        Legally Binding Commercial Instrument Governing Enterprise Software Licensing (Sahyak CRM), Multi-Tenant Data Infrastructure, Venture Studio Retainers, and Creator Distribution Networks between Mayalok Venture (Private Limited) and Commercial Client Counterparties.
                    </p>

                    <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] sm:text-[11px] font-mono">
                        <div>
                            <span className="text-slate-400 block uppercase">Contracting Party:</span>
                            <strong className="text-slate-900">Mayalok Venture (Pvt. Ltd.)</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block uppercase">Commercial Brand:</span>
                            <strong className="text-slate-900">Deeplink Creators Holding</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block uppercase">Liability Ceiling:</span>
                            <strong className="text-slate-900">Preceding 3 Months Fees</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block uppercase">Arbitration Seat:</span>
                            <strong className="text-slate-900">Greater Noida (UP), India</strong>
                        </div>
                    </div>
                </header>

                {/* White Paper Continuous Legal Body */}
                <main className="relative z-10 text-[10.5px] sm:text-[11.5px] leading-[1.7] text-slate-800 space-y-8 text-justify font-sans">
                    {/* SECTION 1 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE I — PARTIES, CORPORATE CAPACITY &amp; CONTRACTUAL MASTER FRAMEWORK
                        </h2>
                        <p>
                            1.1. <strong className="text-slate-950">Contracting Corporate Entities:</strong> This Master Services Agreement, Software Licensing Covenants, and Terms of Service (&ldquo;Agreement,&rdquo; &ldquo;MSA,&rdquo; or &ldquo;Terms&rdquo;) is entered into and made legally effective by and between <strong className="text-slate-950">Mayalok Venture (Private Limited)</strong>, an enterprise technology corporation incorporated under the Companies Act, 2013, with its principal corporate seat and executive studios situated at Tech Zone 4, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201306, India, acting through its specialized venture engineering studio, autonomous platform holding, and commercial distribution division, <strong className="text-slate-950">Deeplink Creators</strong> (hereinafter collectively referenced as &ldquo;Mayalok Venture,&rdquo; &ldquo;Deeplink Creators,&rdquo; &ldquo;the Holding,&rdquo; &ldquo;We,&rdquo; &ldquo;Us,&rdquo; or &ldquo;Our&rdquo;), and the corporate entity, commercial organization, or authorized institutional representative executing a Service Proposal, Statement of Work (SOW), Subscription Order, or accessing our software systems (hereinafter referenced as &ldquo;Client,&rdquo; &ldquo;Enterprise Counterparty,&rdquo; &ldquo;You,&rdquo; or &ldquo;Your&rdquo;).
                        </p>
                        <p>
                            1.2. <strong className="text-slate-950">Binding Nature of Terms:</strong> By accessing <strong className="text-slate-950">deeplinkcreators.com</strong>, authenticating into <strong className="text-slate-950">Sahyak CRM</strong> (<a href="https://sahyak.com" target="_blank" rel="noopener noreferrer" className="underline font-mono">sahyak.com</a>), provisioning multi-tenant database partitions, executing a digital intake brief, or issuing payment against an official commercial invoice, the Client unconditionally covenants to be bound by every term, limitation of liability, intellectual property reservation, and arbitration covenant contained herein.
                        </p>
                    </section>

                    {/* SECTION 2 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE II — ENTERPRISE SAAS SOFTWARE LICENSING &amp; SAHYAK CRM OPERATING COVENANTS
                        </h2>
                        <p>
                            2.1. <strong className="text-slate-950">Grant of Scoped, Revocable SaaS License:</strong> Conditioned upon full and timely payment of applicable subscription or retainer fees, Deeplink Creators grants to Client a non-exclusive, non-transferable, non-sublicensable, revocable license to access and operationalize the multi-tenant SaaS features of <strong className="text-slate-950">Sahyak CRM</strong> solely for Client&apos;s internal commercial business operations during the contractual subscription term.
                        </p>
                        <p>
                            2.2. <strong className="text-slate-950">Complimentary 30-Day Onboarding Access:</strong> Qualifying enterprise service retainers and platform engineering contracts include complimentary thirty (30) day evaluation access to Sahyak CRM for client operations. Continued operational access following the initial 30-day period requires transition to an active enterprise software license schedule.
                        </p>
                        <p>
                            2.3. <strong className="text-slate-950">Absolute License Restrictions &amp; Zero-Tamper Covenants:</strong> Client expressly agrees that it shall NOT, directly or indirectly:
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-[10px] sm:text-[11px] text-slate-700">
                            <li>Decompile, disassemble, reverse engineer, decrypt, or extract source code, mathematical algorithms, prompt structures, or database schema topologies from Sahyak CRM or associated APIs;</li>
                            <li>Bypass, tamper with, or circumvent multi-tenant isolation barriers, tenant UUID validation checks, or role-based access control (RBAC) security perimeters;</li>
                            <li>Sublicense, lease, resell, rent, time-share, distribute, or commercially exploit Sahyak CRM or platform endpoints to any third party or non-affiliated entity;</li>
                            <li>Deploy automated scraping bots, crawlers, or extraction tools against platform API endpoints exceeding documented rate limits (exceeding 120 requests per minute per tenant vault).</li>
                        </ul>
                    </section>

                    {/* SECTION 3 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE III — ABSOLUTE RETENTION OF INTELLECTUAL PROPERTY &amp; ASSET VESTING
                        </h2>
                        <p>
                            3.1. <strong className="text-slate-950">Universal Intellectual Property Vesting in Mayalok Venture:</strong> All right, title, and ownership interest in and to all software platforms, Next.js codebases, React frameworks, serverless API routes, telemetry pipelines, MongoDB and Cloudflare database schemas, neural workflow designs, brand trademarks, logos, service dossiers, and technical documentation developed or deployed by Deeplink Creators remain the sole, absolute, and unencumbered intellectual property of <strong className="text-slate-950">Mayalok Venture (Private Limited)</strong>.
                        </p>
                        <p>
                            3.2. <strong className="text-slate-950">Client Data Ownership Distinction:</strong> Client retains exclusive ownership of proprietary raw customer records, lead data, and confidential business documents uploaded into Client&apos;s isolated Sahyak CRM tenant vault (&ldquo;Client Data&rdquo;). Client grants Mayalok Venture a limited, worldwide, royalty-free license to host, process, cache, and transmit Client Data strictly for fulfilling operational delivery, software execution, and generating anonymized, aggregated diagnostic telemetry.
                        </p>
                    </section>

                    {/* SECTION 4 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE IV — COMMERCIAL TERMS, INVOICING, STATUTORY TAXES &amp; PAYMENT DEFAULT
                        </h2>
                        <p>
                            4.1. <strong className="text-slate-950">Retainer Fees &amp; Invoicing Mechanics:</strong> All commercial fees for software engineering, platform retainers, SaaS licenses, and creator distribution programs are denominated in Indian Rupees (INR) or agreed foreign currency (USD/EUR/GBP), payable upfront or strictly within Net-15 calendar days from the invoice issuance date.
                        </p>
                        <p>
                            4.2. <strong className="text-slate-950">Statutory Tax Compliance:</strong> All commercial invoices are issued subject to applicable Goods and Services Tax (<strong className="text-slate-950">GST at 18%</strong>) and relevant withholding taxes (TDS) under the Income Tax Act, 1961. Client is responsible for remitting statutory taxes and providing formal withholding certificates (Form 16A) in a timely quarterly manner.
                        </p>
                        <p>
                            4.3. <strong className="text-slate-950">Late Payment Penalties &amp; Operational Suspension:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                            <li>Overdue balances accrue commercial interest at the statutory rate of <strong className="text-slate-950">18% per annum</strong>, calculated daily from the due date until final settlement;</li>
                            <li>In the event an invoice remains unpaid for more than fourteen (14) calendar days past due date, Deeplink Creators reserves the non-derogable right to immediately freeze API gateways, suspend Sahyak CRM tenant routing, and halt creator distribution pipelines without liability for resulting commercial disruptions.</li>
                        </ul>
                    </section>

                    {/* SECTION 5 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE V — LIMITATION OF LIABILITY &amp; AGGREGATE 3-MONTH FEE CAP
                        </h2>
                        <p>
                            5.1. <strong className="text-slate-950">Total Aggregate Monetary Liability Cap:</strong> TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, THE ENTIRE CUMULATIVE AGGREGATE LIABILITY OF MAYALOK VENTURE (PRIVATE LIMITED), DEEPLINK CREATORS, ITS DIRECTORS, EXECUTIVE FOUNDERS (KUNAL PRATAP SINGH, DILEEP YADAV), EMPLOYEES, AND AFFILIATES ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, SAHYAK CRM SOFTWARE, OR SERVICES RENDERED—WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), INDEMNITY, BREACH OF STATUTORY DUTY, OR OTHERWISE—<strong className="text-slate-950">SHALL BE STRICTLY CAPPED AND LIMITED TO THE ACTUAL NET SERVICE FEES RECEIVED BY US FROM THE CLIENT DURING THE PRECEDING THREE (3) CALENDAR MONTHS</strong> IMMEDIATELY PRECEDING THE OCCURRENCE GIVING RISE TO THE CLAIM.
                        </p>
                        <p>
                            5.2. <strong className="text-slate-950">Exclusion of Consequential &amp; Indirect Damages:</strong> IN NO EVENT SHALL MAYALOK VENTURE OR DEEPLINK CREATORS BE LIABLE FOR ANY CONSEQUENTIAL, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF COMMERCIAL PROFITS, LOSS OF REVENUE, BUSINESS INTERRUPTION, LOSS OF DATA, REPUTATIONAL DAMAGE, OR LOSS OF BUSINESS OPPORTUNITY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                        </p>
                        <p>
                            5.3. <strong className="text-slate-950">Disclaimer of Upstream Cloud Infrastructure &amp; Ad Platform Disruptions:</strong> Deeplink Creators disclaims all liability for service latency, data transmission failures, or platform interruptions resulting from upstream cloud providers (Cloudflare, MongoDB Atlas, AWS, GCP, Vercel), telecom network backbones, or sudden policy bans, account suspensions, and algorithmic feed changes enacted by third-party platforms (Google, Meta, WhatsApp Cloud API, LinkedIn, TikTok).
                        </p>
                    </section>

                    {/* SECTION 6 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE VI — COMPREHENSIVE INDEMNIFICATION COVENANTS
                        </h2>
                        <p>
                            6.1. <strong className="text-slate-950">Client Indemnity Obligations:</strong> Client agrees to defend, indemnify, and hold harmless Mayalok Venture, Deeplink Creators, its corporate directors, officers, engineers, and sub-contractors against any third-party claims, legal demands, regulatory fines, damages, losses, and legal costs (including full attorney fees) arising from or relating to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                            <li>Client&apos;s violation of any applicable domestic or international law, including the Digital Personal Data Protection Act, 2023;</li>
                            <li>Infringement of third-party intellectual property, trademarks, or copyrights caused by materials, assets, or instructions provided by Client;</li>
                            <li>Unlawful, deceptive, or defamatory materials uploaded into Sahyak CRM or provided for creator syndication distribution;</li>
                            <li>Breach of user credential security, administrative account compromises, or unauthorized tenant access originating on Client&apos;s hardware systems.</li>
                        </ul>
                    </section>

                    {/* SECTION 7 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE VII — CREATOR DISTRIBUTION NETWORKS &amp; EDITORIAL AUTONOMY
                        </h2>
                        <p>
                            7.1. <strong className="text-slate-950">Independent Creator Status:</strong> Creators participating in our syndicated distribution networks are independent contractors and external media entities. While Deeplink Creators provides technical distribution routing and campaign attribution tokens, creators retain independent editorial control over their channels. Creators are required to strictly adhere to Advertising Standards Council of India (ASCI) guidelines regarding commercial disclosures.
                        </p>
                        <p>
                            7.2. <strong className="text-slate-950">Absence of Speculative Commercial Guarantees:</strong> Deeplink Creators does not warrant, promise, or guarantee specific audience impressions, conversion volumes, closed sales, or speculative revenue targets from creator syndication campaigns. Commercial performance is contingent on market resonance, pricing, and client-side sales execution.
                        </p>
                    </section>

                    {/* SECTION 8 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE VIII — CONFIDENTIALITY &amp; 24-MONTH NON-SOLICITATION COVENANT
                        </h2>
                        <p>
                            8.1. <strong className="text-slate-950">Mutual Confidentiality (3 Years):</strong> Both parties covenant to maintain all proprietary technical blueprints, software source code, commercial pricing schedules, and customer records in strict confidence for a period of three (3) years post-termination.
                        </p>
                        <p>
                            8.2. <strong className="text-slate-950">24-Month Non-Solicitation Covenant:</strong> During the term of this Agreement and for a period of <strong className="text-slate-950">twenty-four (24) months</strong> immediately following termination, Client shall not directly or indirectly recruit, solicit, hire, engage, or contract with any software engineer, developer, operational executive, or creator partner associated with Deeplink Creators without prior written approval from Mayalok Venture and payment of an agreed liquidated talent acquisition compensation fee equal to 100% of the individual&apos;s annual compensation.
                        </p>
                    </section>

                    {/* SECTION 9 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE IX — IMMEDIATE TERMINATION &amp; 30-DAY DATA PURGE PROTOCOL
                        </h2>
                        <p>
                            9.1. <strong className="text-slate-950">Immediate Termination for Cause:</strong> Mayalok Venture reserves the statutory right to immediately terminate this Agreement and permanently revoke all SaaS access upon: (a) Client&apos;s material breach of intellectual property covenants; (b) unauthorized reverse engineering or penetration testing; (c) insolvency or bankruptcy filings; or (d) un-cured payment default exceeding fourteen (14) calendar days.
                        </p>
                        <p>
                            9.2. <strong className="text-slate-950">Post-Termination Data Purge Lifecycle:</strong> Upon formal termination, Client possesses a strict grace period of thirty (30) calendar days to extract raw CRM customer records. Following day 30, all tenant database instances, backups, API keys, and workflow automations are permanently, cryptographically, and immutably deleted from production clusters.
                        </p>
                    </section>

                    {/* SECTION 10 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE X — PROHIBITION OF AUTOMATED SCRAPING, DATA HARVESTING &amp; IP THEFT
                        </h2>
                        <p>
                            10.1. <strong className="text-slate-950">Strict Prohibition of Scraping &amp; LLM Training Extraction:</strong> All contents, code architectures, legal manuscripts, brand identities, and proprietary representations published on <strong className="text-slate-950">deeplinkcreators.com</strong> constitute protected intellectual property of Mayalok Venture. Any automated scraping, web crawling, screenshot harvesting, or data extraction for training AI models or commercial mirroring without written authorization is strictly prohibited under Sections 43 &amp; 66 of the Information Technology Act, 2000 and the Copyright Act, 1957.
                        </p>
                    </section>

                    {/* SECTION 11 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE XI — GOVERNING LAW, MANDATORY ARBITRATION &amp; EXCLUSIVE JURISDICTION
                        </h2>
                        <p>
                            11.1. <strong className="text-slate-950">Substantive Governing Law:</strong> This Master Agreement shall be governed by, construed, and interpreted in accordance with the substantive laws of the <strong className="text-slate-950">Republic of India</strong>, without regard to conflict of laws principles.
                        </p>
                        <p>
                            11.2. <strong className="text-slate-950">Mandatory Binding Arbitration:</strong> Any dispute, controversy, or claim arising out of or relating to this Agreement, including its formation, validity, breach, or termination, shall be referred to and finally resolved by binding arbitration conducted in accordance with the <strong className="text-slate-950">Arbitration and Conciliation Act, 1996</strong>. The arbitration shall be conducted by a sole arbitrator mutually appointed by Mayalok Venture. The seat and venue of arbitration shall be <strong className="text-slate-950">Greater Noida / Gautam Buddha Nagar, Uttar Pradesh, India</strong>. The language of arbitration shall be English.
                        </p>
                        <p>
                            11.3. <strong className="text-slate-950">Exclusive Judicial Jurisdiction:</strong> Subject to mandatory arbitration covenants, the competent commercial and civil courts situated in <strong className="text-slate-950">Greater Noida / Gautam Buddha Nagar, Uttar Pradesh, India</strong> shall possess sole and exclusive jurisdiction over any judicial proceedings arising hereunder.
                        </p>
                    </section>
                </main>

                {/* White Paper Footer */}
                <footer className="relative z-10 border-t-2 border-slate-900 pt-6 mt-12 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
                    <div className="flex items-center gap-3">
                        <Link href="/privacy" className="text-slate-900 font-bold hover:underline">
                            PRIVACY &amp; DPDP CHARTER
                        </Link>
                        <span>•</span>
                        <Link href="/disclaimer" className="text-slate-900 font-bold hover:underline">
                            LEGAL &amp; PERFORMANCE DISCLAIMER
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
