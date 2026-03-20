export default function ChildSafetyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#E63B2E]">
        Legal
      </div>
      <h1 className="mb-2 text-[clamp(36px,4.5vw,56px)] font-light leading-[1.1] tracking-[-0.03em] text-white/[0.92]">
        Child Safety Standards
      </h1>
      <p className="mb-12 text-sm font-light text-white/25">
        Last updated: March 2026
      </p>

      <div className="space-y-10">
        <LegalSection title="Our Commitment">
          <p>
            Oomphh is committed to maintaining a safe platform free from child
            sexual abuse and exploitation (CSAE). We have zero tolerance for any
            content or behavior that exploits or endangers minors. We actively
            work to prevent, detect, and respond to any such activity on our
            platform.
          </p>
        </LegalSection>

        <LegalSection title="Age Requirement">
          <p>
            Oomphh is strictly for users aged 18 and older. We enforce this
            through age verification during the registration process. Accounts
            found to belong to users under 18 are immediately suspended and
            removed from the platform.
          </p>
        </LegalSection>

        <LegalSection title="Prevention Measures">
          <p>
            We employ the following measures to prevent CSAE on our platform:
          </p>
          <ul>
            <li>
              Age verification at registration to ensure all users are 18 or
              older
            </li>
            <li>
              Proactive moderation of user-generated content including profile
              photos, albums, and stories
            </li>
            <li>
              Automated detection systems to identify and block prohibited
              content
            </li>
            <li>
              In-app reporting tools that allow users to flag suspicious accounts
              or content directly from user profiles and chat screens
            </li>
            <li>
              Regular review of flagged content by our moderation team
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Detection & Reporting">
          <p>
            When child sexual abuse material (CSAM) is identified on our
            platform, we take immediate action:
          </p>
          <ul>
            <li>
              The content is immediately removed and the account is permanently
              banned
            </li>
            <li>
              We report all identified CSAM to the National Center for Missing &
              Exploited Children (NCMEC) via CyberTipline
            </li>
            <li>
              We cooperate fully with law enforcement investigations
            </li>
            <li>
              We preserve relevant evidence as required by applicable law
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="User Reporting">
          <p>
            Users can report suspected CSAE or any content involving minors
            through the following channels:
          </p>
          <ul>
            <li>
              In-app report button available on all user profiles and chat
              screens, with dedicated &quot;Child Safety Concern&quot; category
            </li>
            <li>
              In-app block feature to immediately prevent further contact from a
              reported user
            </li>
            <li>
              Email:{" "}
              <a
                href="mailto:info@oomphh.cz"
                className="text-[#E63B2E] transition-opacity hover:opacity-80"
              >
                info@oomphh.cz
              </a>
            </li>
          </ul>
          <p className="mt-3">
            All reports related to child safety are treated with the highest
            priority and reviewed promptly.
          </p>
        </LegalSection>

        <LegalSection title="Enforcement">
          <p>
            Violations of our child safety standards result in immediate and
            permanent account termination. We do not provide warnings or second
            chances for CSAE-related violations. Offending accounts are banned
            and reported to the appropriate authorities.
          </p>
        </LegalSection>

        <LegalSection title="Staff Training">
          <p>
            Our team members who handle content moderation and user reports are
            trained to recognize and appropriately respond to CSAE. We maintain
            up-to-date procedures aligned with industry best practices and legal
            requirements.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            For questions about our child safety standards or to report a
            concern, contact our designated point of contact at:{" "}
            <a
              href="mailto:info@oomphh.cz"
              className="text-[#E63B2E] transition-opacity hover:opacity-80"
            >
              info@oomphh.cz
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
    <section className="border-b border-white/[0.08] pb-10 last:border-b-0 [&_li]:py-1 [&_li]:text-[15px] [&_li]:font-light [&_li]:leading-[1.6] [&_li]:text-white/45 [&_p]:text-[15px] [&_p]:font-light [&_p]:leading-[1.6] [&_p]:text-white/45 [&_ul]:mt-3 [&_ul]:list-inside [&_ul]:list-disc [&_ul]:space-y-1">
      <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-white/[0.92]">
        {title}
      </h2>
      {children}
    </section>
  );
}
