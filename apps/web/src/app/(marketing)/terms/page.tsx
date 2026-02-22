export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#FF9A56]">
        Legal
      </div>
      <h1 className="mb-2 text-[clamp(36px,4.5vw,56px)] font-light leading-[1.1] tracking-[-0.03em] text-white/[0.92]">
        Terms of Service
      </h1>
      <p className="mb-12 text-sm font-light text-white/25">
        Last updated: February 2026
      </p>

      <div className="space-y-10">
        <LegalSection title="1. Acceptance of Terms">
          <p>
            By accessing or using Oomphh, you agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use
            our service.
          </p>
        </LegalSection>

        <LegalSection title="2. Description of Service">
          <p>
            Oomphh is a personality-first dating platform that connects you
            with compatible people nearby. Our matching system analyzes your
            personality profile, interests, and preferences to help you find
            meaningful connections in real life.
          </p>
        </LegalSection>

        <LegalSection title="3. Eligibility">
          <p>
            You must be at least 18 years old to use Oomphh. By creating an
            account, you represent and warrant that you are at least 18 years
            of age and have the legal capacity to enter into these Terms.
          </p>
        </LegalSection>

        <LegalSection title="4. User Accounts">
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials and for all activities that occur under your
            account. You agree to provide accurate, current, and complete
            information and to notify us immediately of any unauthorized use.
          </p>
        </LegalSection>

        <LegalSection title="5. User Conduct">
          <p>
            You agree not to use Oomphh to harass, abuse, or harm others;
            impersonate any person or entity; post misleading or fraudulent
            content; solicit money or engage in commercial activity; or violate
            any applicable laws. We reserve the right to remove content and
            suspend accounts that violate these standards.
          </p>
        </LegalSection>

        <LegalSection title="6. User Content">
          <p>
            You retain ownership of all content you post on Oomphh, including
            photos and profile information. By posting content, you grant us a
            non-exclusive license to use, display, and distribute that content
            within the service. See our Privacy Policy for details on how we
            handle your data.
          </p>
        </LegalSection>

        <LegalSection title="7. Safety & Community">
          <p>
            Oomphh is designed to facilitate real-life meetings. Always
            exercise caution when meeting someone in person for the first
            time. Meet in public places and let someone you trust know your
            plans. Oomphh is not responsible for the conduct of any user on or
            off the platform.
          </p>
        </LegalSection>

        <LegalSection title="8. Limitation of Liability">
          <p>
            Oomphh is provided &quot;as is&quot; without warranties of any
            kind. We are not liable for any damages or losses resulting from
            your use of the service, interactions with other users, or any
            meetings arranged through the platform.
          </p>
        </LegalSection>

        <LegalSection title="9. Modifications to Service">
          <p>
            We reserve the right to modify or discontinue our service at any
            time. We will provide reasonable notice of any significant changes.
          </p>
        </LegalSection>

        <LegalSection title="10. Termination">
          <p>
            You may delete your account at any time through the app settings.
            We reserve the right to suspend or terminate accounts that violate
            these terms or our community guidelines.
          </p>
        </LegalSection>

        <LegalSection title="11. Contact Us">
          <p>
            For questions about these Terms of Service, contact us at:{" "}
            <a
              href="mailto:legal@oomphh.com"
              className="text-[#FF9A56] transition-opacity hover:opacity-80"
            >
              legal@oomphh.com
            </a>
          </p>
        </LegalSection>
      </div>
    </div>
  );
}

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-white/[0.08] pb-10 last:border-b-0 [&_p]:text-[15px] [&_p]:font-light [&_p]:leading-[1.6] [&_p]:text-white/45">
      <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-white/[0.92]">
        {title}
      </h2>
      {children}
    </section>
  );
}
