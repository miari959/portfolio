import type { Metadata } from "next";
import { site } from "@/content/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `Legal notice and privacy – ${site.name}`,
  description: "Who runs this website and how it handles personal data.",
};

export default function LegalPage() {
  return (
    <main id="main">
      <div className="container fade-in">
        <article className={styles.content}>
          <h1 className={styles.title}>Legal notice and privacy</h1>

          <h2>Legal notice</h2>
          <p>
            This is my personal website. It presents my work as a developer to potential employers.
            It sells no products or services and shows no advertising.
          </p>
          <address className={styles.address}>
            Muhamad Miari
            <br />
            Spain
            <br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </address>

          <h2>Privacy</h2>
          <p>
            I keep the processing of personal data on this website to the minimum it needs to
            work. I am responsible for this processing, and you can reach me at the email address
            above.
          </p>

          <h3>No cookies or tracking</h3>
          <p>
            This website sets no cookies and uses no analytics or tracking tools. Its fonts are
            served from this website itself, so your browser does not contact Google or any other
            font service.
          </p>

          <h3>Hosting</h3>
          <p>
            The website is hosted by Vercel Inc. in the United States. When you visit it, Vercel
            processes technical data such as your IP address, the approximate location derived
            from it, information about your browser and device, and server log files, in order to
            deliver the website and keep it secure. The legal basis is my legitimate interest in a
            secure, working website (Article 6(1)(f) GDPR).
          </p>
          <p>
            Vercel is certified under the EU-U.S. Data Privacy Framework, which covers the
            transfer of this data to the United States, and keeps the data only for as long as
            necessary. Its privacy notice gives the details:{" "}
            <a href="https://vercel.com/legal/privacy">vercel.com/legal/privacy</a>.
          </p>

          <h3>Email</h3>
          <p>
            If you choose to email me, I use your email address and your message only to reply to
            you and, if your message concerns a job, for the application process. The legal basis
            is my legitimate interest in answering your message (Article 6(1)(f) GDPR). I delete
            your emails once they are no longer needed for this purpose.
          </p>

          <h3>Links to other websites</h3>
          <p>
            This website links to other services, such as GitHub and LinkedIn. When you follow
            such a link, that website’s own privacy policy applies.
          </p>

          <h3>Your rights</h3>
          <p>
            You have the right to access your personal data, to have it corrected or deleted, to
            restrict or object to its processing and to receive it in a portable format. To
            exercise these rights, email me. You also have the right to lodge a complaint with a
            data protection authority. In Spain, this is the Agencia Española de Protección de
            Datos: <a href="https://www.aepd.es">aepd.es</a>.
          </p>

          <p className={styles.updated}>Last updated: November 2026</p>
        </article>
      </div>
    </main>
  );
}