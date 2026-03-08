// src/components/Certificates.tsx

import { useState, useEffect } from 'react'
import siteContent from '../content.config'

interface Certificate {
  title: string
  org: string
  date?: string
  url: string
  embedUrl: string
  thumbnail?: string
}

const Certificates: React.FC = () => {
  const [showAll, setShowAll] = useState(false)
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const maxVisible = 6

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbxJfyEyQcBotdjf8hpoAB3dEjUzbcwxAhAnfM67Pq3YtzQF63tIS4zWJwKNq3rdg09i/exec'
        )
        const data = await response.json()
        
        // Format dates from ISO to DD/MM/YYYY
        const formattedData = data.map((cert: any) => ({
          ...cert,
          date: cert.date ? new Date(cert.date).toLocaleDateString('en-GB') : undefined
        }))
        
        setCertificates(formattedData)
      } catch (error) {
        console.error('Failed to fetch certificates, using fallback data:', error)
        // Fallback to content.config data
        setCertificates(siteContent.certificates)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  const displayedCertificates = showAll ? certificates : certificates.slice(0, maxVisible)
  const hasMore = certificates.length > maxVisible

  if (loading) {
    return (
      <section id="certificates" className="section certificates">
        <div className="container">
          <h2 className="section__title" data-animate>Certificates</h2>
          <div className="certificates__loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading certificates...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <h2 className="section__title" data-animate>Certificates</h2>
        
        <div className="certificates__list">
          {displayedCertificates.map((cert, index) => (
            <div key={index} className="cert-card" data-animate>
              <div className="cert-card__thumbnail">
                {cert.thumbnail ? (
                  <img 
                    src={cert.thumbnail} 
                    alt={cert.title}
                    className="cert-card__image"
                  />
                ) : (
                  <div className="cert-card__placeholder">
                    <i className="fas fa-certificate"></i>
                  </div>
                )}
              </div>

              <div className="cert-card__content">
                {cert.date && (
                  <div className="cert-card__date">
                    <i className="far fa-calendar-alt"></i>
                    <span>{cert.date}</span>
                  </div>
                )}

                <h3 className="cert-card__title">{cert.title}</h3>
                <p className="cert-card__org">{cert.org}</p>

                <a 
                  href={cert.embedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cert-card__button"
                >
                  View Certificate
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="certificates__toggle">
            <button 
              className="btn-show-more"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <span>Show Less</span>
                  <i className="fas fa-chevron-up"></i>
                </>
              ) : (
                <>
                  <span>See More</span>
                  <i className="fas fa-chevron-down"></i>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Certificates