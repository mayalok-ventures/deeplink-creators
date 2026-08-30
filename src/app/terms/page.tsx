'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    Scale,
    Shield,
    Lock,
    FileText,
    Server,
    Database,
    AlertTriangle,
    Building2,
    CheckCircle2,
    Ban,
    Briefcase,
    HelpCircle,
    ArrowUpRight
} from 'lucide-react'

export default function TermsPage() {
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
                            <Scale size={13} className="text-[#9B7545]" />
                            <span>MASTER SERVICES AGREEMENT &amp; PLATFORM TERMS</span>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] font-mono text-[#65675F]">
                            <span>STATUS: <strong className="text-emerald-400">LEGALLY ENFORCEABLE</strong></span>
                            <span>•</span>
                            <span>VERSION: 4.1 (2026 REVISION)</span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                        Enterprise Master Terms &amp; Conditions of Service.
                    </h1>

                    <p className="text-xs sm:text-sm text-[#AAA99F] max-w-4xl mt-3 leading-relaxed">
                        Binding Master Services Agreement (MSA), Software License Terms, and Operating Covenants governing commercial engagements with Mayalok Venture, Deeplink Creators, Sahyak CRM SaaS platforms, cloud software infrastructure, and creator-led syndication networks.
                    </p>

                    {/* Metadata Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 p-4 rounded-xl bg-[#141618] border border-white/08 text-[11px] font-mono">
                        <div>
                            <span className="text-[#65675F] block">Contracting Entity:</span>
                            <span className="text-white font-semibold">Mayalok Venture (Private Limited)</span>
                        </div>
                        <div>
                            <span className="text-[#65675F] block">Exclusive Jurisdiction:</span>
                            <span className="text-white font-semibold">Greater Noida / Gautam Buddha Nagar, UP</span>
                        </div>
                        <div>
                            <span className="text-[#65675F] block">Governing Law:</span>
                            <span className="text-white font-semibold">Laws of the Republic of India</span>
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
                                Agreement Index &amp; Articles
                            </div>

                            {[
                                { id: 'preamble', label: '1. Contracting Parties & Scope' },
                                { id: 'saas-license', label: '2. Sahyak CRM SaaS License' },
                                { id: 'intellectual-property', label: '3. Intellectual Property Rights' },
                                { id: 'commercial-retainers', label: '4. Fees, Billing & Taxes' },
                                { id: 'liability-caps', label: '5. Limitation of Liability (3-Mo Cap)' },
                                { id: 'indemnification', label: '6. Indemnification Obligations' },
                                { id: 'creator-syndication', label: '7. Creator Distribution Covenants' },
                                { id: 'confidentiality', label: '8. Confidentiality & Non-Solicit' },
                                { id: 'termination-purge', label: '9. Termination & Data Purge' },
                                { id: 'anti-scraping', label: '10. Anti-Scraping & IP Shield' },
                                { id: 'jurisdiction-arbitration', label: '11. Governing Law & Arbitration' },
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
                                Formal Legal Register • Mayalok Venture Directorate
                            </div>
                        </div>
                    </aside>

                    {/* Legal Sections Container (lg:col-span-9) */}
                    <main className="lg:col-span-9 space-y-10 text-[11px] sm:text-xs leading-relaxed text-[#AAA99F]">
                        {/* SECTION 1: PREAMBLE */}
                        <section id="preamble" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Building2 size={15} />
                                <span>1. Contracting Parties, Scope &amp; Legal Capacity</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                1.1 Binding Commercial Framework
                            </h2>

                            <p>
                                These Enterprise Terms and Conditions (&ldquo;Terms,&rdquo; &ldquo;Agreement,&rdquo; or &ldquo;MSA&rdquo;) constitute a legally binding agreement between <strong className="text-white">Mayalok Venture (Private Limited)</strong>, operating through its proprietary digital software holding, venture engineering studio, and distribution division, <strong className="text-white">Deeplink Creators</strong> (&ldquo;Holding,&rdquo; &ldquo;Deeplink Creators,&rdquo; &ldquo;We,&rdquo; &ldquo;Us,&rdquo; &ldquo;Our&rdquo;), and the commercial entity, enterprise client, or individual navigating this domain or executing a Service Proposal, Statement of Work (SOW), or Software License (&ldquo;Client,&rdquo; &ldquo;Enterprise Counterparty,&rdquo; &ldquo;You&rdquo;).
                            </p>

                            <p>
                                Deeplink Creators is an <strong className="text-white">AI-first Enterprise Software Holding and Venture Studio</strong>. We develop, license, and maintain proprietary B2B SaaS applications (including our flagship platform, <strong className="text-[#D4B270]">Sahyak CRM</strong> [sahyak.com]), custom workflow automations, and private creator distribution networks. By browsing our website, initiating inquiries, or executing a work order, you irrevocably consent to be bound by this Master Agreement.
                            </p>

                            <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 text-[#D0CBBF] space-y-1">
                                <span className="font-mono text-[#D4B270] font-bold block">Contracting Identity:</span>
                                <p>
                                    All legal liabilities, commercial invoices, master service agreements, and binding covenants are executed exclusively by and with <strong className="text-white">Mayalok Venture (Private Limited)</strong>, registered in Uttar Pradesh, India.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 2: SAHYAK CRM SAAS LICENSE */}
                        <section id="saas-license" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Server size={15} />
                                <span>2. Sahyak CRM Software Licensing &amp; Multi-Tenant SLA</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                2.1 Grant of Non-Exclusive, Scoped SaaS License
                            </h2>

                            <p>
                                Subject to timely payment of applicable service fees and strict adherence to this MSA, Deeplink Creators grants the Client a non-exclusive, non-transferable, non-sublicensable, revocable license to access and utilize the multi-tenant SaaS features of <strong className="text-white">Sahyak CRM</strong> (accessible at sahyak.com or client subdomain) for the designated contractual term.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white font-mono block">A. Complimentary 30-Day Onboarding:</strong>
                                    <p>Qualifying technical retainers include complimentary 30-day access to Sahyak CRM. Continued utilization past 30 days is subject to standard enterprise licensing fees.</p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white font-mono block">B. Absolute License Restrictions:</strong>
                                    <p>Client shall NOT reverse engineer, decompile, mirror, frame, benchmark, scrape, or extract source code, data schemas, or algorithms from Sahyak CRM or related APIs.</p>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 3: INTELLECTUAL PROPERTY */}
                        <section id="intellectual-property" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Lock size={15} />
                                <span>3. Intellectual Property Rights &amp; Asset Retention</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                3.1 Unconditional Retention of Software &amp; Architectural Assets
                            </h2>

                            <p>
                                All right, title, and interest in and to Deeplink Creators platforms, including but not limited to source code, compiled binaries, database architectures, schema models, API integrations, neural workflow prompts, algorithms, UI designs, and registered marks (&ldquo;Deeplink Creators,&rdquo; &ldquo;Sahyak CRM,&rdquo; &ldquo;Mayalok Venture&rdquo;) remain the sole, unencumbered, and exclusive intellectual property of Mayalok Venture.
                            </p>

                            <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-2">
                                <span className="font-mono text-white font-bold block">Client Data vs. Platform Property:</span>
                                <p>
                                    Client retains ownership of proprietary customer lists and raw business data uploaded into Sahyak CRM. Client grants Deeplink Creators a limited, royalty-free license to process such data strictly for operational execution, delivery, and anonymized diagnostic telemetry.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 4: COMMERCIAL TERMS */}
                        <section id="commercial-retainers" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Briefcase size={15} />
                                <span>4. Commercial Retainers, Invoicing &amp; Statutory Taxes</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                4.1 Payment Terms &amp; Service Suspension Protocols
                            </h2>

                            <p>
                                All fees for SaaS licenses, custom software development, and creator distribution retainers are denominated in Indian Rupees (INR) or agreed foreign currency, payable upfront or within Net-15 days of invoice date:
                            </p>

                            <ul className="space-y-2 list-disc list-inside text-[#AAA99F]">
                                <li><strong className="text-white">Statutory Taxes:</strong> Invoices are subject to Goods and Services Tax (GST at 18%) and applicable statutory levies under Indian fiscal law.</li>
                                <li><strong className="text-white">Late Payment Interest:</strong> Overdue invoices accrue statutory commercial interest at 18% per annum calculated daily from the due date until final settlement.</li>
                                <li><strong className="text-white">Operational Freeze:</strong> Accounts remaining in arrears beyond 14 business days are subject to automated suspension of API access, Sahyak CRM tenant routing, and creator distribution pipelines.</li>
                            </ul>
                        </section>

                        {/* SECTION 5: LIMITATION OF LIABILITY (3-MONTH CAP) */}
                        <section id="liability-caps" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-[#9B7545]/40 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#D4B270] font-bold uppercase tracking-wider">
                                <AlertTriangle size={15} className="text-[#9B7545]" />
                                <span>5. Limitation of Liability &amp; Disclaimers (Strict 3-Month Fee Cap)</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                5.1 Maximum Aggregate Liability Cap
                            </h2>

                            <div className="p-4 rounded-xl bg-[#0F1112] border border-[#9B7545]/30 text-[#D0CBBF] space-y-3 font-mono text-[11px]">
                                <p className="font-bold text-white uppercase tracking-wider">
                                    STATUTORY LIABILITY CEILING COVENANT:
                                </p>
                                <p>
                                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MAYALOK VENTURE (PRIVATE LIMITED), DEEPLINK CREATORS, ITS DIRECTORS, FOUNDERS (KUNAL PRATAP SINGH, DILEEP YADAV), EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING LOSS OF PROFITS, LOSS OF REVENUE, BUSINESS INTERRUPTION, LOSS OF DATA, OR LOSS OF GOODWILL.
                                </p>
                                <p>
                                    OUR TOTAL CUMULATIVE AGGREGATE LIABILITY ARISING UNDER OR RELATING TO THIS AGREEMENT, REGARDLESS OF THE LEGAL THEORY (WHETHER IN CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE), SHALL BE STRICTLY CAPPED AND LIMITED TO THE ACTUAL NET SERVICE FEES RECEIVED BY US FROM THE CLIENT DURING THE PRECEDING THREE (3) CALENDAR MONTHS PRIOR TO THE OCCURRENCE OF THE CLAIM.
                                </p>
                            </div>

                            <div className="space-y-2 pt-1 text-xs">
                                <span className="font-bold text-white font-mono block">Express Third-Party Outage &amp; Platform Shift Disclaimers:</span>
                                <p>
                                    Deeplink Creators shall bear zero legal liability for disruptions, outages, or performance degradations caused by third-party cloud infrastructure (Cloudflare, MongoDB Atlas, AWS, GCP), telecom carrier networks, or sudden advertising policy shifts and algorithmic bans enacted by Google, Meta, LinkedIn, or TikTok.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 6: INDEMNIFICATION */}
                        <section id="indemnification" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Shield size={15} />
                                <span>6. Enterprise Indemnification Covenants</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                6.1 Defense and Indemnity Obligations
                            </h2>

                            <p>
                                Client agrees to defend, indemnify, and hold harmless Mayalok Venture, Deeplink Creators, its directors, officers, and contractors against any third-party claims, regulatory penalties, damages, losses, or legal expenses (including reasonable attorney fees) arising from:
                            </p>

                            <ul className="space-y-1.5 list-disc list-inside text-[#AAA99F]">
                                <li>Client&apos;s breach of applicable laws, including the Digital Personal Data Protection Act, 2023.</li>
                                <li>Any defamatory, infringing, deceptive, or unlawful materials uploaded into Sahyak CRM or provided for creator syndication.</li>
                                <li>Unauthorized access, credential compromise, or security circumvention stemming from Client&apos;s administrative users.</li>
                            </ul>
                        </section>

                        {/* SECTION 7: CREATOR DISTRIBUTION */}
                        <section id="creator-syndication" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Briefcase size={15} />
                                <span>7. Creator Distribution &amp; Non-Guarantee of Speculative Gains</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                7.1 Commercial Distribution Realities
                            </h2>

                            <p>
                                Deeplink Creators engineers high-conversion distribution architecture and connects enterprise offerings with vetted creator networks. However, Client explicitly acknowledges that:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white font-mono block">A. Zero Earnings Guarantee:</strong>
                                    <p>Past case studies and ROI metrics are illustrative only. We do not warrant, promise, or guarantee specific conversion volumes, revenue targets, or commercial success.</p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white font-mono block">B. Creator Editorial Autonomy:</strong>
                                    <p>Creator partners maintain compliance with statutory ASCI guidelines and mandatory disclosure laws for sponsored enterprise messaging.</p>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 8: CONFIDENTIALITY */}
                        <section id="confidentiality" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Lock size={15} />
                                <span>8. Confidentiality &amp; Non-Solicitation Covenants</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                8.1 Mutual Protection of Trade Secrets &amp; Personnel
                            </h2>

                            <p>
                                Both parties agree to protect proprietary trade secrets, software blueprints, and commercial data with reasonable care for a minimum of three (3) years post-termination.
                            </p>

                            <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                <strong className="text-[#D4B270] font-mono block">24-Month Non-Solicitation Covenant:</strong>
                                <p>
                                    Client covenants that during the term of this Agreement and for twenty-four (24) months thereafter, Client shall not directly or indirectly recruit, solicit, employ, or contract with any engineer, developer, executive, or creator partner associated with Deeplink Creators without prior written authorization and payment of a standard liquidated talent acquisition fee.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 9: TERMINATION & DATA PURGE */}
                        <section id="termination-purge" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Ban size={15} />
                                <span>9. Termination &amp; Automated Data Purge Protocol</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                9.1 Immediate Termination for Security Breach or Default
                            </h2>

                            <p>
                                Deeplink Creators reserves the right to immediately terminate service access and revoke Sahyak CRM licenses without prior notice upon: (a) unauthorized reverse-engineering or security attacks; (b) material breach of data isolation rules; or (c) payment default exceeding 14 calendar days.
                            </p>

                            <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 font-mono text-[11px] space-y-1">
                                <span className="text-white font-bold block">Post-Termination Data Lifecycle:</span>
                                <p className="text-[#AAA99F]">
                                    Upon formal contract termination, Client possesses thirty (30) calendar days to export raw CRM customer records. Following day 30, all tenant database instances, backups, and API keys are permanently and immutably deleted from production clusters.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 10: ANTI-SCRAPING PROHIBITION */}
                        <section id="anti-scraping" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-[#9B7545]/40 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#D4B270] font-bold uppercase tracking-wider">
                                <Ban size={15} className="text-[#9B7545]" />
                                <span>10. Anti-Scraping, Anti-Screenshot &amp; Legal Enforcement</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                10.1 Prohibition of Automated Ingestion &amp; Content Mining
                            </h2>

                            <div className="p-4 rounded-xl bg-[#0F1112] border border-[#9B7545]/20 text-[#D0CBBF] space-y-2">
                                <p className="font-semibold text-white">
                                    EXPRESS COMPUTER MISUSE WARNING:
                                </p>
                                <p>
                                    Any automated scraping, bot crawling, screenshot harvesting, reverse engineering of interface tokens, or extraction of code, case study narratives, or software designs for AI training models without explicit written permission from Mayalok Venture is strictly prohibited under Sections 43 &amp; 66 of the Information Technology Act, 2000.
                                </p>
                                <p>
                                    Violators shall be subject to immediate civil injunctions, statutory damages, and criminal complaint prosecution under applicable Indian Cyber Crime statutes.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 11: JURISDICTION & ARBITRATION */}
                        <section id="jurisdiction-arbitration" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Scale size={15} />
                                <span>11. Governing Law, Exclusive Jurisdiction &amp; Mandatory Arbitration</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                11.1 Commercial Dispute Resolution Framework
                            </h2>

                            <p>
                                This Agreement shall be governed by, construed, and enforced in accordance with the substantive laws of the <strong className="text-white">Republic of India</strong>, without regard to its conflict of law principles.
                            </p>

                            <div className="space-y-2.5 font-mono text-[11px]">
                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white block">A. Mandatory Arbitration:</strong>
                                    <p className="text-[#AAA99F]">
                                        Any dispute or claim arising out of or in connection with this Agreement shall be referred to and finally resolved by binding arbitration administered under the <strong className="text-white">Arbitration and Conciliation Act, 1996</strong> by a sole arbitrator appointed by Mayalok Venture. The seat and venue of arbitration shall be <strong className="text-[#D4B270]">Greater Noida / Gautam Buddha Nagar, Uttar Pradesh, India</strong>. The language of arbitration shall be English.
                                    </p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white block">B. Exclusive Judicial Venue:</strong>
                                    <p className="text-[#AAA99F]">
                                        Subject to arbitration covenants, the competent civil and commercial courts located in <strong className="text-white">Greater Noida / Gautam Buddha Nagar, Uttar Pradesh, India</strong> shall possess exclusive jurisdiction over all legal proceedings.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* ── Document Footer Links ── */}
                        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#65675F]">
                            <div className="flex items-center gap-4">
                                <Link href="/privacy" className="text-[#D4B270] hover:underline">
                                    Privacy Policy
                                </Link>
                                <span>•</span>
                                <Link href="/disclaimer" className="text-[#D4B270] hover:underline">
                                    Legal Disclaimer
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
