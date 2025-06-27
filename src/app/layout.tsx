
// src/app/page.tsx

import { useState, useRef, useEffect } from "react"
import type { MousePosition, ParticleProps } from "../types"
import InteractiveButton from "../components/interactive-button" // <-- Importe o InteractiveButton do local CORRETO
import type { JSX } from "react/jsx-runtime"

// Particle class with TypeScript (mantida aqui por ser parte do background da HomePage)
class Particle implements ParticleProps {
  public x: number
  public y: number
  public vx: number
  public vy: number
  public size: number
  public opacity: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.vx = (Math.random() - 0.5) * 1.5
    this.vy = (Math.random() - 0.5) * 1.5
    this.size = Math.random() * 2.5 + 0.5
    this.opacity = Math.random() * 0.5 + 0.2
  }

  public update(canvasWidth: number, canvasHeight: number): void {
    this.x += this.vx
    this.y += this.vy

    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.fill()
  }
}

// Particle system component with TypeScript
function ParticleBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect((): (() => void) => {
    const canvas: HTMLCanvasElement | null = canvasRef.current
    if (!canvas) return (): void => { }

    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
    if (!ctx) return (): void => { }

    // Set canvas size with TypeScript
    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles with TypeScript
    const particles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(canvas.width, canvas.height))
    }

    // Mouse interaction with TypeScript
    const mouse: MousePosition = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent): void => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    canvas.addEventListener("mousemove", handleMouseMove)

    // Animation loop with TypeScript
    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle: Particle, i: number): void => {
        particle.update(canvas.width, canvas.height)
        particle.draw(ctx)

        // Draw connections with TypeScript
        particles.slice(i + 1).forEach((otherParticle: Particle): void => {
          const dx: number = particle.x - otherParticle.x
          const dy: number = particle.y - otherParticle.y
          const distance: number = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 120)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        // Mouse interaction with TypeScript
        const mouseDistance: number = Math.sqrt((particle.x - mouse.x) ** 2 + (particle.y - mouse.y) ** 2)
        if (mouseDistance < 140) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * (1 - mouseDistance / 140)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      requestAnimationFrame(animate)
    }
    animate()

    return (): void => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 bg-[#0a0a1a]" />
}

export default function HomePage(): JSX.Element { // <-- Este é o componente da página
  return (

    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden font-['Poppins',Arial,sans-serif]">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-blue-900/40 backdrop-blur-md border-b border-blue-500/30 px-10 py-4">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold text-[#00aaff] drop-shadow-lg">Cursos</div>
          <nav className="flex items-center space-x-6">
            <InteractiveButton href="/inicio" variant="nav">
              Início
            </InteractiveButton>
            <InteractiveButton href="/simulado" variant="nav">
              Simulados
            </InteractiveButton>
            <InteractiveButton href="#" variant="nav">
              Cursos
            </InteractiveButton>
            <InteractiveButton href="#" variant="nav">
              Sobre
            </InteractiveButton>
            <InteractiveButton href="/login" variant="navButton">
              Entrar
            </InteractiveButton>
            <InteractiveButton href="/cadastrar" variant="navButton">
              Cadastrar
            </InteractiveButton>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight drop-shadow-lg">
            Prepare-se para sua formação de forma inteligente
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
            Milhares de vídeos pra você que ama tecnologia, vídeo aulas grátis e muito mais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <InteractiveButton href="#" variant="primary">
              Comece agora
            </InteractiveButton>
            <InteractiveButton href="#" variant="outline">
              Tudo de forma gratuita
            </InteractiveButton>
          </div>
        </section>
      </main>

      <ParticleBackground />
    </div>
  )

}

