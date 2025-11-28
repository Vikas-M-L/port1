"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Code2, ChevronDown, Rocket, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const roles = ["AI/ML Engineer", "Full Stack Developer", "coder", "Automation Architect"]

const socialLinks = [
  { icon: Github, href: "https://github.com/Vikas-M-L", label: "GitHub", color: "#4ade80" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/vikas-m-l-775082299/", label: "LinkedIn", color: "#0ea5e9" },
  { icon: Code2, href: "https://leetcode.com/u/vikas___123/", label: "LeetCode", color: "#fbbf24" },
]

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const role = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, mounted])

  if (!mounted) {
    return (
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white">Loading...</h1>
        </div>
      </section>
    )
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f0a2e] to-[#0a0a1a]" />

      {/* Nebula effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[80px]"
          style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-[120px]"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col items-center text-center">
          {/* Status badge */}
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border mb-8 animate-fade-in"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(6,182,212,0.15) 100%)",
              borderColor: "rgba(139,92,246,0.4)",
              boxShadow: "0 0 30px rgba(139,92,246,0.2)",
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-sm font-mono text-white/80 tracking-wide">
              MISSION STATUS: <span className="text-green-400 font-semibold">OPEN TO OPPORTUNITIES</span>
            </span>
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>

          {/* Profile Image with Holographic Effect */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-8">
            {/* Rotating outer ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 animate-spin"
              style={{ animationDuration: "20s" }}
            />
            {/* Second ring */}
            <div
              className="absolute inset-2 rounded-full border border-purple-500/30 animate-spin"
              style={{ animationDuration: "15s", animationDirection: "reverse" }}
            />
            {/* Third ring */}
            <div
              className="absolute inset-4 rounded-full border border-orange-400/20 animate-spin"
              style={{ animationDuration: "25s" }}
            />
            {/* Glow effect */}
            <div
              className="absolute inset-6 rounded-full blur-xl opacity-60"
              style={{
                background: "linear-gradient(135deg, rgba(0,245,255,0.4), rgba(139,92,246,0.4), rgba(255,107,53,0.3))",
              }}
            />
            {/* Profile image container */}
            <div
              className="absolute inset-8 rounded-full overflow-hidden"
              style={{
                border: "3px solid rgba(0,245,255,0.6)",
                boxShadow: "0 0 40px rgba(0,245,255,0.4), inset 0 0 30px rgba(0,245,255,0.2)",
              }}
            >
              <img
                src="/images/vikas.jpg"
                alt="Vikas M L - AI/ML Engineer"
                className="w-full h-full object-cover object-top"
              />
              {/* Holographic overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,245,255,0.1) 0%, transparent 50%, rgba(139,92,246,0.1) 100%)",
                }}
              />
              {/* Scan lines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,245,255,0.1) 2px, rgba(0,245,255,0.1) 4px)",
                }}
              />
            </div>
            {/* Orbiting particles */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 animate-spin"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "0 0",
                  transform: `rotate(${i * 90}deg) translateX(90px)`,
                  boxShadow: "0 0 10px rgba(0,245,255,0.8)",
                  animationDuration: `${8 + i * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Name */}
          <div className="relative mb-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #00f5ff 50%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 30px rgba(0,245,255,0.5))",
                }}
              >
                VIKAS M L
              </span>
            </h1>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-1 rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          </div>

          {/* Typing role */}
          <div className="h-14 sm:h-16 flex items-center justify-center gap-3 mb-6">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 animate-pulse" />
            <div
              className="text-xl sm:text-2xl md:text-3xl font-mono font-bold px-4 py-2 rounded-lg"
              style={{
                background: "linear-gradient(135deg, rgba(255,107,53,0.15) 0%, rgba(0,245,255,0.15) 100%)",
                border: "1px solid rgba(255,107,53,0.4)",
              }}
            >
              <span className="text-cyan-400">{"<"}</span>
              <span
                style={{
                  background: "linear-gradient(90deg, #ff6b35, #00f5ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {displayText}
              </span>
              <span className="inline-block w-0.5 h-6 sm:h-7 bg-cyan-400 ml-1 animate-pulse" />
              <span className="text-cyan-400">{" />"}</span>
            </div>
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 animate-pulse" />
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            3rd-year <span className="text-white font-semibold">B.E. Computer Science & Engineering</span> student,
            launching innovative projects in <span className="text-cyan-400 font-bold">AI/ML</span>,{" "}
            <span className="text-orange-400 font-bold">Full-Stack Development</span>, and{" "}
            <span className="text-purple-400 font-bold">Automation Systems</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
            <Button
              size="lg"
              className="group relative overflow-hidden font-bold text-base px-8 py-6 rounded-xl text-[#0a0a1a]"
              style={{
                background: "linear-gradient(135deg, #00f5ff 0%, #0ea5e9 100%)",
                boxShadow: "0 0 30px rgba(0,245,255,0.4), 0 10px 40px rgba(0,245,255,0.2)",
              }}
              asChild
            >
              <a href="#projects">
                <Rocket className="w-5 h-5 mr-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                EXPLORE PROJECTS
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-bold text-base px-8 py-6 rounded-xl border-2 bg-transparent text-purple-300 hover:bg-white/5"
              style={{ borderColor: "rgba(139,92,246,0.5)" }}
              asChild
            >
              <a href="#contact">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse mr-2" />
                CONTACT ME
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group relative">
                <div
                  className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2"
                  style={{
                    background: `linear-gradient(135deg, ${link.color}20, ${link.color}10)`,
                    border: `2px solid ${link.color}50`,
                    boxShadow: `0 0 20px ${link.color}20`,
                  }}
                >
                  <link.icon
                    className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: link.color }}
                  />
                </div>
                <span
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                  style={{ color: link.color }}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono text-gray-400 tracking-wider">SCROLL TO EXPLORE</span>
        <ChevronDown className="w-6 h-6 text-cyan-400 animate-bounce" />
      </div>
    </section>
  )
}
