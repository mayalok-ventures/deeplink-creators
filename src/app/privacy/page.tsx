'use client'

import LegalPageLayout from '@/components/LegalPageLayout'

const tocItems = [
    { id: 'information-we-collect', label: '1. Information We Collect' },
    { id: 'how-we-collect', label: '2. How We Collect Information' },
    { id: 'use-of-information', label: '3. Use of Information' },
    { id: 'tracking-technologies', label: '4. Tracking Technologies & Analytics' },
    { id: 'data-sharing', label: '5. Data Sharing & Disclosure' },
    { id: 'data-retention', label: '6. Data Retention' },
    { id: 'data-security', label: '7. Data Security' },
    { id: 'your-rights', label: '8. Your Rights' },
    { id: 'cookies-policy', label: '9. Cookies Policy' },
    { id: 'third-party-links', label: '10. Third-Party Links' },
    { id: 'childrens-privacy', label: '11. Children\'s Privacy' },
    { id: 'dpdp-compliance', label: '12. DPDP Act 2023 Compliance' },
    { id: 'international-transfers', label: '13. International Data Transfers' },
    { id: 'changes-to-policy', label: '14. Changes to This Policy' },
    { id: 'grievance-officer', label: '15. Grievance Officer' },
    { id: 'contact-information', label: '16. Contact Information' },
]

export default function PrivacyPage() {
    return (
        <LegalPageLayout
            title="Privacy Policy"
            lastUpdated="February 10, 2026"
            tocItems={tocItems}
        >
            {/* Introduction */}
            <section>
                <p className="text-paragraph leading-relaxed">
                    Deeplink Creators (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), a unit of <strong className="text-heading">Mayalok Venture (Private Limited)</strong>, is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, store, protect, and disclose information when you visit our website at <a href="https://deeplinkcreators.com" className="text-primary-400 hover:text-primary-300 transition-colors">deeplinkcreators.com</a>, use our services, or interact with us in any manner.
                </p>
                <p className="text-paragraph leading-relaxed mt-4">
                    By accessing our website or engaging our services, you consent to the collection, use, and processing of your information as described in this Privacy Policy. If you do not agree with this Privacy Policy, please do not use our website or services.
                </p>
                <p className="text-paragraph leading-relaxed mt-4">
                    This Privacy Policy is published in compliance with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the <strong className="text-heading">Digital Personal Data Protection (DPDP) Act, 2023</strong>.
                </p>
            </section>

            {/* Section 1 */}
            <section id="information-we-collect">
                <h2 className="text-xl font-semibold text-heading mb-4">1. Information We Collect</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    We collect information that you voluntarily provide to us and information that is automatically collected when you interact with our website and services.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">1.1 Personal Information Provided Voluntarily</h3>
                <p className="text-paragraph leading-relaxed mb-3">
                    When you fill out contact forms, request a consultation, sign up for newsletters, or engage our services, we may collect:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Full Name:</strong> To identify and address you in communications.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Phone Number:</strong> To contact you regarding enquiries, consultations, and service updates.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Email Address:</strong> For correspondence, service updates, and marketing communications (with your consent).</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Business Details:</strong> Company name, industry, website URL, business size, and nature of services required — to tailor our proposals and strategies.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Billing Information:</strong> Company name, GST number, billing address — required for invoicing and tax compliance.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Message/Enquiry Content:</strong> Any information you provide in the message field of our contact forms.</span>
                    </li>
                </ul>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">1.2 Information Collected Automatically</h3>
                <p className="text-paragraph leading-relaxed mb-3">
                    When you visit our website, certain information is collected automatically through cookies and tracking technologies:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Device Information:</strong> Browser type, operating system, device type, screen resolution.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Usage Data:</strong> Pages visited, time spent on pages, click patterns, referring URLs, exit pages.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">IP Address:</strong> For approximate geographic location identification and security purposes.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Cookie Data:</strong> Unique identifiers stored on your device to enhance user experience and enable analytics.</span>
                    </li>
                </ul>
            </section>

            {/* Section 2 */}
            <section id="how-we-collect">
                <h2 className="text-xl font-semibold text-heading mb-4">2. How We Collect Information</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    We collect information through the following methods:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Website Contact Forms:</strong> When you submit an enquiry, request a consultation, or fill out any form on our website.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Email Communications:</strong> When you send us emails or respond to our communications.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Phone Calls:</strong> When you contact us by phone for enquiries or consultations.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Service Engagement:</strong> During onboarding and throughout the service delivery process.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Automated Technologies:</strong> Through cookies, web beacons, pixels, and analytics tools embedded on our website.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Social Media Interactions:</strong> When you interact with our profiles on social media platforms.</span>
                    </li>
                </ul>
            </section>

            {/* Section 3 */}
            <section id="use-of-information">
                <h2 className="text-xl font-semibold text-heading mb-4">3. Use of Information</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    We use the collected information for the following purposes:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Service Delivery:</strong> To provide, manage, and improve the digital marketing services you have engaged us for.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Client Communication:</strong> To respond to your enquiries, provide updates on projects, share reports, and communicate service-related information.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Internal Marketing:</strong> To send you information about our new services, case studies, industry insights, and promotional offers (you may opt out at any time).</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Website Improvement:</strong> To analyze user behaviour on our website and improve user experience, content, and navigation.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Analytics &amp; Reporting:</strong> To generate aggregated, anonymized statistical data about website traffic and engagement for internal reporting.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Security:</strong> To protect our website, services, and users from fraud, unauthorized access, and other security threats.</span>
                    </li>
                </ul>
                <div className="rounded-lg border border-gold/30 bg-gold/5 p-5 mt-6">
                    <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">Important</p>
                    <p className="text-heading leading-relaxed font-medium">
                        We do NOT sell, rent, trade, or otherwise share your personal data with third parties for their independent marketing purposes. Your data is used exclusively for internal operations and client service delivery.
                    </p>
                </div>
            </section>

            {/* Section 4 */}
            <section id="tracking-technologies">
                <h2 className="text-xl font-semibold text-heading mb-4">4. Tracking Technologies &amp; Analytics</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    We use the following third-party tracking and analytics tools on our website to understand user behaviour, measure campaign effectiveness, and improve our services:
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">4.1 Google Analytics 4 (GA4)</h3>
                <p className="text-paragraph leading-relaxed mb-3">
                    We use Google Analytics 4, a web analytics service provided by Google LLC, to collect and analyze data about website traffic and user interactions. GA4 collects information such as:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Pages visited and time spent on each page</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Traffic sources and referral paths</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>User demographics (age, gender, interests — in aggregate)</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Device and browser information</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Conversion events and goal completions</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-3">
                    Google Analytics uses cookies and similar technologies. For more information, visit <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">Google&rsquo;s Privacy Policy</a>. You may opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">Google Analytics Opt-Out Browser Add-on</a>.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">4.2 Meta Pixel (Facebook Pixel)</h3>
                <p className="text-paragraph leading-relaxed mb-3">
                    We use the Meta Pixel, a tracking code provided by Meta Platforms, Inc. (formerly Facebook, Inc.), to:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Track conversions from Facebook and Instagram advertisements</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Build targeted audiences for future advertising campaigns (retargeting)</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Measure the effectiveness of ad campaigns</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Optimize ad delivery to users who are more likely to take action</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-3">
                    The Meta Pixel may collect data such as pages visited, actions taken, device information, and IP address. This data is processed by Meta in accordance with <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors">Meta&rsquo;s Data Policy</a>.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">4.3 Cookies for Retargeting</h3>
                <p className="text-paragraph leading-relaxed">
                    We use cookies and similar tracking technologies to enable retargeting campaigns. This means that after you visit our website, you may see our advertisements on other websites and social media platforms. These cookies do not collect personally identifiable information but use anonymous identifiers to recognize your browser or device.
                </p>
            </section>

            {/* Section 5 */}
            <section id="data-sharing">
                <h2 className="text-xl font-semibold text-heading mb-4">5. Data Sharing &amp; Disclosure</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    We may share your information in the following limited circumstances:
                </p>
                <ul className="space-y-3 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Service Providers:</strong> With trusted third-party service providers who assist us in operating our business (hosting providers, email service providers, analytics platforms), subject to strict confidentiality agreements.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Legal Requirements:</strong> When required by law, regulation, legal process, or governmental request, or to protect our rights, property, or safety, or that of our users or the public.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Business Transfers:</strong> In connection with any merger, acquisition, reorganization, or sale of assets involving Mayalok Venture (Private Limited), your information may be transferred as part of the transaction.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">With Your Consent:</strong> In any other circumstances where we have obtained your explicit consent.</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-4">
                    We do <strong className="text-heading">NOT</strong> sell your personal data to any third party under any circumstances.
                </p>
            </section>

            {/* Section 6 */}
            <section id="data-retention">
                <h2 className="text-xl font-semibold text-heading mb-4">6. Data Retention</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    We retain your personal information only for as long as is necessary to fulfil the purposes for which it was collected, including:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Active Client Data:</strong> For the duration of the service engagement plus three (3) years for business continuity and potential re-engagement.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Enquiry Data:</strong> For up to two (2) years from the date of the last interaction.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Financial Records:</strong> As required by Indian tax laws (currently eight years as per the Income Tax Act, 1961).</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Analytics Data:</strong> Aggregated and anonymized data may be retained indefinitely for statistical purposes.</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-3">
                    Upon expiry of the retention period, personal data shall be securely deleted or anonymized.
                </p>
            </section>

            {/* Section 7 */}
            <section id="data-security">
                <h2 className="text-xl font-semibold text-heading mb-4">7. Data Security</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>SSL/TLS encryption for all data transmitted through our website</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Secure cloud-based storage with access controls and encryption at rest</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Role-based access controls limiting data access to authorized personnel only</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Regular security assessments and vulnerability reviews</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Employee training on data protection and privacy best practices</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-3">
                    While we strive to protect your personal information, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security but commit to implementing reasonable security practices as prescribed under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                </p>
            </section>

            {/* Section 8 */}
            <section id="your-rights">
                <h2 className="text-xl font-semibold text-heading mb-4">8. Your Rights</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    Under applicable Indian data protection laws, including the DPDP Act, 2023, you have the following rights:
                </p>
                <ul className="space-y-3 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Right to Access:</strong> You may request confirmation of whether we hold personal data about you and request a copy of such data.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Right to Correction:</strong> You may request correction or updating of inaccurate or incomplete personal data.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Right to Erasure:</strong> You may request deletion of your personal data, subject to legal retention requirements and legitimate business interests.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Right to Withdraw Consent:</strong> Where processing is based on your consent, you may withdraw consent at any time. Withdrawal of consent shall not affect the lawfulness of processing based on consent before its withdrawal.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Right to Grievance Redressal:</strong> You may file a complaint with our Grievance Officer or with the Data Protection Board of India if you believe your data has been mishandled.</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-3">
                    To exercise any of these rights, please contact our Grievance Officer at the details provided in Section 15 below.
                </p>
            </section>

            {/* Section 9 */}
            <section id="cookies-policy">
                <h2 className="text-xl font-semibold text-heading mb-4">9. Cookies Policy</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    Our website uses cookies — small text files placed on your device — to enhance your browsing experience and enable certain functionalities.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">Types of Cookies We Use</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/[0.08]">
                                <th className="py-3 pr-4 text-heading font-semibold">Cookie Type</th>
                                <th className="py-3 pr-4 text-heading font-semibold">Purpose</th>
                                <th className="py-3 text-heading font-semibold">Duration</th>
                            </tr>
                        </thead>
                        <tbody className="text-paragraph">
                            <tr className="border-b border-white/[0.05]">
                                <td className="py-3 pr-4 font-medium text-heading">Essential Cookies</td>
                                <td className="py-3 pr-4">Required for basic website functionality (navigation, form submission)</td>
                                <td className="py-3">Session</td>
                            </tr>
                            <tr className="border-b border-white/[0.05]">
                                <td className="py-3 pr-4 font-medium text-heading">Analytics Cookies</td>
                                <td className="py-3 pr-4">Google Analytics 4 — to understand website traffic and user behaviour</td>
                                <td className="py-3">Up to 2 years</td>
                            </tr>
                            <tr className="border-b border-white/[0.05]">
                                <td className="py-3 pr-4 font-medium text-heading">Marketing Cookies</td>
                                <td className="py-3 pr-4">Meta Pixel — for retargeting and ad conversion tracking</td>
                                <td className="py-3">Up to 180 days</td>
                            </tr>
                            <tr className="border-b border-white/[0.05]">
                                <td className="py-3 pr-4 font-medium text-heading">Preference Cookies</td>
                                <td className="py-3 pr-4">To remember your preferences (e.g., cookie consent choice)</td>
                                <td className="py-3">Up to 1 year</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-paragraph leading-relaxed mt-4">
                    You can manage or disable cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
                </p>
            </section>

            {/* Section 10 */}
            <section id="third-party-links">
                <h2 className="text-xl font-semibold text-heading mb-4">10. Third-Party Links</h2>
                <p className="text-paragraph leading-relaxed">
                    Our website may contain links to third-party websites, platforms, or services that are not operated or controlled by Deeplink Creators. We are not responsible for the privacy practices, content, or security of such third-party websites. We encourage you to review the privacy policies of any third-party websites you visit. The inclusion of any link does not imply endorsement, approval, or recommendation by Deeplink Creators.
                </p>
            </section>

            {/* Section 11 */}
            <section id="childrens-privacy">
                <h2 className="text-xl font-semibold text-heading mb-4">11. Children&rsquo;s Privacy</h2>
                <p className="text-paragraph leading-relaxed">
                    Our website and services are not directed at individuals under the age of 18 years. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal data from a child under 18, we will take immediate steps to delete such information from our records. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at the details provided in Section 16.
                </p>
            </section>

            {/* Section 12 */}
            <section id="dpdp-compliance">
                <h2 className="text-xl font-semibold text-heading mb-4">12. Digital Personal Data Protection (DPDP) Act, 2023 Compliance</h2>
                <div className="rounded-lg border border-gold/30 bg-gold/5 p-5 mb-4">
                    <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">Compliance Statement</p>
                </div>
                <p className="text-paragraph leading-relaxed mb-3">
                    Deeplink Creators, as a unit of Mayalok Venture (Private Limited), is committed to complying with the provisions of the Digital Personal Data Protection Act, 2023 (DPDP Act) enacted by the Parliament of India. In accordance with the DPDP Act:
                </p>
                <ul className="space-y-3 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Lawful Purpose:</strong> We process personal data only for lawful purposes for which you have given consent or which are permitted under the Act.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Notice &amp; Consent:</strong> We provide clear notice about the personal data we collect, the purpose of collection, and obtain your consent before processing, except where exempted by the Act.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Purpose Limitation:</strong> Personal data collected is used only for the specified purpose communicated at the time of collection.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Data Minimization:</strong> We collect only the personal data that is necessary for the specified purpose.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Storage Limitation:</strong> Personal data is retained only for as long as necessary and is deleted or anonymized upon fulfilment of purpose or withdrawal of consent.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Data Principal Rights:</strong> We respect and facilitate the rights of Data Principals (individuals whose data we process) as outlined in the DPDP Act, including the right to access, correction, erasure, and grievance redressal.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Reasonable Security Safeguards:</strong> We implement reasonable security safeguards to protect personal data from breaches, as required under the Act.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Breach Notification:</strong> In the event of a personal data breach, we shall notify the Data Protection Board of India and the affected Data Principals in the manner prescribed by the Act.</span>
                    </li>
                </ul>
            </section>

            {/* Section 13 */}
            <section id="international-transfers">
                <h2 className="text-xl font-semibold text-heading mb-4">13. International Data Transfers</h2>
                <p className="text-paragraph leading-relaxed">
                    Some of the third-party services we use (such as Google Analytics and Meta Pixel) may process data on servers located outside India. By using our website and services, you consent to the transfer of your data to these third-party processors, subject to appropriate safeguards. We ensure that any such transfer complies with the provisions of the DPDP Act, 2023, and that the receiving jurisdiction provides adequate data protection standards or the transfer is subject to contractual safeguards.
                </p>
            </section>

            {/* Section 14 */}
            <section id="changes-to-policy">
                <h2 className="text-xl font-semibold text-heading mb-4">14. Changes to This Privacy Policy</h2>
                <p className="text-paragraph leading-relaxed">
                    Deeplink Creators reserves the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. We encourage you to review this Privacy Policy periodically. For material changes, we may provide additional notice through our website or via email to existing clients. Your continued use of our website and services after any modifications indicates your acceptance of the updated Privacy Policy.
                </p>
            </section>

            {/* Section 15 */}
            <section id="grievance-officer">
                <h2 className="text-xl font-semibold text-heading mb-4">15. Grievance Officer</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    In accordance with the Information Technology Act, 2000, and the DPDP Act, 2023, the details of our Grievance Officer are as follows:
                </p>
                <div className="rounded-lg bg-dark-50 border border-white/[0.08] p-6">
                    <p className="text-heading font-semibold mb-1">Grievance Officer</p>
                    <p className="text-paragraph text-sm mb-1">Deeplink Creators (A Unit of Mayalok Venture Pvt. Ltd.)</p>
                    <p className="text-paragraph text-sm mb-1">Greater Noida, Gautam Buddha Nagar, Uttar Pradesh, India</p>
                    <p className="text-paragraph text-sm mb-1">
                        Email: <a href="mailto:grievance@deeplinkcreators.com" className="text-primary-400 hover:text-primary-300 transition-colors">grievance@deeplinkcreators.com</a>
                    </p>
                    <p className="text-paragraph text-sm">
                        Response Time: Within 48 hours of receipt of complaint. Resolution within 30 days.
                    </p>
                </div>
            </section>

            {/* Section 16 */}
            <section id="contact-information">
                <h2 className="text-xl font-semibold text-heading mb-4">16. Contact Information</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    For any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="rounded-lg bg-dark-50 border border-white/[0.08] p-6">
                    <p className="text-heading font-semibold mb-1">Deeplink Creators</p>
                    <p className="text-paragraph text-sm mb-1">A Unit of Mayalok Venture (Private Limited)</p>
                    <p className="text-paragraph text-sm mb-1">Greater Noida, Gautam Buddha Nagar, Uttar Pradesh, India</p>
                    <p className="text-paragraph text-sm mb-1">
                        Email: <a href="mailto:privacy@deeplinkcreators.com" className="text-primary-400 hover:text-primary-300 transition-colors">privacy@deeplinkcreators.com</a>
                    </p>
                    <p className="text-paragraph text-sm">
                        Website: <a href="https://deeplinkcreators.com" className="text-primary-400 hover:text-primary-300 transition-colors">deeplinkcreators.com</a>
                    </p>
                </div>
            </section>
        </LegalPageLayout>
    )
}
