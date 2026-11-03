export const SITE = {
  name: "Sayuru Amarasinghe",
  shortName: "Sayuru ICT",
  messageGreeting: "Hi Mr. Sayuru,",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://ict.sayuru.me").replace(/\/+$/, ""),
  email: "contact@sayuru.me",
  phone: "071 288 3835",
  phoneHref: "+94712883835",
  whatsapp: "https://wa.me/94712883835",
  facebook: "https://www.facebook.com/ict.sayuru.me",
  qualifications: [
    "BSc (Hons) Software Engineering (UK)",
    "(Reading) MSc in IT & Cyber Security (UK)",
  ],
  role: "CEO at Codezela Technologies",
  portrait: "/images/sayuru-amarasinghe.webp",
  profilePortrait: "/images/sayuru-amarasinghe-profile.webp",
} as const;
