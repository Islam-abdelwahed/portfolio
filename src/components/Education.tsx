// src/components/Education.tsx
import siteContent from '../content.config'

const Education: React.FC = () => {
  const education = siteContent.education
  const work = siteContent.work

  const timelineEvents = [
    {
      year: '2020',
      title: 'Web Automation & Gaming Services',
      description: 'Full-stack web automation and gaming services',
      institution: 'Freelance',
      date: 'Jul 2020 - Oct 2023',
      type: 'work',
      isMajor: true
    },
    {
      year: '2021',
      title: 'Bachelor of Computer Science',
      description: education.subtitle,
      institution: education.place,
      date: 'Sep 2021 - Jul 2025',
      type: 'education',
      isMajor: true
    },
    {
      year: '2023',
      title: null,
      type: 'milestone',
      isMajor: false
    },
    {
      year: '2025',
      title: 'NTI Upskilling for Machine Learning',
      description: 'Advanced Machine Learning and AI techniques',
      institution: 'National Telecommunication Institute',
      date: 'Oct 2025 - Dec 2025',
      type: 'education',
      isMajor: true
    }
  ]

  return (
    <section id="education" className="section education">
      <div className="container">
        <h2 className="section__title" data-animate>Education and Work</h2>
        <div className="education__layout">
          <aside className="edu-summary" data-animate>
            <div className="edu-summary__card" data-animate>
              <h3 className="edu-summary__title">WORK EXPERIENCE</h3>
              <ul className="edu-summary__list">
                <li>
                  <span className="edu-summary__item-title">{work.title}</span>
                  <span className="edu-summary__item-meta">Jul 2020 - Oct 2023</span>
                </li>
              </ul>
            </div>
            <div className="edu-summary__card" data-animate>
              <h3 className="edu-summary__title">EDUCATION & COURSES</h3>
              <ul className="edu-summary__list">
                <li>
                  <span className="edu-summary__item-title">{education.title}</span>
                  <span className="edu-summary__item-meta">{education.place}</span>
                  <span className="edu-summary__item-meta">{education.range}</span>
                </li>
                <li>
                  <span className="edu-summary__item-title">NTI Upskilling for Machine Learning</span>
                  <span className="edu-summary__item-meta">Oct 2025 - Dec 2025</span>
                </li>
                <li>
                  <span className="edu-summary__item-title">NTI Creativa AI for Data Analysis</span>
                  <span className="edu-summary__item-meta">Dec 2025 - Feb 2026</span>
                </li>
              </ul>
            </div>
          </aside>
          <div className="timeline-vertical" data-animate>
            <div className="timeline-vertical__line" />
            {timelineEvents.map((event, index) => (
              <div key={index} className="timeline-vertical__item">
                <div className="timeline-vertical__year">{event.year}</div>
                <div className={`timeline-vertical__dot ${event.isMajor ? 'timeline-vertical__dot--major' : 'timeline-vertical__dot--minor'}`} />
                {event.title && (
                  <>
                    <div className="timeline-vertical__connector" />
                    <div className="timeline-vertical__hover-target">
                      <div className="timeline-vertical__point" />
                      <div className="timeline-vertical__card">
                        <h4 className="timeline-vertical__card-title">{event.title}</h4>
                        <p className="timeline-vertical__card-description">{event.description}</p>
                        {event.institution && (
                          <p className="timeline-vertical__card-meta">
                            <i className="fas fa-building"></i> {event.institution}
                          </p>
                        )}
                        <p className="timeline-vertical__card-meta">
                          <i className="fas fa-calendar"></i> {event.date}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education