import Link from "next/link";
import { site } from "@/content/site";
import { CvMenu } from "./CvMenu";
import styles from "./SiteHeader.module.css";

const navItems = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

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
          <CvMenu />
        </div>
      </div>
    </header>
  );
}