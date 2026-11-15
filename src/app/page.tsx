import { projects } from "@/content/projects";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Recommendation } from "@/components/Recommendation";
import { Experience } from "@/components/Experience";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main id="main">
      <Hero />

      <section id="work" aria-labelledby="work-title" className={`container ${styles.work}`}>
        <h2 id="work-title" className={styles.sectionTitle}>
          Selected work
        </h2>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>

      <Recommendation />

      <Experience />
    </main>
  );
}