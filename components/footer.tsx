"use client"

import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { portfolio } from "@/lib/portfolio-data"

export function Footer() {
  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="pb-8">
      <div className="site-shell flex flex-col gap-5 border-t border-border pt-6 text-xs uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <motion.p whileHover={{ color: "var(--foreground)" }}>
          © {new Date().getFullYear()} {portfolio.name}
        </motion.p>
        <p>Designed with intent. Built with care.</p>
        <motion.button
          type="button"
          onClick={backToTop}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="footer-top inline-flex items-center gap-2 text-foreground"
        >
          Back to top <ArrowUp size={14} />
        </motion.button>
      </div>
    </footer>
  )
}
