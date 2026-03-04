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
    <div className="app-shell">
      
      <div className="back-light">
        <div className="back-light__blob back-light__blob--1" />
        <div className="back-light__blob back-light__blob--2" />
        <div className="back-light__blob back-light__blob--3" />
        <div className="back-light__blob back-light__blob--4" />
        <div className="back-light__blob back-light__blob--5" />
        <div className="back-light__blob back-light__blob--6" />
        <div className="back-light__blob back-light__blob--7" />
      </div>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} id="header">
        <nav className="nav__bar">
          <a href="#home" className="nav__logo">
            <span className="nav__logo-text">IE .</span>
          </a>
          <button className="nav__toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
          </button>
          <ul className="nav__menu nav__menu--desktop">
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
          <ul className="nav__menu nav__menu--mobile">
            {sections.map((section) => (
              <li key={section}>
                <a href={`#${section}`} className="nav__link nav__link--mobile" onClick={() => setIsMenuOpen(false)}>
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
        {/* <Projects /> */}
        <Ratings />
        <Services />/
        <Achievements />
        <Certificates /> 
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <p className="footer__text">&copy; {year} Islam Elsayed Mohamed. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App