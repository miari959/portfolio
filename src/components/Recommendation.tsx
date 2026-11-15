import { recommendation } from "@/content/recommendation";
import styles from "./Recommendation.module.css";

export function Recommendation() {
  return (
    <section aria-labelledby="recommendation-title" className={styles.band}>
      <div className={`container ${styles.inner}`}>
        <h2 id="recommendation-title" className="sr-only">
          Recommendation
        </h2>
        <figure className={styles.figure}>
          <span aria-hidden="true" className={styles.mark}>
            “
          </span>
          <blockquote className={styles.quote}>{recommendation.quote}</blockquote>
          <figcaption className={styles.caption}>
            {recommendation.author}, {recommendation.role}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}