"use client";

import { useState } from "react";
import { site } from "@/content/site";
import styles from "./CvMenu.module.css";

export function CvMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        className={styles.button}
        aria-expanded={open}
        aria-controls="cv-menu"
        onClick={() => setOpen(!open)}
      >
        CV
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div id="cv-menu" className={styles.menu}>
          <a href={site.cv.english} download className={styles.item} onClick={() => setOpen(false)}>
            English CV (PDF)
          </a>
          <a href={site.cv.german} download className={styles.item} onClick={() => setOpen(false)}>
            German CV (PDF)
          </a>
        </div>
      )}
    </div>
  );
}