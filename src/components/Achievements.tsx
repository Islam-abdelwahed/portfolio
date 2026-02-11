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
        <p className="text-center text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto">
          Badges that capture wins, recognition, and impact.
        </p>

        <div className="flex gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none pb-4 md:pb-0 md:grid md:grid-cols-2 xl:grid-cols-3 scrollbar-hide">
          {safeAchievements.map((achievement, idx) => {
            const current = currentSlides[idx] ?? 0
            const total = achievement.images.length

            return (
              <article
                key={idx}
                className="achievement-card group relative flex-shrink-0 w-[320px] md:w-full overflow-hidden rounded-xl bg-[var(--bg-card)] border border-[var(--border-dark)] transition-all duration-300 hover:border-[var(--border-gold)] hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(102,252,241,0.15)] snap-center"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                {/* Image Container - 16:9 Aspect Ratio with a minimum height fallback */}
                <div className="relative aspect-video min-h-[200px] md:min-h-[220px] overflow-hidden bg-[var(--bg-elevated)]">
                  {/* Image */}
                  <img
                    src={achievement.images[current]}
                    alt={achievement.title}
                    className="achievement-card__image absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:blur-[6px]"
                    loading="lazy"
                  />

                  {/* Blur overlay on hover */}
                  <div
                    className="achievement-card__blur-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-black/30"
                    style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                  />

                  {/* Highlight Badge */}
                  {achievement.highlight && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md bg-[var(--gold)]/90 text-[var(--bg-black)] backdrop-blur-sm shadow-lg">
                        {achievement.highlight}
                      </span>
                    </div>
                  )}

                  {/* Navigation Controls */}
                  {total > 1 && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-between px-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handlePrev(idx)}
                          className="h-8 w-8 rounded-full bg-[var(--bg-black)]/80 text-[var(--text-primary)] flex items-center justify-center backdrop-blur-sm hover:bg-[var(--gold)] hover:text-[var(--bg-black)] transition-all text-xl font-bold shadow-lg"
                          aria-label="Previous image"
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => handleNext(idx)}
                          className="h-8 w-8 rounded-full bg-[var(--bg-black)]/80 text-[var(--text-primary)] flex items-center justify-center backdrop-blur-sm hover:bg-[var(--gold)] hover:text-[var(--bg-black)] transition-all text-xl font-bold shadow-lg"
                          aria-label="Next image"
                        >
                          ›
                        </button>
                      </div>

                      {/* Slide Indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                        {achievement.images.map((_, dotIdx) => (
                          <button
                            key={dotIdx}
                            onClick={() => goToSlide(idx, dotIdx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              dotIdx === current 
                                ? 'w-8 bg-[var(--gold)]' 
                                : 'w-2 bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Go to slide ${dotIdx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Bottom Text Overlay with Blur Backdrop */}
                  <div className="achievement-card__text-overlay absolute bottom-0 left-0 right-0 z-10">
                    {/* Blur backdrop for text area only */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent backdrop-blur-md" 
                         style={{ WebkitBackdropFilter: 'blur(12px)' }} />
                    
                    {/* Text Content */}
                    <div className="relative px-4 py-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-[var(--gold)] to-[var(--gold-dark)] text-base flex items-center justify-center shadow-md">
                          <span aria-hidden="true">{achievement.icon ?? '⭐'}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-white leading-tight truncate">
                            {achievement.title}
                          </h3>
                          {achievement.date && (
                            <p className="text-[10px] font-medium text-[var(--gold)] tracking-wide">
                              {achievement.date}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Description Overlay (Shown on Hover) */}
                  <div className="achievement-card__description absolute inset-0 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
                    <div className="text-center space-y-3 max-w-[280px]">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold)] text-2xl shadow-lg">
                        <span aria-hidden="true">{achievement.icon ?? '⭐'}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white drop-shadow-lg">
                        {achievement.title}
                      </h3>
                      {achievement.date && (
                        <p className="text-sm font-semibold text-[var(--gold)] drop-shadow-md">
                          {achievement.date}
                        </p>
                      )}
                      <p className="text-sm text-white/90 leading-relaxed drop-shadow-md">
                        {achievement.description}
                      </p>
                      {achievement.highlight && (
                        <div className="inline-block px-3 py-1 rounded-full bg-[var(--gold)]/90 text-[var(--bg-black)] text-xs font-bold tracking-wide">
                          {achievement.highlight}
                        </div>
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
