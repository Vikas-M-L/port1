"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ExternalLink, Github, X, Rocket, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const projects = [
  {
    id: 1,
    title: "ISL Gesture Translator",
    description: "Real-time Indian Sign Language to text/speech conversion using deep learning with 95% accuracy.",
    longDescription:
      "A comprehensive ML pipeline that captures hand gestures via webcam, processes them through a custom CNN architecture, and translates Indian Sign Language into text and speech in real-time. Features include multi-hand detection, continuous gesture recognition, and text-to-speech synthesis.",
    tech: ["TensorFlow", "OpenCV", "Python", "MediaPipe"],
    image: "/hand-gesture-recognition-ai-machine-learning-visua.jpg",
    github: "#",
    live: "#",
    stats: { accuracy: "95%", latency: "< 100ms", gestures: "50+" },
    color: "#00f5ff",
  },
  {
    id: 2,
    title: "Intelligent Stock Manager",
    description: "Full-stack inventory management system with AI-powered demand forecasting and analytics.",
    longDescription:
      "Enterprise-grade stock management solution featuring real-time inventory tracking, predictive analytics for demand forecasting using LSTM models, automated reorder points, and comprehensive reporting dashboards. Built with scalability and security in mind.",
    tech: ["React", "Node.js", "PostgreSQL", "TensorFlow.js"],
    image: "/inventory-management-dashboard-analytics-charts-mo.jpg",
    github: "#",
    live: "#",
    stats: { users: "500+", predictions: "87% accurate", uptime: "99.9%" },
    color: "#ff6b35",
  },
  {
    id: 3,
    title: "WhatsApp AI Agent",
    description: "Intelligent chatbot with NLP capabilities for automated customer support and task management.",
    longDescription:
      "An AI-powered WhatsApp bot that handles customer queries, schedules appointments, manages tasks, and provides intelligent responses using GPT integration. Features include context-aware conversations, multi-language support, and seamless CRM integration.",
    tech: ["Python", "LangChain", "FastAPI", "Redis"],
    image: "/ai-chatbot-messaging-interface-modern-dark-theme.jpg",
    github: "#",
    live: "#",
    stats: { messages: "10K+/day", languages: "5+", satisfaction: "92%" },
    color: "#8b5cf6",
  },
  {
    id: 4,
    title: "MedAI Diagnosis Assistant",
    description:
      "Healthcare AI for preliminary disease prediction and medical image analysis. 3rd Place at MedAI Hackathon.",
    longDescription:
      "Award-winning healthcare application that uses ensemble ML models for disease prediction based on symptoms, coupled with CNN-based medical image analysis for X-rays and MRIs. Includes patient history tracking and doctor recommendation system.",
    tech: ["PyTorch", "Flask", "React Native", "MongoDB"],
    image: "/medical-ai-healthcare-dashboard-xray-analysis-mode.jpg",
    github: "#",
    live: "#",
    stats: { accuracy: "91%", diseases: "50+", award: "3rd Place" },
    color: "#ec4899",
  },
  {
    id: 5,
    title: "Smart Home Automation",
    description: "IoT-based home automation system with voice control, energy monitoring, and predictive maintenance.",
    longDescription:
      "Complete smart home solution featuring voice-controlled device management, real-time energy consumption monitoring, ML-based predictive maintenance alerts, and automated scheduling. Integrates with major IoT protocols and smart devices.",
    tech: ["Python", "MQTT", "React", "Raspberry Pi"],
    image: "/smart-home-iot-dashboard-dark-theme-modern-interfa.jpg",
    github: "#",
    live: "#",
    stats: { devices: "20+", energy: "-30%", uptime: "99.5%" },
    color: "#10b981",
  },
  {
    id: 6,
    title: "Code Collaboration Platform",
    description: "Real-time collaborative coding environment with AI-powered code suggestions and review.",
    longDescription:
      "A modern code collaboration platform featuring real-time multi-user editing, AI-powered code completion and suggestions, integrated video calling, version control visualization, and automated code review with security analysis.",
    tech: ["Next.js", "Socket.io", "Monaco", "OpenAI"],
    image: "/code-editor-collaboration-platform-dark-theme-ide.jpg",
    github: "#",
    live: "#",
    stats: { users: "1K+", languages: "15+", suggestions: "95% helpful" },
    color: "#f59e0b",
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.1 })
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-supernova-orange/20 rounded-full blur-3xl" />
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
            Featured <span className="text-neon-cyan">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-nebula-purple mx-auto rounded-full" />
        </div>

        {/* Projects grid - Hexagonal style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className="relative overflow-hidden rounded-2xl bg-card/50 border border-border/50 transition-all duration-500 hover:border-transparent"
                style={{
                  transform: hoveredId === project.id ? "translateY(-8px)" : "translateY(0)",
                  boxShadow:
                    hoveredId === project.id
                      ? `0 20px 40px -20px ${project.color}40, 0 0 0 1px ${project.color}40`
                      : "none",
                }}
              >
                {/* Project image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                  {/* Thruster flame effect on hover */}
                  {hoveredId === project.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8">
                      <div
                        className="w-full h-full rounded-t-full animate-pulse"
                        style={{
                          background: `linear-gradient(to top, ${project.color}, transparent)`,
                          filter: "blur(4px)",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono rounded bg-secondary/50 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 text-xs font-mono rounded bg-secondary/50 text-muted-foreground">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10"
                      onClick={() => setSelectedProject(project)}
                    >
                      View Mission <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <a href={project.github} className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                        <Github className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </a>
                      <a href={project.live} className="p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                        <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-20"
                  style={{
                    background: `linear-gradient(135deg, ${project.color} 0%, transparent 100%)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal - Command Center Overlay */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-black/90 backdrop-blur-xl"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl bg-card border border-border/50"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: `0 0 100px -20px ${selectedProject.color}40`,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

              {/* Holographic grid overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                  linear-gradient(${selectedProject.color}20 1px, transparent 1px),
                  linear-gradient(90deg, ${selectedProject.color}20 1px, transparent 1px)
                `,
                  backgroundSize: "20px 20px",
                }}
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-2">
                    {selectedProject.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm font-mono rounded-full border"
                        style={{
                          borderColor: `${selectedProject.color}50`,
                          color: selectedProject.color,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Rocket className="w-12 h-12" style={{ color: selectedProject.color }} />
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">{selectedProject.longDescription}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.entries(selectedProject.stats).map(([key, value]) => (
                  <div key={key} className="p-4 rounded-xl bg-secondary/30 border border-border/50 text-center">
                    <div className="text-2xl font-display font-bold mb-1" style={{ color: selectedProject.color }}>
                      {value}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">{key}</div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-4">
                <Button
                  className="flex-1"
                  style={{
                    backgroundColor: selectedProject.color,
                    color: "#0a0a0f",
                  }}
                  asChild
                >
                  <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Launch Demo
                  </a>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Source
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
