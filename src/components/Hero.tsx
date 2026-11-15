import { site } from "@/content/site";
import { CopyEmailButton } from "./CopyEmailButton";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section aria-label="Introduction" className={`container ${styles.hero}`}>
      <h1 className={styles.name}>{site.name}</h1>
      <div id="contact" className={styles.row}>
        <p className={styles.intro}>
          I’m a full-stack developer in Tenerife, Spain, working with TypeScript, React, Python,
          PHP and SQL, and I’m available now for a new job, remote or on-site.
        </p>
        <div className={styles.contact}>
          <h2 className="sr-only">Contact</h2>
          <div className={styles.buttons}>
            <a href={`mailto:${site.email}`} className={styles.emailButton}>
              Email me
            </a>
            <CopyEmailButton email={site.email} />
          </div>
          <p className={styles.links}>
            <a href={site.linkedin}>LinkedIn</a>
            <a href={site.github}>GitHub</a>
            <a href={site.cv.english} download className={styles.phoneOnly}>
              CV in English
            </a>
            <a href={site.cv.german} download className={styles.phoneOnly}>
              CV in German
            </a>
          </p>
          <p className={styles.note}>One hour behind Central Europe. Authorized to work in Spain.</p>
        </div>
      </div>
    </section>
  );
}