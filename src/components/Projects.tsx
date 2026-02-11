// src/components/Projects.tsx
import siteContent from '../content.config'

const Projects: React.FC = () => {
  const projects = siteContent.projects

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section__title" data-animate>Projects</h2>
        <div className="projects__grid">
          {projects.map((project, idx) => (
            <article key={idx} className="project-card" data-animate data-project-index={idx}>
              <div className="project-card__image-wrap">
                <img src={project.image} alt={project.imageAlt} className="project-card__image" />
              </div>
              <div className="project-card__inner">
                <div className="project-card__icon">
                  <i className={
                    idx === 0 ? 'fas fa-search' :
                    idx === 1 ? 'fas fa-film' :
                    idx === 2 ? 'fas fa-shopping-cart' :
                    'fas fa-chart-line'
                  }></i>
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__badges">
                  {project.stack.map((badge, bIdx) => (
                    <span key={bIdx}>{badge}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects