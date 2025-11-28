"use client"

import { useEffect, useRef } from "react"

interface BinaryStar {
  x: number
  y: number
  speed: number
  char: string
  opacity: number
}

export default function SpaceMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const binaryStarsRef = useRef<BinaryStar[][]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initBinaryStars()
    }

    const initBinaryStars = () => {
      const columns = Math.floor(canvas.width / 20)
      binaryStarsRef.current = Array.from({ length: columns }, (_, i) =>
        Array.from({ length: Math.floor(Math.random() * 10) + 5 }, () => ({
          x: i * 20,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          char: Math.random() > 0.5 ? "1" : "0",
          opacity: Math.random() * 0.5 + 0.1,
        })),
      )
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationId: number

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = "14px JetBrains Mono, monospace"

      binaryStarsRef.current.forEach((column) => {
        column.forEach((star) => {
          // Create gradient for each character
          const gradient = ctx.createLinearGradient(star.x, star.y - 20, star.x, star.y)
          gradient.addColorStop(0, `rgba(0, 245, 255, 0)`)
          gradient.addColorStop(1, `rgba(0, 245, 255, ${star.opacity})`)

          ctx.fillStyle = gradient
          ctx.fillText(star.char, star.x, star.y)

          star.y += star.speed

          if (star.y > canvas.height) {
            star.y = -20
            star.char = Math.random() > 0.5 ? "1" : "0"
            star.opacity = Math.random() * 0.5 + 0.1
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true" />
}
