"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface RippleProps {
  x: number
  y: number
  size: number
}

interface InteractiveButtonProps {
  href: string
  children: React.ReactNode
  variant?: "primary" | "outline" | "nav" | "navButton"
  className?: string
}

export default function InteractiveButton({ href, children, variant = "primary", className }: InteractiveButtonProps) {
  const [ripples, setRipples] = useState<RippleProps[]>([])
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Remove ripples after animation completes
  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = []

    ripples.forEach((_, i) => {
      const timeoutId = setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((_, index) => index !== 0))
      }, 600)

      timeoutIds.push(timeoutId)
    })

    return () => {
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [ripples])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = Math.max(rect.width, rect.height) * 2

    setRipples([...ripples, { x, y, size }])
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 150)
  }

  const variantStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white px-9 py-4 rounded-full font-semibold shadow-lg hover:shadow-blue-500/50",
    outline:
      "border-2 border-[#00aaff] text-[#00aaff] hover:bg-[#00aaff] hover:text-white px-9 py-4 rounded-full font-semibold",
    nav: "text-gray-300 font-semibold hover:text-white border-b-2 border-transparent hover:border-[#00aaff]",
    navButton: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold",
  }

  return (
    <Link
      href={href}
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden transition-all duration-300 inline-block",
        variantStyles[variant],
        isHovered && "scale-105",
        isPressed && "scale-95",
        variant === "nav" && "pb-1",
        className,
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {ripples.map((ripple, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/30 animate-ripple"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      {children}
    </Link>
  )
}
