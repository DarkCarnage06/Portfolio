"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPinned } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const filters = ["All work", "Applied AI", "Full stack"] as const

const projects = [
  {
    title: "Internship Studio 2.0",
    category: "Applied AI",
    summary: "Replaced TF-IDF with semantic résumé-to-job matching. Claude explanations use retrieved evidence, with template fallbacks.",
    stack: "Next.js · pgvector · Neon · Claude",
    image: "/images/project1.jpg",
    code: "https://github.com/DarkCarnage06/Internship-Studio2.0",
    demo: "https://internship-studio2-0.vercel.app/",
  },
  {
    title: "Distributor Management Platform",
    category: "Full stack",
    summary: "Lets shopkeepers order from distributors online and gives distributors dashboards for products and order tracking.",
    stack: "Next.js · React · Node.js · PostgreSQL",
    image: "/images/project2.jpg",
    code: "https://github.com/DarkCarnage06/DISTRIBUTOR",
    demo: "https://distributor-yoxh.vercel.app/customer/catalog",
  },
  {
    title: "Credix AI Spend Audit",
    category: "Applied AI",
    summary: "Flags potentially excessive AI subscription costs and generates shareable audit summaries with email notifications.",
    stack: "TypeScript · Neon · Anthropic · Resend",
    image: "/images/project3.jpg",
    code: "https://github.com/DarkCarnage06/Credix-Audit-",
    demo: "https://credix-audit-ti1g.vercel.app/",
  },
  {
    title: "NavPal (CampusNav)",
    category: "Full stack",
    summary: "Pairs QR anchors with shortest-path campus routing and an SVG map editor. Campus implementation approval is pending.",
    stack: "Next.js · MongoDB · React-Konva · Zustand",
    code: "https://github.com/aman-singh27/NavPal",
  },
]

export default function ProjectIndex() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All work")
  const [edges, setEdges] = useState({ start: true, end: false })
  const rail = useRef<HTMLDivElement>(null)
  const visibleProjects = projects.filter(project => filter === "All work" || project.category === filter)

  function syncEdges(node: HTMLDivElement) {
    const start = node.scrollLeft < 4
    const end = node.scrollLeft + node.clientWidth >= node.scrollWidth - 4
    setEdges(previous => previous.start === start && previous.end === end ? previous : { start, end })
  }

  useEffect(() => {
    const node = rail.current
    if (!node) return
    node.scrollLeft = 0
    syncEdges(node)
    const observer = new ResizeObserver(() => syncEdges(node))
    observer.observe(node)
    return () => observer.disconnect()
  }, [filter])

  function move(direction: number) {
    const node = rail.current
    const card = node?.firstElementChild
    if (!node || !card) return
    const gap = parseFloat(getComputedStyle(node).columnGap)
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    node.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: reducedMotion ? "instant" : "smooth" })
  }

  return (
    <>
      <div className="work-toolbar">
        <div className="filters" role="group" aria-label="Filter selected work">
          {filters.map(label => (
            <button key={label} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}</button>
          ))}
        </div>
        <div className="slider-controls" role="group" aria-label="Slide through projects">
          <button type="button" aria-label="Previous project" aria-controls="project-rail" disabled={edges.start} onClick={() => move(-1)}><ArrowLeft size={19} aria-hidden /></button>
          <button type="button" aria-label="Next project" aria-controls="project-rail" disabled={edges.end} onClick={() => move(1)}><ArrowRight size={19} aria-hidden /></button>
        </div>
      </div>
      <p className="sr-only" role="status">{visibleProjects.length} projects shown</p>
      <div className="project-index" id="project-rail" ref={rail} onScroll={event => syncEdges(event.currentTarget)}>
        {visibleProjects.map(project => (
          <article className="project-row" key={project.title}>
            <div className="project-media">
              {project.image ? <Image src={project.image} alt="" fill sizes="(max-width: 740px) 90vw, 42vw" /> : <MapPinned size={68} strokeWidth={1} aria-hidden />}
            </div>
            <div className="project-copy">
              <span className="category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <p className="stack">{project.stack}</p>
              <div className="project-links">
                {project.demo && <a href={project.demo} aria-label={`Live demo for ${project.title}`}>Demo <ArrowUpRight size={16} aria-hidden /></a>}
                <a href={project.code} aria-label={`Source code for ${project.title}`}>Code <ArrowUpRight size={16} aria-hidden /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
