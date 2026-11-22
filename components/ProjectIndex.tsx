"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

const filters = ["All work", "Applied AI", "Full stack"] as const

const projects = [
  {
    title: "Internship Studio 2.0",
    category: "Applied AI",
    summary: "Matches parsed résumés with internship listings through semantic retrieval and explains the match.",
    stack: "RAG · pgvector · Next.js",
    code: "https://github.com/DarkCarnage06/Internship-Studio2.0",
    demo: "https://internship-studio2-0.vercel.app/",
  },
  {
    title: "Distributor platform",
    category: "Full stack",
    summary: "Brings catalog browsing, order collection, inventory and status tracking into one B2B workflow.",
    stack: "Next.js · TypeScript · PostgreSQL",
    code: "https://github.com/DarkCarnage06/DISTRIBUTOR",
    demo: "https://distributor-yoxh.vercel.app/customer/catalog",
  },
  {
    title: "Credix AI spend audit",
    category: "Applied AI",
    summary: "Surfaces overlapping AI subscriptions, unused seats and opportunities to reduce team spending.",
    stack: "Next.js · Neon Postgres · Anthropic",
    code: "https://github.com/DarkCarnage06/Credix-Audit-",
    demo: "https://credix-audit-ti1g.vercel.app/",
  },
  {
    title: "NavPal",
    category: "Full stack",
    summary: "An indoor navigation PWA that uses QR anchors and shortest-path routing to help visitors navigate campus.",
    stack: "Next.js · MongoDB · Dijkstra",
    code: "https://github.com/aman-singh27/NavPal",
  },
  {
    title: "Multimodal image captioning",
    category: "Applied AI",
    summary: "Generates descriptions of images with a CNN encoder and sequence decoders that use attention.",
    stack: "Computer vision · CNN · Transformer · LSTM",
  },
]

export default function ProjectIndex() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work")
  const visibleProjects = projects.filter(project => filter === "All work" || project.category === filter)

  return (
    <>
      <div className="filters" role="group" aria-label="Filter selected work">
        {filters.map(label => (
          <button key={label} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)}>
            {label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{visibleProjects.length} projects shown</p>
      <div className="project-index">
        {visibleProjects.map(project => (
          <article className="project-row" key={project.title}>
            <div>
              <span className="category">{project.category}</span>
              <h3>{project.title}</h3>
            </div>
            <div>
              <p>{project.summary}</p>
              <p className="stack">{project.stack}</p>
            </div>
            {(project.code || project.demo) && (
              <div className="project-links">
                {project.demo && <a href={project.demo} aria-label={`Live demo for ${project.title}`}>Demo <ArrowUpRight size={16} aria-hidden /></a>}
                {project.code && <a href={project.code} aria-label={`Source code for ${project.title}`}>Code <ArrowUpRight size={16} aria-hidden /></a>}
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  )
}
