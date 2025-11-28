"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Award, Briefcase, GraduationCap, Rocket, Star } from "lucide-react"

const milestones = [
  {
    year: "2025-2026",
    title: "Samsung PRISM Program",
    description: "Selected for Samsung's prestigious research initiative, working on cutting-edge AI/ML projects.",
    icon: Star,
    type: "achievement",
    color: "#00f5ff",
  },
  {
    year: "2025",
    title: "MedAI Hackathon - 3rd Place",
    description:
      "Developed healthcare AI solution for preliminary disease prediction, securing 3rd place among 100+ teams.",
    icon: Award,
    type: "award",
    color: "#ff6b35",
  },
  {
    year: "2024",
    title: "ATA Internship",
    description:
      "Built accessible technology solutions for visually impaired users, including ISL translator achieving 95% accuracy.",
    icon: Briefcase,
    type: "internship",
    color: "#8b5cf6",
  },
  {
    year: "2024",
    title: "Full Stack Development ",
    description:
      "Led development of multiple production applications, managing team of 5 developers for college projects.",
    icon: Rocket,
    type: "achievement",
    color: "#ec4899",
  },
  {
    year: "2023",
    title: "B.E. Computer Science & Engineering",
    description: "Started Bachelor's degree at Cambridge institute of Technology, specializing in computer science enginnering.",
    icon: GraduationCap,
    type: "education",
    color: "#10b981",
  },
]

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section id="timeline" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-4">
            <span className="text-neon-cyan font-mono text-sm"></span>
            <span className="text-muted-foreground font-mono text-sm"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Journey <span className="text-neon-cyan">Timeline</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-nebula-purple mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central trajectory line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-cyan via-nebula-purple to-supernova-orange rounded-full transform sm:-translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isLeft = index % 2 === 0

              return (
                <div
                  key={milestone.title}
                  className={`relative flex items-center transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline node */}
                  <div
                    className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 z-10"
                    style={{
                      backgroundColor: milestone.color,
                      boxShadow: `0 0 20px ${milestone.color}80`,
                    }}
                  >
                    {/* Orbital ring */}
                    <div
                      className="absolute inset-0 rounded-full border animate-rotate-ring"
                      style={{
                        borderColor: `${milestone.color}40`,
                        transform: "scale(2)",
                        animationDuration: "10s",
                      }}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${isLeft ? "sm:mr-auto sm:pr-8" : "sm:ml-auto sm:pl-8"}`}
                  >
                    <div
                      className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-transparent transition-all duration-300"
                      style={{
                        boxShadow: `inset 0 0 0 1px transparent`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 30px -10px ${milestone.color}40, inset 0 0 0 1px ${milestone.color}40`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `inset 0 0 0 1px transparent`
                      }}
                    >
                      {/* Year badge */}
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-mono mb-3"
                        style={{
                          backgroundColor: `${milestone.color}20`,
                          color: milestone.color,
                        }}
                      >
                        <Icon className="w-4 h-4" />
                        {milestone.year}
                      </div>

                      <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-neon-cyan transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>

                      {/* Decorative corner */}
                      <div
                        className="absolute top-0 right-0 w-12 h-12 opacity-10 group-hover:opacity-30 transition-opacity"
                        style={{
                          background: `linear-gradient(135deg, ${milestone.color} 0%, transparent 100%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Rocket at bottom */}
          <div
            className={`flex justify-center mt-12 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: `${milestones.length * 150}ms` }}
          >
            <div className="relative">
              <Rocket
                className="w-12 h-12 text-neon-cyan transform rotate-180"
                style={{ filter: "drop-shadow(0 0 20px rgba(0, 245, 255, 0.5))" }}
              />
              {/* Thruster flame */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-8">
                <div
                  className="w-full h-full rounded-b-full animate-pulse"
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,107,53,0.8), rgba(255,200,50,0.5), transparent)",
                    filter: "blur(2px)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
