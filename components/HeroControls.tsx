"use client"

import { useEffect, useState } from "react"

const indiaTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
})

export default function HeroControls() {
  const [time, setTime] = useState("")
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const update = () => setTime(indiaTime.format(new Date()))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <span className="hero-clock">INDIA / LOCAL TIME <time>{time ? `${time} IST` : "IST"}</time></span>
      <button type="button" aria-pressed={paused} onClick={event => {
        event.currentTarget.closest(".portfolio")?.toggleAttribute("data-ambient-paused", !paused)
        setPaused(!paused)
      }}>{paused ? "▶ Resume motion" : "Ⅱ Pause motion"}</button>
    </>
  )
}
