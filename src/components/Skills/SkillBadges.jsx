import { useState } from 'react';
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiHtml5,
  SiSass, SiTailwindcss, SiNodedotjs, SiFlask, SiMongodb, SiSelenium,
  SiJupyter, SiScratch, SiFigma, SiMicrosoftvisio, SiMicrosoftexcel, SiJira,
} from 'react-icons/si';
import { FiCpu, FiCode, FiSearch, FiPenTool, FiUsers } from 'react-icons/fi';

// Logos come from the installed icon library; general skills use illustrative icons.
const groups = {
  Development: [
    ['Python', SiPython, '#3776ab', '#e6eef7'],
    ['JavaScript', SiJavascript, '#a77b08', '#fff5cf'],
    ['TypeScript', SiTypescript, '#3178c6', '#e7effb'],
    ['React', SiReact, '#1684a4', '#e3f3f7'],
    ['Next.js', SiNextdotjs, '#343139', '#edebef'],
    ['HTML5', SiHtml5, '#d85b35', '#fcebe2'],
    ['SCSS', SiSass, '#b95c88', '#f8e6ef'],
    ['Tailwind CSS', SiTailwindcss, '#128b9d', '#e1f2f3'],
    ['Node.js', SiNodedotjs, '#5f8b49', '#e9f0df'],
    ['Flask', SiFlask, '#51474b', '#ede8e9'],
  ],
  'Data & tools': [
    ['MongoDB', SiMongodb, '#498649', '#e6efdf'],
    ['Cohere API', FiCpu, '#647956', '#eaf0e5'],
    ['Selenium', SiSelenium, '#4c8844', '#e9f3e5'],
    ['BeautifulSoup', FiCode, '#85704c', '#f3eddf'],
    ['Jupyter', SiJupyter, '#c96f31', '#f9ebdc'],
    ['Scratch', SiScratch, '#c4862d', '#fff0d8'],
  ],
  'Design & teamwork': [
    ['Figma', SiFigma, '#a15b81', '#f2e5f0'],
    ['Microsoft Visio', SiMicrosoftvisio, '#4169a5', '#e7edf8'],
    ['Microsoft Excel', SiMicrosoftexcel, '#28764e', '#e2f0e7'],
    ['Jira', SiJira, '#3476c1', '#e4edf9'],
    ['UX research', FiSearch, '#8b659b', '#f0e7f4'],
    ['Wireframing & prototyping', FiPenTool, '#ae6b7a', '#f8e8eb'],
    ['Communication & mentoring', FiUsers, '#8d7650', '#f4eddf'],
  ],
};

export default function SkillBadges() {
  const [category, setCategory] = useState('All');
  const visibleSkills = category === 'All' ? Object.values(groups).flat() : groups[category];
  return (
    <section className="skills-section" id="skills">
      <div className="section-wrap">
        <div className="skills-heading">
          <h2>Skills & tools</h2>
          <div className="skill-filters" role="group" aria-label="Skill categories">
            {['All', ...Object.keys(groups)].map(group => (
              <button key={group} aria-pressed={category === group} aria-controls="skill-badges" onClick={() => setCategory(group)}>{group}</button>
            ))}
          </div>
        </div>
        <ul className="skill-badges" id="skill-badges" aria-label={`${category} skills`}>
          {visibleSkills.map(([name, Icon, color, background]) => (
            <li className="skill-badge" key={name}>
              <span className="skill-circle" style={{ '--logo-color': color, '--logo-background': background }}>
                <Icon aria-hidden="true" focusable="false" />
              </span>
              <span className="skill-name">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
