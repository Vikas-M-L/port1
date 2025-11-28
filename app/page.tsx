"use client"
import { useEffect } from "react"
import SpaceBackground from "@/components/space-background"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import TimelineSection from "@/components/timeline-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  // Add cursor effect
  useEffect(() => {
    const cursor = document.createElement("div")
    cursor.className = "cursor"
    document.body.appendChild(cursor)

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    }

    document.addEventListener("mousemove", moveCursor)

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor)
    }
  }, [])
  return (
    <main className="relative min-h-screen bg-[#0a0a0f]">
      <SpaceBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
