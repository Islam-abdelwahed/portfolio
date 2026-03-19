// src/App.tsx
import { useEffect, useState, useRef } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education' // Uncommented this
// import SoftSkills from './components/SoftSkills'
import Skills from './components/Skills'
import Achievements from './components/Achievements'
import Projects from './components/Projects'
// import Ratings from './components/Ratings'
import Services from './components/Services'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import siteContent from './content.config'

const sections = ['home', 'about', 'education', /*'soft-skills',*/ 'skills', 'projects', /*'ratings',*/ 'services', 'achievements', 'certificates', 'contact']

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false) // New state for scrolled
  const [year, setYear] = useState(new Date().getFullYear())
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollTopInFooter, setScrollTopInFooter] = useState(false)
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const footerRef = useRef<HTMLElement>(null)

  const getIconClass = (iconName: string): string => {
    const iconMap: Record<string, string> = {
      'phone': 'fas fa-phone',
      'mail': 'fas fa-envelope',
      'linkedin': 'fab fa-linkedin-in',
      'github': 'fab fa-github',
      'download': 'fas fa-download',
      'briefcase': 'fas fa-briefcase',
      'id-card': 'fas fa-id-card',
      'user-tie': 'fas fa-user-tie'
    }
    return iconMap[iconName] || 'fas fa-link'
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50) // Add 'scrolled' if scrolled past 50px (match original)

      // Show scroll-to-top button after scrolling 300px
      setShowScrollTop(scrollY > 300)

      // Check if scroll button should be in footer
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        // If footer is visible in viewport
        setScrollTopInFooter(footerRect.top < windowHeight)
      }

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

  // Scroll reveal animation observer
  useEffect(() => {
    const observeElements = () => {
      const animatedElements = document.querySelectorAll('[data-animate]:not(.visible)')

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      )

      animatedElements.forEach((el) => observer.observe(el))

      return observer
    }

    // Initial observation
    const observer = observeElements()

    // Re-observe when DOM changes (for dynamically loaded content)
    const mutationObserver = new MutationObserver(() => {
      const newElements = document.querySelectorAll('[data-animate]:not(.visible)')
      newElements.forEach((el) => observer.observe(el))
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  // Update indicator position when active section changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeIndex = sections.indexOf(activeSection)
      const activeLink = navLinksRef.current[activeIndex]

      if (activeLink) {
        const navMenu = activeLink.parentElement?.parentElement
        if (navMenu) {
          const menuRect = navMenu.getBoundingClientRect()
          const linkRect = activeLink.getBoundingClientRect()
          setIndicatorStyle({
            left: linkRect.left - menuRect.left,
            width: linkRect.width
          })
        }
      }
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeSection])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
            {sections.map((section, index) => (
              <li key={section}>
                <a 
                  href={`#${section}`} 
                  className={`nav__link ${activeSection === section ? 'active' : ''}`}
                  ref={(el) => { navLinksRef.current[index] = el }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                </a>
              </li>
            ))}
            <div 
              className="nav__indicator" 
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`
              }}
            />
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
        {/* <SoftSkills /> */}
        <Skills />
        <Projects />
        {/* <Ratings /> */}
        <Services />
        <Achievements />
        <Certificates /> 
        <Contact />
      </main>
      <footer className="footer" ref={footerRef}>
        <div className="container footer__inner">
          <div className="footer__social">
            {siteContent.contact.info.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target={social.target}
                rel={social.rel}
                className="footer__social-link"
                aria-label={social.label}
              >
                <i className={getIconClass(social.icon)}></i>
              </a>
            ))}
          </div>
          <p className="footer__text">&copy; {year} Islam Elsayed Mohamed. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Scroll to Top Button */}
      <button
        className={`scroll-to-top ${showScrollTop ? 'scroll-to-top--visible' : ''} ${scrollTopInFooter ? 'scroll-to-top--in-footer' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  )
}

export default App