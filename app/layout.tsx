import type React from "react"
import type { Metadata, Viewport } from "next"
import { Orbitron, Rajdhani, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Vikas M L | Space Coder - AI/ML Engineer & Full Stack Developer",
  description:
    "Portfolio of Vikas M L, a 3rd-year B.E. CSE student specializing in AI/ML, Full Stack Development, and Automation Systems. Launching innovative projects into orbit.",
  keywords: ["AI/ML", "Full Stack Developer", "Python", "React", "TensorFlow", "Machine Learning"],
  authors: [{ name: "Vikas M L" }],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
