"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Check, MapPin } from "lucide-react"
import { portfolio } from "@/lib/portfolio-data"
import { SectionHeading } from "./section-heading"
import { CountUp } from "./count-up"

const stats = [
  { value: 8, suffix: "+", label: "Projects built" },
  { value: 300, suffix: "+", label: "LeetCode problems" },
  { value: 20, suffix: "+", label: "Technologies used" },
  { value: 3, suffix: "", label: "AI / ML projects" },
]

export function About() {
  return (
    <section id="about" data-section="about" className="section-space">
      <div className="site-shell">
        <SectionHeading label="01 / About" title="Building useful systems." />

        <div className="grid gap-12 lg:grid-cols-[.45fr_1fr]">
          <motion.aside
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="about-profile"
          >
            <span className="eyebrow">What I bring</span>
            <p className="mt-5 text-xl font-medium leading-snug">
              Product-minded engineering across interfaces, APIs, real-time systems, and applied AI.
            </p>

            <div className="mt-7 grid gap-3">
              {[
                "End-to-end product ownership",
                "Clean, scalable implementation",
                "Fast learning and iteration",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-accent/35 text-accent">
                    <Check size={13} />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-border pt-5">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={15} className="text-accent" />
                {portfolio.location}
              </p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                {portfolio.availability} <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.aside>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl text-balance text-3xl font-medium leading-tight sm:text-4xl lg:text-5xl"
            >
              {portfolio.about}
            </motion.p>

            <div className="mt-14 grid grid-cols-2 border-y border-border sm:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="border-border py-7 pr-4 odd:border-r sm:border-r sm:py-9 sm:pl-5 sm:first:pl-0 sm:last:border-r-0"
                >
                  <strong className="block text-3xl font-semibold sm:text-5xl">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </strong>
                  <span className="mt-2 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
