export function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-white/40 text-sm">Last updated: June 19, 2026</p>
      </div>

      <div className="space-y-6 text-white/70 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
          <p>SwingVote is operated by CivilVote Technologies, Inc. ("SwingVote," "we," "us," or "our"). This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you use our platform, website, and mobile application (collectively, the "Service").</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
          <p className="mb-2"><span className="text-purple-400 font-medium">Information you provide:</span> Name, email address, mailing address, phone number, date of birth, voter registration status, political preferences (optional), and any other information you voluntarily submit.</p>
          <p className="mb-2"><span className="text-purple-400 font-medium">Account information:</span> Login credentials, profile settings, and communication preferences.</p>
          <p className="mb-2"><span className="text-purple-400 font-medium">Transaction data:</span> If you make purchases or donations through the Service, we collect billing information, transaction history, and payment details (processed through secure third-party payment processors).</p>
          <p><span className="text-purple-400 font-medium">Automatically collected:</span> IP address, browser type, device information, operating system, referring URLs, pages visited, time spent on pages, and cookies/similar technologies.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide, maintain, and improve the Service</li>
            <li>To personalize your experience and display relevant civic information</li>
            <li>To process transactions and send related information</li>
            <li>To send you updates about elections, candidates, and civic events</li>
            <li>To respond to your comments, questions, and customer service requests</li>
            <li>To monitor and analyze usage trends and preferences</li>
            <li>To detect, prevent, and address technical issues and security threats</li>
            <li>To comply with legal obligations, including FEC reporting requirements where applicable</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Information Sharing</h2>
          <p className="mb-2">We do not sell your personal information. We may share information with:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><span className="text-purple-400 font-medium">Service providers</span> who assist in operating the platform (hosting, analytics, payment processing)</li>
            <li><span className="text-purple-400 font-medium">Legal authorities</span> when required by law, subpoena, or government request</li>
            <li><span className="text-purple-400 font-medium">Business transfers</span> in connection with a merger, acquisition, or sale of assets</li>
            <li><span className="text-purple-400 font-medium">With your consent</span> when you explicitly authorize sharing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Data Security</h2>
          <p>We implement industry-standard security measures including encryption in transit (TLS/SSL), encryption at rest, access controls, and regular security assessments. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Data Retention</h2>
          <p>We retain your personal information for as long as your account is active or as needed to provide the Service. We will retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
          <p className="mb-2">Depending on your jurisdiction, you may have the following rights:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><span className="text-purple-400 font-medium">Access:</span> Request a copy of the personal data we hold about you</li>
            <li><span className="text-purple-400 font-medium">Correction:</span> Request that we correct inaccurate or incomplete data</li>
            <li><span className="text-purple-400 font-medium">Deletion:</span> Request that we delete your personal data</li>
            <li><span className="text-purple-400 font-medium">Opt-out:</span> Opt out of marketing communications at any time</li>
            <li><span className="text-purple-400 font-medium">Portability:</span> Request your data in a portable format</li>
          </ul>
          <p className="mt-2">California residents: Under the CCPA, you have the right to know what personal information is collected, request deletion, and opt out of the sale of personal information. We do not sell personal information.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Cookies and Tracking</h2>
          <p>We use cookies and similar technologies to enhance your experience, analyze usage, and personalize content. You can control cookies through your browser settings. Disabling cookies may limit some features of the Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Children's Privacy</h2>
          <p>The Service is not directed to individuals under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will take steps to delete it promptly.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">11. Contact Us</h2>
          <p>If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:</p>
          <p className="mt-2">CivilVote Technologies, Inc.<br />Email: privacy@civilvotetechnologies.com</p>
        </section>
      </div>
    </div>
  );
}
