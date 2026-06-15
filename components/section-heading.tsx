"use client"

import { motion } from "framer-motion"

interface SectionHeadingProps {
  label: string
  title: string
  description?: string
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-14 grid gap-5 overflow-hidden border-t border-border pt-5 md:grid-cols-[.45fr_1fr]">
      <motion.span
        initial={{ opacity: 0, x: -42 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="eyebrow"
      >
        {label}
      </motion.span>
      <motion.div
        initial={{ opacity: 0, x: 52 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="section-title overflow-hidden">
          <span className="block">{title}</span>
        </h2>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  )
}
