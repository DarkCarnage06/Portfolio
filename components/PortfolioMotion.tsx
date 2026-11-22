"use client"

import { useEffect, useRef, type ReactNode } from "react"

export default function PortfolioMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const surface = root.current
    if (!surface) return

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add("slide-in")
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.12 })

    surface.querySelectorAll("[data-slide]").forEach(node => observer.observe(node))

    const motion = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)")
    let active: HTMLElement | null = null
    let frame = 0

    function reset() {
      cancelAnimationFrame(frame)
      active?.removeAttribute("data-tracking")
      active = null
    }

    function track(event: PointerEvent) {
      const target = (event.target as Element).closest<HTMLElement>("[data-gesture]")
      if (!motion.matches || event.pointerType !== "mouse" || !target) {
        reset()
        return
      }
      if (active !== target) {
        reset()
        active = target
        target.setAttribute("data-tracking", "")
      }

      const { clientX, clientY } = event
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const bounds = target.getBoundingClientRect()
        const x = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width))
        const y = Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height))
        target.style.setProperty("--pointer-x", `${x * 100}%`)
        target.style.setProperty("--pointer-y", `${y * 100}%`)
        target.style.setProperty("--shift-x", `${(x - 0.5) * 16}px`)
        target.style.setProperty("--shift-y", `${(y - 0.5) * 12}px`)
      })
    }

    surface.addEventListener("pointermove", track, { passive: true })
    surface.addEventListener("pointerleave", reset)
    motion.addEventListener("change", reset)
    return () => {
      observer.disconnect()
      reset()
      surface.removeEventListener("pointermove", track)
      surface.removeEventListener("pointerleave", reset)
      motion.removeEventListener("change", reset)
    }
  }, [])

  return <div ref={root} className="portfolio" id="home">{children}</div>
}
