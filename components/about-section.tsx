"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Terminal, Cpu, Globe, Zap, Award, Code } from "lucide-react"

const stats = [
  { icon: Code, value: "90-95%", label: "ISL Accuracy", color: "text-neon-cyan" },
  { icon: Terminal, value: "4+", label: "Major Projects", color: "text-supernova-orange" },
  { icon: Award, value: "3rd Place", label: "MedAI Hackathon", color: "text-nebula-purple" },
  { icon: Globe, value: "MERN + AI/ML", label: "Tech Stacks", color: "text-nebula-pink" },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.2 })

  return (
    <section id="about" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-nebula-purple/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-4">
            <span className="text-neon-cyan font-mono text-sm">MISSION LOG</span>
            <span className="text-muted-foreground font-mono text-sm">ACTIVE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Vikas M L <span className="text-neon-cyan">| CSE</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-nebula-purple mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Astronaut visual */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Floating astronaut helmet */}
              <div className="relative animate-float">
                <div
                  className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-secondary via-muted to-secondary border border-border/50"
                  style={{ boxShadow: "0 0 60px rgba(0, 245, 255, 0.1), inset 0 0 60px rgba(139, 92, 246, 0.1)" }}
                >
                  {/* Visor with YOUR code reflection */}
                  <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gradient-to-br from-space-black/90 to-space-black/70">
                    <div className="absolute inset-0 opacity-40 overflow-hidden">
                      <div className="font-mono text-xs text-neon-cyan/60 leading-relaxed animate-pulse p-4">
                        <div>{"const vikas = {"}</div>
                        <div className="ml-4">{'college: "Cambridge Institute",'}</div>
                        <div className="ml-4">{'projects: ["ISL Translator"],'}</div>
                        <div className="ml-4">{'hackathons: "3rd MedAI",'}</div>
                        <div className="ml-4">{'internships: 2,'}</div>
                        <div>{"status: 'Orbit Achieved'"}</div>
                        <div>{"};"}</div>
                      </div>
                    </div>
                    {/* Visor glare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-neon-cyan/5 to-transparent" />
                  </div>
                </div>

                {/* Orbital decorations */}
                <div
                  className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-supernova-orange/20 animate-pulse"
                  style={{ boxShadow: "0 0 20px rgba(255, 107, 53, 0.4)" }}
                />
                <div
                  className="absolute -bottom-2 -left-6 w-6 h-6 rounded-full bg-neon-cyan/20 animate-pulse"
                  style={{ boxShadow: "0 0 15px rgba(0, 245, 255, 0.4)", animationDelay: "0.5s" }}
                />
              </div>
            </div>
          </div>

          {/* Right - YOUR REAL CONTENT */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-400 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">3rd-year CSE @ Cambridge Institute of Technology</span>. 
                Built <span className="text-neon-cyan">ISL Translator (90-95% accuracy)</span> using TensorFlow.js + MediaPipe.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Full-stack expertise with <span className="text-supernova-orange">MERN Stack</span> (Stock Management System) 
                + <span className="text-nebula-purple">Python/FastAPI</span> for AI inference.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <span className="text-neon-cyan">3rd Place MedAI Hackathon</span> | Samsung PRISM Research | 
                Assistive Technology Acclerator, Frontend Intern. Bangalore-based 🚀
              </p>
            </div>

            {/* YOUR Tech stack */}
            <div className="flex flex-wrap gap-2 pt-4">
              {["Python", "TensorFlow", "React", "Node.js", "MediaPipe", "MongoDB", "FastAPI", "Next.js"].map((tech, i) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm font-mono rounded-full bg-secondary/50 border border-border/50 text-muted-foreground hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* YOUR Stats */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 transition-all duration-1000 delay-600 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-neon-cyan/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at center, rgba(0,245,255,0.05) 0%, transparent 70%)" }}
              />
              <stat.icon
                className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
              />
              <div className={`text-3xl font-display font-bold ${stat.color} mb-1`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
