// src/components/SoftSkills.tsx
import siteContent from '../content.config'

const SoftSkills: React.FC = () => {
  const experience = siteContent.experience

  return (
    <section id="soft-skills" className="section soft-skills">
      <div className="container">
        <h2 className="section__title" data-animate>Soft Skills & Impact</h2>
        <div className="soft-skills__grid">
          {experience.map((exp, idx) => (
            <article key={idx} className="soft-skills__card" data-animate>
              <h3>{exp.title}</h3>
              <p>{exp.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SoftSkills