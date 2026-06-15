"use client"

import type { MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowUpRight, FolderGit2, Github } from "lucide-react"
import { portfolio } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"

const accentClasses: Record<string, string> = {
  coral: "project-coral",
  blue: "project-blue",
  ink: "project-ink",
}

type Project = (typeof portfolio.projects)[number]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    rotateX.set(y * -4)
    rotateY.set(x * 4)
    event.currentTarget.style.setProperty("--sweep-x", `${x * 100 + 50}%`)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -9, scale: 1.022 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY }}
      data-accent={project.accent}
      className={`project-card ${accentClasses[project.accent]} ${
        index === 0
          ? "lg:col-span-7"
          : index === 1
            ? "lg:col-span-5"
            : "lg:col-span-6"
      }`}
    >
      <div className="project-sweep" />
      <div className="flex items-start justify-between">
        <span className="project-number">{project.number}</span>
        <div className="flex gap-2">
          <a href={project.github} target="_blank" rel="noreferrer" className="project-link" aria-label={`${project.title} GitHub repository`}>
            <Github size={18} />
          </a>
          <a href={project.href} target="_blank" rel="noreferrer" className="project-link" aria-label={`Open ${project.title}`}>
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
      <div className="mt-auto">
        <div className="mb-5 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.15em] opacity-65">
          <span>{project.category}</span>
          <span>{project.period}</span>
        </div>
        <h3 className="text-balance text-4xl font-semibold sm:text-5xl">{project.title}</h3>
        <p className="mt-5 max-w-xl text-sm leading-relaxed opacity-75 sm:text-base">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="project-shape" aria-hidden="true" />
    </motion.article>
  )
}

export function Projects() {
  return (
    <section id="work" data-section="work" className="section-space bg-panel">
      <div className="site-shell">
        <SectionHeading
          label="02 / Selected work"
          title="Projects built to work."
          description="Production-deployed applications spanning social platforms, generative AI, real-time collaboration, and machine learning."
        />

        <div className="grid gap-5 lg:grid-cols-12">
          {portfolio.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">More projects built</span>
              <h3 className="mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                Experiments, systems, and focused builds.
              </h3>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Additional repository projects that are not currently deployed.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {portfolio.otherProjects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="secondary-project group"
              >
                <div className="flex items-center justify-between">
                  <FolderGit2 className="text-accent" size={24} />
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    Source only
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                </div>
                <h4 className="mt-10 text-2xl font-medium">{project.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
