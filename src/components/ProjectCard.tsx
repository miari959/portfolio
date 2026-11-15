import Link from "next/link";
import type { Project } from "@/content/types";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const titleId = `${project.slug}-title`;

  const facts = [
    { label: "Role", value: project.role },
    { label: "Where", value: project.setting },
    { label: "When", value: project.period },
    { label: "Built with", value: project.stack.join(", ") },
  ];

  return (
    <article aria-labelledby={titleId} className={styles.card}>
      <h3 id={titleId} className={styles.title}>
        {project.title}
      </h3>
      <p className={styles.summary}>{project.summary}</p>
      <dl className={styles.facts}>
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.links}>
        <Link href={`/projects/${project.slug}`}>Read the case study</Link>
        {project.links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </p>
    </article>
  );
}