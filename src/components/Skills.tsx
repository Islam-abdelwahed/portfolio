// src/components/Skills.tsx
import siteContent from '../content.config'

const Skills: React.FC = () => {
  const skills = siteContent.skills

  return (
    <section id="skills" className="section skills">
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