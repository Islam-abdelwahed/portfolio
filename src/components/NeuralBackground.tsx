// src/components/NeuralBackground.tsx
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroSectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const heroSection = document.getElementById('home')
    heroSectionRef.current = heroSection

    if (!canvas || !heroSection) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let mouseX = -9999
    let mouseY = -9999
    let animationId: number | null = null
    let startTime = Date.now()

    // Configuration
    const CONNECT_DISTANCE = 140
    const PARTICLE_RADIUS = 1.5
    const PARTICLE_SPEED = 0.12
    const MOUSE_INFLUENCE_RADIUS = 180
    const MOUSE_STRENGTH = 0.08
    const LINE_OPACITY_MAX = 0.18
    const GLOW_OPACITY = 0.4
    const BREATH_SPEED = 0.5
    const BREATH_AMOUNT = 0.04
    const WAVE_PERIOD = 6
    const WAVE_WIDTH = 100
    const WAVE_PEAK = 0.45
    const PARALLAX_FACTOR = 0.1

    function getParticleCount() {
      const w = window.innerWidth
      if (w <= 480) return Math.min(28, Math.floor(w / 18))
      if (w <= 768) return Math.min(42, Math.floor(w / 20))
      return Math.min(70, Math.floor(w / 24))
    }

    function getRect() {
      return heroSection!.getBoundingClientRect()
    }

    function resize() {
      const rect = getRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = rect.width * dpr
      canvas!.height = rect.height * dpr
      canvas!.style.width = rect.width + 'px'
      canvas!.style.height = rect.height + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles(rect.width, rect.height)
    }

    function initParticles(w: number, h: number) {
      const n = getParticleCount()
      particles = []
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
          vy: (Math.random() - 0.5) * PARTICLE_SPEED * 2,
          radius: PARTICLE_RADIUS
        })
      }
    }

    function setMouseFromEvent(e: MouseEvent | TouchEvent) {
      const rect = getRect()
      if ('touches' in e && e.touches && e.touches.length) {
        mouseX = e.touches[0].clientX - rect.left
        mouseY = e.touches[0].clientY - rect.top
      } else if ('clientX' in e) {
        mouseX = e.clientX - rect.left
        mouseY = e.clientY - rect.top
      }
    }

    function clearMouse() {
      mouseX = -9999
      mouseY = -9999
    }

    function tick() {
      const rect = getRect()
      const w = rect.width
      const h = rect.height
      const time = (Date.now() - startTime) * 0.001

      ctx!.clearRect(0, 0, w, h)

      // Breathing: subtle sine scale (expand/contract)
      const breathScale = 1 + BREATH_AMOUNT * Math.sin(time * BREATH_SPEED)
      const cx = w * 0.5
      const cy = h * 0.5
      ctx!.save()
      ctx!.translate(cx, cy)
      ctx!.scale(breathScale, breathScale)
      ctx!.translate(-cx, -cy)

      // Scroll parallax: vertical shift for depth
      const parallaxOffsetY = -rect.top * PARALLAX_FACTOR

      // Wave pulse: position of wave (moves across over WAVE_PERIOD seconds)
      const waveT = (time % WAVE_PERIOD) / WAVE_PERIOD
      const waveX = waveT * (w + 200) - 100

      // Update positions: continuous drift with wrap (no hard bounce), mouse influence optional
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (mouseX > -9999) {
          const dx = mouseX - p.x
          const dy = mouseY - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_INFLUENCE_RADIUS && dist > 0) {
            const force = MOUSE_STRENGTH * (1 - dist / MOUSE_INFLUENCE_RADIUS)
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }
        p.vx *= 0.99
        p.vy *= 0.99
        p.x += p.vx
        p.y += p.vy
        // Smooth wrap: continuous motion, no abrupt bounce
        p.x = ((p.x % w) + w) % w
        p.y = ((p.y % h) + h) % h
      }

      // Draw connections with distance-based opacity (soft fade in/out)
      ctx!.lineWidth = 0.8
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particles[i].x
          const dy = particles[j].y - particles[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DISTANCE) {
            const lineOpacity = LINE_OPACITY_MAX * (1 - dist / CONNECT_DISTANCE)
            ctx!.strokeStyle = 'rgba(255,255,255,' + lineOpacity + ')'
            const drawY0 = particles[i].y + parallaxOffsetY
            const drawY1 = particles[j].y + parallaxOffsetY
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, drawY0)
            ctx!.lineTo(particles[j].x, drawY1)
            ctx!.stroke()
          }
        }
      }

      // Draw nodes: glow + wave pulse brightening
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const drawY = p.y + parallaxOffsetY
        const pulse = 1 + WAVE_PEAK * Math.exp(-Math.pow(p.x - waveX, 2) / (WAVE_WIDTH * WAVE_WIDTH))
        const glowOpacity = Math.min(0.85, GLOW_OPACITY * pulse)
        const gradient = ctx!.createRadialGradient(
          p.x, drawY, 0,
          p.x, drawY, p.radius * 4
        )
        gradient.addColorStop(0, 'rgba(255,255,255,' + glowOpacity + ')')
        gradient.addColorStop(0.5, 'rgba(99,102,241,0.15)')
        gradient.addColorStop(1, 'rgba(99,102,241,0)')
        ctx!.fillStyle = gradient
        ctx!.beginPath()
        ctx!.arc(p.x, drawY, p.radius * 4, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.fillStyle = 'rgba(255,255,255,' + (0.5 + 0.25 * pulse) + ')'
        ctx!.beginPath()
        ctx!.arc(p.x, drawY, p.radius, 0, Math.PI * 2)
        ctx!.fill()
      }

      ctx!.restore()
      animationId = requestAnimationFrame(tick)
    }

    function start() {
      startTime = Date.now()
      resize()
      tick()
    }

    function stop() {
      if (animationId) cancelAnimationFrame(animationId)
      animationId = null
    }

    // Event listeners
    const handleResize = () => resize()
    const handleMouseMove = (e: MouseEvent) => setMouseFromEvent(e)
    const handleTouchMove = (e: TouchEvent) => setMouseFromEvent(e)

    window.addEventListener('resize', handleResize)
    heroSection.addEventListener('mousemove', handleMouseMove)
    heroSection.addEventListener('mouseleave', clearMouse)
    heroSection.addEventListener('touchmove', handleTouchMove, { passive: true })
    heroSection.addEventListener('touchend', clearMouse)

    start()

    return () => {
      stop()
      window.removeEventListener('resize', handleResize)
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove)
        heroSection.removeEventListener('mouseleave', clearMouse)
        heroSection.removeEventListener('touchmove', handleTouchMove)
        heroSection.removeEventListener('touchend', clearMouse)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-neural-canvas" />
}

export default NeuralBackground