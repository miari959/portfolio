import type { Metadata } from "next";
import { Gloock, Readex_Pro } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
});

const readexPro = Readex_Pro({
  subsets: ["latin"],
  variable: "--font-readex",
});

export const metadata: Metadata = {
  title: "Muhamad Miari – Full-Stack Developer",
  description:
    "Full-stack developer in Tenerife, Spain. Case studies: two web platforms for a German seminar company, a thesis tool for Python, and hospital shift planning.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${gloock.variable} ${readexPro.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}