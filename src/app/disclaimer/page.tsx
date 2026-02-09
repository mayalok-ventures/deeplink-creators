'use client'

import LegalPageLayout from '@/components/LegalPageLayout'

const tocItems = [
    { id: 'general-disclaimer', label: '1. General Disclaimer' },
    { id: 'earnings-disclaimer', label: '2. Earnings & Results Disclaimer' },
    { id: 'third-party-platforms', label: '3. Third-Party Platform Disclaimer' },
    { id: 'case-studies', label: '4. Case Studies & Testimonials' },
    { id: 'professional-advice', label: '5. Not Professional Advice' },
    { id: 'website-content', label: '6. Website Content Accuracy' },
    { id: 'external-links', label: '7. External Links Disclaimer' },
    { id: 'technology-disclaimer', label: '8. Technology & Uptime Disclaimer' },
    { id: 'ai-tools', label: '9. AI & Automation Tools Disclaimer' },
    { id: 'client-responsibility', label: '10. Client Responsibility' },
    { id: 'limitation-of-liability', label: '11. Limitation of Liability' },
    { id: 'indemnification', label: '12. Indemnification' },
    { id: 'changes-to-disclaimer', label: '13. Changes to This Disclaimer' },
    { id: 'governing-law', label: '14. Governing Law & Jurisdiction' },
    { id: 'contact-information', label: '15. Contact Information' },
]

export default function DisclaimerPage() {
    return (
        <LegalPageLayout
            title="Disclaimer"
            lastUpdated="February 10, 2026"
            tocItems={tocItems}
        >
            {/* Introduction */}
            <section>
                <p className="text-paragraph leading-relaxed">
                    This Disclaimer (&ldquo;Disclaimer&rdquo;) applies to the website <a href="https://deeplinkcreators.com" className="text-primary-400 hover:text-primary-300 transition-colors">deeplinkcreators.com</a> and all services provided by Deeplink Creators (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;), a unit of <strong className="text-heading">Mayalok Venture (Private Limited)</strong>. By accessing our website or engaging our services, you acknowledge and accept this Disclaimer in its entirety.
                </p>
                <p className="text-paragraph leading-relaxed mt-4">
                    This Disclaimer should be read in conjunction with our <a href="/terms" className="text-primary-400 hover:text-primary-300 transition-colors">Terms &amp; Conditions</a> and <a href="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors">Privacy Policy</a>.
                </p>
            </section>

            {/* Section 1 */}
            <section id="general-disclaimer">
                <h2 className="text-xl font-semibold text-heading mb-4">1. General Disclaimer</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    The information provided on the Deeplink Creators website and through our services is for general informational and marketing purposes only. While we strive to keep the information accurate, current, and complete, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on our website for any purpose.
                </p>
                <p className="text-paragraph leading-relaxed">
                    Any reliance you place on such information is strictly at your own risk. To the fullest extent permitted by applicable law, Deeplink Creators and Mayalok Venture (Private Limited) disclaim all liability arising from or in connection with your use of our website or reliance on any information provided therein.
                </p>
            </section>

            {/* Section 2 */}
            <section id="earnings-disclaimer">
                <h2 className="text-xl font-semibold text-heading mb-4">2. Earnings &amp; Results Disclaimer</h2>
                <div className="rounded-lg border border-gold/30 bg-gold/5 p-5 mb-4">
                    <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">Critical Disclaimer — Please Read Carefully</p>
                </div>
                <p className="text-paragraph leading-relaxed mb-4">
                    <strong className="text-heading">Case studies, performance metrics, revenue figures, lead counts, ROI percentages, and any other results shown on our website are for reference and illustrative purposes only.</strong> They represent outcomes achieved for specific clients under specific circumstances and should not be interpreted as a guarantee or promise that you will achieve the same or similar results.
                </p>
                <p className="text-paragraph leading-relaxed mb-3">
                    Actual results vary significantly based on numerous factors, including but not limited to:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Industry &amp; Market Conditions:</strong> Different industries have vastly different competitive landscapes, customer behaviour, and market dynamics.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Budget Allocation:</strong> The level of investment in advertising, content creation, and marketing infrastructure directly impacts outcomes.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Execution &amp; Implementation:</strong> The quality and speed of implementation by both our team and the client&rsquo;s team affect timelines and results.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Product/Service Quality:</strong> The inherent quality, pricing, and market fit of the client&rsquo;s product or service plays a crucial role in campaign performance.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Geographic &amp; Demographic Factors:</strong> Target audience, location, language, and cultural factors influence campaign effectiveness.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Timing &amp; Seasonality:</strong> Market trends, seasonal demand, and economic conditions affect performance.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Third-Party Algorithm Changes:</strong> Google, Meta, and other platforms regularly update their algorithms and policies, which can impact campaign performance positively or negatively.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Competitor Activity:</strong> Actions taken by competitors in your market can influence the effectiveness of your campaigns.</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-4">
                    Deeplink Creators does not make any earnings claims, income guarantees, or promises of specific financial outcomes. We are a service provider that employs best-practice strategies, and we commit to transparent reporting, but we cannot and do not guarantee results.
                </p>
            </section>

            {/* Section 3 */}
            <section id="third-party-platforms">
                <h2 className="text-xl font-semibold text-heading mb-4">3. Third-Party Platform Disclaimer</h2>
                <div className="rounded-lg border border-gold/30 bg-gold/5 p-5 mb-4">
                    <p className="text-gold font-semibold text-sm uppercase tracking-wider mb-2">Important Notice</p>
                </div>
                <p className="text-paragraph leading-relaxed mb-4">
                    Deeplink Creators utilizes various third-party platforms and services in the delivery of our digital marketing services, including but not limited to Google Ads, Google Analytics, Google Search Console, Meta (Facebook &amp; Instagram) Ads, LinkedIn Ads, YouTube, and other advertising and analytics platforms.
                </p>
                <p className="text-paragraph leading-relaxed mb-3">
                    <strong className="text-heading">We are NOT responsible for, and disclaim all liability arising from:</strong>
                </p>
                <ul className="space-y-3 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Account Suspensions or Bans:</strong> If Google, Meta, or any other advertising platform suspends, restricts, or permanently bans the client&rsquo;s advertising account due to policy violations (whether by the client, detected by automated systems, or due to platform policy changes), Deeplink Creators shall bear no responsibility. Clients are responsible for ensuring their products, services, landing pages, and business practices comply with the respective platform&rsquo;s advertising policies.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Algorithm Changes:</strong> Search engine ranking algorithms, social media feed algorithms, and advertising auction algorithms are proprietary to their respective platforms and are subject to change at any time without notice. We cannot predict or prevent the impact of such changes on campaign performance.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Platform Outages &amp; Technical Issues:</strong> Downtime, bugs, glitches, or technical failures on third-party platforms that affect campaign delivery, tracking, or reporting are beyond our control.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Policy Updates:</strong> Third-party platforms may update their terms of service, advertising policies, data handling practices, or technical requirements at any time. Compliance with updated policies is a shared responsibility, with the client ultimately accountable for the compliance of their business and offerings.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span><strong className="text-heading">Data Discrepancies:</strong> Data reported by different third-party platforms may vary due to differences in tracking methodologies, attribution models, and data processing. Deeplink Creators shall not be held responsible for discrepancies between platform-reported data and actual business outcomes.</span>
                    </li>
                </ul>
            </section>

            {/* Section 4 */}
            <section id="case-studies">
                <h2 className="text-xl font-semibold text-heading mb-4">4. Case Studies &amp; Testimonials</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    Any case studies, success stories, testimonials, or client results published on our website or marketing materials:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Are based on the specific experiences of individual clients and may not reflect the typical experience of all clients.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Are not intended to represent or guarantee that anyone will achieve the same or similar results.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>May have been edited for clarity, brevity, or presentation purposes while preserving the accuracy of the data and outcomes.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>May include results from specific time periods that may not be sustainable over longer durations.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Are shared with the consent of the respective clients (or anonymized where consent was not obtained).</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-4">
                    Testimonials reflect the personal opinions of the individuals quoted and do not necessarily reflect the views of Deeplink Creators or Mayalok Venture (Private Limited).
                </p>
            </section>

            {/* Section 5 */}
            <section id="professional-advice">
                <h2 className="text-xl font-semibold text-heading mb-4">5. Not Professional Advice</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    The content on our website, including blog posts, articles, guides, case studies, videos, and any other materials, is provided for general informational and educational purposes. It does not constitute:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Professional legal, financial, accounting, or tax advice</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>A substitute for consulting qualified professionals in the relevant field</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>A guarantee of outcomes if any strategies or suggestions mentioned are implemented</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-4">
                    You should always seek the advice of qualified professionals for matters relating to law, finance, taxation, or any other specialized area before making business decisions.
                </p>
            </section>

            {/* Section 6 */}
            <section id="website-content">
                <h2 className="text-xl font-semibold text-heading mb-4">6. Website Content Accuracy</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    While we make every effort to ensure the information on our website is accurate and up to date, we do not warrant or guarantee that:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>The website content is free from errors, inaccuracies, or omissions</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>The information will remain current at all times</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>The website will be available at all times without interruption</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Any defects or errors will be corrected immediately</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-4">
                    We reserve the right to modify, update, or remove any content on our website at any time without prior notice.
                </p>
            </section>

            {/* Section 7 */}
            <section id="external-links">
                <h2 className="text-xl font-semibold text-heading mb-4">7. External Links Disclaimer</h2>
                <p className="text-paragraph leading-relaxed">
                    Our website may contain links to external websites and resources operated by third parties. These links are provided for your convenience and informational purposes only. Deeplink Creators does not endorse, approve, or take responsibility for the content, accuracy, legality, or privacy practices of any linked third-party websites. Accessing external links is at your own risk, and we encourage you to review the terms and privacy policies of any third-party website you visit.
                </p>
            </section>

            {/* Section 8 */}
            <section id="technology-disclaimer">
                <h2 className="text-xl font-semibold text-heading mb-4">8. Technology &amp; Uptime Disclaimer</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    While we strive to maintain a reliable and secure website, we do not guarantee:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Uninterrupted access to our website at all times</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>That our website is free from viruses, malware, or other harmful components</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>That server downtime will not occur due to maintenance, updates, or technical failures</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Compatibility with all browsers, devices, or operating systems</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-3">
                    We shall not be liable for any loss of data, business interruption, or damage to your computer system or device arising from your use of our website.
                </p>
            </section>

            {/* Section 9 */}
            <section id="ai-tools">
                <h2 className="text-xl font-semibold text-heading mb-4">9. AI &amp; Automation Tools Disclaimer</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    Deeplink Creators may use artificial intelligence (AI), machine learning, and automation tools in the delivery of certain services, including but not limited to content generation, data analysis, campaign optimization, and chatbot interactions.
                </p>
                <p className="text-paragraph leading-relaxed mb-3">
                    Please note:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>AI-generated content and recommendations are tools to assist our team, not replacements for human expertise and judgment.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>AI outputs may contain inaccuracies and should be reviewed and validated by qualified professionals before implementation.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>We are not responsible for any decisions made or actions taken based solely on AI-generated outputs without human review.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Chatbot interactions on our website are automated and may not address all queries accurately. For specific queries, please contact our team directly.</span>
                    </li>
                </ul>
            </section>

            {/* Section 10 */}
            <section id="client-responsibility">
                <h2 className="text-xl font-semibold text-heading mb-4">10. Client Responsibility</h2>
                <p className="text-paragraph leading-relaxed mb-3">
                    Clients engaging Deeplink Creators for digital marketing services are responsible for:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Ensuring that their products, services, and business practices comply with all applicable Indian laws and regulations, including the Consumer Protection Act, 2019, and the Advertising Standards Council of India (ASCI) guidelines.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Ensuring that all content, claims, and materials provided to us for advertising purposes are truthful, accurate, and not misleading.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Complying with the advertising policies of all third-party platforms on which campaigns are run (Google Ads policies, Meta advertising policies, etc.).</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Maintaining appropriate licences, permits, and registrations required for their business operations.</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Reviewing and approving all campaign materials, creative assets, and copy before they go live.</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-4">
                    Deeplink Creators shall not be held liable for any regulatory action, penalty, or legal proceeding arising from the client&rsquo;s non-compliance with applicable laws, regulations, or platform policies.
                </p>
            </section>

            {/* Section 11 */}
            <section id="limitation-of-liability">
                <h2 className="text-xl font-semibold text-heading mb-4">11. Limitation of Liability</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    To the maximum extent permitted by applicable law, Deeplink Creators and Mayalok Venture (Private Limited), including their directors, officers, employees, contractors, and agents, shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to:
                </p>
                <ul className="space-y-2 text-paragraph leading-relaxed">
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Your use of or inability to use our website or services</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Any errors, inaccuracies, or omissions in our website content</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Any actions taken by third-party platforms that affect your campaigns or accounts</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Loss of profits, revenue, data, business opportunities, or goodwill</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary-400 mt-1 flex-shrink-0">&#x2022;</span>
                        <span>Any unauthorized access to or alteration of your data or transmissions</span>
                    </li>
                </ul>
                <p className="text-paragraph leading-relaxed mt-4">
                    This limitation applies regardless of the theory of liability, whether based on warranty, contract, tort (including negligence), strict liability, or any other legal theory.
                </p>
            </section>

            {/* Section 12 */}
            <section id="indemnification">
                <h2 className="text-xl font-semibold text-heading mb-4">12. Indemnification</h2>
                <p className="text-paragraph leading-relaxed">
                    You agree to indemnify, defend, and hold harmless Deeplink Creators, Mayalok Venture (Private Limited), and their respective directors, officers, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising out of or related to your use of our website, your engagement of our services, your violation of this Disclaimer or any applicable law, or your infringement of any third-party rights.
                </p>
            </section>

            {/* Section 13 */}
            <section id="changes-to-disclaimer">
                <h2 className="text-xl font-semibold text-heading mb-4">13. Changes to This Disclaimer</h2>
                <p className="text-paragraph leading-relaxed">
                    Deeplink Creators reserves the right to modify, amend, or update this Disclaimer at any time without prior notice. Any changes will be effective immediately upon posting on this page with an updated &ldquo;Last Updated&rdquo; date. Your continued use of our website and services after any changes constitutes your acceptance of the revised Disclaimer. We encourage you to review this Disclaimer periodically.
                </p>
            </section>

            {/* Section 14 */}
            <section id="governing-law">
                <h2 className="text-xl font-semibold text-heading mb-4">14. Governing Law &amp; Jurisdiction</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    This Disclaimer shall be governed by and construed in accordance with the laws of India, including the Indian Contract Act, 1872, the Information Technology Act, 2000, and the Consumer Protection Act, 2019.
                </p>
                <div className="rounded-lg border border-gold/30 bg-gold/5 p-5">
                    <p className="text-heading leading-relaxed font-medium">
                        Any disputes arising out of or in connection with this Disclaimer shall be subject to the <strong className="text-gold">exclusive jurisdiction of the courts in Gautam Buddha Nagar (Greater Noida), Uttar Pradesh, India</strong>. This jurisdiction clause is non-negotiable.
                    </p>
                </div>
            </section>

            {/* Section 15 */}
            <section id="contact-information">
                <h2 className="text-xl font-semibold text-heading mb-4">15. Contact Information</h2>
                <p className="text-paragraph leading-relaxed mb-4">
                    If you have any questions, concerns, or require clarification regarding this Disclaimer, please contact us at:
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
