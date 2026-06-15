"use client"

import { useEffect, useState } from "react"
import Lenis from "lenis"
import { motion, useMotionValue, useScroll, useSpring } from "framer-motion"

export function MotionSystem() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.2 })
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const smoothX = useSpring(cursorX, { stiffness: 500, damping: 38 })
  const smoothY = useSpring(cursorY, { stiffness: 500, damping: 38 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(pointer: fine)").matches
    let lenis: Lenis | undefined
    let frame = 0

    if (!reduced) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true })
      const raf = (time: number) => {
        lenis?.raf(time)
        frame = requestAnimationFrame(raf)
      }
      frame = requestAnimationFrame(raf)
    }

    const move = (event: PointerEvent) => {
      cursorX.set(event.clientX - 5)
      cursorY.set(event.clientY - 5)
      const target = event.target as HTMLElement
      setHovering(Boolean(target.closest("a, button, input, textarea, [data-cursor]")))
    }

    if (finePointer) window.addEventListener("pointermove", move)

    return () => {
      lenis?.destroy()
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", move)
    }
  }, [cursorX, cursorY])

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <motion.div
        className="cursor-glow"
        aria-hidden="true"
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.7 : 0.45 }}
        style={{ x: smoothX, y: smoothY }}
      />
    </>
  )
}
