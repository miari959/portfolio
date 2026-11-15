"use client";

import { useRef, useState } from "react";
import styles from "./CopyEmailButton.module.css";

type CopyEmailButtonProps = {
  email: string;
};

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <>
      <button type="button" className={styles.button} onClick={copyEmail}>
        {copied ? (
          <>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l4 4 10-10" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h8" />
            </svg>
            <span className="sr-only">Copy email address: </span>
            {email}
          </>
        )}
      </button>
      <p role="status" className="sr-only">
        {copied ? "Email address copied" : ""}
      </p>
    </>
  );
}