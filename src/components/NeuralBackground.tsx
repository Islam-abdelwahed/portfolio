// src/components/NeuralBackground.tsx
import { useEffect, useRef } from 'react'

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let nodes: { x: number; y: number; dx: number; dy: number; size: number }[] = []
    let mouse = { x: null as number | null, y: null as number | null }

    const config = {
      nodeCountBase: 70,
      maxDistance: 160,
      speed: 0.35,
      mouseInfluence: 120,
      lineOpacity: 0.25,
      mouseInteractive: false
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shouldAnimate = !prefersReducedMotion

    const getNodeCount = (area: number) => {
      const ratio = window.devicePixelRatio || 1
      const density = Math.max(0.5, Math.sqrt(area) / 400)
      return Math.max(30, Math.round(config.nodeCountBase * density * ratio))
    }

    const createNode = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: (Math.random() - 0.5) * 0.7,
      dy: (Math.random() - 0.5) * 0.7,
      size: 1 + Math.random() * 1.2
    })

    const createNodes = (count: number) => {
      nodes = Array.from({ length: count }, createNode)
    }

    const clampNode = (node: typeof nodes[0]) => {
      if (node.x <= 0 || node.x >= width) {
        node.dx *= -1
        node.x = Math.min(Math.max(node.x, 0), width)
      }
      if (node.y <= 0 || node.y >= height) {
        node.dy *= -1
        node.y = Math.min(Math.max(node.y, 0), height)
      }
    }

    const updateNodes = () => {
      nodes.forEach((node) => {
        node.x += node.dx * config.speed
        node.y += node.dy * config.speed
        clampNode(node)
        if (config.mouseInteractive && mouse.x !== null) {
          const dx = mouse.x - node.x
          const dy = mouse.y! - node.y
          const dist = Math.hypot(dx, dy)
          if (dist < config.mouseInfluence && dist > 0) {
            const influence = (config.mouseInfluence - dist) / config.mouseInfluence
            node.x += (dx / dist) * influence * 4
            node.y += (dy / dist) * influence * 4
          }
        }
      })
    }

    const drawNodes = () => {
      ctx.fillStyle = 'rgba(201, 162, 39, 0.9)'
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const drawLines = () => {
      ctx.strokeStyle = '#66FCF1'
      ctx.lineWidth = 0.8
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist > config.maxDistance) continue
          let alpha = config.lineOpacity * (1 - dist / config.maxDistance)
          if (config.mouseInteractive && mouse.x !== null) {
            const adx = Math.hypot(a.x - mouse.x, a.y - mouse.y!)
            const bdx = Math.hypot(b.x - mouse.x, b.y - mouse.y!)
            const nearMouse = Math.min(adx, bdx) < config.mouseInfluence
            if (nearMouse) alpha = Math.min(1, alpha + 0.4)
          }
          ctx.strokeStyle = `rgba(201, 162, 39, ${alpha.toFixed(3)})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height)
      drawLines()
      drawNodes()
    }

    const animate = () => {
      updateNodes()
      drawFrame()
      requestAnimationFrame(animate)
    }

    const resizeCanvas = () => {
      const ratio = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      ctx.scale(ratio, ratio)
      createNodes(getNodeCount(width * height))
      drawFrame()
    }

    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!shouldAnimate) drawFrame()
    }

    const resetMouse = () => {
      mouse.x = null
      mouse.y = null
      if (!shouldAnimate) drawFrame()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    if (config.mouseInteractive) {
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerleave', resetMouse)
      window.addEventListener('pointerout', resetMouse)
    }
    if (shouldAnimate) {
      animate()
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (config.mouseInteractive) {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('pointerleave', resetMouse)
        window.removeEventListener('pointerout', resetMouse)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] pointer-events-none bg-transparent" />
}

export default NeuralBackground