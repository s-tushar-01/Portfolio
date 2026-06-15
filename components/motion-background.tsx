"use client"

import { motion, useScroll, useTransform } from "framer-motion"

export function MotionBackground() {
  const { scrollYProgress } = useScroll()
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "8%"])
  const reverseDrift = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"])

  return (
    <div className="motion-background" aria-hidden="true">
      <motion.div
        className="motion-background-layer motion-background-layer-one"
        style={{ y: drift }}
      />
      <motion.div
        className="motion-background-layer motion-background-layer-two"
        style={{ y: reverseDrift }}
      />
      <div className="motion-background-shade" />
    </div>
  )
}
