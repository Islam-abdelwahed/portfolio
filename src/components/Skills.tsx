// src/components/Skills.tsx
import siteContent from '../content.config'

const Skills: React.FC = () => {
  const skills = siteContent.skills

  return (
    <section id="skills" className="section skills">
      {/* Floating decorative elements */}
      <div className="floating-decor">
        <div className="float-el float-el--square float-el--1"></div>
        <div className="float-el float-el--circle float-el--2"></div>
        <div className="float-el float-el--circle float-el--3"></div>
        <div className="float-el float-el--orb float-el--4"></div>
        <div className="float-el float-el--orb float-el--5"></div>
      </div>
      <div className="container">
        <h2 className="section__title" data-animate>Skills & Tools</h2>
        <div className="skills__grid">
          {skills.categories.map((category, idx) => (
            <div key={idx} className="skill-category" data-animate data-skill-category-index={idx}>
              <div className="skill-category__header">
                <i className={category.icon}></i> {category.title}
              </div>
              <div className="skill-category__tools">
                {category.tools.map((tool, tIdx) => (
                  <span key={tIdx} className="tool-logo" title={tool.name}>
                    <i className={tool.icon}></i>
                    <span>{tool.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills