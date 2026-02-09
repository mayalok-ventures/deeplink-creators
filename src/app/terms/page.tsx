'use client'

import LegalPageLayout from '@/components/LegalPageLayout'

const tocItems = [
    { id: 'entity-definition', label: '1. Entity Definition & Legal Identity' },
    { id: 'scope-of-services', label: '2. Scope of Services' },
    { id: 'no-guarantee', label: '3. No Guarantee of Results' },
    { id: 'payment-terms', label: '4. Payment Terms' },
    { id: 'client-responsibilities', label: '5. Client Responsibilities' },
    { id: 'intellectual-property', label: '6. Intellectual Property Rights' },
    { id: 'confidentiality', label: '7. Confidentiality' },
    { id: 'termination', label: '8. Termination' },
    { id: 'limitation-of-liability', label: '9. Limitation of Liability' },
    { id: 'indemnification', label: '10. Indemnification' },
    { id: 'force-majeure', label: '11. Force Majeure' },
    { id: 'dispute-resolution', label: '12. Dispute Resolution' },
    { id: 'governing-law', label: '13. Governing Law' },
    { id: 'amendments', label: '14. Amendments' },
    { id: 'severability', label: '15. Severability' },
    { id: 'entire-agreement', label: '16. Entire Agreement' },
    { id: 'contact-information', label: '17. Contact Information' },
]

export default function TermsPage() {
    return (
        <LegalPageLayout
            title="Terms & Conditions"
            lastUpdated="February 10, 2026"
            tocItems={tocItems}
        >
            {/* Introduction */}
            <section>
                <p className="text-paragraph leading-relaxed">
                    Welcome to Deeplink Creators (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), a high-performance Digital Marketing &amp; Technology Agency. These Terms and Conditions (&ldquo;Agreement&rdquo;) constitute a legally binding contract between you (&ldquo;Client,&rdquo; &ldquo;you,&rdquo; &ldquo;your&rdquo;) and <strong className="text-heading">Mayalok Venture (Private Limited)</strong>, operating under the trade name &ldquo;Deeplink Creators.&rdquo;
                </p>
                <p className="text-paragraph leading-relaxed mt-4">
                    By engaging our services, accessing our website at <a href="https://deeplinkcreators.com" className="text-primary-400 hover:text-primary-300 transition-colors">deeplinkcreators.com</a>, or signing a service proposal or work order, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions in their entirety. If you do not agree with any provision herein, you must not use our services.
                </p>
            </section>

            {/* Section 1 */}
            <section id="entity-definition">
                <h2 className="text-xl font-semibold text-heading mb-4">1. Entity Definition &amp; Legal Identity</h2>
                <ul className="space-y-3 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>&ldquo;Deeplink Creators&rdquo; is a registered trade name and operational unit of <strong className="text-heading">Mayalok Venture (Private Limited)</strong>, a company incorporated under the Companies Act, 2013, and registered in India.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>All service agreements, contracts, invoices, and legal obligations arising from services rendered by Deeplink Creators are legally entered into with <strong className="text-heading">Mayalok Venture (Private Limited)</strong> as the contracting entity.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Any reference to &ldquo;Deeplink Creators,&rdquo; &ldquo;the Agency,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo; in any document, proposal, or communication shall be construed as a reference to Mayalok Venture (Private Limited).</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>The registered office of Mayalok Venture is located in Greater Noida, Gautam Buddha Nagar, Uttar Pradesh, India.</span>
                    </li>
                </ul>
            </section>

            {/* Section 2 */}
            <section id="scope-of-services">
                <h2 className="text-xl font-semibold text-heading mb-4">2. Scope of Services</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    Deeplink Creators provides, but is not limited to, the following digital marketing and technology services:
                </p>
                <ul className="space-y-3 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Search Engine Optimization (SEO):</strong> On-page SEO, off-page SEO, technical SEO, local SEO, and SEO audits.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Performance Marketing:</strong> Google Ads (Search, Display, Shopping, YouTube), Meta Ads (Facebook &amp; Instagram), and other paid media campaigns.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Web Design &amp; Development:</strong> Responsive website design, landing page development, e-commerce development, and website maintenance.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Branding &amp; Identity:</strong> Logo design, brand strategy, visual identity systems, and brand collateral.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">AI Automation &amp; Technology Solutions:</strong> Marketing automation, chatbot development, CRM integration, and data analytics solutions.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Content Marketing:</strong> Content strategy, blog writing, social media content, video production, and copywriting.</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-4">
                    The specific scope, deliverables, timelines, and pricing for each engagement shall be detailed in a separate Service Proposal, Statement of Work (SOW), or Work Order, which shall be read in conjunction with these Terms and Conditions.
                </p>
            </section>

            {/* Section 3 */}
            <section id="no-guarantee">
                <h2 className="text-xl font-semibold text-heading mb-4">3. No Guarantee of Results</h2>
                <div className="rounded-lg border border-gold/30 bg-gold/5 p-5 mb-4">
                    <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">Critical Clause — Please Read Carefully</p>
                </div>
                <ul className="space-y-3 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Deeplink Creators does <strong className="text-heading">NOT</strong> guarantee any specific results, including but not limited to: specific Return on Investment (ROI), a predetermined number of leads or conversions, specific search engine rankings or positions, specific click-through rates (CTR) or cost-per-click (CPC), specific social media engagement metrics, or any specific revenue or sales figures.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Digital marketing outcomes are inherently dependent on numerous factors beyond our control, including but not limited to: third-party platform algorithms (Google, Meta/Facebook, Instagram, LinkedIn, etc.), changes in search engine ranking algorithms, competitor activities and market conditions, client&rsquo;s industry dynamics and market saturation, quality and relevance of client-provided content and assets, client&rsquo;s product/service quality and market fit, consumer behaviour and seasonal trends, and third-party platform policy changes, outages, or account restrictions.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Any case studies, projections, estimates, or past performance data shared by Deeplink Creators are for <strong className="text-heading">illustrative purposes only</strong> and do not constitute a guarantee of future results.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>We commit to employing industry best practices, transparent reporting, and data-driven strategies to optimize campaign performance. However, the ultimate outcome of any marketing campaign cannot be guaranteed by any agency.</span>
                    </li>
                </ul>
            </section>

            {/* Section 4 */}
            <section id="payment-terms">
                <h2 className="text-xl font-semibold text-heading mb-4">4. Payment Terms</h2>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">4.1 Advance Payment</h3>
                <p className="text-paragraph leading-relaxed">
                    A minimum of <strong className="text-gold">fifty percent (50%)</strong> of the total project or retainer value is required as an advance payment before the commencement of any work. This advance is <strong className="text-heading">strictly non-refundable</strong> under any circumstances, as it covers resource allocation, planning, strategy development, and initial execution costs.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">4.2 Payment Schedule</h3>
                <p className="text-paragraph leading-relaxed">
                    The remaining balance shall be payable as per the milestones or schedule defined in the Service Proposal or SOW. For retainer-based engagements, invoices shall be raised at the beginning of each billing cycle (monthly/quarterly as agreed).
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">4.3 Late Payment Penalty</h3>
                <p className="text-paragraph leading-relaxed">
                    If any invoice remains unpaid beyond <strong className="text-heading">seven (7) calendar days</strong> from the invoice due date, a late payment fee of <strong className="text-gold">one and a half percent (1.5%) per month</strong> (or the maximum rate permitted by applicable law, whichever is lower) shall be levied on the outstanding amount. Deeplink Creators reserves the right to suspend all ongoing work and campaigns until all outstanding payments, including late fees, are cleared in full.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">4.4 Payment Methods</h3>
                <p className="text-paragraph leading-relaxed">
                    Payments can be made via bank transfer (NEFT/RTGS/IMPS), UPI, or any other method specified in the invoice. All payments must be made in Indian Rupees (INR) unless otherwise agreed in writing.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">4.5 Taxes</h3>
                <p className="text-paragraph leading-relaxed">
                    All fees quoted are exclusive of applicable taxes. Goods and Services Tax (GST) at the prevailing rate (currently 18% for digital marketing services) shall be charged in addition to the service fees and is the responsibility of the Client.
                </p>
            </section>

            {/* Section 5 */}
            <section id="client-responsibilities">
                <h2 className="text-xl font-semibold text-heading mb-4">5. Client Responsibilities</h2>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">5.1 Timely Provision of Materials</h3>
                <p className="text-paragraph leading-relaxed">
                    The Client is responsible for providing all necessary content, assets, approvals, brand guidelines, access credentials, and information required for the execution of services within the timelines agreed upon in the SOW.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">5.2 Automatic Timeline Extension</h3>
                <p className="text-paragraph leading-relaxed">
                    If the Client delays in providing required materials, content, feedback, or approvals beyond the agreed-upon deadlines, the project timeline shall <strong className="text-heading">automatically extend</strong> by a period equivalent to the delay, without any liability on Deeplink Creators. Deeplink Creators shall not be held responsible for any missed deadlines or delayed deliverables resulting from Client-side delays.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">5.3 Access &amp; Credentials</h3>
                <p className="text-paragraph leading-relaxed mb-3">
                    The Client must provide timely access to all necessary platforms, including but not limited to:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Website CMS (WordPress, Shopify, etc.)</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Google Ads accounts</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Meta Business Suite / Ads Manager</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Google Analytics &amp; Google Search Console</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Social media accounts</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Domain registrar and hosting panels</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>CRM systems</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-3">
                    Failure to provide access in a timely manner may result in project delays for which Deeplink Creators shall bear no responsibility.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">5.4 Accuracy of Information</h3>
                <p className="text-paragraph leading-relaxed">
                    The Client warrants that all information, content, and materials provided to Deeplink Creators are accurate, lawful, and do not infringe upon the intellectual property rights of any third party. Deeplink Creators shall not be liable for any claims arising from inaccurate or unlawful content provided by the Client.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">5.5 Point of Contact</h3>
                <p className="text-paragraph leading-relaxed">
                    The Client shall designate a single point of contact (SPOC) who shall have the authority to provide approvals, feedback, and direction on behalf of the Client. Delays arising from unavailability of the designated SPOC shall be treated as Client-side delays.
                </p>
            </section>

            {/* Section 6 */}
            <section id="intellectual-property">
                <h2 className="text-xl font-semibold text-heading mb-4">6. Intellectual Property Rights</h2>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">6.1 Client Materials</h3>
                <p className="text-paragraph leading-relaxed">
                    All pre-existing intellectual property provided by the Client (logos, brand guidelines, content, images, etc.) shall remain the sole property of the Client.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">6.2 Deliverables</h3>
                <p className="text-paragraph leading-relaxed">
                    Upon full and final payment of all fees and charges, the intellectual property rights in the final deliverables (designs, content, code, etc.) created specifically for the Client shall transfer to the Client, unless otherwise stated in the SOW.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">6.3 Agency Tools &amp; Frameworks</h3>
                <p className="text-paragraph leading-relaxed">
                    Deeplink Creators retains all rights to its proprietary tools, frameworks, methodologies, templates, processes, and pre-existing intellectual property used in the delivery of services. The Client is granted a non-exclusive, non-transferable licence to use deliverables incorporating such tools for the purposes agreed upon.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">6.4 Portfolio Rights</h3>
                <p className="text-paragraph leading-relaxed">
                    Deeplink Creators reserves the right to showcase the work delivered, including designs, campaign results (anonymized if requested), and client name/logo, in its portfolio, case studies, and marketing materials, unless the Client provides a written objection within thirty (30) days of project completion.
                </p>
            </section>

            {/* Section 7 */}
            <section id="confidentiality">
                <h2 className="text-xl font-semibold text-heading mb-4">7. Confidentiality</h2>

                <p className="text-paragraph leading-relaxed mb-4">
                    7.1 Both parties agree to keep confidential all proprietary information, trade secrets, business strategies, campaign data, financial information, and any other information designated as confidential that is disclosed during the course of the engagement.
                </p>
                <p className="text-paragraph leading-relaxed mb-4">
                    7.2 This obligation of confidentiality shall survive the termination of this Agreement for a period of <strong className="text-heading">two (2) years</strong>.
                </p>
                <p className="text-paragraph leading-relaxed">
                    7.3 Confidential information shall not include information that: (a) is or becomes publicly available through no fault of the receiving party; (b) is already known to the receiving party prior to disclosure; (c) is independently developed by the receiving party; or (d) is required to be disclosed by law or court order.
                </p>
            </section>

            {/* Section 8 */}
            <section id="termination">
                <h2 className="text-xl font-semibold text-heading mb-4">8. Termination</h2>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">8.1 Termination by Client</h3>
                <p className="text-paragraph leading-relaxed">
                    The Client may terminate this Agreement by providing <strong className="text-heading">thirty (30) days&rsquo; written notice</strong>. Upon termination, the Client shall pay for all services rendered up to the termination date, including any committed media spend or third-party costs. The advance payment is non-refundable.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">8.2 Termination by Agency</h3>
                <p className="text-paragraph leading-relaxed mb-3">
                    Deeplink Creators may terminate this Agreement immediately upon written notice if:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">(a)</span>
                        <span>The Client breaches any material term of this Agreement;</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">(b)</span>
                        <span>The Client fails to make payment within thirty (30) days of the due date;</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">(c)</span>
                        <span>The Client engages in conduct that is unlawful, unethical, or detrimental to the Agency&rsquo;s reputation; or</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">(d)</span>
                        <span>Continuing the engagement would require the Agency to violate any applicable law.</span>
                    </li>
                </ul>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">8.3 Effect of Termination</h3>
                <p className="text-paragraph leading-relaxed">
                    Upon termination, Deeplink Creators shall deliver all completed work and in-progress deliverables (subject to full payment). Access to any Agency-owned tools, dashboards, or reporting systems shall be revoked. Any ongoing campaigns shall be paused or transferred as mutually agreed.
                </p>
            </section>

            {/* Section 9 */}
            <section id="limitation-of-liability">
                <h2 className="text-xl font-semibold text-heading mb-4">9. Limitation of Liability</h2>

                <p className="text-paragraph leading-relaxed mb-4">
                    9.1 To the maximum extent permitted by applicable law, Deeplink Creators&rsquo; total aggregate liability arising out of or in connection with this Agreement shall not exceed the total fees actually paid by the Client to Deeplink Creators during the <strong className="text-heading">three (3) months</strong> immediately preceding the event giving rise to the claim.
                </p>
                <p className="text-paragraph leading-relaxed mb-4">
                    9.2 In no event shall Deeplink Creators be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, revenue, data, business opportunities, or goodwill, regardless of whether such damages were foreseeable or whether Deeplink Creators was advised of the possibility of such damages.
                </p>
                <p className="text-paragraph leading-relaxed">
                    9.3 Deeplink Creators shall not be liable for any loss, damage, or penalty arising from the actions, policies, or decisions of third-party platforms including Google, Meta (Facebook/Instagram), LinkedIn, Twitter/X, or any other advertising or social media platform.
                </p>
            </section>

            {/* Section 10 */}
            <section id="indemnification">
                <h2 className="text-xl font-semibold text-heading mb-4">10. Indemnification</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    The Client agrees to indemnify, defend, and hold harmless Deeplink Creators, Mayalok Venture (Private Limited), and their directors, officers, employees, and agents from and against any and all claims, losses, damages, liabilities, costs, and expenses (including reasonable attorney&rsquo;s fees) arising out of or related to:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">(a)</span>
                        <span>The Client&rsquo;s breach of this Agreement;</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">(b)</span>
                        <span>Content, materials, or information provided by the Client;</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">(c)</span>
                        <span>The Client&rsquo;s violation of any applicable law or regulation;</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">(d)</span>
                        <span>Any third-party claims arising from the Client&rsquo;s products, services, or business practices; or</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">(e)</span>
                        <span>The Client&rsquo;s infringement of any intellectual property rights of a third party.</span>
                    </li>
                </ul>
            </section>

            {/* Section 11 */}
            <section id="force-majeure">
                <h2 className="text-xl font-semibold text-heading mb-4">11. Force Majeure</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    Neither party shall be liable for any delay or failure to perform its obligations under this Agreement due to events beyond its reasonable control, including but not limited to:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Natural disasters</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Pandemics or epidemics</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Government actions or regulations</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>War, terrorism, or civil unrest</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Internet or telecommunications failures</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Third-party platform outages or policy changes</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Power failures</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Strikes or labour disputes</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-3">
                    The affected party shall promptly notify the other party and use reasonable efforts to mitigate the impact.
                </p>
            </section>

            {/* Section 12 */}
            <section id="dispute-resolution">
                <h2 className="text-xl font-semibold text-heading mb-4">12. Dispute Resolution</h2>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">12.1 Amicable Resolution</h3>
                <p className="text-paragraph leading-relaxed">
                    The parties shall first attempt to resolve any dispute arising out of or in connection with this Agreement through good faith negotiation and discussion.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">12.2 Mediation</h3>
                <p className="text-paragraph leading-relaxed">
                    If the dispute is not resolved within thirty (30) days of the initial notice, either party may refer the matter to mediation under the rules of a mutually agreed mediation body.
                </p>

                <h3 className="text-lg font-medium text-heading mt-6 mb-3">12.3 Jurisdiction</h3>
                <div className="rounded-lg border border-gold/30 bg-gold/5 p-5">
                    <p className="text-heading leading-relaxed font-medium">
                        All disputes that are not resolved through negotiation or mediation shall be subject to the <strong className="text-gold">exclusive jurisdiction of the courts in Gautam Buddha Nagar (Greater Noida), Uttar Pradesh, India</strong>. This jurisdiction clause is non-negotiable and applies regardless of the Client&rsquo;s location or the place of performance of the services.
                    </p>
                </div>
            </section>

            {/* Section 13 */}
            <section id="governing-law">
                <h2 className="text-xl font-semibold text-heading mb-4">13. Governing Law</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    This Agreement shall be governed by and construed in accordance with the laws of India, including but not limited to:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>The Indian Contract Act, 1872</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>The Information Technology Act, 2000</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>The Consumer Protection Act, 2019</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>The Companies Act, 2013</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Any other applicable legislation and regulations</span>
                    </li>
                </ul>
            </section>

            {/* Section 14 */}
            <section id="amendments">
                <h2 className="text-xl font-semibold text-heading mb-4">14. Amendments</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    14.1 Deeplink Creators reserves the right to modify, amend, or update these Terms and Conditions at any time without prior notice. The updated version shall be effective from the date of publication on our website.
                </p>
                <p className="text-paragraph leading-relaxed">
                    14.2 For ongoing engagements, material changes to these Terms shall be communicated to existing Clients via email. Continued use of our services after such notification shall constitute acceptance of the amended Terms.
                </p>
            </section>

            {/* Section 15 */}
            <section id="severability">
                <h2 className="text-xl font-semibold text-heading mb-4">15. Severability</h2>
                <p className="text-paragraph leading-relaxed">
                    If any provision of this Agreement is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if modification is not possible, it shall be severed from this Agreement. The remaining provisions shall continue in full force and effect.
                </p>
            </section>

            {/* Section 16 */}
            <section id="entire-agreement">
                <h2 className="text-xl font-semibold text-heading mb-4">16. Entire Agreement</h2>
                <p className="text-paragraph leading-relaxed">
                    This Agreement, together with any Service Proposal, SOW, or Work Order, constitutes the entire agreement between the parties with respect to the subject matter hereof and supersedes all prior or contemporaneous understandings, agreements, representations, and warranties, both written and oral.
                </p>
            </section>

            {/* Section 17 */}
            <section id="contact-information">
                <h2 className="text-xl font-semibold text-heading mb-4">17. Contact Information</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    For any questions, concerns, or notices regarding these Terms and Conditions, please contact us at:
                </p>
                <div className="rounded-lg bg-dark-50 border border-white/[0.08] p-6">
                    <p className="text-heading font-semibold mb-1">Deeplink Creators</p>
                    <p className="text-paragraph text-sm mb-1">A Unit of Mayalok Venture (Private Limited)</p>
                    <p className="text-paragraph text-sm mb-1">Greater Noida, Gautam Buddha Nagar, Uttar Pradesh, India</p>
                    <p className="text-paragraph text-sm mb-1">
                        Email: <a href="mailto:legal@deeplinkcreators.com" className="text-primary-400 hover:text-primary-300 transition-colors">legal@deeplinkcreators.com</a>
                    </p>
                    <p className="text-paragraph text-sm">
                        Website: <a href="https://deeplinkcreators.com" className="text-primary-400 hover:text-primary-300 transition-colors">deeplinkcreators.com</a>
                    </p>
                </div>
            </section>
        </LegalPageLayout>
    )
}
