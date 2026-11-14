import { site } from "@/content/site";

export default function Home() {
  return (
    <main>
      <h1>{site.name}</h1>
      <p>{site.role} - {site.location}</p>
    </main>
  );
}