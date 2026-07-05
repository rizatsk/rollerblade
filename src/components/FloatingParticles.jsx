import { useEffect, useRef } from 'react'

const EMOJIS = ['🍓', '🌸', '💕', '🍃', '✨', '💖', '🌺', '🍓', '💫', '🌷']

export default function FloatingParticles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const particles = []

    for (let i = 0; i < 22; i++) {
      const el = document.createElement('span')
      el.classList.add('particle')
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]

      const left     = Math.random() * 100
      const duration = 8 + Math.random() * 12
      const delay    = Math.random() * 10
      const size     = 0.8 + Math.random() * 1.2

      el.style.cssText = `
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        font-size: ${size}rem;
      `
      container.appendChild(el)
      particles.push(el)
    }
    return () => particles.forEach(p => p.remove())
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  )
}
