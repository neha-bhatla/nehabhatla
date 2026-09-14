import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Bio, experiences, projects, education } from './data/constants';
import portrait from './images/HeroImage2.png';
import PixelArt from './components/PixelArt';
import SkillBadges from './components/Skills/SkillBadges';
import './App.css';

const projectNotes = ['A little connection goes a long way.', 'A space to pause, reflect, and write.', 'Making sense of the crypto market.'];

function ExternalLink({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true"> ↗</span></a>;
}
function SectionTitle({ title, description }) {
  return <div className="section-heading"><h2>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}
function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, []);
  return <dialog ref={dialog} className="project-dialog" onClose={onClose} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }} aria-labelledby="project-title">
    <div className="dialog-inner">
      <button className="close-button" onClick={() => dialog.current.close()} aria-label="Close project">×</button>
      <p className="eyebrow">PROJECT DETAILS</p><h2 id="project-title">{project.title}</h2>
      <img className="project-screenshot" src={project.image} alt={`${project.title} application preview`} />
      <p>{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <ExternalLink className="button primary" href={project.github}>Explore on GitHub</ExternalLink>
    </div>
  </dialog>;
}
function ContactForm() {
  const [status, setStatus] = useState('idle');
  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      await emailjs.sendForm('service_ur117kr', 'template_0o501ji', form, 'ayUrFTd_dzNd3jVH5');
      setStatus('sent'); form.reset();
    } catch { setStatus('error'); }
  }
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Your name<input name="from_name" autoComplete="name" required placeholder="Name" /></label><label>Your email<input name="from_email" type="email" autoComplete="email" required placeholder="you@example.com" /></label></div>
    <label>Subject<input name="subject" required placeholder="What would you like to chat about?" /></label>
    <label>Your note<textarea name="message" required rows="3" placeholder="Hi Neha, ..." /></label>
    <button className="button primary" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Sending your note…' : 'Send a little note ↗'}</button>
    <p className="form-status" role="status">{status === 'sent' ? 'Your note is on its way. Thank you for stopping by!' : status === 'error' ? 'Your note couldn’t be sent. Please try again or reach out on LinkedIn.' : ''}</p>
  </form>;
}
function App() {
  const [selectedRole, setSelectedRole] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [evening, setEvening] = useState(false);
  const [catPetted, setCatPetted] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const catTimer = useRef(null);
  const role = experiences[selectedRole];
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => { observer.disconnect(); clearTimeout(catTimer.current); };
  }, []);
  function petCat() {
    setCatPetted(true); clearTimeout(catTimer.current);
    catTimer.current = setTimeout(() => setCatPetted(false), 3500);
  }
  return <div className={`portfolio ${evening ? 'evening' : ''}`}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><a className="wordmark" href="#about" aria-label="Neha Bhatla home"><PixelArt kind="star" /><span>neha bhatla<span className="brand-dot">.</span></span></a>
      <nav aria-label="Main navigation">{[['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills']].map(([id, label]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>)}</nav>
      <div className="header-actions"><button className="light-switch" aria-label={evening ? 'Switch to daytime' : 'Switch to evening'} aria-pressed={evening} onClick={() => setEvening(!evening)}><span aria-hidden="true">{evening ? '☾' : '☼'}</span></button><a href="#contact" className="hello-link">Say hello <span aria-hidden="true">↗</span></a></div>
    </header>
    <main id="main">
      <section className="hero section-wrap" id="about">
        <div className="hero-layout">
          <div className="portrait-scene"><span className="photo-tape" aria-hidden="true" /><figure className="portrait-frame"><img src={portrait} alt="Neha Bhatla" /></figure><div className="portrait-sticker" aria-hidden="true"><PixelArt kind="dog" /></div><span className="photo-sparkle" aria-hidden="true">✧</span></div>
          <div className="hero-copy"><h1>Hi, I’m Neha.</h1><p className="hero-role">Software Engineering & Management<br className="desktop-break" /> student at McMaster University.</p><p className="hero-description">I’m curious about thoughtful design, building useful things, and the people behind them. I love making connections and challenging myself with new experiences.</p><div className="hero-links"><a className="button primary" href="#projects">Explore my work <span aria-hidden="true">↓</span></a><ExternalLink href={Bio.linkedin} className="text-link">Let’s connect</ExternalLink></div></div>
        </div>
      </section>
      <section className="experience-section" id="experience"><div className="section-wrap">
        <SectionTitle number="01" eyebrow="THE MUG COLLECTION" title="Experience" />
        <div className="experience-layout"><div className="experience-picker"><div className="experience-objects"><div className="experience-options">{experiences.map((item, i) => <button key={item.id} className={`experience-button ${selectedRole === i ? 'selected' : ''}`} aria-pressed={selectedRole === i} aria-controls="experience-story" onClick={() => setSelectedRole(i)}><PixelArt kind={i === 0 ? "laptop" : "book"} variant={i} /><span className="experience-label">{item.company}</span><span className="experience-caption">{i === 0 ? 'Design & discovery' : 'Teaching & connection'}</span><span className="selection-mark" aria-hidden="true">{selectedRole === i ? '◆' : '◇'}</span></button>)}</div></div><p className="interaction-hint"><span aria-hidden="true">↖</span> select an experience to read more</p></div>
          <article id="experience-story" className="experience-card" aria-live="polite" aria-atomic="true"><div className="receipt-top"><span>EXPERIENCE NO. 0{selectedRole + 1}</span><span aria-hidden="true">✳</span></div><p className="experience-date">{role.date}</p><h3>{role.role}</h3><p className="company-name">{role.company}</p><div className="dashed-rule" /><p className="experience-description">{role.desc}</p><div className="tags">{role.skills.map(skill => <span key={skill}>{skill === 'Juypter Notebook' ? 'Jupyter Notebook' : skill}</span>)}</div></article>
        </div>
      </div></section>
      <section className="projects-section section-wrap" id="projects"><SectionTitle number="02" eyebrow="FRESH FROM THE OVEN" title="Projects" />
        <div className="project-collection"><div className="project-grid">{projects.map((project, i) => <button className="project-card" key={project.id} onClick={() => setSelectedProject(project)} aria-haspopup="dialog"><span className="project-number">0{i + 1}</span><span className="project-art"><PixelArt kind={['laptop', 'book', 'coin'][i]} /></span><span className="project-category">{['AI & CONNECTION', 'JOURNALING & REFLECTION', 'DATA & DISCOVERY'][i]}</span><h3>{project.title}</h3><span className="project-note">{projectNotes[i]}</span><span className="project-card-footer"><span>{i < 2 ? project.date : 'Web application'}</span><span className="project-arrow" aria-hidden="true">↗</span></span></button>)}</div></div><p className="case-caption"><ExternalLink href={Bio.github}>More on GitHub</ExternalLink></p>
      </section>
      <SkillBadges />
      <section className="education-section section-wrap" id="education"><SectionTitle number="04" eyebrow="ON THE NOTICEBOARD" title="Education" />{education.map(item => <article className="education-card" key={item.id}><div className="education-stamp"><span>McM</span><span>HAMILTON, ON</span><span aria-hidden="true">✦</span></div><div className="education-copy"><p className="eyebrow">{item.date}</p><h3>{item.school}</h3><p className="degree">Software Engineering & Management · Bachelor of Engineering and Management</p><p>{item.desc.replace('Computer Arcitecture', 'Computer Architecture')}</p><details><summary>Scholarships & awards <span aria-hidden="true">＋</span></summary><ul>{item.Awards.split(', ').map(award => <li key={award}>{award}</li>)}</ul></details></div><span className="notice-pin" aria-hidden="true" /></article>)}</section>
      <section className="contact-section" id="contact"><div className="section-wrap contact-layout"><div className="contact-copy"><h2>Let’s connect.</h2><p>Have an idea, an opportunity, or just want to chat?<br />I’d love to hear from you.</p><div className="social-links"><ExternalLink href={Bio.linkedin}>LinkedIn</ExternalLink><ExternalLink href={Bio.github}>GitHub</ExternalLink></div><div className="pixel-cat"><button onClick={petCat} aria-label="Pet the pixel cat"><PixelArt kind="cat" /></button><span role="status">{catPetted ? 'purrr… you made my day ♡' : 'click for a little purr'}<span aria-hidden="true"> {catPetted ? '♡' : 'zzz'}</span></span></div></div><div className="note-card"><p className="note-card-heading">A note for Neha <span aria-hidden="true">♡</span></p><ContactForm /></div></div></section>
    </main>
    <footer className="site-footer"><a className="footer-wordmark" href="#about">neha bhatla.</a><p>Made with care. ♡</p><a href="#about">BACK TO THE TOP ↑</a></footer>
    {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
  </div>;
}
export default App;
