export function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-white/40 text-sm">Last updated: June 19, 2026</p>
      </div>

      <div className="space-y-6 text-white/70 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using RedVote (the "Service"), operated by CivilVote Technologies, Inc., you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Eligibility</h2>
          <p>You must be at least 18 years of age to create an account or make contributions through the Service. By using the Service, you represent and warrant that you meet this age requirement and have the legal capacity to enter into these Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Account Registration</h2>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Acceptable Use</h2>
          <p className="mb-2">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
            <li>Attempt to interfere with, compromise, or disrupt the Service or its servers</li>
            <li>Harvest, collect, or scrape user data without authorization</li>
            <li>Post or transmit harmful, threatening, abusive, or defamatory content</li>
            <li>Use automated systems (bots, scrapers) to access the Service without written permission</li>
            <li>Violate Federal Election Commission (FEC) regulations through use of the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are owned by CivilVote Technologies, Inc. and are protected by copyright, trademark, and other intellectual property laws. The RedVote name, logo, and all related marks are trademarks of CivilVote Technologies, Inc..</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Political Contributions</h2>
          <p className="mb-2">If the Service facilitates political contributions, the following apply:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>All contributions are subject to Federal Election Commission regulations</li>
            <li>Contributors must be U.S. citizens or lawful permanent residents</li>
            <li>Corporate and foreign national contributions are prohibited under federal law</li>
            <li>Individual contribution limits apply per candidate per election cycle ($3,300 per candidate per election as of 2026)</li>
            <li>Contributions over $200 require disclosure of name, address, occupation, and employer</li>
            <li>Contributions are processed through FEC-compliant third-party platforms (ActBlue/WinRed)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Disclaimers</h2>
          <p className="mb-2">RedVote is a civic engagement and voter information platform. The Service is provided "as is" and "as available" without warranties of any kind, either express or implied.</p>
          <p>We do not guarantee the accuracy, completeness, or timeliness of election data, candidate information, or polling data displayed on the platform. Users should verify information through official government sources.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, CivilVote Technologies, Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Service, including but not limited to loss of data, revenue, or anticipated savings.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Indemnification</h2>
          <p>You agree to indemnify and hold harmless CivilVote Technologies, Inc., its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from your use of the Service or violation of these Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
          <p>These Terms are governed by the laws of the State of North Carolina, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the state or federal courts located in Mecklenburg County, North Carolina.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">11. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Material changes will be posted on this page with an updated effective date. Continued use of the Service after changes constitutes acceptance of the revised Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">12. Contact</h2>
          <p>CivilVote Technologies, Inc.<br />Email: legal@civilvotetechnologies.com</p>
        </section>
      </div>
    </div>
  );
}
