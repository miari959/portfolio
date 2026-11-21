import type { ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    dates: "Graduated Mar 2026",
    title: "B.Sc. Computer Science",
    place: "Universität Rostock, Germany",
    details: [
      "Specialization in software architecture, data systems and applied AI.",
      "Bachelor thesis: Visualization of the “Living Architecture” of software systems.",
      "Team project, 2023: a MediaWiki extension in PHP and MySQL that implements the W3C Webmention standard, so wiki pages automatically notify the websites they link to.",
    ],
  },
  {
    dates: "Jan 2025 – Jun 2025",
    title: "Full-Stack Developer (Internship)",
    place: "Landsiedel NLP Training GmbH, Kitzingen, Germany. Full time.",
    details: [
      "I was the company’s only developer at the time and reported directly to the managing director. He set my tasks each week, reviewed every change with me and advised me whenever I asked.",
    ],
    caseStudy: "landsiedel",
  },
  {
    dates: "May 2023 – Nov 2024",
    title: "Full-Stack Developer",
    place: "Arab Economic Forum, remote. Part-time, 20 hours a week, alongside my studies.",
    details: [
      "A non-profit economic research institute. With the lead developer of the partner agency ASAF Digital, I rebuilt its trilingual WordPress website, including right-to-left layouts for Arabic. Then I took over as its only developer: I automated the handling of contact-form submissions and newsletter sign-ups, and secured the forms against bot attacks with server-side validation.",
    ],
    link: { label: "arab-forum.org", href: "https://arab-forum.org" },
  },
];