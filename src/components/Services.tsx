// src/components/Services.tsx
import siteContent from '../content.config'

const Services: React.FC = () => {
  const services = siteContent.services

  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 className="section__title" data-animate>Services</h2>
        <div className="services__grid">
          {services.map((service, idx) => (
            <article key={idx} className="service-card" data-animate data-service-index={idx}>
              <div className="service-card__icon">
                <i className={service.icon}></i>
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services