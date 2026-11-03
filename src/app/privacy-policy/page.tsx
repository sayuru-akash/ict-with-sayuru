import Link from "next/link";
import { SITE } from "@/lib/site";
import { pageMetadata, legalPageJsonLd } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import {
  ContactBox,
  PolicyLayout,
  PolicySection,
} from "@/components/PolicyLayout";

export const metadata = pageMetadata('Privacy Policy & Terms | Sayuru Amarasinghe', "Privacy policy and terms for Sayuru Amarasinghe's online A/L and O/L ICT classes in Sri Lanka. Read about data use, student information and contact details.", '/privacy-policy');

const LAST_UPDATED = "November 2026";

const SECTIONS = [
  { id: "what-we-collect", title: "1. What We Collect" },
  { id: "how-we-use-it", title: "2. How We Use It" },
  { id: "who-we-share-it-with", title: "3. Who We Share It With" },
  { id: "security-and-cookies", title: "4. Security & Cookies" },
  { id: "students-under-18", title: "5. Students Under 18" },
  { id: "your-rights", title: "6. Your Rights" },
  { id: "usage-policy", title: "7. Usage Policy" },
  {
    id: "prohibited-actions",
    title: "8. Prohibited Actions & User Responsibilities",
  },
  { id: "legal-compliance", title: "9. Legal Compliance" },
  { id: "contact-us", title: "10. Contact Us" },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy & Terms of Use"
      description="This page explains how we handle your information and the terms that govern your use of our website, student dashboard, and Telegram channels."
      lastUpdated={LAST_UPDATED}
      sections={SECTIONS}
    >
      <StructuredData data={legalPageJsonLd('Privacy Policy & Terms', '/privacy-policy')} />
      <p className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm">
        For current class registration, programme access and study-material rules, read our{" "}
        <Link href="/terms-and-conditions" className="font-medium text-blue-600 underline underline-offset-2">Terms and Conditions</Link>.
      </p>
      <p>
        <span className="font-semibold text-slate-800">
          Sayuru Amarasinghe
        </span>{" "}
        offers online ICT tuition for G.C.E. Advanced Level and Ordinary Level students in Sri
        Lanka through our website, student dashboard, and Telegram channels. We
        respect your privacy, and this policy explains how we handle your
        information.
      </p>

      <PolicySection id="what-we-collect" title="1. What We Collect">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-semibold text-slate-800">
              Account details
            </span>{" "}
            - your name, email, and profile info when you sign in with Google.
          </li>
          <li>
            <span className="font-semibold text-slate-800">
              Contact details
            </span>{" "}
            - phone number or WhatsApp/Telegram username you share when
            enrolling or contacting us.
          </li>
          <li>
            <span className="font-semibold text-slate-800">
              Payment details
            </span>{" "}
            - if you pay online, OnePay handles everything securely; we never
            see or store your card or bank credentials. If you pay by bank
            transfer, we store the deposit slip you upload only to verify your
            payment.
          </li>
          <li>
            <span className="font-semibold text-slate-800">Usage data</span> -
            pages visited, videos watched, and quiz results, used to improve our
            teaching and the site.
          </li>
        </ul>
      </PolicySection>

      <PolicySection id="how-we-use-it" title="2. How We Use It">
        <p>
          To manage your account, deliver lessons and results, confirm payments,
          send class updates, and improve our services.{" "}
          <span className="font-semibold text-slate-800">
            We never sell your personal information.
          </span>
        </p>
      </PolicySection>

      <PolicySection id="who-we-share-it-with" title="3. Who We Share It With">
        <p>
          Only where necessary: OnePay (to process payments), Google (for
          sign-in), Telegram (if you join our channels), trusted service
          providers such as hosting, and authorities if required by Sri Lankan
          law. Uploaded bank slips are seen only by our admin team.
        </p>
      </PolicySection>

      <PolicySection id="security-and-cookies" title="4. Security & Cookies">
        <p>
          We protect your data with HTTPS encryption and access controls, though
          no online system can be guaranteed 100% secure. We use cookies to keep
          you signed in and improve the site - you can manage these in your
          browser settings.
        </p>
      </PolicySection>

      <PolicySection id="students-under-18" title="5. Students Under 18">
        <p>
          Many of our students are under 18. We kindly encourage parents or
          guardians to review this policy and stay aware of their child&apos;s
          use of the site.
        </p>
      </PolicySection>

      <PolicySection id="your-rights" title="6. Your Rights">
        <p>
          You may request access to, correction of, or deletion of your data
          anytime by emailing{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-blue-600 underline underline-offset-2"
          >
            {SITE.email}
          </a>
          . We&apos;ll respond as soon as we can, keeping only what we must
          (such as payment records) for legal reasons.
        </p>
      </PolicySection>

      <PolicySection id="usage-policy" title="7. Usage Policy">
        <p>
          By using Sayuru Amarasinghe, creating an account, joining our
          Telegram channels, or paying for a class, you agree to these terms. We
          provide online ICT tuition for the A/L and O/L exams - theory lessons, revision
          programmes, paper classes with marking and ranking, and special
          sessions - through our dashboard and Telegram channels. Sign-in is via
          your Google account; please keep it secure, as you&apos;re responsible
          for activity under it. Fees are as shown on the site at time of
          purchase, payable via OnePay or bank transfer with a slip uploaded to
          the dashboard. Access is granted instantly after OnePay confirms, or
          within about 24 hours after we verify your slip. Uploading a false or
          altered slip is a serious breach of these terms.
        </p>
      </PolicySection>

      <PolicySection
        id="prohibited-actions"
        title="8. Prohibited Actions & User Responsibilities"
      >
        <p>
          All lessons, notes, and materials belong to Sayuru Amarasinghe and
          are for{" "}
          <span className="font-semibold text-slate-800">
            your personal use only
          </span>
          . Recording, downloading, sharing, or reselling content, Telegram
          links, or dashboard access is strictly prohibited and may result in
          loss of access without refund. We also ask all students to be
          respectful in classes and channels. We do our best to keep everything
          running smoothly, but we can&apos;t guarantee uninterrupted access or
          specific exam results. Content is provided &quot;as is&quot;, and to
          the extent permitted by law, we&apos;re not liable for indirect
          damages.
        </p>
      </PolicySection>

      <PolicySection id="legal-compliance" title="9. Legal Compliance">
        <p>
          This policy and these terms are governed by the laws of Sri Lanka,
          including the{" "}
          <span className="font-semibold text-slate-800">
            Personal Data Protection Act, No. 9 of 2019
          </span>
          , and any disputes fall under Sri Lankan courts. We may update this
          policy from time to time; continued use means acceptance.
        </p>
      </PolicySection>

      <PolicySection id="contact-us" title="10. Contact Us">
        <ContactBox />
      </PolicySection>
    </PolicyLayout>
  );
}
