import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import styles from "./CaseStudy.module.css";

type Fact = {
  label: string;
  value: ReactNode;
};

type CaseStudyProps = {
  slug: string;
  intro: ReactNode;
  facts: Fact[];
  children: ReactNode;
};

type CaseStudySectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

// Finds the project and its neighbours in the order of the home page
function findProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) {
    throw new Error(`No project with the slug "${slug}"`);
  }
  return {
    project: projects[index],
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}

// The browser tab title and the search result text come from the project's card
export function caseStudyMetadata(slug: string): Metadata {
  const { project } = findProject(slug);
  return {
    title: `${project.title} – ${site.name}`,
    description: project.summary,
  };
}

export function CaseStudy({ slug, intro, facts, children }: CaseStudyProps) {
  const { project, previous, next } = findProject(slug);

  return (
    <main id="main">
      <article>
        <div className={`container fade-in ${styles.intro}`}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.lead}>{intro}</p>
          <dl className={styles.facts}>
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className={styles.label}>{fact.label}</dt>
                <dd className={styles.value}>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={`container ${styles.sections}`}>
          {children}

          <nav aria-label="More work" className={styles.more}>
            {previous && (
              <Link href={`/projects/${previous.slug}`} className={styles.moreLink}>
                <span className={styles.moreLabel}>Previous project</span>
                <span className={styles.moreTitle}>{previous.title}</span>
              </Link>
            )}
            {next && (
              <Link href={`/projects/${next.slug}`} className={`${styles.moreLink} ${styles.next}`}>
                <span className={styles.moreLabel}>Next project</span>
                <span className={styles.moreTitle}>{next.title}</span>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </main>
  );
}

export function CaseStudySection({ id, title, children }: CaseStudySectionProps) {
  return (
    <section aria-labelledby={id} className={styles.section}>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}