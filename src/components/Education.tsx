// src/components/Education.tsx
import siteContent from '../content.config'

const Education: React.FC = () => {
  const education = siteContent.education
  const work = siteContent.work

  return (
    <section id="education" className="section education">
      <div className="container">
        <h2 className="section__title" data-animate>Education and Work</h2>
        <div className="education__layout">
          <aside className="edu-summary" data-animate>
            <div className="edu-summary__card" data-animate>
              <h3 className="edu-summary__title">Work Experience</h3>
              <ul className="edu-summary__list">
                <li>
                  <span className="edu-summary__item-title">{work.title}</span>
                  <span className="edu-summary__item-meta">{work.range}</span>
                </li>
              </ul>
            </div>
            <div className="edu-summary__card" data-animate>
              <h3 className="edu-summary__title">Education & Courses</h3>
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
          <div className="timeline timeline--range timeline--center" data-animate>
            <div className="timeline__line" />
            <article className="timeline__item" data-start="2021-09" data-end="2025-07" data-type="education">
              <div className="timeline__start" tabIndex={0}>
                <span className="timeline__marker timeline__marker--start" aria-hidden="true" />
                <span className="timeline__year timeline__year--start">2021</span>
                <span className="timeline__start-label">Bachelor of Computer Science</span>
                <span className="timeline__connector" aria-hidden="true" />
                <div className="timeline__card" role="group" aria-label="Bachelor of Computer Science details">
                  <div className="timeline__icon"><i className="fas fa-graduation-cap"></i></div>
                  <h3 className="timeline__title">{education.title}</h3>
                  <p className="timeline__subtitle">{education.subtitle}</p>
                  <p className="timeline__place">{education.place}</p>
                  <p className="timeline__date"><i className="fas fa-calendar"></i> {education.range}</p>
                </div>
              </div>
              <span className="timeline__segment" aria-hidden="true" />
              <div className="timeline__end" tabIndex={0}>
                <span className="timeline__marker timeline__marker--end" aria-hidden="true" title="Bachelor of Computer Science" />
                <span className="timeline__year timeline__year--end">2025</span>
                <span className="timeline__end-tooltip">Bachelor of Computer Science</span>
              </div>
            </article>
            <article className="timeline__item" data-start="2024-10" data-end="2025-02" data-type="education">
              <div className="timeline__start" tabIndex={0}>
                <span className="timeline__marker timeline__marker--start" aria-hidden="true" />
                <span className="timeline__year timeline__year--start">2024</span>
                <span className="timeline__start-label">NTI ML & AI</span>
                <span className="timeline__connector" aria-hidden="true" />
                <div className="timeline__card" role="group">
                  <div className="timeline__icon"><i className="fas fa-brain"></i></div>
                  <h3 className="timeline__title">NTI Machine Learning & AI</h3>
                  <p className="timeline__subtitle">Advanced ML and Deep Learning</p>
                  <p className="timeline__place">National Telecommunication Institute</p>
                  <p className="timeline__date"><i className="fas fa-calendar"></i> Oct 2024 - Feb 2026</p>
                </div>
              </div>
              <span className="timeline__segment" aria-hidden="true" />
              <div className="timeline__end" tabIndex={0}>
                <span className="timeline__marker timeline__marker--end" aria-hidden="true" title="NTI ML & AI" />
                <span className="timeline__year timeline__year--end">2026</span>
                <span className="timeline__end-tooltip">NTI ML & AI</span>
              </div>
            </article>
            <article className="timeline__item" data-start="2024-10" data-end="2024-12" data-type="work">
              <div className="timeline__start" tabIndex={0}>
                <span className="timeline__marker timeline__marker--start" aria-hidden="true" />
                <span className="timeline__year timeline__year--start">2024</span>
                <span className="timeline__start-label">{work.title}</span>
                <span className="timeline__connector" aria-hidden="true" />
                <div className="timeline__card" role="group">
                  <div className="timeline__icon"><i className="fas fa-briefcase"></i></div>
                  <h3 className="timeline__title">{work.title}</h3>
                  <p className="timeline__subtitle">{work.subtitle}</p>
                  <p className="timeline__place">{work.place}</p>
                  <p className="timeline__date"><i className="fas fa-calendar"></i> {work.range}</p>
                </div>
              </div>
              <span className="timeline__segment" aria-hidden="true" />
              <div className="timeline__end" tabIndex={0}>
                <span className="timeline__marker timeline__marker--end" aria-hidden="true" title={work.title} />
                <span className="timeline__year timeline__year--end">Now</span>
                <span className="timeline__end-tooltip">{work.title}</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education