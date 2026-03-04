// src/components/Certificates.tsx

import siteContent from '../content.config'

const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <h2 className="section__title" data-animate>Certificates</h2>
        
        <div className="certificates__grid">
          {siteContent.certificates.map((cert, index) => (
            <div key={index} className="cert-card" data-animate>
              <div className="cert-card__image-wrap">
                <img 
                  src={cert.thumbnail || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80'} 
                  alt={cert.title}
                  className="cert-card__image"
                />
                <div className="cert-card__overlay"></div>
              </div>
              
              <div className="cert-card__content">
                <h3 className="cert-card__title">{cert.title}</h3>
                <p className="cert-card__org">{cert.org}</p>
                
                <a 
                  href={cert.embedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cert-card__button"
                >
                  <i className="fas fa-eye"></i>
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certificates