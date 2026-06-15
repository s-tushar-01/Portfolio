"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Database,
  FolderCode,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Moon,
  Pause,
  Play,
  Send,
} from "lucide-react"
import { portfolio } from "@/lib/portfolio-data"

const ease = [0.22, 1, 0.36, 1] as const

const skills = portfolio.skillGroups.flatMap((group) =>
  group.skills.split(",").map((skill) => ({
    name: skill.trim(),
    group: group.title,
  })),
)

const projectIcons = [FolderCode, BrainCircuit, Code2, Database]

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Home() {
  const [activeProject, setActiveProject] = useState(0)
  const [showcasePaused, setShowcasePaused] = useState(false)
  const [autoplayEnabled, setAutoplayEnabled] = useState(true)
  const project = portfolio.projects[activeProject]
  const hasLiveDemo = project.href !== project.github

  useEffect(() => {
    if (showcasePaused || !autoplayEnabled) return
    const interval = window.setInterval(() => {
      setActiveProject((current) => (current + 1) % portfolio.projects.length)
    }, 6500)
    return () => window.clearInterval(interval)
  }, [showcasePaused, autoplayEnabled])

  const selectProject = (index: number, manual = false) => {
    setActiveProject(index)
    if (manual) setAutoplayEnabled(false)
  }
  const shiftProject = (direction: number) => {
    setAutoplayEnabled(false)
    setActiveProject((current) => (
      current + direction + portfolio.projects.length
    ) % portfolio.projects.length)
  }

  return (
    <main className="bento-page" id="top">
      <div className="bento-grid-bg" aria-hidden="true" />

      <div className="bento-shell">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease }}
          className="top-progress"
        />

        <Reveal>
          <header className="glass-card bento-nav">
            <a className="brand" href="#top">{portfolio.name}</a>
            <nav aria-label="Primary navigation">
              <a href="#work">Work</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#education">Education</a>
              <a href="#contact">Contact</a>
            </nav>
            <div className="nav-actions">
              <a href={portfolio.socialLinks[1].href} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={17} />
              </a>
              <button type="button" aria-label="Dark theme"><Moon size={16} /></button>
              <span className="nav-status" />
            </div>
          </header>
        </Reveal>

        <section className="hero-bento" aria-label="Introduction">
          <Reveal delay={0.08} className="glass-card hero-copy">
            <div className="role-pill"><Code2 size={16} /> {portfolio.role}</div>
            <h1>Code made <span>intelligent.</span></h1>
            <p>I build scalable products, real-time systems, and practical AI tools.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#work">View selected work <ArrowRight size={17} /></a>
            </div>
          </Reveal>

          <Reveal delay={0.18} className="glass-card hero-visual">
            <div className="visual-glow" />
            <motion.div
              className="orbit orbit-one"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="orbit orbit-two"
              animate={{ rotate: -360 }}
              transition={{ duration: 31, repeat: Infinity, ease: "linear" }}
            />
            <Image
              src="/skills-sculpture.png"
              alt="Chrome AI sculpture"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 38vw"
              className="object-cover"
            />
            <div className="visual-vignette" />
          </Reveal>
        </section>

        <section className="proof-strip" aria-label="Portfolio highlights">
          {[
            [Code2, "300+", "DSA problems solved"],
            [FolderCode, "8", "Projects built"],
            [BrainCircuit, "3", "AI / ML projects"],
            [MapPin, "India", "Open to opportunities"],
          ].map(([Icon, value, label], index) => (
            <Reveal key={String(label)} delay={0.1 + index * 0.05} className="proof-item">
              <Icon size={18} />
              <strong>{value as string}</strong>
              <span>{label as string}</span>
            </Reveal>
          ))}
        </section>

        <section id="work" className="work-section">
          <div className="section-line">
            <h2>Selected work <i /></h2>
            <a href={portfolio.socialLinks[1].href} target="_blank" rel="noreferrer">
              View all projects <ArrowRight size={15} />
            </a>
          </div>

          <div className="project-grid">
            {portfolio.projects.map((project, index) => {
              const Icon = projectIcons[index]
              return (
                <motion.article
                  key={project.title}
                  className={`glass-card project-tile ${activeProject === index ? "is-active" : ""}`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: index * 0.07, ease }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  onMouseEnter={() => selectProject(index)}
                  onClick={() => selectProject(index, true)}
                >
                  <div className={`project-preview preview-${index}`}>
                    <div className="preview-bar"><span /><span /><span /></div>
                    <Icon size={42} />
                    <div className="preview-lines"><i /><i /><i /></div>
                    {index === 3 && <div className="mini-chart"><b /><b /><b /><b /><b /></div>}
                  </div>
                  <div className={`project-category accent-${index}`}>{project.category}</div>
                  <span className={`project-state ${project.href === project.github ? "source-only" : ""}`}>
                    {project.href === project.github ? "Source only" : "Live"}
                  </span>
                  <div className="project-heading">
                    <h3>{project.title}</h3>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        selectProject(index, true)
                      }}
                      aria-label={`Preview ${project.title}`}
                    >
                      <ArrowRight size={17} />
                    </button>
                  </div>
                  <p>{project.description.split(".")[0]}.</p>
                  <div className="tech-chips">
                    {project.tech.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section
          className="glass-card live-showcase"
          aria-label="Live projects showcase"
          onMouseEnter={() => setShowcasePaused(true)}
          onMouseLeave={() => setShowcasePaused(false)}
          onFocusCapture={() => setShowcasePaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setShowcasePaused(false)
            }
          }}
        >
          <div className="showcase-topline">
            <div>
              <span className="showcase-kicker"><i /> Live projects showcase</span>
              <span className="showcase-status">
                {!autoplayEnabled ? "Manual" : showcasePaused ? "Paused" : "Autoplay"}
              </span>
            </div>
            <div className="showcase-controls">
              <button
                type="button"
                onClick={() => setAutoplayEnabled((enabled) => !enabled)}
                aria-label={autoplayEnabled ? "Pause autoplay" : "Resume autoplay"}
              >
                {autoplayEnabled ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button type="button" onClick={() => shiftProject(-1)} aria-label="Previous project">
                <ArrowLeft size={17} />
              </button>
              <span>{String(activeProject + 1).padStart(2, "0")} / {String(portfolio.projects.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => shiftProject(1)} aria-label="Next project">
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.title}
              className="showcase-stage"
              initial={{ opacity: 0, x: 34 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -34 }}
              transition={{ duration: 0.45, ease }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) shiftProject(1)
                if (info.offset.x > 60) shiftProject(-1)
              }}
            >
              <div className="live-browser">
                <div className="browser-bar">
                  <span className="browser-lights"><i /><i /><i /></span>
                  <span className="browser-address">{project.href.replace(/^https?:\/\//, "")}</span>
                  <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} in a new tab`}>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
                <div className="iframe-shell">
                  {hasLiveDemo && (
                    <iframe
                      src={project.href}
                      title={`${project.title} live website preview`}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  )}
                  <div className="iframe-fallback">
                    <Code2 size={30} />
                    <p>{hasLiveDemo ? "Preview blocked by the deployed website." : "This project is currently source-only."}</p>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {hasLiveDemo ? "Open live project" : "View source"}
                    </a>
                  </div>
                </div>
              </div>

              <div className="showcase-copy">
                <span className={`project-category accent-${activeProject}`}>{project.category}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="showcase-tech">
                  {project.tech.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="showcase-actions">
                  {hasLiveDemo && (
                    <a className="primary-action" href={project.href} target="_blank" rel="noreferrer">
                      Live demo <ArrowUpRight size={16} />
                    </a>
                  )}
                  <a className="secondary-action" href={project.github} target="_blank" rel="noreferrer">
                    <Github size={16} /> GitHub
                  </a>
                </div>
                <div className="showcase-dots" aria-label="Choose project">
                  {portfolio.projects.map((item, index) => (
                    <button
                      type="button"
                      key={item.title}
                      className={index === activeProject ? "is-active" : ""}
                      onClick={() => selectProject(index, true)}
                      aria-label={`Show ${item.title}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={`${activeProject}-${showcasePaused}`}
            className="showcase-progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showcasePaused || !autoplayEnabled ? 0 : 1 }}
            transition={{ duration: showcasePaused || !autoplayEnabled ? 0.2 : 6.5, ease: "linear" }}
          />
        </section>

        <section id="about" className="editorial-section about-section">
          <div>
            <span className="section-eyebrow">About me</span>
            <h2>Curious mind.<br />Builder by habit.</h2>
          </div>
          <p>{portfolio.about}</p>
          <div className="about-facts">
            <span><strong>B.E. CSE (AI & ML)</strong>Chandigarh University</span>
            <span><strong>{portfolio.location}</strong>Open to relocate</span>
            <span><strong>Interests</strong>AI, systems, web, problem solving</span>
          </div>
        </section>

        <section id="skills" className="capabilities-section">
          <div className="section-heading-large">
            <span className="section-eyebrow">Technical capabilities</span>
            <h2>A practical full-stack toolkit.</h2>
          </div>
          <div className="capability-grid">
            {portfolio.skillGroups.map((group, index) => {
              const Icon = [Code2, FolderCode, Database, BrainCircuit, Github, Code2][index]
              return (
                <article className="capability-card" key={group.title}>
                  <Icon size={25} />
                  <h3>{group.title}</h3>
                  <p>{group.skills}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section id="education" className="education-section">
          <div className="section-heading-large">
            <span className="section-eyebrow">Education & certifications</span>
            <h2>Learning, building, repeating.</h2>
          </div>
          <div className="education-timeline">
            {portfolio.education.map((item) => (
              <article key={item.institution}>
                <span>{item.period}</span>
                <i />
                <h3>{item.institution}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-slider" aria-label="Technology skills">
          <div className="skills-slider-heading">
            <span className="section-eyebrow">Skills slider</span>
            <p>Hover to pause. Swipe or scroll on touch devices.</p>
          </div>
          <div className="skills-slider-window" tabIndex={0}>
            <div className="skills-slider-track">
              {[...skills, ...skills].map((skill, index) => (
                <article
                  className="skill-slide"
                  key={`${skill.group}-${skill.name}-${index}`}
                  aria-hidden={index >= skills.length}
                >
                  <span className={`skill-slide-icon dot-${index % 4}`}><Code2 size={17} /></span>
                  <div>
                    <strong>{skill.name}</strong>
                    <small>{skill.group}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="glass-card contact-bar">
          <span className="contact-icon"><Send size={24} /></span>
          <div className="contact-copy">
            <h2>Let&apos;s build something intelligent together.</h2>
            <p>I&apos;m currently open to internships and full-time opportunities.</p>
          </div>
          <div className="contact-links">
            <a href={`mailto:${portfolio.email}`}><Mail size={18} /> {portfolio.email}</a>
            <a href={portfolio.socialLinks[0].href} target="_blank" rel="noreferrer">
              <Linkedin size={18} /> Connect on LinkedIn
            </a>
            <a className="contact-arrow" href={`mailto:${portfolio.email}`} aria-label="Email Tushar">
              <ArrowRight size={24} />
            </a>
          </div>
        </section>

        <footer>
          <span><ArrowDown size={16} /> Scroll to explore</span>
          <span className="footer-education">
            {portfolio.education[0].institution} / {portfolio.education[0].detail}
          </span>
          <span>{portfolio.education[0].institution} · {portfolio.education[0].detail}</span>
        </footer>
      </div>
    </main>
  )
}
