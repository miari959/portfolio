"use client";

import { useState } from "react";
import styles from "./SearchDiagram.module.css";

// The four parts of the search, left to right, and where their lines run
const lanes = [
  { name: "Visitor", x: 56 },
  { name: "Search (PHP)", x: 205 },
  { name: "OpenAI API", x: 354 },
  { name: "MySQL", x: 503 },
];

type Step = {
  kind: "call" | "answer" | "self" | "result";
  from: number;
  to: number;
  y: number;
  label: string;
  description: string;
};

// One search, from top to bottom. Screen readers read the descriptions.
const steps: Step[] = [
  {
    kind: "call",
    from: 0,
    to: 1,
    y: 96,
    label: "“stress at work”",
    description: "The visitor sends a query, for example “stress at work”, to the search.",
  },
  {
    kind: "self",
    from: 1,
    to: 1,
    y: 132,
    label: "expand query",
    description: "The search expands the query.",
  },
  {
    kind: "call",
    from: 1,
    to: 2,
    y: 200,
    label: "embed(query)",
    description: "The search asks the OpenAI API to turn the query into an embedding.",
  },
  {
    kind: "answer",
    from: 2,
    to: 1,
    y: 244,
    label: "query vector",
    description: "The OpenAI API sends back the query vector.",
  },
  {
    kind: "call",
    from: 1,
    to: 3,
    y: 288,
    label: "fetch seminars",
    description: "The search fetches the seminars from MySQL.",
  },
  {
    kind: "answer",
    from: 3,
    to: 1,
    y: 332,
    label: "vectors + topics",
    description: "MySQL sends back the seminars’ vectors and topics.",
  },
  {
    kind: "self",
    from: 1,
    to: 1,
    y: 376,
    label: "rank seminars",
    description: "The search ranks the seminars.",
  },
  {
    kind: "result",
    from: 1,
    to: 0,
    y: 444,
    label: "results",
    description: "The search sends the results back to the visitor.",
  },
];

function StepDrawing({ step }: { step: Step }) {
  const start = lanes[step.from].x;

  // A small loop on the same line: out to the right, down, and back
  if (step.kind === "self") {
    return (
      <>
        <path
          className={styles.call}
          d={`M ${start} ${step.y} H ${start + 24} V ${step.y + 24} H ${start + 5}`}
          markerEnd="url(#search-arrow-call)"
        />
        <text className={styles.label} x={start + 32} y={step.y + 16}>
          {step.label}
        </text>
      </>
    );
  }

  const end = lanes[step.to].x;
  const direction = end > start ? 1 : -1;
  // The label sits above the first stretch of the arrow
  const labelX = (start + lanes[step.from + direction].x) / 2;

  return (
    <>
      <path
        className={styles[step.kind]}
        d={`M ${start} ${step.y} H ${end - direction * 5}`}
        markerEnd={`url(#search-arrow-${step.kind})`}
      />
      <text
        className={step.kind === "result" ? styles.resultLabel : styles.label}
        x={labelX}
        y={step.y - 12}
        textAnchor="middle"
      >
        {step.label}
      </text>
    </>
  );
}

export function SearchDiagram() {
  // Each click gives the drawing a new key, so it starts again from the first step
  const [replays, setReplays] = useState(0);

  return (
    <figure className={`bone-panel ${styles.panel}`}>
      <div
        className={styles.scroller}
        tabIndex={0}
        role="region"
        aria-label="Sequence diagram of one search"
      >
        <svg
          key={replays}
          className={replays > 0 ? styles.playing : undefined}
          width="560"
          height="488"
          viewBox="0 0 560 488"
          aria-hidden="true"
        >
          <defs>
            {["call", "answer", "result"].map((kind) => (
              <marker
                key={kind}
                id={`search-arrow-${kind}`}
                orient="auto"
                markerWidth="5"
                markerHeight="5"
                refX="2"
                refY="2"
                overflow="visible"
              >
                <path className={styles[`${kind}Head`]} d="M0 0 L4 2 L0 4 Z" />
              </marker>
            ))}
          </defs>

          {lanes.map((lane) => (
            <g key={lane.name}>
              <rect className={styles.head} x={lane.x - 52} y="8" width="104" height="40" rx="8" />
              <text className={styles.laneName} x={lane.x} y="33" textAnchor="middle">
                {lane.name}
              </text>
              <line className={styles.lifeline} x1={lane.x} y1="48" x2={lane.x} y2="470" />
            </g>
          ))}

          {steps.map((step, index) => (
            <g
              key={step.label}
              className={styles.step}
              style={{ animationDelay: `${0.1 + index * 0.3}s` }}
            >
              <StepDrawing step={step} />
            </g>
          ))}
        </svg>
      </div>

      <ol className="sr-only">
        {steps.map((step) => (
          <li key={step.label}>{step.description}</li>
        ))}
      </ol>

      <figcaption className={styles.caption}>
        <span className={styles.captionText}>
          How one search ran, simplified, with an example query. Solid lines are calls, dashed
          lines are answers.
          <span className={styles.swipeHint}> Swipe sideways to see the whole diagram.</span>
        </span>
        <button
          type="button"
          className={styles.replay}
          onClick={() => setReplays((count) => count + 1)}
        >
          Replay the steps
        </button>
      </figcaption>
    </figure>
  );
}