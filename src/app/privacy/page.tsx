'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function PrivacyPage() {
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
                        MAYALOK VENTURE • CONFIDENTIAL LEGAL DOSSIER • STATUTORY PRIVACY CHARTER • UNAUTHORIZED REPRODUCTION PROHIBITED
                    </p>
                </div>

                {/* Document Header & Registry Box */}
                <header className="relative z-10 border-b-2 border-slate-900 pb-8 mb-10">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3">
                        <span>REGISTRATION NO: MV-DPDPA-2026-V4</span>
                        <span>CLASSIFICATION: STATUTORY DISCLOSURE</span>
                        <span>SOVEREIGN JURISDICTION: INDIA (NCR)</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-slate-950 tracking-tight leading-tight">
                        GLOBAL DATA GOVERNANCE, TELEMETRY &amp; PRIVACY CHARTER
                    </h1>
                    <p className="text-xs sm:text-sm font-serif italic text-slate-600 mt-2">
                        Comprehensive Institutional Compliance Manuscript Governing Data Principal Rights, Enterprise Software Tenancy (Sahyak CRM), Edge Telemetry Logging, and Multi-Tenant Isolation under the Digital Personal Data Protection Act, 2023, Information Technology Act, 2000, and International Cross-Border Data Transfer Frameworks.
                    </p>

                    <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] sm:text-[11px] font-mono">
                        <div>
                            <span className="text-slate-400 block uppercase">Data Fiduciary:</span>
                            <strong className="text-slate-900">Mayalok Venture (Pvt. Ltd.)</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block uppercase">Operational Unit:</span>
                            <strong className="text-slate-900">Deeplink Creators Holding</strong>
                        </div>
                        <div>
                            <span className="text-slate-400 block uppercase">Encryption Standard:</span>
                            <strong className="text-slate-900">AES-256-GCM / TLS 1.3</strong>
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
                            ARTICLE I — STATUTORY PREAMBLE, CORPORATE IDENTITY &amp; REGULATORY TAXONOMY
                        </h2>
                        <p>
                            1.1. <strong className="text-slate-950">Corporate Entity and Operational Architecture:</strong> This Comprehensive Data Governance, Telemetry, and Privacy Charter (&ldquo;Charter,&rdquo; &ldquo;Privacy Policy,&rdquo; or &ldquo;Policy&rdquo;) constitutes a binding regulatory instrument executed by <strong className="text-slate-950">Mayalok Venture (Private Limited)</strong>, an enterprise technology corporation incorporated under the Companies Act, 2013, with its executive headquarters and engineering studios situated in Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201306, India, acting through its specialized venture engineering studio, autonomous platform holding, and commercial distribution division, <strong className="text-slate-950">Deeplink Creators</strong> (hereinafter collectively referenced as &ldquo;Mayalok Venture,&rdquo; &ldquo;Deeplink Creators,&rdquo; &ldquo;the Holding,&rdquo; &ldquo;We,&rdquo; &ldquo;Us,&rdquo; or &ldquo;Our&rdquo;).
                        </p>
                        <p>
                            1.2. <strong className="text-slate-950">Entity Categorization &amp; Rejection of Conventional Agency Classification:</strong> Deeplink Creators operates exclusively as an AI-first Enterprise Software Holding and Venture Studio. We develop, license, and orchestrate proprietary B2B software infrastructure—specifically including our flagship enterprise customer relationship management platform, <strong className="text-slate-950">Sahyak CRM</strong> (<a href="https://sahyak.com" target="_blank" rel="noopener noreferrer" className="underline font-mono">sahyak.com</a>), edge cloud routing clusters, serverless database partitions, and private creator-led distribution networks. Deeplink Creators is not a third-party lead broker, consumer data reseller, or public advertising agency. All data processing activities are strictly confined to enterprise software deployment, institutional client onboarding, and authenticated distribution syndication.
                        </p>
                        <p>
                            1.3. <strong className="text-slate-950">Statutory Framework of Enforceability:</strong> This Charter is drafted, published, and enforced pursuant to the mandatory requirements of:
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2 font-mono text-[10px] sm:text-[11px] text-slate-700">
                            <li>The Digital Personal Data Protection Act, 2023 (Act No. 22 of 2023, Parliament of India) [&ldquo;DPDP Act, 2023&rdquo;];</li>
                            <li>The Information Technology Act, 2000 (Act No. 21 of 2000), specifically Sections 43A, 66, 66E, 72A, and 85;</li>
                            <li>The Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 [&ldquo;SPDI Rules, 2011&rdquo;];</li>
                            <li>The Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021;</li>
                            <li>International standard contractual principles and Article 28 data processing safeguards governing cross-border enterprise SaaS data routing.</li>
                        </ul>
                    </section>

                    {/* SECTION 2 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE II — DUAL STATUTORY PROCESSING CAPACITIES: FIDUCIARY VS. PROCESSOR
                        </h2>
                        <p>
                            2.1. <strong className="text-slate-950">Capacity as a Data Fiduciary:</strong> Pursuant to Section 2(i) of the DPDP Act 2023, Deeplink Creators functions as a <strong className="text-slate-950">Data Fiduciary</strong> with respect to personal data directly provided by prospective enterprise clients, corporate representatives, venture partners, and platform visitors who navigate <strong className="text-slate-950">deeplinkcreators.com</strong>, transmit executive intake briefs, request technical demonstrations, or enter into direct Master Services Agreements (MSAs). In this capacity, Mayalok Venture determines the explicit institutional purposes and means of lawful processing.
                        </p>
                        <p>
                            2.2. <strong className="text-slate-950">Capacity as a Data Processor:</strong> Pursuant to Section 2(k) of the DPDP Act 2023, Deeplink Creators functions strictly as a <strong className="text-slate-950">Data Processor</strong> when hosting, maintaining, and architecting multi-tenant database partitions, webhook routes, and isolated telemetry pipelines on behalf of enterprise subscribers deploying <strong className="text-slate-950">Sahyak CRM</strong>. In such operational modalities, the enterprise client organization acts as the independent Data Fiduciary, retaining sole ownership over the end-customer records, lead databases, and sales notes ingested into their designated tenant vault. Deeplink Creators processes such tenant data strictly pursuant to automated system algorithms and written client instructions, maintaining a zero-knowledge administrative posture regarding the underlying customer information.
                        </p>
                    </section>

                    {/* SECTION 3 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE III — EXHAUSTIVE TAXONOMY OF COLLECTED DATA &amp; INGESTION PROTOCOLS
                        </h2>
                        <p>
                            3.1. <strong className="text-slate-950">Category A: Enterprise Intake &amp; Authorized Representative Data:</strong> When an executive, institutional counterparty, or corporate representative initiates an inquiry or submits a commercial briefing through our intake portals, we collect:
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                            <li><strong className="text-slate-950">Identification Credentials:</strong> Full legal name, official executive designation, professional email address, corporate telephone number, and WhatsApp communication coordinates;</li>
                            <li><strong className="text-slate-950">Institutional Entity Data:</strong> Registered corporate entity name, state of incorporation, corporate identification number (CIN), Goods and Services Tax Identification Number (GSTIN), registered office physical address, corporate website URL, and primary business vertical;</li>
                            <li><strong className="text-slate-950">Project Technical Parameters:</strong> Target commercial budget allocations, operational timelines, software infrastructure requirements, technical scope dossiers, and customized integration preferences.</li>
                        </ul>
                        <p>
                            3.2. <strong className="text-slate-950">Category B: Sahyak CRM Multi-Tenant Application Records:</strong> When client organizations deploy and operationalize Sahyak CRM, our systems process and store within encrypted database nodes:
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                            <li>Enterprise sales pipeline records, lead ingestion payloads, customer lifecycle tags, interaction notes, and conversation timestamps;</li>
                            <li>Custom field schema definitions, workflow automation triggers, role-based access control (RBAC) logs, and administrative audit trails;</li>
                            <li>Integrated communication webhooks (e.g., WhatsApp Cloud API message delivery acknowledgments, email transmission receipts, telephony dispatch timestamps).</li>
                        </ul>
                        <p>
                            3.3. <strong className="text-slate-950">Category C: Edge Telemetry, Hardware Identification &amp; Cryptographic Visitor Tokens:</strong> To ensure DDoS mitigation, load balancing, fraud prevention, and anonymous platform analytics across our distributed global network, our edge compute nodes automatically ingest non-identifiable telemetry:
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                            <li><strong className="text-slate-950">Pseudonymized Cryptographic Hash:</strong> An irreversible client-side mathematical hash derived from non-sensitive browser environment attributes (display geometry, language token, timezone offset, user-agent string) to record returning visitation cadence without extracting persistent hardware serials;</li>
                            <li><strong className="text-slate-950">Edge Routing Diagnostics:</strong> Cloudflare edge server response latency, request method, protocol version (HTTP/2 or HTTP/3), TLS cipher suite version, referring domain syndication pathway, and country/region location headers derived at the network edge without persistent GPS coordinate tracking;</li>
                            <li><strong className="text-slate-950">First-Party Client Telemetry Storage:</strong> Local storage key-value entries (<code className="font-mono bg-slate-100 px-1 py-0.5 text-[10px]">dlc_local_visits</code>, <code className="font-mono bg-slate-100 px-1 py-0.5 text-[10px]">dlc_visited</code>) stored solely within the Data Principal&apos;s local browser runtime to preserve analytics persistence across navigation sessions without third-party cookie beacons.</li>
                        </ul>
                    </section>

                    {/* SECTION 4 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE IV — LAWFUL GROUNDS FOR PROCESSING UNDER THE DPDP ACT, 2023
                        </h2>
                        <p>
                            4.1. <strong className="text-slate-950">Statutory Consent Framework (Section 6, DPDP Act 2023):</strong> Where processing relies on affirmative consent, the Data Principal grants unambiguous, informed, specific, and unconditional consent by voluntarily inputting data into our intake portals and submitting an inquiry. Such consent covers the collection, verification, and internal routing of data strictly for evaluating, structuring, and fulfilling commercial software engagements.
                        </p>
                        <p>
                            4.2. <strong className="text-slate-950">Certain Legitimate Uses (Section 7, DPDP Act 2023):</strong> Processing is conducted without separate consent where necessary for:
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                            <li>The performance of any statutory function, compliance with judicial subpoenas, enforcement of legal claims, or prevention of corporate fraud under Indian law;</li>
                            <li>Responding to voluntary inquiries initiated by the Data Principal seeking commercial proposals or software architecture consultations;</li>
                            <li>Information security diagnostics, network vulnerability scanning, and real-time mitigation of denial-of-service (DDoS) assaults on our cloud perimeter.</li>
                        </ul>
                    </section>

                    {/* SECTION 5 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE V — MULTI-TENANT DATABASE PARTITIONING &amp; CRYPTOGRAPHIC ISOLATION (SAHYAK CRM)
                        </h2>
                        <p>
                            5.1. <strong className="text-slate-950">Logical &amp; Cryptographic Separation:</strong> Deeplink Creators enforces strict multi-tenant data architecture across all hosted deployments of Sahyak CRM. All database operations executed within our MongoDB Atlas clusters and Cloudflare D1 / edge storage layers enforce mandatory tenant scoping. Tenant identifiers (Tenant UUIDs) are cryptographically validated on every database query, ensuring zero cross-tenant contamination, unauthorized cross-reads, or shared memory leakages.
                        </p>
                        <p>
                            5.2. <strong className="text-slate-950">Encryption at Rest and In Transit:</strong>
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                            <li><strong className="text-slate-950">In Transit:</strong> All data transmitted between client browsers, edge proxy servers, API gateways, and database clusters is encrypted using Transport Layer Security (TLS) Version 1.3 with modern cipher suites (ECDHE-RSA-AES128-GCM-SHA256 or equivalent);</li>
                            <li><strong className="text-slate-950">At Rest:</strong> All stored database documents, backups, disk volumes, and transaction logs are encrypted at rest using Advanced Encryption Standard (AES) with 256-bit cryptographic keys managed under strict hardware security module (HSM) protocols;</li>
                            <li><strong className="text-slate-950">Zero Plaintext Key Exposure:</strong> Database connection URIs, service account tokens, and administrative credentials are injected exclusively at runtime via encrypted environment variables and secret stores, with zero plaintext persistence in source code.</li>
                        </ul>
                    </section>

                    {/* SECTION 6 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE VI — VETTED ENTERPRISE SUB-PROCESSORS &amp; CLOUD INFRASTRUCTURE
                        </h2>
                        <p>
                            6.1. <strong className="text-slate-950">Sub-Processor Engagement Covenants:</strong> Mayalok Venture contracts exclusively with internationally accredited cloud infrastructure providers that maintain independent SOC 2 Type II, ISO/IEC 27001, and ISO/IEC 27701 certifications. Our active certified sub-processors include:
                        </p>
                        <div className="overflow-x-auto my-2">
                            <table className="w-full border-collapse border border-slate-300 font-mono text-[9.5px] sm:text-[10.5px]">
                                <thead>
                                    <tr className="bg-slate-100 text-slate-900">
                                        <th className="border border-slate-300 p-2 text-left">Sub-Processor Entity</th>
                                        <th className="border border-slate-300 p-2 text-left">Processing Purpose</th>
                                        <th className="border border-slate-300 p-2 text-left">Geographic Location</th>
                                        <th className="border border-slate-300 p-2 text-left">Compliance Standards</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-slate-300 p-2 font-bold">Cloudflare, Inc.</td>
                                        <td className="border border-slate-300 p-2">Global Edge CDN, DNS, WAF &amp; D1 Database Shielding</td>
                                        <td className="border border-slate-300 p-2">Distributed Global Edge (India Nodes Primary)</td>
                                        <td className="border border-slate-300 p-2">SOC 2 Type II, ISO 27001, GDPR, DPDP Act</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-slate-300 p-2 font-bold">MongoDB, Inc. (Atlas)</td>
                                        <td className="border border-slate-300 p-2">Encrypted Multi-Tenant Cloud Database Clusters &amp; Backups</td>
                                        <td className="border border-slate-300 p-2">AWS / GCP Asia-South (Mumbai, India)</td>
                                        <td className="border border-slate-300 p-2">SOC 2 Type II, ISO 27001, HIPAA, AES-256</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-slate-300 p-2 font-bold">Formspree, Inc.</td>
                                        <td className="border border-slate-300 p-2">TLS-Encrypted Webhook Ingestion &amp; Dispatch Routing</td>
                                        <td className="border border-slate-300 p-2">US / EU Encrypted Cloud Gateways</td>
                                        <td className="border border-slate-300 p-2">SOC 2 Compliant, TLS 1.3, GDPR SCCs</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* SECTION 7 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE VII — CROSS-BORDER DATA TRANSFERS &amp; SOVEREIGN LOCALIZATION
                        </h2>
                        <p>
                            7.1. <strong className="text-slate-950">Cross-Border Routing Safeguards:</strong> While our primary database instances are localized within the sovereign territory of the Republic of India (AWS/GCP Mumbai Region), edge caching and technical sub-processor routing may occasionally involve data transit through international nodes. Pursuant to Section 16 of the DPDP Act 2023, transfers of personal data outside India are restricted strictly to jurisdictions not explicitly restricted by the Central Government of India, and are governed by Standard Contractual Clauses guaranteeing equivalent data protection levels.
                        </p>
                    </section>

                    {/* SECTION 8 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE VIII — ENFORCEABLE DATA PRINCIPAL RIGHTS (DPDP ACT, 2023)
                        </h2>
                        <p>
                            8.1. <strong className="text-slate-950">Statutory Rights Schedule:</strong> Every Data Principal whose personal data is processed by Deeplink Creators possesses the following non-derogable legal rights under Chapter III of the DPDP Act 2023:
                        </p>
                        <div className="space-y-2 pl-2">
                            <p>
                                8.1.1. <strong className="text-slate-950">Right to Access Information (Section 11):</strong> The Data Principal has the right to obtain a summary of personal data being processed, the identities of all Data Fiduciaries and Data Processors with whom data has been shared, and all other relevant processing descriptions.
                            </p>
                            <p>
                                8.1.2. <strong className="text-slate-950">Right to Correction and Erasure (Section 12):</strong> The Data Principal may demand the correction of inaccurate or misleading data, the completion of incomplete data, the updating of outdated records, or the complete erasure of personal data that is no longer necessary for the purpose for which it was collected.
                            </p>
                            <p>
                                8.1.3. <strong className="text-slate-950">Right of Grievance Redressal (Section 13):</strong> The Data Principal has the right to readily available grievance redressal mechanisms with guaranteed response and resolution from our registered Data Protection Officer.
                            </p>
                            <p>
                                8.1.4. <strong className="text-slate-950">Right to Nominate (Section 14):</strong> The Data Principal has the right to designate an authorized nominee who shall, in the event of death or incapacity of the Data Principal, exercise these statutory rights.
                            </p>
                        </div>
                    </section>

                    {/* SECTION 9 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE IX — RETENTION SCHEDULES, ARCHIVAL &amp; IMMUTABLE DELETION
                        </h2>
                        <p>
                            9.1. <strong className="text-slate-950">Data Minimization and Scheduled Purging:</strong> Personal data is retained strictly for the duration necessary to accomplish the contractual, operational, and statutory purposes defined herein:
                        </p>
                        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700">
                            <li><strong className="text-slate-950">Enterprise Inquiry &amp; Briefing Data:</strong> Retained for a period of twenty-four (24) calendar months from the date of submission, after which records are automatically purged unless converted into an active Master Services Agreement;</li>
                            <li><strong className="text-slate-950">Sahyak CRM Tenant Production Data:</strong> Retained throughout the active subscription term. Upon formal contract termination, tenant data enters a thirty (30) day export grace window, following which all tenant database partitions, collections, and associated backup snapshots are permanently, cryptographically, and immutably overwritten;</li>
                            <li><strong className="text-slate-950">Statutory Tax &amp; Invoicing Records:</strong> Preserved for eight (8) financial years pursuant to Section 128 of the Companies Act, 2013 and Section 36 of the Central Goods and Services Tax Act, 2017;</li>
                            <li><strong className="text-slate-950">Edge Diagnostic &amp; Telemetry Logs:</strong> Anonymized and aggregated rolling logs are systematically rotated and erased every ninety (90) calendar days.</li>
                        </ul>
                    </section>

                    {/* SECTION 10 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE X — PROHIBITION OF AUTOMATED SCRAPING, DATA HARVESTING &amp; IP THEFT
                        </h2>
                        <p>
                            10.1. <strong className="text-slate-950">Strict Prohibition of Automated Extraction:</strong> All textual formulations, code architectures, database schemas, legal manuscripts, brand identifiers, and technical specifications published on <strong className="text-slate-950">deeplinkcreators.com</strong> constitute protected proprietary property of Mayalok Venture. The deployment of automated scraping bots, web crawlers, screenshot harvesters, headless browser extractors, or data mining algorithms to ingest content for training Large Language Models (LLMs) or commercial mirroring without express written consent is strictly prohibited.
                        </p>
                        <p>
                            10.2. <strong className="text-slate-950">Statutory Penalties and Legal Enforcement:</strong> Any unauthorized data extraction or system compromise constitutes an actionable offense under Section 43 (Damage to computer systems), Section 66 (Computer related offenses), and Section 70 of the Information Technology Act, 2000, and will trigger immediate civil claims for damages, statutory injunctions, and formal criminal cyber complaint lodgments.
                        </p>
                    </section>

                    {/* SECTION 11 */}
                    <section className="space-y-3">
                        <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1">
                            ARTICLE XI — DATA PROTECTION OFFICER &amp; STATUTORY GRIEVANCE REDRESSAL
                        </h2>
                        <p>
                            11.1. <strong className="text-slate-950">Designated Grievance Directorate:</strong> In compliance with Section 12 of the DPDP Act 2023 and Rule 5(9) of the SPDI Rules 2011, the identity and contact coordinates of our designated Data Protection Officer (DPO) and Statutory Grievance Redressal Officer are registered as follows:
                        </p>
                        <div className="p-4 bg-slate-50 border border-slate-300 font-mono text-[10px] sm:text-[11px] space-y-1.5 my-2">
                            <div className="flex justify-between border-b border-slate-200 pb-1">
                                <span className="text-slate-500">Designated Officer:</span>
                                <strong className="text-slate-950">Chief Data Privacy Officer &amp; Legal Counsel</strong>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-1">
                                <span className="text-slate-500">Contracting Entity:</span>
                                <strong className="text-slate-950">Mayalok Venture (Private Limited)</strong>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-1">
                                <span className="text-slate-500">Official Compliance Email:</span>
                                <a href="mailto:legal@deeplinkcreators.com" className="text-blue-700 font-bold underline">
                                    legal@deeplinkcreators.com
                                </a>
                            </div>
                            <div className="flex justify-between border-b border-slate-200 pb-1">
                                <span className="text-slate-500">Direct Telephone Coordinates:</span>
                                <span className="text-slate-950 font-bold">+91 97116 10928</span>
                            </div>
                            <div className="pt-1">
                                <span className="text-slate-500 block">Physical Corporate Seat:</span>
                                <span className="text-slate-950">
                                    Mayalok Venture Headquarters, Tech Zone 4, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh 201306, India
                                </span>
                            </div>
                        </div>
                        <p>
                            11.2. <strong className="text-slate-950">Statutory Escalation:</strong> Our Grievance Directorate commits to acknowledging all formal grievances within twenty-four (24) business hours and delivering complete statutory resolution within seventy-two (72) business hours. If unsatisfied with the resolution, the Data Principal maintains the right to register a complaint before the <strong className="text-slate-950">Data Protection Board of India</strong> pursuant to Section 18 of the DPDP Act 2023.
                        </p>
                    </section>
                </main>

                {/* White Paper Footer */}
                <footer className="relative z-10 border-t-2 border-slate-900 pt-6 mt-12 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
                    <div className="flex items-center gap-3">
                        <Link href="/terms" className="text-slate-900 font-bold hover:underline">
                            TERMS &amp; CONDITIONS (MSA)
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
