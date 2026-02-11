// src/App.tsx
import { useEffect, useState } from 'react'
import NeuralBackground from './components/NeuralBackground'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education' // Uncommented this
import SoftSkills from './components/SoftSkills'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
import Ratings from './components/Ratings'
import Services from './components/Services'
import Certificates from './components/Certificates'
import Contact from './components/Contact'

const sections = ['home', 'about', 'education', 'soft-skills', 'skills', 'projects', 'ratings', 'services', 'achievements', 'certificates', 'contact']

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false) // New state for scrolled
  const [year, setYear] = useState(new Date().getFullYear())

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50) // Add 'scrolled' if scrolled past 50px (match original)

      sections.forEach((section) => {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollY >= offsetTop - 200 && scrollY < offsetTop + offsetHeight - 200) {
            setActiveSection(section)
          }
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#C5C6C7] font-['Outfit',sans-serif] relative overflow-hidden">
      <NeuralBackground />
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden back-light">
        <div className="absolute w-[60vmax] h-[60vmax] rounded-full blur-[100px] opacity-28 bg-[radial-gradient(circle,rgba(102,252,241,0.4)_0%,transparent_70%)] -top-[20%] -left-[10%] animate-[backLightMove1_25s_ease-in-out_infinite]" />
        <div className="absolute w-[50vmax] h-[50vmax] rounded-full blur-[100px] opacity-28 bg-[radial-gradient(circle,rgba(102,252,241,0.3)_0%,transparent_65%)] top-[40%] -right-[15%] animate-[backLightMove2_30s_ease-in-out_infinite] animation-delay-[-5s]" />
        <div className="absolute w-[45vmax] h-[45vmax] rounded-full blur-[100px] opacity-28 bg-[radial-gradient(circle,rgba(69,162,158,0.35)_0%,transparent_70%)] -bottom-[15%] left-[20%] animate-[backLightMove3_28s_ease-in-out_infinite] animation-delay-[-10s]" />
        <div className="absolute w-[35vmax] h-[35vmax] rounded-full blur-[100px] opacity-28 bg-[radial-gradient(circle,rgba(102,252,241,0.25)_0%,transparent_65%)] top-[60%] -left-[5%] animate-[backLightMove4_22s_ease-in-out_infinite] animation-delay-[-15s]" />
        <div className="absolute w-[40vmax] h-[40vmax] rounded-full blur-[100px] opacity-28 bg-[radial-gradient(circle,rgba(102,252,241,0.2)_0%,transparent_70%)] top-[10%] right-[30%] animate-[backLightMove5_26s_ease-in-out_infinite] animation-delay-[-8s]" />
        <div className="absolute w-[55vmax] h-[55vmax] rounded-full blur-[100px] opacity-28 bg-[radial-gradient(circle,rgba(102,252,241,0.28)_0%,transparent_68%)] -bottom-[25%] right-[10%] animate-[backLightMove6_27s_ease-in-out_infinite] animation-delay-[-12s]" />
        <div className="absolute w-[38vmax] h-[38vmax] rounded-full blur-[100px] opacity-28 bg-[radial-gradient(circle,rgba(69,162,158,0.3)_0%,transparent_65%)] top-[30%] left-[35%] animate-[backLightMove7_24s_ease-in-out_infinite] animation-delay-[-7s]" />
      </div>
      <header className={`fixed top-0 left-0 right-0 z-[1000] h-[70px] w-full bg-[rgba(11,12,16,0.9)] backdrop-blur-md border-b border-[--border-dark] transition-all duration-[--transition-smooth] ${isScrolled ? 'scrolled' : ''}`} id="header">
        <nav className="w-full h-full px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          <a href="#home" className="nav__logo">
            <span className="nav__logo-text">IE .</span>
          </a>
          <button className="nav__toggle md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
          <ul className="nav__menu hidden md:flex items-center gap-6 lg:gap-8">
            {sections.map((section) => (
              <li key={section}>
                <a href={`#${section}`} className={`nav__link ${activeSection === section ? 'active' : ''}`}>
                  {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {isMenuOpen && (
          <ul className="nav__menu nav__menu--mobile md:hidden w-full px-6 sm:px-8 lg:px-12">
            {sections.map((section) => (
              <li key={section}>
                <a href={`#${section}`} className="nav__link block" onClick={() => setIsMenuOpen(false)}>
                  {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                </a>
              </li>
            ))}
          </ul>
        )}
      </header>
      <main>
        <Hero />
        <About />
        <Education />
        <SoftSkills />
        <Skills />
        <Projects />
        <Ratings />
        <Services />
        <Achievements />
        <Certificates />
        <Contact />
      </main>
      <footer className="footer border-t border-[--border-dark] text-center">
        <div className="container p-6">
          <p className="footer__text">&copy; {year} Islam Elsayed Mohamed. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App