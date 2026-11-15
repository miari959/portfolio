import Link from "next/link";
import { experience } from "@/content/experience";
import styles from "./Experience.module.css";

export function Experience() {
  return (
    <section aria-labelledby="experience" className={`container ${styles.section}`}>
      <h2 id="experience" className={styles.title}>
        Experience and education
      </h2>
      <ol className={styles.timeline}>
        {experience.map((entry) => (
          <li key={entry.title} className={styles.item}>
            <p className={styles.dates}>{entry.dates}</p>
            <div className={styles.content}>
              <h3 className={styles.role}>{entry.title}</h3>
              <p className={styles.place}>{entry.place}</p>
              {entry.details.map((detail) => (
                <p key={detail} className={styles.detail}>
                  {detail}
                </p>
              ))}
              {entry.link && (
                <p className={styles.detail}>
                  <a href={entry.link.href}>{entry.link.label}</a>
                </p>
              )}
              {entry.caseStudy && (
                <p className={styles.detail}>
                  <Link href={`/projects/${entry.caseStudy}`}>Read the case study</Link>
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}