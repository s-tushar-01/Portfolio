import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { portfolio } from "@/lib/portfolio-data"
import { MotionBackground } from "@/components/motion-background"
import { MotionSystem } from "@/components/motion-system"
import "./globals.css"

export const metadata: Metadata = {
  title: `${portfolio.name} | ${portfolio.role}`,
  description: portfolio.intro,
  authors: [{ name: portfolio.name }],
}

export const viewport: Viewport = {
  themeColor: "#10100f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <MotionBackground />
        <MotionSystem />
        {children}
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  )
}
