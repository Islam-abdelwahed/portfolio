// src/components/Certificates.tsx

import { useState, useEffect } from 'react'
import siteContent, { ApiLink } from '../content.config'

interface Certificate {
  title: string
  org: string
  date?: string
  url: string
  embedUrl: string
  thumbnail?: string
}

const ITEMS_PER_PAGE = 3

const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(
           `${ApiLink}?endpoint=certificates`
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
        setCertificates(siteContent.certificates)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [])

  // Pagination logic
  const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCertificates = certificates.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of certificates section
    document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goToPrevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1)
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1)
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

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

        <div className="certificates__info" data-animate>
          <p className="certificates__count">
            Showing {startIndex + 1}-{Math.min(endIndex, certificates.length)} of {certificates.length} certificates
          </p>
        </div>

        <div className="certificates__grid" data-animate>
          {currentCertificates.map((cert, index) => (
            <div key={index} className="cert-card">
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

        {totalPages > 1 && (
          <div className="certificates__pagination" data-animate>
            <button
              className="pagination__btn pagination__btn--prev"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <i className="fas fa-chevron-left"></i>
              <span>Previous</span>
            </button>

            <div className="pagination__numbers">
              {getPageNumbers().map((page, index) => (
                typeof page === 'number' ? (
                  <button
                    key={index}
                    className={`pagination__number ${currentPage === page ? 'pagination__number--active' : ''}`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className="pagination__ellipsis">
                    {page}
                  </span>
                )
              ))}
            </div>

            <button
              className="pagination__btn pagination__btn--next"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <span>Next</span>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Certificates
