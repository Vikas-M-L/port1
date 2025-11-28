"use client"

import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#timeline" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("light")
  }

  if (!mounted) return null

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-cyan-400 group-hover:text-orange-400 transition-colors duration-300" />
            </div>
            <span className="text-xl font-bold tracking-wider">
              <span className="text-white">VIKAS</span>
              <span className="text-cyan-400">.</span>
              <span className="text-gray-400">DEV</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="relative px-4 py-2 group">
                <span
                  className={`relative z-10 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    activeSection === item.href.slice(1) ? "text-cyan-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}
                </span>
                {activeSection === item.href.slice(1) && (
                  <div
                    className="absolute left-1/2 -bottom-1 w-1.5 h-1.5 rounded-full bg-cyan-400 -translate-x-1/2 animate-pulse"
                    style={{ boxShadow: "0 0 8px rgba(0, 245, 255, 0.8)" }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Theme toggle & Mobile menu */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative overflow-hidden">
              {isDark ? <Moon className="w-5 h-5 text-cyan-400" /> : <Sun className="w-5 h-5 text-orange-400" />}
            </Button>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg transition-colors duration-300 ${
                activeSection === item.href.slice(1)
                  ? "bg-cyan-400/10 text-cyan-400"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
