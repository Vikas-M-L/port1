"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"

const skillCategories = [
  {
    name: "Languages",
    skills: [
      { name: "Python", level: 95, icon: "🐍" },
      { name: "JavaScript", level: 90, icon: "⚡" },
      { name: "TypeScript", level: 85, icon: "📘" },
      { name: "Java", level: 80, icon: "☕" },
      { name: "C++", level: 75, icon: "⚙️" },
    ],
  },
  {
    name: "AI/ML",
    skills: [
      { name: "TensorFlow", level: 90, icon: "🧠" },
      { name: "PyTorch", level: 85, icon: "🔥" },
      { name: "Scikit-learn", level: 88, icon: "📊" },
      { name: "OpenCV", level: 82, icon: "👁️" },
      { name: "NLP", level: 78, icon: "💬" },
    ],
  },
  {
    name: "Web Dev",
    skills: [
      { name: "React", level: 92, icon: "⚛️" },
      { name: "Next.js", level: 88, icon: "▲" },
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "PostgreSQL", level: 80, icon: "🐘" },
      { name: "MongoDB", level: 78, icon: "🍃" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 90, icon: "📂" },
      { name: "Docker", level: 82, icon: "🐳" },
      { name: "AWS", level: 75, icon: "☁️" },
      { name: "Linux", level: 85, icon: "🐧" },
      { name: "CI/CD", level: 78, icon: "🔄" },
    ],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.2 })
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,245,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.3) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-4">
            <span className="text-neon-cyan font-mono text-sm"></span>
            <span className="text-muted-foreground font-mono text-sm"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Tech <span className="text-neon-cyan">Arsenal</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-nebula-purple mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Radar Chart Visualization */}
          <div
            className={`transition-all duration-1000 delay-200 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Scanner effect */}
              <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/20" />
              <div className="absolute inset-[10%] rounded-full border border-neon-cyan/15" />
              <div className="absolute inset-[20%] rounded-full border border-neon-cyan/10" />
              <div className="absolute inset-[30%] rounded-full border border-neon-cyan/5" />

              {/* Rotating scanner line */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div
                  className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left animate-rotate-ring"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,245,255,0.8) 0%, transparent 100%)",
                    animationDuration: "4s",
                  }}
                />
              </div>

              {/* Skill points on radar */}
              {skillCategories[activeCategory].skills.map((skill, index) => {
                const angle = (index / skillCategories[activeCategory].skills.length) * Math.PI * 2 - Math.PI / 2
                const radius = (skill.level / 100) * 45 // percentage of radius
                const x = 50 + Math.cos(angle) * radius
                const y = 50 + Math.sin(angle) * radius

                return (
                  <div
                    key={skill.name}
                    className="absolute transition-all duration-500"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg transition-all duration-300 ${hoveredSkill === skill.name ? "scale-150" : "scale-100"}`}
                      style={{
                        background:
                          hoveredSkill === skill.name
                            ? "radial-gradient(circle, rgba(0,245,255,0.3) 0%, rgba(0,245,255,0.1) 100%)"
                            : "radial-gradient(circle, rgba(0,245,255,0.2) 0%, rgba(0,245,255,0.05) 100%)",
                        boxShadow:
                          hoveredSkill === skill.name ? "0 0 30px rgba(0,245,255,0.5)" : "0 0 15px rgba(0,245,255,0.3)",
                      }}
                    >
                      <span className="text-sm sm:text-base">{skill.icon}</span>
                    </div>
                    {hoveredSkill === skill.name && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="text-xs font-mono text-neon-cyan">
                          {skill.name}: {skill.level}%
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Center info */}
              <div className="absolute inset-[35%] rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-display font-bold text-neon-cyan">
                  {skillCategories[activeCategory].skills.reduce((acc, s) => acc + s.level, 0) /
                    skillCategories[activeCategory].skills.length}
                  %
                </span>
                <span className="text-xs text-muted-foreground font-mono">AVG POWER</span>
              </div>
            </div>
          </div>

          {/* Right - Skill Details */}
          <div
            className={`transition-all duration-1000 delay-400 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skillCategories.map((category, index) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(index)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                    activeCategory === index
                      ? "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50"
                      : "bg-secondary/50 text-muted-foreground border border-border/50 hover:border-neon-cyan/30"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Fuel gauge progress bars */}
            <div className="space-y-4">
              {skillCategories[activeCategory].skills.map((skill, index) => (
                <div key={skill.name} className="group" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{skill.icon}</span>
                      <span className="font-medium text-foreground">{skill.name}</span>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="relative h-3 rounded-full bg-secondary/50 border border-border/50 overflow-hidden">
                    {/* Fuel gauge fill */}
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isInView ? `${skill.level}%` : "0%",
                        background: `linear-gradient(90deg, 
                          rgba(0, 245, 255, 0.8) 0%, 
                          rgba(139, 92, 246, 0.8) 50%, 
                          rgba(255, 107, 53, 0.8) 100%)`,
                        boxShadow: "0 0 20px rgba(0, 245, 255, 0.5)",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                    {/* Animated glow effect */}
                    <div
                      className="absolute inset-y-0 w-8 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{
                        left: isInView ? `calc(${skill.level}% - 32px)` : "0%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                        transition: "left 1s ease-out",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
