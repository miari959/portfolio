import { about } from "@/content/about";
import styles from "./About.module.css";

export function About() {
  return (
    <section aria-labelledby="about" className={`container ${styles.section}`}>
      <h2 id="about" className={styles.title}>
        About
      </h2>
      <p className={styles.lead}>{about.lead}</p>
      {about.paragraphs.map((paragraph) => (
        <p key={paragraph} className={styles.paragraph}>
          {paragraph}
        </p>
      ))}
    </section>
  );
}