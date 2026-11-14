import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <main>
      <h1>{site.name}</h1>
      <p>{site.role} - {site.location}</p>

      <h2>Selected work</h2>
      {projects.map((project) => (
        <article key={project.slug}>
          <h3>{project.title}</h3>
          <p>{project.context}</p>
          <p>{project.summary}</p>
        </article>
      ))}
    </main>
  );
}