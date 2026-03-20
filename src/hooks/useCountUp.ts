// src/hooks/useCountUp.ts
import { useState, useEffect, useRef } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  startOnView?: boolean
}

export const useCountUp = ({ end, duration = 2000, startOnView = true }: UseCountUpOptions) => {
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  // Intersection Observer to detect when element is in view
  useEffect(() => {
    if (!startOnView || !elementRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsInView(true)
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(elementRef.current)

    return () => observer.disconnect()
  }, [startOnView, hasAnimated])

  // Count animation
  useEffect(() => {
    if (!isInView && startOnView) return
    if (!startOnView && hasAnimated) return

    if (!startOnView) setHasAnimated(true)

    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)

      setCount(currentCount)

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }, [isInView, end, duration, startOnView, hasAnimated])

  return { count, elementRef }
}
