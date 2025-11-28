"use client"

import { Github, Linkedin, Code2, Heart, Rocket } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "{GitHub_Link}", label: "GitHub" },
  { icon: Linkedin, href: "{LinkedIn_Link}", label: "LinkedIn" },
  { icon: Code2, href: "{LeetCode_Link}", label: "LeetCode" },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-space-black/50 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-neon-cyan" />
            <span className="font-display text-xl font-bold">
              <span className="text-foreground">VIKAS</span>
              <span className="text-neon-cyan">.</span>
              <span className="text-muted-foreground">DEV</span>
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-secondary/50 border border-border/50 hover:border-neon-cyan/50 transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-neon-cyan transition-colors" />
                {/* Orbital ring on hover */}
                <div className="absolute inset-0 rounded-full border border-neon-cyan/0 group-hover:border-neon-cyan/30 group-hover:scale-150 transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {["Home", "About", "Skills", "Projects", "Journey", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Vikas M L. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-supernova-orange animate-pulse" /> and code
            </span>
          </div>

          {/* Fun tagline */}
          <p className="text-xs font-mono text-muted-foreground/50">
            // Launched from Bangalore, orbiting the tech universe 🚀
          </p>
        </div>
      </div>
    </footer>
  )
}
