// src/components/About.tsx
import siteContent from '../content.config'

const About: React.FC = () => {
  const about = siteContent.about

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
            <img src="images/formal.jpg" alt="About" className="about__image photo-transition-img" id="about-photo" />
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
      </div>
    </section>
  )
}

export default About