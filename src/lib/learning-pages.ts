import { SITE } from "@/lib/site";
import { OL_TWENTY_DAY_PLAN as PLAN } from "@/lib/programmes";

export type LearningPage = {
  path: string;
  label: string;
  title: string;
  description: string;
  heading: string;
  sinhala: string;
  intro: string;
  facts: { label: string; value: string }[];
  sections: { title: string; paragraphs: string[] }[];
  questions: { question: string; answer: string }[];
  enquiry: string;
  cta: string;
  level?: string;
  isPlan?: boolean;
  isProfile?: boolean;
};

const enquiry = (text: string) =>
  `${SITE.whatsapp}?text=${encodeURIComponent(`${SITE.messageGreeting} ${text}`)}`;

export const LEARNING_PAGES: LearningPage[] = [
  {
    path: "/al-ict",
    label: "A/L ICT classes",
    title: "A/L ICT Classes Online in Sri Lanka | Sayuru Amarasinghe",
    description:
      "Explore 2027 and 2028 A/L ICT online classes with Sayuru Amarasinghe in Sri Lanka. Theory, revision and past-paper practice. Contact us for the timetable.",
    heading: "Online A/L ICT Classes in Sri Lanka",
    sinhala:
      "2027 සහ 2028 උසස් පෙළ ICT පන්ති, සයුරු අමරසිංහ සමඟ මුළු දිවයිනටම online.",
    intro:
      "Prepare for G.C.E. Advanced Level Information and Communication Technology with Sayuru Amarasinghe. Online A/L ICT classes bring theory, revision and past-paper practice together for students joining from across Sri Lanka.",
    facts: [
      { label: "Exam years", value: "2027 & 2028" },
      { label: "Format", value: "Online" },
      { label: "Focus", value: "Theory, revision & papers" },
    ],
    level: "G.C.E. Advanced Level",
    sections: [
      {
        title: "Choose your A/L exam-year class",
        paragraphs: [
          "The current A/L class enquiries are for the 2027 and 2028 examinations. Tell us your exam year and whether you are starting theory or looking for revision support, so we can discuss the appropriate class with you.",
          "Contact us for the current timetable, joining instructions and fees before registering. A timetable is not published here because the details should be confirmed for your exam-year group.",
        ],
      },
      {
        title: "Connect theory with exam practice",
        paragraphs: [
          "Theory builds the understanding needed to explain ICT concepts. Revision brings those ideas together, while past-paper practice helps you apply your learning to examination questions. These are the three learning areas represented in the A/L programme.",
          "For your own study routine, try answering a question before looking at an explanation. Keep a list of the ideas you find difficult, revisit the relevant theory and attempt the question again. Use that list when asking for class guidance.",
        ],
      },
      {
        title: "Before you join an online class",
        paragraphs: [
          "Have your exam year, current learning stage and questions ready when you contact us. Ask about the lesson schedule, the next topic, class access and any materials you will need. This makes it easier to decide whether the class fits your schoolwork and available study time.",
          "If you are preparing for Ordinary Level instead, use the O/L ICT programme page. The O/L 20 Day Plan is a separate programme with its own duration and fee.",
        ],
      },
    ],
    questions: [
      {
        question: "Are there 2027 and 2028 A/L ICT classes?",
        answer:
          "Both exam years are listed for online class enquiries. Contact us with your exam year to confirm the current timetable and enrolment details.",
      },
      {
        question: "Can I join from outside Colombo?",
        answer:
          "These are online classes for students across Sri Lanka. Contact us to confirm the joining instructions and the access requirements for your class.",
      },
      {
        question: "What is the A/L ICT class fee?",
        answer:
          "Contact us for the fee for your chosen A/L class. The Rs. 3,000 fee advertised for the O/L 20 Day Plan is specific to that programme.",
      },
    ],
    enquiry: enquiry(
      "I would like the 2027 or 2028 A/L ICT online class details, fees and timetable.",
    ),
    cta: "Contact us about A/L ICT",
  },
  {
    path: "/ol-ict",
    label: "O/L ICT classes",
    title: "O/L ICT Classes Online in Sri Lanka | Sayuru Amarasinghe",
    description:
      "Learn about online O/L ICT classes with Sayuru Amarasinghe in Sri Lanka. Explore regular class enquiries and the 20 Day Plan, then contact us to join.",
    heading: "Online O/L ICT Classes in Sri Lanka",
    sinhala:
      "සාමාන්‍ය පෙළ ICT ඉගෙනගන්න, සයුරු අමරසිංහ සමඟ මුළු දිවයිනටම online පන්ති.",
    intro:
      "Explore G.C.E. Ordinary Level Information and Communication Technology classes with Sayuru Amarasinghe. Choose between an enquiry about regular O/L ICT lessons and the focused 20 Day Plan for examination preparation.",
    facts: [
      { label: "Exam level", value: "G.C.E. O/L ICT" },
      { label: "Format", value: "Online" },
      { label: "Options", value: "Regular classes & 20 Day Plan" },
    ],
    level: "G.C.E. Ordinary Level",
    sections: [
      {
        title: "Regular O/L ICT class enquiries",
        paragraphs: [
          "If you want to learn ICT alongside your school studies, contact us about regular O/L classes. Share your examination year, the topics you are working on and the areas where you need support. Ask for the current timetable and fees before choosing your class.",
          "Students can enquire from anywhere in Sri Lanka because the classes are online. Confirm the joining instructions and the materials needed for your particular class when you register.",
        ],
      },
      {
        title: "A focused option: the O/L 20 Day Plan",
        paragraphs: [
          `The ${PLAN.campaignName} is a separate ${PLAN.durationDays}-day programme. It includes ${PLAN.shortNotes} short notes, special theory sessions and discussion of ${PLAN.pastPaperYears} years of past papers and exam-target questions. The full programme fee is Rs. ${PLAN.fee.toLocaleString("en-LK")}.`,
          "Read the dedicated plan page to compare the inclusions with your revision needs. Contact us through the programme registration link to confirm the upcoming schedule. The programme name describes its study goal; an individual examination grade depends on the student's preparation and performance.",
        ],
      },
      {
        title: "Plan your O/L ICT revision",
        paragraphs: [
          "As a personal study method, keep a checklist of topics you can explain and questions you still find difficult. Attempt past-paper questions, review your mistakes and return to the relevant theory instead of only memorising answers.",
          "When choosing between regular classes and a focused revision programme, consider how much theory you have already studied and how much time you can set aside. Tell us about those needs when you enquire so you can discuss the suitable option.",
        ],
      },
    ],
    questions: [
      {
        question: "How do I get the O/L class timetable?",
        answer:
          "Contact us on WhatsApp with your O/L exam year and ask about the current lessons, timetable and registration details.",
      },
      {
        question: "Is the 20 Day Plan the same as regular O/L classes?",
        answer: `It is a separate ${PLAN.durationDays}-day programme with a full fee of Rs. ${PLAN.fee.toLocaleString("en-LK")}. Regular class details and fees should be confirmed separately.`,
      },
      {
        question: "I am still learning the basics. Can I ask about the plan?",
        answer:
          "The 20 Day Plan is designed for students at different learning levels. Share the areas you find difficult when enquiring and confirm whether its schedule suits your preparation.",
      },
    ],
    enquiry: enquiry(
      "I would like to know about O/L ICT online lessons, fees and the class timetable.",
    ),
    cta: "Contact us about O/L ICT",
  },
  {
    path: "/ol-20-day-plan",
    label: "O/L 20 Day Plan",
    title: "O/L ICT 20 Day F to A Plan | Sayuru Amarasinghe",
    description: `Prepare for O/L ICT with Sayuru Amarasinghe's ${PLAN.durationDays} Day F to A Plan: ${PLAN.shortNotes} short notes, special theory and ${PLAN.pastPaperYears} years of past papers. Rs. 3,000 for the full programme.`,
    heading: "O/L ICT 20 Day F to A Plan",
    sinhala: "දින 20ක වැඩපිළිවෙළක් ඔස්සේ O/L ICT විභාගයට සූදානම් වෙන්න.",
    intro: `The ${PLAN.campaignName} is Sayuru Amarasinghe's focused O/L ICT examination-preparation programme. It brings short notes, special theory discussions and past-paper practice into a ${PLAN.durationDays}-day study plan for students at different learning levels.`,
    facts: [
      { label: "Duration", value: `${PLAN.durationDays} days` },
      {
        label: "Full programme",
        value: `Rs. ${PLAN.fee.toLocaleString("en-LK")}`,
      },
      { label: "Study notes", value: `${PLAN.shortNotes} short notes` },
    ],
    level: "G.C.E. Ordinary Level",
    isPlan: true,
    sections: [
      {
        title: "What is included in the plan?",
        paragraphs: [
          `Super ${PLAN.shortNotes} Short Notes focus on essential examination material. Special theory sessions are designed around past-paper patterns, helping connect the concepts you revise with the questions you practise.`,
          `The programme also discusses ${PLAN.pastPaperYears} years of past papers and examination-target questions. Use these sessions to identify difficult areas and bring questions to the discussions. The plan is designed to accommodate students at different learning levels.`,
        ],
      },
      {
        title: "Fee, duration and registration",
        paragraphs: [
          `The full programme fee is Rs. ${PLAN.fee.toLocaleString("en-LK")} for the ${PLAN.durationDays}-day plan. Use the registration button on this page to contact us through the programme's WhatsApp link.`,
          "Ask for the upcoming start date, session timetable, joining instructions and material-access details before payment. This page does not publish a start date or a daily timetable. Confirm those details directly so you can plan your study time.",
        ],
      },
      {
        title: "Make the most of the 20 days",
        paragraphs: [
          "A useful personal routine is to review the relevant short notes, attempt questions yourself and then check the explanation. Record mistakes in a separate list so you can revisit them before your next practice session.",
          "The F to A name expresses the programme's learning ambition. It does not guarantee an examination grade. Consistent study, attendance and your own examination performance all matter. If you need ongoing lessons beyond this focused programme, ask about regular O/L ICT classes.",
        ],
      },
    ],
    questions: [
      {
        question: "How much does the full 20 Day Plan cost?",
        answer: `The full programme fee is Rs. ${PLAN.fee.toLocaleString("en-LK")}. Confirm the payment and joining instructions through the registration link before paying.`,
      },
      {
        question: "What materials and practice are included?",
        answer: `The plan includes ${PLAN.shortNotes} short notes, special theory sessions, ${PLAN.pastPaperYears} years of past-paper discussion and examination-target questions.`,
      },
      {
        question: "When does the programme start?",
        answer:
          "Contact us through the programme's WhatsApp registration link for the upcoming start date and timetable. No specific start date is published on this page.",
      },
      {
        question: "Is this only for students with a strong ICT foundation?",
        answer:
          "The programme is designed for students at different learning levels. Share your current learning needs with us and confirm that you can follow the planned sessions.",
      },
    ],
    enquiry: PLAN.registrationUrl,
    cta: "Register on WhatsApp",
  },
  {
    path: "/about-sayuru-amarasinghe",
    label: "About Sayuru Amarasinghe",
    title: "Sayuru Amarasinghe | ICT Teacher in Sri Lanka",
    description:
      "Meet Sayuru Amarasinghe, online A/L and O/L ICT teacher in Sri Lanka, Software Engineering graduate and CEO at Codezela Technologies. Explore his classes.",
    heading: "Sayuru Amarasinghe, ICT Teacher in Sri Lanka",
    sinhala: "සයුරු අමරසිංහ, A/L සහ O/L ICT online පන්ති.",
    intro:
      "Sayuru Amarasinghe teaches online A/L and O/L Information and Communication Technology classes for students across Sri Lanka. His academic background is in Software Engineering, and he is the CEO at Codezela Technologies.",
    facts: [
      { label: "Teaching", value: "A/L & O/L ICT" },
      { label: "Class format", value: "Online, Sri Lanka" },
      { label: "Industry role", value: SITE.role },
    ],
    isProfile: true,
    sections: [
      {
        title: "Qualifications and professional background",
        paragraphs: [
          SITE.qualifications[0] + ".",
          SITE.qualifications[1] +
            ". The MSc is currently being read and is not presented as an awarded qualification.",
          `${SITE.role}. Software Engineering, Information Technology and Cyber Security are the areas represented in his academic and professional profile.`,
        ],
      },
      {
        title: "ICT teaching for A/L and O/L students",
        paragraphs: [
          "The online classes cover two distinct examination levels: G.C.E. Advanced Level ICT and G.C.E. Ordinary Level ICT. Current A/L enquiries are available for the 2027 and 2028 exam years. O/L students can ask about regular lessons or the separate 20 Day Plan.",
          "The learning approach brings together theory, revision and paper practice. Read the relevant programme page for its published details, and contact us to discuss the timetable and registration process for your chosen class.",
        ],
      },
      {
        title: "Choose a class with clear information",
        paragraphs: [
          "When looking for the best ICT class for your needs, compare the examination level, lesson approach, teacher background, timetable and study commitment. Ask questions before joining so you understand how the programme fits your preparation.",
          "This website provides the teacher's stated qualifications, programme details and contact routes in one place. Student experiences are available on the homepage in the students' own words. They should be read alongside the details of the particular programme you are considering.",
        ],
      },
    ],
    questions: [
      {
        question: "Which ICT classes does Sayuru Amarasinghe teach?",
        answer:
          "Online A/L and O/L ICT classes for students across Sri Lanka, including A/L class enquiries for 2027 and 2028 and the O/L 20 Day Plan.",
      },
      {
        question: "How can I contact the class team?",
        answer: `Contact us on WhatsApp or call ${SITE.phone}. You can also email ${SITE.email}. Include your exam level and year when asking about a class.`,
      },
    ],
    enquiry: enquiry("I would like to know about your online ICT classes."),
    cta: "Contact us about ICT classes",
  },
];
