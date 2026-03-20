// src/components/About.tsx
import siteContent from '../content.config'
import { useCountUp } from '../hooks/useCountUp'

const StatCard: React.FC<{ end: number; label: string; suffix?: string; icon: string }> = ({
  end,
  label,
  suffix = '',
  icon
}) => {
  const { count, elementRef } = useCountUp({ end, duration: 2500 })

  return (
    <div className="stat-card" data-animate ref={elementRef}>
      <div className="stat-card__icon">
        <i className={icon}></i>
      </div>
      <div className="stat-card__content">
        <div className="stat-card__number">
          {count}{suffix}
        </div>
        <div className="stat-card__label">{label}</div>
      </div>
    </div>
  )
}

const About: React.FC = () => {
  const about = siteContent.about

  const stats = [
    { end: 2, label: 'Years Experience', suffix: '+', icon: 'fas fa-calendar-alt' },
    { end: 15, label: 'Projects Completed', suffix: '+', icon: 'fas fa-project-diagram' },
    { end: 10, label: 'Certificates Earned', suffix: '+', icon: 'fas fa-certificate' },
    { end: 500, label: 'Training Hours', suffix: '+', icon: 'fas fa-clock' }
  ]

  return (
    <section id="about" className="section about">
      {/* Floating decorative elements */}
      <div className="floating-decor">
        <div className="float-el float-el--circle float-el--1"></div>
        <div className="float-el float-el--square float-el--2"></div>
        <div className="float-el float-el--triangle float-el--3"></div>
      </div>
      <div className="container">
        <h2 className="section__title" data-animate>About Me</h2>
        <div className="about__grid">
          <div className="about__image-wrap" id="about-photo-wrap" data-animate>
            <img src={`${import.meta.env.BASE_URL}images/formal.jpg`} alt="About" className="about__image photo-transition-img" id="about-photo" />
          </div>
          <div className="about__content about__content--fade" data-animate>
            <p className="about__text">{about.paragraph}</p>
            <ul className="about__highlights">
              {about.highlights.map((h, i) => (
                <li key={i}>
                  <i className={`${h.icon} gold-icon`}></i>{h.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Animated Statistics */}
        <div className="about__stats">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              end={stat.end}
              label={stat.label}
              suffix={stat.suffix}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default About