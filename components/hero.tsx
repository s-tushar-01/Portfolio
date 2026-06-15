"use client"

import Image from "next/image"
import type { MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { portfolio } from "@/lib/portfolio-data"

export function Hero() {
  const orbX = useSpring(useMotionValue(0), { stiffness: 100, damping: 18 })
  const orbY = useSpring(useMotionValue(0), { stiffness: 100, damping: 18 })
  const rotateX = useSpring(useMotionValue(0), { stiffness: 110, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 110, damping: 20 })

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    orbX.set(x * 16)
    orbY.set(y * 16)
    rotateX.set(y * -5)
    rotateY.set(x * 5)
  }

  const resetOrb = () => {
    orbX.set(0)
    orbY.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  const words = ["Code", "made"]

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-20">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="site-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_.85fr]">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-8 flex flex-wrap items-center gap-4"
          >
            <span className="status-dot" />
            <span className="eyebrow">{portfolio.availability}</span>
          </motion.div>

          <h1 className="display-title max-w-4xl" aria-label="Code made intelligent.">
            {words.map((word, index) => (
              <span key={word} className="headline-mask mr-[0.16em] inline-block">
                <motion.span
                  initial={{ opacity: 0, y: "105%" }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08 + index * 0.11, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="accent-mask">
              <motion.span
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="accent-script intelligent-glow inline-block"
              >
                intelligent.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {portfolio.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a href="#work" className="button button-accent">
              Explore selected work <ArrowDown size={16} />
            </a>
            <a href="#about" className="button button-outline">
              More about me <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ rotateY: -4, rotateX: 3, scale: 1.015 }}
          onMouseMove={handleMove}
          onMouseLeave={resetOrb}
          style={{ x: orbX, y: orbY, rotateX, rotateY }}
          className="hero-art relative mx-auto w-full max-w-[520px] lg:mr-0"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="hero-orbit hero-orbit-one"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            className="hero-orbit hero-orbit-two"
          />
          <div className="art-frame">
            <Image
              src="/portfolio-art.png"
              alt="Abstract chrome and glass digital sculpture"
              width={1536}
              height={2304}
              priority
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-6 pt-24 text-white">
              <span className="text-xs uppercase tracking-[0.18em]">{portfolio.role}</span>
              <span className="text-xs text-white/60">Portfolio / 2026</span>
            </div>
          </div>
          <div className="absolute -left-3 top-12 rounded-full bg-blue px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl sm:-left-5">
            Think
          </div>
          <div className="absolute -bottom-5 right-6 rotate-[-5deg] bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xl">
            Make
          </div>
        </motion.div>
      </div>
    </section>
  )
}
