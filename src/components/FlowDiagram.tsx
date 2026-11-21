import type { ReactNode } from "react";
import styles from "./FlowDiagram.module.css";

type FlowStep = {
  title?: string;
  text: ReactNode;
  dark?: boolean;
};

type FlowDiagramProps = {
  steps: FlowStep[];
  caption: string;
  // Optional dashed outline around all boxes, with this label, e.g. the container they run in
  frame?: string;
};

// Boxes from top to bottom, joined by arrows. Screen readers read it as a numbered list.
export function FlowDiagram({ steps, caption, frame }: FlowDiagramProps) {
  const flow = (
    <ol className={styles.flow}>
      {steps.map((step, index) => (
        <li key={index} className={step.dark ? `${styles.box} ${styles.dark}` : styles.box}>
          {step.title && <strong className={styles.title}>{step.title}</strong>}
          <span>{step.text}</span>
        </li>
      ))}
    </ol>
  );

  return (
    <figure className={`bone-panel ${styles.panel}`}>
      {frame ? (
        <div className={styles.frame}>
          <p className={styles.frameLabel}>{frame}</p>
          {flow}
        </div>
      ) : (
        flow
      )}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}