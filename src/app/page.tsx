import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  return (
    <main className="container">
      <h1>{site.name}</h1>
      <p>{site.role} - {site.location}</p>

      <h2>Selected work</h2>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </main>
  );
}