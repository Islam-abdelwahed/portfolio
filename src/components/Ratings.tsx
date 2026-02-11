// src/components/Ratings.tsx
import { useState } from 'react'
import siteContent from '../content.config'

const Ratings: React.FC = () => {
  const testimonials = siteContent.testimonials
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likes, setLikes] = useState(testimonials.map(t => ({ count: t.likes, liked: false })))

  const handleLike = (idx: number) => {
    setLikes(likes.map((l, i) => {
      if (i === idx) {
        return { count: l.liked ? l.count - 1 : l.count + 1, liked: !l.liked }
      }
      return l
    }))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="ratings" className="section ratings">
      <div className="container">
        <h2 className="section__title">Customer Testimonials</h2>
        
        <div className="carousel-container">
          <button className="carousel-btn carousel-btn-prev" onClick={prevSlide}>
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="carousel-track">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx} 
                className={`carousel-slide ${idx === currentIndex ? 'active' : ''}`} 
                data-testimonial-index={idx}
              >
                <div className="testimonial">
                  <div className="testimonial__avatar">
                    <i className={testimonial.avatarIcon}></i>
                  </div>
                  <h3 className="testimonial__name">{testimonial.name}</h3>
                  <div className="testimonial__rating">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <p className="testimonial__text">{testimonial.message}</p>
                  <button 
                    className={`testimonial__like ${likes[idx].liked ? 'liked' : ''}`} 
                    data-count={likes[idx].count}
                    onClick={() => handleLike(idx)}
                  >
                    <i className={likes[idx].liked ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'}></i>
                    <span>{likes[idx].count}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-btn carousel-btn-next" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div className="carousel-dots" id="carousel-dots">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Ratings