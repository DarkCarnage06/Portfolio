"use client"

import { useEffect, useRef, type ReactNode } from "react"

export default function PortfolioMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!root.current || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add("slide-in")
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.12 })

    root.current.querySelectorAll("[data-slide]").forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return <div ref={root} className="portfolio" id="home">{children}</div>
}
