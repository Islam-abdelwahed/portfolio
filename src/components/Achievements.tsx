import React, { useMemo, useState, useEffect, useCallback } from 'react'
import siteContent, { ApiLink } from '../content.config'
const Achievements: React.FC = () => {
  const [achievementsData, setAchievementsData] = useState(siteContent.achievements || [])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSlides, setCurrentSlides] = useState<number[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [isImagePaused, setIsImagePaused] = useState<boolean[]>([])

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          `${ApiLink}?endpoint=achievements`
        )
        const data = await response.json()

        // Clean image URLs and convert Drive URLs to thumbnail format
        const convertDriveUrl = (url: string) => {
          const trimmed = url.trim()
          const match = trimmed.match(/[?&]id=([^&]+)/) || trimmed.match(/\/d\/([^\/]+)/)
          if (match && match[1]) {
            return `https://drive.google.com/thumbnail?id=${match[1].trim()}&sz=w800`
          }
          return trimmed
        }

        // Clean image URLs (trim spaces from IDs) and normalize data
        const formatted = data.map((a: any) => ({
          ...a,
          date: a.date ? String(a.date) : undefined,
          images: Array.isArray(a.images)
            ? a.images.map((url: string) => convertDriveUrl(url)).filter(Boolean)
            : []
        }))

        setAchievementsData(formatted)
        setCurrentSlides(formatted.map(() => 0))
        setIsImagePaused(formatted.map(() => false))
      } catch (error) {
        console.error('Failed to fetch achievements, using fallback data:', error)
        setCurrentSlides(siteContent.achievements.map(() => 0))
        setIsImagePaused(siteContent.achievements.map(() => false))
      } finally {
        setLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  const safeAchievements = useMemo(
    () => achievementsData.map((a) => ({ ...a, images: a.images && a.images.length > 0 ? a.images : ['https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'] })),
    [achievementsData]
  )

  // Carousel navigation
  const handlePrevCard = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + safeAchievements.length) % safeAchievements.length)
  }, [safeAchievements.length])

  const handleNextCard = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % safeAchievements.length)
  }, [safeAchievements.length])

  // Image slideshow within cards
  const handlePrevImage = useCallback((idx: number) => {
    setCurrentSlides((prev) =>
      prev.map((val, i) => {
        if (i !== idx) return val
        const total = safeAchievements[idx].images.length
        return (val - 1 + total) % total
      })
    )
  }, [safeAchievements])

  const handleNextImage = useCallback((idx: number) => {
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

  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused || safeAchievements.length <= 1) return

    const interval = setInterval(() => {
      handleNextCard()
    }, 5000) // 5 seconds per card

    return () => clearInterval(interval)
  }, [isPaused, handleNextCard, safeAchievements.length])

  // Auto-play images within cards
  useEffect(() => {
    const intervals: ReturnType<typeof setInterval>[] = []

    safeAchievements.forEach((achievement, idx) => {
      if (achievement.images.length > 1 && !isImagePaused[idx] && idx === currentIndex) {
        const interval = setInterval(() => {
          handleNextImage(idx)
        }, 4000) // 4 seconds per image
        intervals.push(interval)
      }
    })

    return () => {
      intervals.forEach((interval) => clearInterval(interval))
    }
  }, [safeAchievements, isImagePaused, handleNextImage, currentIndex])

  const handleMouseEnterCard = () => {
    setIsPaused(true)
  }

  const handleMouseLeaveCard = () => {
    setIsPaused(false)
  }

  const handleMouseEnterImage = (idx: number) => {
    setIsImagePaused((prev) => prev.map((val, i) => (i === idx ? true : val)))
  }

  const handleMouseLeaveImage = (idx: number) => {
    setIsImagePaused((prev) => prev.map((val, i) => (i === idx ? false : val)))
  }

  return (
    <section id="achievements" className="section">
      <div className="container">
        <h2 className="section__title" data-animate>Achievements</h2>
        <p className="achievements__intro" data-animate>
          Badges that capture wins, recognition, and impact.
        </p>

        {loading ? (
          <div className="projects__loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading achievements...</p>
          </div>
        ) : (
        <div 
          className="achievements__carousel" 
          data-animate
          onMouseEnter={handleMouseEnterCard}
          onMouseLeave={handleMouseLeaveCard}
        >
          {safeAchievements.length > 1 && (
            <>
              <button
                onClick={handlePrevCard}
                className="achievements__nav-btn achievements__nav-btn--prev"
                aria-label="Previous achievement"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                onClick={handleNextCard}
                className="achievements__nav-btn achievements__nav-btn--next"
                aria-label="Next achievement"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}

          <div className="achievements__track">
            {safeAchievements.map((achievement, idx) => {
              const current = currentSlides[idx] ?? 0
              const total = achievement.images.length
              const offset = idx - currentIndex
              const isActive = idx === currentIndex

              return (
                <article
                  key={idx}
                  className={`achievement-card ${isActive ? 'achievement-card--active' : ''}`}
                  style={{
                    transform: `translateX(calc(${offset * 100}% + ${offset * 3}rem))`,
                  }}
                  onMouseEnter={() => handleMouseEnterImage(idx)}
                  onMouseLeave={() => handleMouseLeaveImage(idx)}
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

                    {total > 1 && isActive && (
                      <>
                        <div className="achievement-card__controls">
                          <button
                            onClick={() => handlePrevImage(idx)}
                            className="achievement-card__nav-btn"
                            aria-label="Previous image"
                          >
                            ‹
                          </button>
                          <button
                            onClick={() => handleNextImage(idx)}
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

          {safeAchievements.length > 1 && (
            <div className="achievements__indicators">
              {safeAchievements.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`achievements__indicator ${idx === currentIndex ? 'achievements__indicator--active' : ''}`}
                  aria-label={`Go to achievement ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        )}
      </div>
    </section>
  )
}

export default Achievements
