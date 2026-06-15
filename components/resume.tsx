"use client"

import { motion } from "framer-motion"
import { ArrowDownToLine } from "lucide-react"
import { portfolio } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"

export function Resume() {
  return (
    <section id="education" data-section="education" className="section-space bg-panel">
      <div className="site-shell">
        <SectionHeading label="04 / Education" title="Learning, building, repeating." />

        <div className="grid gap-12 lg:grid-cols-[.45fr_1fr]">
          <div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Currently pursuing a B.E. in Computer Science Engineering with a specialization in Artificial Intelligence and Machine Learning.
            </p>
            <a href="/Tushar_Resume.docx" download className="button button-outline mt-7">
              Download resume <ArrowDownToLine size={16} />
            </a>

            <div className="mt-9">
              <span className="eyebrow">Certifications</span>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {portfolio.certifications.map((certification) => (
                  <li key={certification}>{certification}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border">
            {portfolio.education.map((item, index) => (
              <motion.div
                key={`${item.institution}-${item.period}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="grid gap-2 border-b border-border py-7 sm:grid-cols-[.6fr_1fr_1fr] sm:items-center"
              >
                <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {item.period}
                </span>
                <strong className="text-xl font-medium">{item.institution}</strong>
                <span className="text-muted-foreground sm:text-right">{item.detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
