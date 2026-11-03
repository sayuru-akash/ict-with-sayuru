import Link from "next/link";
import { SITE } from "@/lib/site";
import { OL_TWENTY_DAY_PLAN as PLAN } from "@/lib/programmes";
import { legalPageJsonLd, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import { ContactBox, PolicyLayout, PolicySection } from "@/components/PolicyLayout";

export const metadata = pageMetadata(
  "Terms and Conditions | Sayuru Amarasinghe",
  "Terms for Sayuru Amarasinghe's online A/L and O/L ICT classes, including enrolment, the 20 Day Plan, fees, study materials, cancellations and student responsibilities.",
  "/terms-and-conditions"
);

const SECTIONS = [
  { id: "about-these-terms", title: "1. About These Terms" },
  { id: "enrolment", title: "2. Enrolment & Students Under 18" },
  { id: "programmes", title: "3. Classes & the O/L 20 Day Plan" },
  { id: "fees-and-payments", title: "4. Fees & Payment Confirmation" },
  { id: "online-access", title: "5. Timetables & Online Access" },
  { id: "study-materials", title: "6. Study Materials & Recordings" },
  { id: "student-conduct", title: "7. Student Conduct & Safety" },
  { id: "changes-and-refunds", title: "8. Class Changes, Cancellations & Refunds" },
  { id: "learning-outcomes", title: "9. Learning Outcomes" },
  { id: "privacy-and-platforms", title: "10. Privacy & Third-Party Platforms" },
  { id: "service-and-rights", title: "11. Service Responsibility & Your Rights" },
  { id: "updates-and-complaints", title: "12. Updates, Governing Law & Complaints" },
  { id: "contact-us", title: "13. Contact Us" },
];

const linkClass = "font-medium text-blue-600 underline underline-offset-2";

export default function TermsAndConditionsPage() {
  return (
    <PolicyLayout
      title="Terms and Conditions"
      description="Please read these terms before enrolling in our online ICT classes or purchasing a programme."
      lastUpdated="3 November 2026"
      sections={SECTIONS}
    >
      <StructuredData data={legalPageJsonLd("Terms and Conditions", "/terms-and-conditions")} />
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <p className="font-semibold text-slate-900">Clear expectations, better learning.</p>
        <p className="mt-2 text-sm leading-relaxed">
          These terms explain how registration, class access and study materials work.
          Read them together with our <Link href="/privacy-policy" className={linkClass}>Privacy Policy</Link>{" "}
          and <Link href="/refund-policy" className={linkClass}>Refund Policy</Link>.
          If something is unclear, contact us before making a payment.
        </p>
      </div>

      <PolicySection id="about-these-terms" title="1. About These Terms">
        <p>
          These terms apply to {SITE.url}, related class enquiries, and online ICT tuition
          provided by {SITE.name} (&quot;we&quot;, &quot;us&quot; or &quot;our&quot;).
          Our programmes support G.C.E. Advanced Level and Ordinary Level students in Sri Lanka.
        </p>
        <p>
          When you confirm enrolment in a class or paid programme, you agree to the terms
          made available to you at that time. A WhatsApp message or email enquiry starts a
          conversation; enrolment is confirmed separately by us. Keep your registration
          confirmation, agreed programme details and payment evidence for reference.
        </p>
      </PolicySection>

      <PolicySection id="enrolment" title="2. Enrolment & Students Under 18">
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide accurate student and contact details, and let us know if they change.</li>
          <li>If you are under 18, involve a parent or guardian in reviewing these terms, confirming enrolment and arranging payment.</li>
          <li>A place in a programme depends on our confirmation of the class, availability and any applicable payment.</li>
          <li>Use only the contact and payment instructions confirmed by us through the contact details published on this site.</li>
        </ul>
      </PolicySection>

      <PolicySection id="programmes" title="3. Classes & the O/L 20 Day Plan">
        <p>
          Regular 2027 A/L, 2028 A/L and O/L ICT classes are available for enquiry.
          Ask us to confirm the relevant timetable, fees, lesson format and included materials
          before enrolling.
        </p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="font-semibold text-slate-900">{PLAN.name}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
            <li>A {PLAN.durationDays}-day programme for O/L ICT students at different learning levels.</li>
            <li>{PLAN.shortNotes} short notes, special theory sessions, and discussion of the past {PLAN.pastPaperYears} years of papers and exam-target questions.</li>
            <li>The advertised full programme fee is Rs. {PLAN.fee.toLocaleString("en-LK")} (Sri Lankan rupees).</li>
            <li>Confirm the starting date, session timetable, access period and how materials will be supplied with us before paying.</li>
          </ul>
        </div>
        <p>
          The programme details confirmed at enrolment describe what your purchase includes.
          Recording access, additional programmes or other services are included only where
          expressly offered as part of that enrolment.
        </p>
      </PolicySection>

      <PolicySection id="fees-and-payments" title="4. Fees & Payment Confirmation">
        <p>
          Fees are stated in Sri Lankan rupees unless we clearly say otherwise. Confirm the
          total price and payment instructions with us before paying. Registration and payment
          arrangements are handled through our confirmed contact channels.
        </p>
        <p>
          Keep your receipt or transaction reference and provide genuine payment evidence when
          requested. We confirm payment and class access separately; sending a slip alone is
          not payment verification. Never send us your card security code, online-banking
          password or one-time authentication codes.
        </p>
        <p>
          Any price changes apply to future enrolments. We will not add undisclosed charges
          to an already confirmed programme. Duplicate payments, access problems and refund
          requests are handled under the <Link href="/refund-policy" className={linkClass}>Refund Policy</Link>{" "}
          and applicable consumer rights.
        </p>
      </PolicySection>

      <PolicySection id="online-access" title="5. Timetables & Online Access">
        <p>
          We share the confirmed timetable, joining instructions and relevant class updates
          through the contact channel agreed with you. Please check those messages and contact
          us promptly if you have not received access or cannot join.
        </p>
        <p>
          You need a suitable device, an internet connection and any class platform specified
          before enrolment. Your device and internet costs are your responsibility. Access is
          for the enrolled student and the confirmed programme period; protect any personal
          access links or account details supplied to you.
        </p>
        <p>
          If you miss a session, ask us about available support or any recording included in
          your programme. A missed session does not automatically create a right to an extra
          private class or an extension, subject to the agreed programme and your legal rights.
        </p>
      </PolicySection>

      <PolicySection id="study-materials" title="6. Study Materials & Recordings">
        <p>
          Our original lessons, notes, illustrations and teaching materials remain the
          intellectual property of {SITE.name} or their respective rights holders. You may
          use materials supplied to you for your own studies within the permissions given.
        </p>
        <p>
          Do not resell, publicly upload or redistribute paid materials, recordings, class
          links or another student&apos;s access. Recording a session or sharing a
          participant&apos;s image, voice or personal details requires appropriate permission.
          These restrictions do not remove uses permitted by applicable law.
        </p>
      </PolicySection>

      <PolicySection id="student-conduct" title="7. Student Conduct & Safety">
        <ul className="list-disc space-y-2 pl-5">
          <li>Treat teachers and other students respectfully in classes and messages.</li>
          <li>Do not harass, bully, discriminate, impersonate others or share inappropriate material.</li>
          <li>Do not submit false payment evidence, disrupt sessions, misuse access links or attempt unauthorised access to systems.</li>
          <li>Respect other students&apos; privacy and keep discussions appropriate for a learning environment.</li>
        </ul>
        <p>
          We may restrict access to address a serious or repeated breach, or an immediate
          safety concern. Where appropriate, we will explain the reason and give you an
          opportunity to respond. Any decision about paid, undelivered services remains
          subject to the Refund Policy and your applicable legal rights.
        </p>
      </PolicySection>

      <PolicySection id="changes-and-refunds" title="8. Class Changes, Cancellations & Refunds">
        <p>
          If a session needs to change because of illness, a technical problem or another
          disruption, we will communicate the change and any replacement arrangements as
          soon as reasonably possible. Contact us if a material change prevents you from
          taking part or if a paid service has not been delivered.
        </p>
        <p>
          Our <Link href="/refund-policy" className={linkClass}>Refund Policy</Link>{" "}
          explains eligibility, cancellation windows, how to request a refund and processing
          expectations. It applies to paid classes and the 20 Day Plan. These terms do not
          create a different cancellation deadline or reduce rights available under
          applicable consumer law.
        </p>
      </PolicySection>

      <PolicySection id="learning-outcomes" title="9. Learning Outcomes">
        <p>
          Our classes are designed to support understanding, practice and exam preparation.
          Progress depends on factors including attendance, prior knowledge, practice and
          individual effort. We do not guarantee a particular grade, examination result or
          improvement within a fixed period.
        </p>
        <p>
          Names such as &quot;F to A&quot; describe a learning goal, not a promise of an
          individual result. Student experiences and reviews are individual experiences
          and should not be read as a guarantee of your outcome.
        </p>
      </PolicySection>

      <PolicySection id="privacy-and-platforms" title="10. Privacy & Third-Party Platforms">
        <p>
          Our <Link href="/privacy-policy" className={linkClass}>Privacy Policy</Link>{" "}
          explains how personal information is handled. Share only information needed for
          enquiries, enrolment, class administration or resolving a payment issue. Parents
          and guardians can contact us about a student&apos;s information or safety concerns.
        </p>
        <p>
          If you use WhatsApp, Facebook or another platform to communicate with us or attend
          a class, that provider&apos;s own terms and privacy practices also apply. Confirm
          which platform a programme uses before enrolling.
        </p>
      </PolicySection>

      <PolicySection id="service-and-rights" title="11. Service Responsibility & Your Rights">
        <p>
          We aim to provide the teaching and materials agreed with you with reasonable care
          and skill. If a service is interrupted or something is wrong, tell us so that we
          can investigate and work towards an appropriate solution. Temporary outages or
          third-party platform problems may affect access.
        </p>
        <p>
          Nothing in these terms excludes liability that cannot lawfully be excluded,
          excuses fraud or misrepresentation, or removes mandatory consumer rights.
          The Refund Policy and any service restrictions must be read subject to those rights.
        </p>
      </PolicySection>

      <PolicySection id="updates-and-complaints" title="12. Updates, Governing Law & Complaints">
        <p>
          These terms are governed by the applicable laws of Sri Lanka. If you have a
          concern, contact us with your name, programme and a description of the issue so
          that we can try to resolve it. You may also seek assistance from the{" "}
          <a href="https://www.caa.gov.lk/" target="_blank" rel="noopener noreferrer" className={linkClass}>Consumer Affairs Authority</a>{" "}
          or pursue another remedy available under applicable law.
        </p>
        <p>
          We may update these terms and display the revision date here. Material changes
          affecting an existing enrolment will be communicated where relevant. Updates do
          not retrospectively remove the services, price or rights already confirmed to you.
          If a provision cannot be enforced, the remaining terms continue to apply to the
          extent permitted by law.
        </p>
      </PolicySection>

      <PolicySection id="contact-us" title="13. Contact Us">
        <p>For enrolment questions, complaints or clarification of these terms, contact {SITE.name}.</p>
        <ContactBox />
        <p className="text-sm">
          For class enquiries, you can also{" "}
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={linkClass}>contact us on WhatsApp</a>.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
