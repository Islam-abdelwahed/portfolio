// src/components/Contact.tsx
import { useState } from 'react'
import siteContent from '../content.config'

const Contact: React.FC = () => {
  const contact = siteContent.contact
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="section contact">
      <div className="contact__bg">
        <i className="contact__float contact__float--1 fas fa-envelope gold-icon"></i>
        <i className="contact__float contact__float--2 fas fa-phone gold-icon"></i>
        <i className="contact__float contact__float--3 fab fa-linkedin-in gold-icon"></i>
      </div>
      <div className="container">
        <h2 className="section__title" data-animate>Contact</h2>
        <div className="contact__grid">
          <div className="contact__info" data-animate>
            <a href={`mailto:${contact.email}`} className="contact__cta-btn btn btn--primary">
              <i className="fas fa-envelope"></i> {contact.ctaText}
            </a>
            <ul className="contact__list">
              {contact.info.map((info, idx) => (
                <li key={idx}>
                  <i className={info.icon}></i>
                  <a href={info.href} className="contact__link" aria-label={info.label} target={info.target} rel={info.rel}>
                    {info.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <form className="contact__form" id="contact-form" data-animate onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="name">{contact.formLabels.name}</label>
              <input type="text" id="name" name="name" required placeholder="Your name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form__group">
              <label htmlFor="email">{contact.formLabels.email}</label>
              <input type="email" id="email" name="email" required placeholder="Your email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form__group">
              <label htmlFor="message">{contact.formLabels.message}</label>
              <textarea id="message" name="message" rows={5} required placeholder="Your message" value={formData.message} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn--primary btn--submit">
              <span className="btn__text">Send Message</span>
              <i className="fas fa-envelope btn__icon"></i>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact