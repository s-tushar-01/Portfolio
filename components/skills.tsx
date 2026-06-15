"use client"

import type { MouseEvent } from "react"
import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { portfolio } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"

export function Skills() {
  const [open, setOpen] = useState(0)
  const visualX = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 })
  const visualY = useSpring(useMotionValue(0), { stiffness: 90, damping: 18 })
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 })

  const moveVisual = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    visualX.set(x * 12)
    visualY.set(y * 12)
    rotateX.set(y * -3)
    rotateY.set(x * 3)
  }

  const resetVisual = () => {
    visualX.set(0)
    visualY.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <section id="services" data-section="skills" className="section-space">
      <div className="site-shell">
        <SectionHeading
          label="03 / Technical skills"
          title="A practical full-stack toolkit."
          description="Technologies used across deployed web applications, collaborative systems, backend APIs, databases, and machine learning projects."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
          <motion.div
            className="skills-visual"
            onMouseMove={moveVisual}
            onMouseLeave={resetVisual}
            style={{ x: visualX, y: visualY, rotateX, rotateY }}
            animate={{ translateY: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            data-cursor
          >
            <div className="skills-visual-glow" />
            <div className="skills-visual-frame">
              <Image
                src="/skills-sculpture.png"
                alt="Abstract chrome neural sculpture representing full-stack and AI engineering"
                width={1024}
                height={1280}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="h-full w-full object-cover"
              />
              <div className="skills-visual-shade" />
            </div>
            <motion.div
              className="skills-visual-particle skills-visual-particle-one"
              animate={{ y: [0, -18, 0], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="skills-visual-particle skills-visual-particle-two"
              animate={{ y: [0, 15, 0], opacity: [0.25, 0.8, 0.25] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="skill-accordion">
            {portfolio.skillGroups.map((group, index) => {
              const active = open === index
              const skills = group.skills.split(",").map((skill) => skill.trim())
              return (
                <div key={group.title} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpen(active ? -1 : index)}
                    className="skill-accordion-trigger"
                    aria-expanded={active}
                  >
                    <span className="text-xs text-muted-foreground">0{index + 1}</span>
                    <span className="text-xl font-medium sm:text-3xl">{group.title}</span>
                    <motion.span animate={{ rotate: active ? 180 : 0 }}>
                      <ChevronDown size={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          variants={{ visible: { transition: { staggerChildren: 0.045 } } }}
                          className="flex flex-wrap gap-2 pb-7 pl-[3.25rem]"
                        >
                          {skills.map((skill) => (
                            <motion.span
                              key={skill}
                              variants={{
                                hidden: { opacity: 0, y: 8, scale: 0.96 },
                                visible: { opacity: 1, y: 0, scale: 1 },
                              }}
                              className="skill-chip"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
