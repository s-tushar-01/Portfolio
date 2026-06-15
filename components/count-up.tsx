"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

interface CountUpProps {
  value: number
  suffix?: string
  pad?: number
}

export function CountUp({ value, suffix = "", pad = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, margin: "-60px" })
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) return
    if (reduced) {
      setCount(value)
      return
    }

    const started = performance.now()
    const duration = 900
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min((now - started) / duration, 1)
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduced, value, visible])

  return (
    <span ref={ref}>
      {String(count).padStart(pad, "0")}
      {suffix}
    </span>
  )
}
