// src/components/Hero.tsx
import { useEffect, useState, useRef } from 'react'
import siteContent from '../content.config'

const Hero: React.FC = () => {
  const hero = siteContent.hero
  const [titleText, setTitleText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const textOptions = hero.textOptions || [
    'Data Scientist & Machine Learning Engineer',
    'AI and Deep Learning Specialist',
    'Building Intelligent Solutions',
    'Data-Driven Decision Maker'
  ]

  useEffect(() => {
    const typingSpeed = 80
    const deletingSpeed = 40
    const pauseTime = 2200

    const typeWriter = () => {
      const targetText = textOptions[textIndex]

      if (isTyping) {
        if (charIndex < targetText.length) {
          setTitleText(targetText.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
          timeoutRef.current = setTimeout(typeWriter, typingSpeed)
        } else {
          timeoutRef.current = setTimeout(() => {
            setIsTyping(false)
            typeWriter()
          }, pauseTime)
        }
      } else {
        if (charIndex > 0) {
          setTitleText(targetText.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
          timeoutRef.current = setTimeout(typeWriter, deletingSpeed)
        } else {
          setIsTyping(true)
          setTextIndex((textIndex + 1) % textOptions.length)
          setCharIndex(0)
          timeoutRef.current = setTimeout(typeWriter, 600)
        }
      }
    }

    typeWriter()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [textIndex, charIndex, isTyping, textOptions])

  return (
    <section id="home" className="hero">
      <div className="hero__bg">
        <div id="particles" className="hero__particles" />
        <div className="hero__shape-3d hero__shape-3d--1" aria-hidden="true" />
        <div className="hero__shape-3d hero__shape-3d--2" aria-hidden="true" />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
      </div>
      <div className="hero__content container">
        <div className="hero__grid">
          <div className="hero__text">
            <p className="hero__greeting animate-in">{hero.greeting}</p>
            <h1 className="hero__name animate-in">{hero.name}</h1>
            <p className="hero__title animate-in typewriter">{titleText}</p>
            <p className="hero__tagline animate-in">{hero.tagline}</p>
            <div className="hero__social animate-in">
              {hero.social.map((s, i) => (
                <a key={i} href={s.href} target={s.target} rel={s.rel} aria-label={s.label} className="hero__social-link">
                  <i className={s.icon === 'github' ? 'fab fa-github' : s.icon === 'linkedin' ? 'fab fa-linkedin-in' : s.icon === 'mail' ? 'fas fa-envelope' : 'fas fa-phone'}></i>
                </a>
              ))}
            </div>
            <div className="hero__cta animate-in">
              {hero.ctas.map((cta, i) => (
                <a key={i} href={cta.href} target={cta.target} rel={cta.rel} className="btn btn--outline">
                  <i className={cta.icon === 'folder-open' ? 'fas fa-folder-open' : cta.icon === 'mail' ? 'fas fa-envelope' : cta.icon === 'download' ? 'fas fa-download' : 'fab fa-github'}></i> {cta.text}
                </a>
              ))}
            </div>
          </div>
          <div className="hero__image-wrap animate-in" id="hero-photo-wrap">
            <div className="hero__image-3d" id="hero-image-3d">
              <div className="hero__image-frame">
                <img src="src\assets\formal.jpg" alt={hero.imageAlt} className="hero__image photo-transition-img" id="hero-photo" />
                <div className="floating-icons" data-floating-icons="hero" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        <i className="fas fa-chevron-down"></i>
      </a>
    </section>
  )
}

export default Hero