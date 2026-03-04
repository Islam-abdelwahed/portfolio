import React, { useMemo, useState, useEffect, useCallback } from 'react'
import siteContent from '../content.config'

const Achievements: React.FC = () => {
  const achievements = siteContent.achievements || []
  const [currentSlides, setCurrentSlides] = useState<number[]>(() => achievements.map(() => 0))
  const [isPaused, setIsPaused] = useState<boolean[]>(() => achievements.map(() => false))

  const safeAchievements = useMemo(
    () => achievements.map((a) => ({ ...a, images: a.images && a.images.length > 0 ? a.images : ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'] })),
    [achievements]
  )

  const handlePrev = useCallback((idx: number) => {
    setCurrentSlides((prev) =>
      prev.map((val, i) => {
        if (i !== idx) return val
        const total = safeAchievements[idx].images.length
        return (val - 1 + total) % total
      })
    )
  }, [safeAchievements])

  const handleNext = useCallback((idx: number) => {
    setCurrentSlides((prev) =>
      prev.map((val, i) => {
        if (i !== idx) return val
        const total = safeAchievements[idx].images.length
        return (val + 1) % total
      })
    )
  }, [safeAchievements])

  const goToSlide = useCallback((idx: number, slideIdx: number) => {
    setCurrentSlides((prev) =>
      prev.map((val, i) => (i === idx ? slideIdx : val))
    )
  }, [])

  // Autoplay functionality
  useEffect(() => {
    const intervals: ReturnType<typeof setInterval>[] = []

    safeAchievements.forEach((achievement, idx) => {
      if (achievement.images.length > 1 && !isPaused[idx]) {
        const interval = setInterval(() => {
          handleNext(idx)
        }, 4000) // 4 seconds per slide
        intervals.push(interval)
      }
    })

    return () => {
      intervals.forEach((interval) => clearInterval(interval))
    }
  }, [safeAchievements, isPaused, handleNext])

  const handleMouseEnter = (idx: number) => {
    setIsPaused((prev) => prev.map((val, i) => (i === idx ? true : val)))
  }

  const handleMouseLeave = (idx: number) => {
    setIsPaused((prev) => prev.map((val, i) => (i === idx ? false : val)))
  }

  return (
    <section id="achievements" className="section">
      <div className="container">
        <h2 className="section__title" data-animate>Achievements</h2>
        <p className="achievements__intro" data-animate>
          Badges that capture wins, recognition, and impact.
        </p>

        <div className="achievements__list" data-animate>
          {safeAchievements.map((achievement, idx) => {
            const current = currentSlides[idx] ?? 0
            const total = achievement.images.length

            return (
              <article
                key={idx}
                className="achievement-card"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                <div className="achievement-card__media">
                  <img
                    src={achievement.images[current]}
                    alt={achievement.title}
                    className="achievement-card__image"
                    loading="lazy"
                  />

                  {achievement.highlight && (
                    <div className="achievement-card__badge">
                      <span>{achievement.highlight}</span>
                    </div>
                  )}

                  {total > 1 && (
                    <>
                      <div className="achievement-card__controls">
                        <button
                          onClick={() => handlePrev(idx)}
                          className="achievement-card__nav-btn"
                          aria-label="Previous image"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => handleNext(idx)}
                          className="achievement-card__nav-btn"
                          aria-label="Next image"
                        >
                          ›
                        </button>
                      </div>

                      <div className="achievement-card__dots">
                        {achievement.images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => goToSlide(idx, dotIdx)}
                            className={`achievement-card__dot ${dotIdx === current ? 'achievement-card__dot--active' : ''}`}
                            aria-label={`Go to slide ${dotIdx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  <div className="achievement-card__text-overlay">
                    <div className="achievement-card__text-blur" />
                    <div className="achievement-card__text-content">
                      <div className="achievement-card__text-row">
                        <div className="achievement-card__icon">
                          <span aria-hidden="true">{achievement.icon ?? '⭐'}</span>
                        </div>
                        <div className="achievement-card__titles">
                          <h3>{achievement.title}</h3>
                          {achievement.date && (
                            <p className="achievement-card__date">{achievement.date}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="achievement-card__description">
                    <div className="achievement-card__description-content">
                      <div className="achievement-card__description-icon">
                        <span aria-hidden="true">{achievement.icon ?? '⭐'}</span>
                      </div>
                      <h3>{achievement.title}</h3>
                      {achievement.date && <p className="achievement-card__date">{achievement.date}</p>}
                      <p className="achievement-card__description-text">{achievement.description}</p>
                      {achievement.highlight && (
                        <div className="achievement-card__highlight">{achievement.highlight}</div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Achievements
