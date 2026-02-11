// src/components/Certificates.tsx

const certificates = [
  { title: "Python Essentials 1 & 2", org: "Cisco", url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications.html" },
  { title: "Data Analytics Essentials", org: "Cisco", url: "https://www.cisco.com/c/en/us/training-events/training-certifications/certifications.html" },
  { title: "Machine Learning", org: "NTI", url: "https://www.nti.gov.eg/" },
  { title: "Deep Learning & Computer Vision", org: "NTI", url: "https://www.nti.gov.eg/" },
  { title: "Innovegypt Program", org: "ITIDA", url: "https://www.itida.gov.eg/" },
  { title: "Algorithm Analysis & Design", org: "Udemy", url: "https://www.udemy.com/" }
]

const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="section certificates">
      <div className="container">
        <h2 className="section__title" data-animate>Certificates</h2>
        <div className="certificates__scroll">
          <div className="certificates__track">
            {certificates.map((cert, idx) => (
              <article key={idx} className="cert-card" data-animate data-cert-url={cert.url}>
                <div className="cert-card__icon"><i className="fas fa-award"></i></div>
                <h3 className="cert-card__title">{cert.title}</h3>
                <p className="cert-card__org">{cert.org}</p>
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-card__btn" aria-label="View Certificate">
                  <i className="fas fa-external-link-alt"></i> View Certificate
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificates