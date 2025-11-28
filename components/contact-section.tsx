"use client"

import type React from "react"
import emailjs from "@emailjs/browser"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle, AlertCircle, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.2 })
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [signalStrength, setSignalStrength] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submittedMessages, setSubmittedMessages] = useState<string[]>([])
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""

  // Initialize EmailJS SDK once with public key
  if (typeof window !== "undefined" && PUBLIC_KEY) {
    try {
      emailjs.init(PUBLIC_KEY)
    } catch (e) {
      // swallow init errors; send() will still attempt
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState("loading")
    setSignalStrength(0)

    // Animate signal while sending
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setSignalStrength(progress)
      if (progress >= 100) clearInterval(interval)
    }, 120)

    // Guard: ensure env keys present
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn("EmailJS env keys missing. Check .env.local and restart dev server.")
      clearInterval(interval)
      setFormState("error")
      setTimeout(() => {
        setFormState("idle")
        setSignalStrength(0)
      }, 3500)
      return
    }

    // Try EmailJS SDK first, then fall back to REST if needed
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        PUBLIC_KEY
      )
    } catch (sdkErr) {
      const errMsg = sdkErr instanceof Error ? sdkErr.message : JSON.stringify(sdkErr)
      console.error("EmailJS SDK failed, attempting REST fallback", errMsg)
      try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: SERVICE_ID,
            template_id: TEMPLATE_ID,
            user_id: PUBLIC_KEY,
            template_params: {
              from_name: formData.name,
              from_email: formData.email,
              subject: formData.subject,
              message: formData.message,
            },
          }),
        })
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || `HTTP ${res.status}`)
        }
      } catch (restErr) {
        clearInterval(interval)
        console.error("EmailJS REST failed", restErr)
        setFormState("error")
        setTimeout(() => {
          setFormState("idle")
          setSignalStrength(0)
        }, 3500)
        return
      }
    }

    // Success path (SDK or REST)
    clearInterval(interval)
    setSignalStrength(100)
    const messageLog = `📨 [${new Date().toLocaleString()}] ${formData.name}: ${formData.subject}`
    const messages = JSON.parse(localStorage.getItem("vikas-contact-messages") || "[]")
    messages.unshift(messageLog)
    const latest = messages.slice(0, 5)
    localStorage.setItem("vikas-contact-messages", JSON.stringify(latest))
    setSubmittedMessages(latest)
    setFormState("success")
    setFormData({ name: "", email: "", subject: "", message: "" })

    setTimeout(() => {
      setFormState("idle")
      setSignalStrength(0)
    }, 3500)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Success supernova effect */}
      {formState === "success" && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <div
            className="w-4 h-4 rounded-full bg-neon-cyan animate-supernova-success"
            style={{
              boxShadow: "0 0 100px 50px rgba(0, 245, 255, 0.8)",
            }}
          />
        </div>
      )}

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-nebula-purple/5 rounded-full blur-3xl" />
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
            Establish <span className="text-neon-cyan">Contact</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-nebula-purple mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div
            className={`transition-all duration-1000 delay-200 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  Ready to Launch a Project Together?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you have a mission-critical project, an innovative idea, or just want to say hello, I'm always
                  ready to receive transmissions. Let's build something extraordinary together!
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "vikasml9353@gmail.com", href: "mailto:vikasml9353gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 9353141986", href: "tel:+919353141986" },
                  { icon: MapPin, label: "Location", value: "Bangalore, India", href: "#" },
                ].map((contact, index) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-neon-cyan/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-secondary/50 group-hover:bg-neon-cyan/10 transition-colors">
                      <contact.icon className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{contact.label}</div>
                      <div className="font-medium text-foreground group-hover:text-neon-cyan transition-colors">
                        {contact.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Signal strength indicator */}
              <div className="p-4 rounded-xl bg-card/50 border border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <Radio className="w-5 h-5 text-neon-cyan" />
                  <span className="text-sm font-mono text-muted-foreground">Communication Array Status</span>
                </div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <div
                      key={bar}
                      className="flex-1 rounded transition-all duration-300"
                      style={{
                        backgroundColor:
                          formState === "loading" && signalStrength >= bar * 20
                            ? "rgba(0, 245, 255, 0.8)"
                            : formState === "success"
                              ? "rgba(16, 185, 129, 0.8)"
                              : "rgba(0, 245, 255, 0.2)",
                        height: `${bar * 8}px`,
                        boxShadow:
                          formState === "loading" && signalStrength >= bar * 20
                            ? "0 0 15px rgba(0, 245, 255, 0.5)"
                            : "none",
                      }}
                    />
                  ))}
                </div>
                <div className="mt-2 text-xs font-mono text-center">
                  {formState === "idle" && <span className="text-neon-cyan">● ONLINE - Awaiting Transmission</span>}
                  {formState === "loading" && (
                    <span className="text-supernova-orange animate-pulse">● TRANSMITTING...</span>
                  )}
                  {formState === "success" && <span className="text-green-500">● TRANSMISSION SUCCESSFUL</span>}
                  {formState === "error" && <span className="text-red-500">● TRANSMISSION FAILED</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div
            className={`transition-all duration-1000 delay-400 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <form onSubmit={handleSubmit} className="relative p-8 rounded-2xl bg-card/50 border border-border/50">
              {/* Grid overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-5 pointer-events-none"
                style={{
                  backgroundImage: `
                  linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
                `,
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Live Preview */}
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-neon-cyan/5 to-nebula-purple/5 border border-neon-cyan/30">
                <div className="flex items-center gap-2 mb-3">
                  <Radio className="w-4 h-4 text-neon-cyan" />
                  <span className="text-sm font-mono text-neon-cyan">📡 Live Transmission Preview</span>
                </div>
                {formData.name || formData.email || formData.subject || formData.message ? (
                  <div className="space-y-2 p-4 bg-space-black/90 rounded-lg border border-neon-cyan/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-xs text-neon-cyan mb-2">
                      <span>👤</span>
                      <span className="font-mono">{formData.name || "Anonymous"}</span>
                      <span className="text-neon-cyan/70">•</span>
                      <span className="font-mono text-xs">{formData.email || "no-email"}</span>
                    </div>
                    <div className="text-xs font-mono text-nebula-purple truncate">📋 {formData.subject || "No subject"}</div>
                    <div className="text-xs font-mono text-muted-foreground max-h-20 overflow-hidden leading-relaxed pr-2">
                      {formData.message || "Your message will appear here..."}
                    </div>
                    <div className="flex items-center justify-between text-xs text-neon-cyan/70 mt-3 pt-2 border-t border-neon-cyan/20">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span>Signal locked</span>
                      </div>
                      <span>{formData.message.length}/500 chars</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-neon-cyan/10 border-2 border-dashed border-neon-cyan/30 flex items-center justify-center">
                      <Radio className="w-6 h-6 text-neon-cyan/50" />
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">👆 Fill form to preview transmission</p>
                  </div>
                )}
              </div>

              <div className="relative space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-muted-foreground">Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                      placeholder="Enter your name..."
                      className="bg-secondary/50 border-border/50 focus:border-neon-cyan/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-muted-foreground">Email</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="bg-secondary/50 border-border/50 focus:border-neon-cyan/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-mono text-muted-foreground">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData((d) => ({ ...d, subject: e.target.value }))}
                    placeholder="Mission objective..."
                    className="bg-secondary/50 border-border/50 focus:border-neon-cyan/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-mono text-muted-foreground">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value.slice(0, 500) }))}
                    placeholder="Your transmission..."
                    rows={5}
                    className="bg-secondary/50 border-border/50 focus:border-neon-cyan/50 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formState === "loading" || formState === "success"}
                  className={`w-full relative overflow-hidden transition-all duration-300 ${
                    formState === "success" ? "bg-green-500 hover:bg-green-500" : "bg-neon-cyan hover:bg-neon-cyan/90"
                  } text-space-black font-semibold`}
                >
                  {formState === "idle" && (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Transmit Message
                    </>
                  )}
                  {formState === "loading" && (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Transmitting...
                    </>
                  )}
                  {formState === "success" && (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Transmission Successful!
                    </>
                  )}
                  {formState === "error" && (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Transmission Failed
                    </>
                  )}

                  {/* Pulse effect for distress beacon */}
                  {formState === "idle" && (
                    <span
                      className="absolute inset-0 animate-ping bg-neon-cyan/30 rounded-lg"
                      style={{ animationDuration: "2s" }}
                    />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
