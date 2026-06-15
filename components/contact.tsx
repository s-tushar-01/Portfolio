"use client"

import type { FormEvent, MouseEvent } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowUpRight, Send } from "lucide-react"
import { portfolio } from "@/lib/portfolio-data"

export function Contact() {
  const buttonX = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })
  const buttonY = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 })

  const handlePointerMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    buttonX.set((event.clientX - rect.left - rect.width / 2) * 0.22)
    buttonY.set((event.clientY - rect.top - rect.height / 2) * 0.22)
  }

  const resetButton = () => {
    buttonX.set(0)
    buttonY.set(0)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = form.get("name")
    const email = form.get("email")
    const project = form.get("project")
    const body = `Hi ${portfolio.name},\n\n${project}\n\nFrom: ${name} (${email})`
    window.location.href = `mailto:${portfolio.email}?subject=${encodeURIComponent(
      `Project inquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" data-section="contact" className="section-space">
      <div className="site-shell">
        <div className="contact-panel">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow text-white/65">05 / Contact</span>
            <h2 className="mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              Building something interesting? Let&apos;s connect.
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-12 border-t border-white/25 pt-10 lg:grid-cols-[.45fr_1fr]">
            <div>
              <p className="text-sm leading-relaxed text-white/65">Prefer email?</p>
              <a
                href={`mailto:${portfolio.email}`}
                className="mt-2 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-white"
              >
                {portfolio.email} <ArrowUpRight size={15} />
              </a>
              <p className="mt-3 text-sm text-white/65">{portfolio.phone}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                {portfolio.socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="contact-field">
                  <span>Your name</span>
                  <input name="name" required placeholder="Jane Smith" />
                </label>
                <label className="contact-field">
                  <span>Your email</span>
                  <input name="email" type="email" required placeholder="jane@company.com" />
                </label>
              </div>
              <label className="contact-field">
                <span>Tell me about the project</span>
                <textarea
                  name="project"
                  required
                  rows={4}
                  placeholder="A short description, timeline, and what success looks like..."
                />
              </label>
              <motion.button
                type="submit"
                onMouseMove={handlePointerMove}
                onMouseLeave={resetButton}
                onBlur={resetButton}
                whileTap={{ scale: 0.94 }}
                style={{ x: buttonX, y: buttonY }}
                className="magnetic-button button w-fit bg-white text-black hover:bg-white/85"
              >
                Send inquiry <Send size={15} />
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
