"use client"

import { useEffect, useRef } from "react"

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    // Create stars
    const stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = []
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.fillStyle = "#0a0a0f"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebula gradients
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.3,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        300,
      )
      gradient1.addColorStop(0, "rgba(139, 92, 246, 0.05)")
      gradient1.addColorStop(1, "transparent")
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.8,
        canvas.height * 0.7,
        0,
        canvas.width * 0.8,
        canvas.height * 0.7,
        400,
      )
      gradient2.addColorStop(0, "rgba(236, 72, 153, 0.03)")
      gradient2.addColorStop(1, "transparent")
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        const twinkle = Math.sin(time * 2 + star.x) * 0.3 + 0.7
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.fill()

        // Glow for larger stars
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 245, 255, ${star.opacity * twinkle * 0.1})`
          ctx.fill()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => setCanvasSize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)" }}
    />
  )
}
