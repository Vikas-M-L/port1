"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)")
    if (!mediaQuery.matches) return

    setIsVisible(true)
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      trailId++
      setTrail((prev) => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: trailId }])
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest("button") || target.closest("a")) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] rounded-full"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            width: 4,
            height: 4,
            background: `rgba(0, 245, 255, ${((index + 1) / trail.length) * 0.5})`,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.3s ease-out",
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-transform duration-150 ${isHovering ? "scale-150" : "scale-100"}`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Outer ring */}
        <div
          className={`absolute rounded-full border-2 transition-all duration-300 ${isHovering ? "w-12 h-12 border-supernova-orange" : "w-8 h-8 border-neon-cyan"}`}
          style={{
            transform: "translate(-50%, -50%)",
            boxShadow: isHovering ? "0 0 20px rgba(255, 107, 53, 0.5)" : "0 0 15px rgba(0, 245, 255, 0.5)",
          }}
        />
        {/* Inner dot */}
        <div
          className={`absolute w-2 h-2 rounded-full transition-colors duration-300 ${isHovering ? "bg-supernova-orange" : "bg-neon-cyan"}`}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>
    </>
  )
}
