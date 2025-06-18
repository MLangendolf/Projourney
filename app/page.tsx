"use client"

import { useEffect, useRef } from "react"
import InteractiveButton from "@/components/interactive-button"

// Particle system component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 1.5
        this.vy = (Math.random() - 0.5) * 1.5
        this.size = Math.random() * 2.5 + 0.5
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle())
    }

    // Mouse interaction
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    canvas.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.update()
        particle.draw()

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 120)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        // Mouse interaction
        const mouseDistance = Math.sqrt((particle.x - mouse.x) ** 2 + (particle.y - mouse.y) ** 2)
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

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 bg-[#0a0a1a]" />
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden font-['Poppins',Arial,sans-serif]">
      <ParticleBackground />

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
    </div>
  )
}
