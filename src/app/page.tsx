import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main id="main">
      <section className="container">
        <h1>{site.name}</h1>
        <p>
          {site.role} - {site.location}
        </p>
      </section>

      <section id="work" aria-labelledby="work-title" className={`container ${styles.work}`}>
        <h2 id="work-title" className={styles.sectionTitle}>
          Selected work
        </h2>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </main>
  );
}