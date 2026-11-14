import Link from "next/link";
import { site } from "@/content/site";
import { navItems } from "@/content/navigation";
import { CvMenu } from "./CvMenu";
import { MobileMenu } from "./MobileMenu";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.name}>
          {site.name}
        </Link>
        <div className={styles.right}>
          <nav aria-label="Main" className={styles.nav}>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.cv}>
            <CvMenu />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}