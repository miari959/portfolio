import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found – Muhamad Miari",
};

export default function NotFound() {
  return (
    <main id="main">
      <div className={`container fade-in ${styles.content}`}>
        <h1 className={styles.title}>This page doesn’t exist</h1>
        <p className={styles.text}>
          The link may be old or mistyped. The home page has all my work.
        </p>
        <Link href="/" className={`primary-button ${styles.homeLink}`}>
          Go to the home page
        </Link>
      </div>
    </main>
  );
}