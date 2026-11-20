import Link from "next/link";
import { site } from "@/content/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.copyright}>© 2026 {site.name}</p>
        <nav aria-label="Footer" className={styles.nav}>
          <Link href="/legal" className={styles.link}>
            Legal notice and privacy
          </Link>
          <a href={site.sourceCode} className={styles.link}>
            Source code of this site
          </a>
        </nav>
      </div>
    </footer>
  );
}