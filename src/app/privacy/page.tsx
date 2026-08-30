'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    Shield,
    Lock,
    Scale,
    FileCheck,
    Cpu,
    Server,
    Database,
    Network,
    AlertOctagon,
    Building2,
    CheckCircle2,
    EyeOff,
    ExternalLink,
    HelpCircle,
    ArrowUpRight
} from 'lucide-react'

export default function PrivacyPage() {
    const [activeSection, setActiveSection] = useState<string>('preamble')

    // Anti-scraping / Anti-copy deterrent listeners
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
                            <Shield size={13} className="text-[#9B7545]" />
                            <span>STATUTORY DATA GOVERNANCE CHARTER</span>
                        </div>

                        <div className="flex items-center gap-3 text-[11px] font-mono text-[#65675F]">
                            <span>STATUS: <strong className="text-emerald-400">ENFORCED</strong></span>
                            <span>•</span>
                            <span>VERSION: 3.4 (2026 REVISION)</span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
                        Enterprise Data Privacy &amp; Governance Policy.
                    </h1>

                    <p className="text-xs sm:text-sm text-[#AAA99F] max-w-4xl mt-3 leading-relaxed">
                        Comprehensive legal and technical compliance architecture governing Mayalok Venture, Deeplink Creators, Sahyak CRM SaaS infrastructure, edge cloud nodes, and syndicated creator distribution networks under the Digital Personal Data Protection Act (DPDP Act, 2023) and Information Technology Act, 2000.
                    </p>

                    {/* Metadata Strip */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 p-4 rounded-xl bg-[#141618] border border-white/08 text-[11px] font-mono">
                        <div>
                            <span className="text-[#65675F] block">Data Fiduciary:</span>
                            <span className="text-white font-semibold">Mayalok Venture / Deeplink Creators</span>
                        </div>
                        <div>
                            <span className="text-[#65675F] block">Jurisdiction:</span>
                            <span className="text-white font-semibold">Republic of India (NCR Courts)</span>
                        </div>
                        <div>
                            <span className="text-[#65675F] block">Security Standard:</span>
                            <span className="text-white font-semibold">ISO/IEC 27001 • AES-256</span>
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
                                Compliance Table of Contents
                            </div>

                            {[
                                { id: 'preamble', label: '1. Preamble & Entity Registry' },
                                { id: 'scope', label: '2. Scope & Applicability' },
                                { id: 'data-categories', label: '3. Data Processing Categories' },
                                { id: 'multi-tenant', label: '4. Multi-Tenant CRM Isolation' },
                                { id: 'telemetry', label: '5. Edge Telemetry & Analytics' },
                                { id: 'lawful-basis', label: '6. Lawful Grounds for Processing' },
                                { id: 'subprocessors', label: '7. Cloud Sub-Processors' },
                                { id: 'dpdp-rights', label: '8. Data Principal Rights (DPDPA)' },
                                { id: 'retention', label: '9. Data Retention & Erasure' },
                                { id: 'anti-scraping', label: '10. Anti-Scraping & IP Shield' },
                                { id: 'governance-dpo', label: '11. DPO & Grievance Officer' },
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
                                Official Legal Register • Mayalok Venture Legal Counsel
                            </div>
                        </div>
                    </aside>

                    {/* Legal Sections Container (lg:col-span-9) */}
                    <main className="lg:col-span-9 space-y-10 text-[11px] sm:text-xs leading-relaxed text-[#AAA99F]">
                        {/* SECTION 1: PREAMBLE */}
                        <section id="preamble" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Building2 size={15} />
                                <span>1. Preamble &amp; Institutional Registry</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                1.1 Corporate Structure &amp; Legal Capacity
                            </h2>

                            <p>
                                This Privacy Policy represents a binding statutory agreement between the user or enterprise counterparty (&ldquo;Data Principal,&rdquo; &ldquo;Client,&rdquo; &ldquo;You&rdquo;) and <strong className="text-white">Deeplink Creators</strong>, operating as an autonomous software holding, platform engineering studio, and commercial deployment unit under its institutional parent, <strong className="text-white">Mayalok Venture (Private Limited)</strong> (hereinafter collectively referenced as &ldquo;Mayalok Venture,&rdquo; &ldquo;Deeplink Creators,&rdquo; &ldquo;the Holding,&rdquo; &ldquo;We,&rdquo; &ldquo;Us,&rdquo; or &ldquo;Our&rdquo;).
                            </p>

                            <p>
                                Deeplink Creators is NOT a conventional marketing agency or third-party lead aggregator. We operate as an <strong className="text-white">AI-first Enterprise Software Holding and Venture Studio</strong> that designs, deploys, and maintains proprietary software infrastructure (including our flagship multi-tenant customer relationship platform, <strong className="text-[#D4B270]">Sahyak CRM</strong> [sahyak.com]), edge data routing pipelines, and private creator syndication networks.
                            </p>

                            <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 text-[#D0CBBF] space-y-1">
                                <span className="font-mono text-[#D4B270] font-bold block">Statutory Adherence Covenant:</span>
                                <p>
                                    This charter is formulated in strict compliance with the <strong className="text-white">Digital Personal Data Protection Act, 2023 (DPDP Act 2023)</strong>, the <strong className="text-white">Information Technology Act, 2000 (IT Act)</strong>, the <strong className="text-white">Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (SPDI Rules)</strong>, and international data transfer safeguards including standard contractual clauses (SCCs).
                                </p>
                            </div>
                        </section>

                        {/* SECTION 2: SCOPE */}
                        <section id="scope" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Scale size={15} />
                                <span>2. Scope &amp; Dual Capacities of Processing</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                2.1 Dual Capacity as Data Fiduciary and Data Processor
                            </h2>

                            <p>
                                Depending on the contextual modality of your engagement with our platform and digital systems, Deeplink Creators operates in two distinct statutory capacities:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                                <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-2">
                                    <span className="text-xs font-mono font-bold text-[#D4B270] block">
                                        A. DATA FIDUCIARY (Controller)
                                    </span>
                                    <p className="text-[#AAA99F]">
                                        Applies when you interact directly with <strong className="text-white">deeplinkcreators.com</strong>, submit enterprise inquiry dossiers, execute software service agreements, or communicate with our executive leadership. We determine the legal purposes and processing modalities.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-2">
                                    <span className="text-xs font-mono font-bold text-[#D4B270] block">
                                        B. DATA PROCESSOR (Operator)
                                    </span>
                                    <p className="text-[#AAA99F]">
                                        Applies when we host, isolate, and maintain institutional database instances, telemetry pipelines, and tenant vaults for client organizations deploying <strong className="text-white">Sahyak CRM</strong>. In this capacity, the enterprise client acts as Data Fiduciary, and we process records strictly on authorized instructions.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 3: DATA PROCESSING CATEGORIES */}
                        <section id="data-categories" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Database size={15} />
                                <span>3. Categories of Data Collected &amp; Processing Modalities</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                3.1 Taxonomy of Digital &amp; Enterprise Information
                            </h2>

                            <div className="space-y-3">
                                <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono font-bold text-white">I. Institutional Client &amp; Representative PII</span>
                                        <span className="text-[10px] font-mono text-[#9B7545]">Direct Intake</span>
                                    </div>
                                    <p>
                                        Includes executive full name, authorized corporate email, verified telephone/WhatsApp coordinates, organization name, corporate registration/GSTIN credentials, project budgetary parameters, and specific software deployment scopes provided through our technical intake portals.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono font-bold text-white">II. Sahyak CRM Application Data &amp; Workflows</span>
                                        <span className="text-[10px] font-mono text-emerald-400">Multi-Tenant Vault</span>
                                    </div>
                                    <p>
                                        Customer pipeline stages, lead metadata, contact records, communication logs, and internal enterprise notes ingested into client-specific Sahyak CRM tenants. This data is subject to strict zero-cross-tenant isolation covenants and hardware-level encryption.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono font-bold text-white">III. Edge Telemetry, Session &amp; Hardware Analytics</span>
                                        <span className="text-[10px] font-mono text-[#D4B270]">Edge Cloud Nodes</span>
                                    </div>
                                    <p>
                                        Non-invasive diagnostic metadata including anonymized visitor cryptographic hash ID, referrer URL syndication path, hardware device classification (Desktop/Mobile/Tablet), browser user-agent string, page traversal pathways, and country/state location headers derived through Cloudflare edge network nodes.
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono font-bold text-white">IV. Creator Network Operational Governance Logs</span>
                                        <span className="text-[10px] font-mono text-purple-400">Distribution Nodes</span>
                                    </div>
                                    <p>
                                        Syndicated campaign attribution tokens, conversion cadence logs, channel effectiveness telemetry, and commercial distribution records verifying creator network delivery.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 4: MULTI-TENANT ISOLATION */}
                        <section id="multi-tenant" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Lock size={15} />
                                <span>4. Multi-Tenant Data Isolation &amp; Cryptographic Security</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                4.1 Zero-Leakage Software Architecture
                            </h2>

                            <p>
                                All enterprise software systems engineered by Deeplink Creators, including <strong className="text-white">Sahyak CRM</strong>, enforce multi-tenant database isolation. Each enterprise tenant operates within a logically partitioned data perimeter protected by:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] font-mono">
                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <span className="text-[#D4B270] font-bold block">1. Tenant Scoping</span>
                                    <p className="text-[#AAA99F]">Every query and database operation is hard-scoped to a tenant UUID, preventing cross-tenant reads or leakage.</p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <span className="text-[#D4B270] font-bold block">2. In-Transit TLS 1.3</span>
                                    <p className="text-[#AAA99F]">All data moving between clients, edge nodes, and database servers is encrypted via TLS 1.3 cryptographic protocols.</p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <span className="text-[#D4B270] font-bold block">3. Rest Encryption</span>
                                    <p className="text-[#AAA99F]">Data stored across MongoDB Atlas clusters and Cloudflare D1 nodes is encrypted at rest using AES-256 bit keys.</p>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 5: TELEMETRY & EDGE ANALYTICS */}
                        <section id="telemetry" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Cpu size={15} />
                                <span>5. Edge Telemetry, Cookies &amp; Hybrid Storage</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                5.1 First-Party Privacy-Preserving Telemetry
                            </h2>

                            <p>
                                Deeplink Creators rejects invasive third-party ad-tracking pixels and surveillance cookies. We deploy our own first-party privacy-preserving telemetry engine that operates through local browser caching (<code className="text-[#D4B270] font-mono">localStorage</code>) and encrypted serverless logging:
                            </p>

                            <ul className="space-y-2 list-disc list-inside text-[#AAA99F]">
                                <li><strong className="text-white">Zero Third-Party Advertising Pixels:</strong> We do not deploy Meta Pixel, TikTok tracking SDKs, or invasive data brokers on our primary enterprise interfaces.</li>
                                <li><strong className="text-white">Anonymous Hashing:</strong> Visitor identifiers are generated client-side via irreversible cryptographic hashing of hardware parameters, with no personal identification.</li>
                                <li><strong className="text-white">Essential Security Cookies:</strong> Session tokens and CSRF verification cookies are strictly used for administrative authentication and fraud defense.</li>
                            </ul>
                        </section>

                        {/* SECTION 6: LAWFUL GROUNDS */}
                        <section id="lawful-basis" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Scale size={15} />
                                <span>6. Lawful Grounds for Processing</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                6.1 DPDP Act 2023 &amp; Statutory Processing Bases
                            </h2>

                            <p>
                                In compliance with Section 6 and Section 7 of the Digital Personal Data Protection Act, 2023, Deeplink Creators processes digital personal data exclusively under the following statutory grounds:
                            </p>

                            <div className="space-y-2.5">
                                <div className="p-3 rounded-xl bg-[#0F1112] border border-white/06">
                                    <strong className="text-white font-mono">A. Express Consent:</strong> Where you have submitted voluntary technical briefs, contact inquiries, or newsletter requests.
                                </div>
                                <div className="p-3 rounded-xl bg-[#0F1112] border border-white/06">
                                    <strong className="text-white font-mono">B. Contractual Execution:</strong> Where processing is necessary to provision Sahyak CRM licenses, execute SaaS SLA covenants, or provide creator syndication delivery.
                                </div>
                                <div className="p-3 rounded-xl bg-[#0F1112] border border-white/06">
                                    <strong className="text-white font-mono">C. Legal Obligation:</strong> Where processing is required under Indian statutory mandates, including GST compliance, Income Tax regulations, or court orders.
                                </div>
                            </div>
                        </section>

                        {/* SECTION 7: SUBPROCESSORS */}
                        <section id="subprocessors" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Server size={15} />
                                <span>7. Cloud Infrastructure Sub-Processors</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                7.1 Certified Enterprise Sub-Processor Registry
                            </h2>

                            <p>
                                To ensure high availability, DDoS resistance, and zero-latency execution, we engage vetted enterprise infrastructure providers bound by rigorous data protection agreements:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono">
                                <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <span className="text-white font-bold block">1. Cloudflare Inc.</span>
                                    <span className="text-[#9B7545] text-[10px] block">Edge CDN &amp; D1 Shield</span>
                                    <p className="text-[#AAA99F]">Global edge delivery, DDoS prevention, and DNS infrastructure.</p>
                                </div>

                                <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <span className="text-white font-bold block">2. MongoDB Atlas</span>
                                    <span className="text-[#9B7545] text-[10px] block">Enterprise Cluster</span>
                                    <p className="text-[#AAA99F]">SOC 2 Type II certified encrypted database clusters and backup vaults.</p>
                                </div>

                                <div className="p-4 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <span className="text-white font-bold block">3. Formspree Inc.</span>
                                    <span className="text-[#9B7545] text-[10px] block">Encrypted Webhooks</span>
                                    <p className="text-[#AAA99F]">TLS-encrypted contact form ingestion and administrative notification routing.</p>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 8: DPDP RIGHTS */}
                        <section id="dpdp-rights" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <CheckCircle2 size={15} />
                                <span>8. Data Principal Statutory Rights (DPDPA 2023)</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                8.1 Exercise of Data Principal Entitlements
                            </h2>

                            <p>
                                Under the Digital Personal Data Protection Act, 2023, you possess enforceable legal rights regarding your personal information:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white font-mono block">I. Right to Access &amp; Summary</strong>
                                    <p>Obtain confirmation of whether we are processing your personal data and receive a readable summary of processing activities.</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white font-mono block">II. Right to Correction &amp; Erasure</strong>
                                    <p>Request correction of inaccurate personal data or complete statutory erasure of data no longer required for authorized purposes.</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white font-mono block">III. Right to Grievance Redressal</strong>
                                    <p>Access our designated Grievance Officer with guaranteed statutory response within 72 business hours.</p>
                                </div>
                                <div className="p-3.5 rounded-xl bg-[#0F1112] border border-white/06 space-y-1">
                                    <strong className="text-white font-mono block">IV. Right to Nominate</strong>
                                    <p>Nominate an individual who, in the event of death or incapacity, shall exercise rights under the DPDP Act on your behalf.</p>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 9: RETENTION & ERASURE */}
                        <section id="retention" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <FileCheck size={15} />
                                <span>9. Data Retention &amp; Scheduled Purge Lifecycle</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                9.1 Data Lifecycle &amp; Deletion Protocols
                            </h2>

                            <p>
                                Personal information is retained only for the duration necessary to satisfy the specific purposes outlined in this policy or to comply with statutory legal requirements.
                            </p>

                            <div className="space-y-2 font-mono text-[11px]">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F1112] border border-white/06">
                                    <span className="text-white">Enterprise Inquiries &amp; Briefings</span>
                                    <span className="text-[#D4B270]">Retained 24 months, then purged</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F1112] border border-white/06">
                                    <span className="text-white">Sahyak CRM Tenant Vaults</span>
                                    <span className="text-[#D4B270]">Retained for contract term + 30 days grace</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F1112] border border-white/06">
                                    <span className="text-white">Edge Telemetry Logs</span>
                                    <span className="text-[#D4B270]">Aggregated &amp; rotated every 90 days</span>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 10: ANTI-SCRAPING & IP SHIELD */}
                        <section id="anti-scraping" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-[#9B7545]/40 space-y-4 relative overflow-hidden">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#D4B270] font-bold uppercase tracking-wider">
                                <AlertOctagon size={15} className="text-[#9B7545]" />
                                <span>10. Anti-Scraping, Anti-Screenshot &amp; IP Protection Charter</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                10.1 Automated Harvest, Scraping &amp; Content Theft Prohibition
                            </h2>

                            <div className="p-4 rounded-xl bg-[#0F1112] border border-[#9B7545]/20 text-[#D0CBBF] space-y-2">
                                <p className="font-semibold text-white">
                                    NOTICE OF PROHIBITED EXPLOITATION:
                                </p>
                                <p>
                                    All contents, structural code, visual architecture, case dossier narratives, technical specifications, and proprietary data representations published across <strong className="text-white">deeplinkcreators.com</strong> constitute proprietary intellectual property of Mayalok Venture and Deeplink Creators.
                                </p>
                                <p>
                                    Any automated scraping, programmatic crawling, screen scraping, data mining, extraction for Large Language Model (LLM) training, or unauthorized reproduction without explicit prior written authorization from Mayalok Venture is strictly prohibited and constitutes a direct violation of Section 43 and Section 66 of the Information Technology Act, 2000, as well as the Copyright Act, 1957.
                                </p>
                            </div>
                        </section>

                        {/* SECTION 11: DPO & GRIEVANCE OFFICER */}
                        <section id="governance-dpo" className="p-6 sm:p-8 rounded-2xl bg-[#141618] border border-white/08 space-y-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-[#9B7545] font-bold uppercase tracking-wider">
                                <Shield size={15} />
                                <span>11. Data Protection Officer &amp; Grievance Redressal</span>
                            </div>

                            <h2 className="text-lg sm:text-xl font-bold font-heading text-white">
                                11.1 Statutory Grievance Redressal Mechanism
                            </h2>

                            <p>
                                Pursuant to Rule 5(9) of the IT Rules, 2011 and Section 12 of the DPDP Act, 2023, the details of our designated Data Protection Officer and Grievance Redressal Officer are registered as follows:
                            </p>

                            <div className="p-5 rounded-2xl bg-[#0F1112] border border-white/10 space-y-3 font-mono text-[11px]">
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/08 pb-3">
                                    <div>
                                        <span className="text-[#65675F] block">Grievance Redressal Officer:</span>
                                        <span className="text-white font-bold text-sm">Legal &amp; Privacy Compliance Directorate</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[#65675F] block">Designated Holding:</span>
                                        <span className="text-[#D4B270] font-semibold">Mayalok Venture (Private Limited)</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                    <div>
                                        <span className="text-[#65675F] block">Official Compliance Email:</span>
                                        <a href="mailto:legal@deeplinkcreators.com" className="text-[#D4B270] font-bold hover:underline">
                                            legal@deeplinkcreators.com
                                        </a>
                                    </div>
                                    <div>
                                        <span className="text-[#65675F] block">Administrative Contact:</span>
                                        <span className="text-white">+91 97116 10928</span>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="text-[#65675F] block">Physical Headquarters Coordinates:</span>
                                        <span className="text-white">
                                            Mayalok Venture Headquarters, Tech Zone 4, Greater Noida, Uttar Pradesh 201306, India
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ── Document Footer Links ── */}
                        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#65675F]">
                            <div className="flex items-center gap-4">
                                <Link href="/terms" className="text-[#D4B270] hover:underline">
                                    Terms &amp; Conditions
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
