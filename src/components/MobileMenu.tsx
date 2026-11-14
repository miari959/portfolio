"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { navItems } from "@/content/navigation";
import { useDismiss } from "@/hooks/useDismiss";
import styles from "./MobileMenu.module.css";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useDismiss(wrapperRef, buttonRef, open, () => setOpen(false));

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <div id="mobile-menu" className={styles.panel}>
          <nav aria-label="Main" className={`container ${styles.list}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.item}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href={site.cv.english} download className={styles.item} onClick={() => setOpen(false)}>
              English CV (PDF)
            </a>
            <a href={site.cv.german} download className={styles.item} onClick={() => setOpen(false)}>
              German CV (PDF)
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}