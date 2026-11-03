import Link from "next/link";
import { SITE } from "@/lib/site";
import { pageMetadata, legalPageJsonLd } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import {
  ContactBox,
  PolicyLayout,
  PolicySection,
} from "@/components/PolicyLayout";

export const metadata = pageMetadata('Refund Policy | Sayuru Amarasinghe', "Refund eligibility, requests and contact information for Sayuru Amarasinghe's online A/L and O/L ICT tuition classes in Sri Lanka.", '/refund-policy');

const LAST_UPDATED = "3 November 2026";

const SECTIONS = [
  { id: "eligible", title: "1. You CAN get a refund if" },
  { id: "not-eligible", title: "2. Refunds are NOT available if" },
  { id: "how-to-request", title: "3. How to Request" },
  { id: "contact-us", title: "4. Contact Us" },
];

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      title="Refund Policy"
      description="Since our content is digital, refunds are limited - but we're always fair."
      lastUpdated={LAST_UPDATED}
      sections={SECTIONS}
    >
      <StructuredData data={legalPageJsonLd('Refund Policy', '/refund-policy')} />
      <p>
        We want every student to be happy with our classes. Since our content is
        digital, refunds are limited - but we&apos;re always fair.
      </p>

      <PolicySection id="eligible" title="1. You CAN get a refund if">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            You were{" "}
            <span className="font-semibold text-slate-800">charged twice</span>{" "}
            for the same class due to a technical error;
          </li>
          <li>
            You{" "}
            <span className="font-semibold text-slate-800">
              paid but never received access
            </span>{" "}
            due to a fault on our side;
          </li>
          <li>
            You{" "}
            <span className="font-semibold text-slate-800">
              cancel in writing within 3 days
            </span>{" "}
            of payment and haven&apos;t accessed any paid content yet.
          </li>
        </ul>
      </PolicySection>

      <PolicySection id="not-eligible" title="2. Refunds are NOT available if">
        <p>
          The restrictions below apply to change-of-mind cancellation requests.
          Duplicate charges, failure to provide paid access due to a fault on our
          side, and any rights under applicable consumer law are assessed separately.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            You&apos;ve already viewed, downloaded, or attended any paid content
            or class;
          </li>
          <li>You joined a paid Telegram channel;</li>
          <li>
            You simply changed your mind after 3 days, or missed sessions you
            had access to;
          </li>
          <li>
            More than{" "}
            <span className="font-semibold text-slate-800">3 days</span> have
            passed since payment;
          </li>
          <li>The uploaded bank slip is invalid or altered.</li>
        </ul>
      </PolicySection>

      <PolicySection id="how-to-request" title="3. How to Request">
        <p>
          Email{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="font-medium text-blue-600 underline underline-offset-2"
          >
            {SITE.email}
          </a>{" "}
          with your name, registered email/phone, payment date, and your OnePay
          reference or bank slip. We&apos;ll kindly review and respond within{" "}
          <span className="font-semibold text-slate-800">3 working days</span>.
          Approved refunds go back via your original payment method and may take
          up to 14 working days depending on OnePay or your bank. This settlement
          timeframe is separate from the 3-day cancellation request window.
        </p>
      </PolicySection>

      <p className="text-sm">
        For general enrolment and class-access conditions, see our{" "}
        <Link href="/terms-and-conditions" className="font-medium text-blue-600 underline underline-offset-2">Terms and Conditions</Link>.
      </p>
      <PolicySection id="contact-us" title="4. Contact Us">
        <ContactBox />
      </PolicySection>
    </PolicyLayout>
  );
}
