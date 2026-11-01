import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Sign In",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
