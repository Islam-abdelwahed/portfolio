// src/components/Projects.tsx
import { useState, useEffect } from 'react'
import siteContent from '../content.config'

interface Project {
  title: string
  description: string
  stack: string[]
  image: string
  imageAlt: string
  demoLink: string
  githubRepo: string
  category: string
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})
  const projectsPerPage = 3

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbylIdIabBUD-y9jt5WFUj1MM5DZjb2HozcmMZtWquwSLtrQowkZrONZgh-8HB8fpCCZ/exec'
        )
        const data = await response.json()
        
        console.log('Fetched projects:', data) // Debug log
        
        // Parse stack from string to array and process images
        const formattedData = data.map((project: any) => {
          let imageUrl = project.image || ''
          
          // If it's a Google Drive URL, ensure it's in the right format
          if (imageUrl.includes('drive.google.com')) {
            // Extract file ID
            const match = imageUrl.match(/[?&]id=([^&]+)/) || imageUrl.match(/\/d\/([^\/]+)/)
            if (match && match[1]) {
              const fileId = match[1]
              // Use thumbnail format which is more reliable
              imageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`
            }
          }
          
          console.log('Processing project:', project.title, 'Image URL:', imageUrl)
          
          return {
            ...project,
            image: imageUrl,
            stack: project.stack ? project.stack.split(',').map((s: string) => s.trim()).filter(Boolean) : []
          }
        })
        
        setProjects(formattedData)
      } catch (error) {
        console.error('Failed to fetch projects, using fallback data:', error)
        // Fallback to content.config data
        setProjects(siteContent.projects)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleImageError = (idx: number) => {
    console.error(`Image failed to load for project index: ${idx}`)
    setImageErrors(prev => ({ ...prev, [idx]: true }))
  }

  // Filter projects based on active category
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage
  const indexOfFirstProject = indexOfLastProject - projectsPerPage
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage)

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter)
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const filters = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile']

  if (loading) {
    return (
      <section id="projects" className="section projects">
        <div className="container">
          <h2 className="section__title" data-animate>Projects</h2>
          <div className="projects__loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section__title" data-animate>Projects</h2>
        
        {/* Filter Buttons */}
        <div className="projects__filters" data-animate>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects__grid">
          {currentProjects.map((project, idx) => (
            <article key={idx} className="project-card" data-animate data-project-index={idx}>
              {/* Large Image Preview */}
              <div className="project-card__image-wrap">
                {imageErrors[idx] ? (
                  <div className="project-card__image-placeholder">
                    <i className="fas fa-image"></i>
                    <span>Image unavailable</span>
                  </div>
                ) : (
                  <img 
                    src={project.image} 
                    alt={project.imageAlt} 
                    className="project-card__image"
                    onError={() => handleImageError(idx)}
                  />
                )}
              </div>

              {/* Project Content */}
              <div className="project-card__content">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>
                
                {/* Technology Tags */}
                <div className="project-card__tags">
                  {project.stack.map((tech, techIdx) => (
                    <span key={techIdx} className="project-tag">{tech}</span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-card__actions">
                  {project.githubRepo && (
                    <a 
                      href={project.githubRepo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-btn project-btn--code"
                    >
                      <i className="fab fa-github"></i>
                      Code
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-btn project-btn--demo"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="projects__pagination" data-animate>
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <i className="fas fa-chevron-left"></i>
              Previous
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects