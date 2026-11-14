import type { Project } from "@/content/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      <h3>{project.title}</h3>
      <p>{project.context}</p>
      <p>{project.summary}</p>
    </article>
  );
}