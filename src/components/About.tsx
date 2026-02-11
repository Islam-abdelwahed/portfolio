// src/components/About.tsx
import siteContent from '../content.config'

const About: React.FC = () => {
  const about = siteContent.about

  return (
    <section id="about" className="section about">
      <div className="container">
        <h2 className="section__title" data-animate>About Me</h2>
        <div className="about__grid">
          <div className="about__image-wrap" id="about-photo-wrap" data-animate>
            <img src="src\assets\formal.jpg" alt="About" className="about__image photo-transition-img" id="about-photo" />
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