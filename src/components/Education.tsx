// src/components/Education.tsx
import { useEffect } from 'react'
import siteContent from '../content.config'

const Education: React.FC = () => {
  const education = siteContent.education

  useEffect(() => {
    const updateTimelineRanges = () => {
      const timeline = document.querySelector('.timeline--range')
      if (!timeline) return

      const items = Array.from(
        timeline.querySelectorAll<HTMLElement>('.timeline__item[data-start][data-end]')
      )
      if (!items.length) return

      // Parse dates and find time range
      const parseDate = (dateStr: string) => {
        const [year, month] = dateStr.split('-').map(Number)
        return new Date(year, month - 1, 1)
      }

      const parsed = items.map((item) => {
        const startDate = parseDate(item.dataset.start!)
        const endDate = parseDate(item.dataset.end!)
        return { item, startDate, endDate, startTime: startDate.getTime(), endTime: endDate.getTime() }
      })

      const minTime = Math.min(...parsed.map((p) => p.startTime))
      const maxTime = Math.max(...parsed.map((p) => p.endTime))
      const totalTime = maxTime - minTime

      // Calculate positions
      const baseHeight = 420
      const padding = 40
      const entries = parsed.map(({ item, startDate, endDate, startTime, endTime }) => {
        const startRatio = (startTime - minTime) / totalTime
        const endRatio = (endTime - minTime) / totalTime
        const startPos = padding + startRatio * (baseHeight - padding * 2)
        const endPos = padding + endRatio * (baseHeight - padding * 2)
        return { item, startDate, endDate, startPos, endPos }
      })

      // Set positions
      const maxEnd = Math.max(...entries.map((entry) => entry.endPos))
      const height = Math.max(baseHeight, maxEnd + padding)
      ;(timeline as HTMLElement).style.height = `${height}px`

      entries.forEach(({ item, startDate, endDate, startPos, endPos }) => {
        item.style.setProperty('--start-pos', `${startPos}px`)
        item.style.setProperty('--end-pos', `${endPos}px`)

        const startYear = item.querySelector('.timeline__year--start')
        const endYear = item.querySelector('.timeline__year--end')
        if (startYear) startYear.textContent = String(startDate.getFullYear())
        if (endYear) endYear.textContent = String(endDate.getFullYear())
      })
    }

    updateTimelineRanges()

    let resizeTimer: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(updateTimelineRanges, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <section id="education" className="section education">
      <div className="container">
        <h2 className="section__title" data-animate>
          Education and Work
        </h2>
        <div className="education__layout">
          <aside className="edu-summary" data-animate>
            {/* <div className="edu-summary__card" data-animate>
              <h3 className="edu-summary__title">Work Experience</h3>
              <ul className="edu-summary__list">
                {education
                  .filter((event) => event.type === 'work')
                  .map((event, idx) => (
                    <li key={idx}>
                      <span className="edu-summary__item-title">{event.title}</span>
                      <span className="edu-summary__item-meta">{event.dateRange}</span>
                    </li>
                  ))}
              </ul>
            </div> */}
            <div className="edu-summary__card" data-animate>
              <h3 className="edu-summary__title">Education & Courses</h3>
              <ul className="edu-summary__list">
                {education
                  .filter((event) => event.type === 'education' || event.type === 'training')
                  .map((event, idx) => (
                    <li key={idx}>
                      <span className="edu-summary__item-title">{event.title}</span>
                      {event.place && <span className="edu-summary__item-meta">{event.place}</span>}
                      <span className="edu-summary__item-meta">{event.dateRange}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          <div className="timeline timeline--range timeline--center" data-animate>
            <div className="timeline__line" />

            {education.map((event, idx) => (
              <article
                key={idx}
                className="timeline__item"
                data-start={event.startDate}
                data-end={event.endDate}
                data-type={event.type}
              >
                <div className="timeline__start" tabIndex={0}>
                  <span className="timeline__marker timeline__marker--start" aria-hidden="true" />
                  <span className="timeline__year timeline__year--start" />
                  <span className="timeline__start-label">{event.title}</span>
                  <span className="timeline__connector" aria-hidden="true" />
                  <div className="timeline__card" role="group" aria-label={`${event.title} details`}>
                    <div className="timeline__icon">
                      <i className={event.icon} />
                    </div>
                    <h3 className="timeline__title">{event.title}</h3>
                    {event.subtitle && <p className="timeline__subtitle">{event.subtitle}</p>}
                    {event.place && <p className="timeline__place">{event.place}</p>}
                    <p className="timeline__date">
                      <i className="fas fa-calendar-alt" /> {event.dateRange}
                    </p>
                  </div>
                </div>
                <span className="timeline__segment" aria-hidden="true" />
                <div className="timeline__end" tabIndex={0}>
                  <span
                    className="timeline__marker timeline__marker--end"
                    aria-hidden="true"
                    title={event.title}
                  />
                  <span className="timeline__year timeline__year--end" />
                  <span className="timeline__end-tooltip">{event.title}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education