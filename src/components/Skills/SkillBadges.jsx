import { useState } from 'react';
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiHtml5,
  SiCss3, SiVisualbasic, SiNodedotjs, SiFlask, SiMongodb, SiJupyter,
  SiFigma, SiMicrosoftexcel, SiJira, SiPandas, SiScikitlearn,
  SiJunit5, SiGraphql, SiVisualstudiocode, SiIntellijidea,
  SiMicrosoftsqlserver, SiOracle, SiDatabricks, SiCanva,
  SiGit, SiGithub, SiPostman, SiConfluence,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { FiBarChart2, FiDatabase, FiGrid, FiTrendingUp, FiLayers } from 'react-icons/fi';
import { skillGroups } from '../../data/constants';

// Product logos where available; illustrative icons for general skills and tools.
const skillIcons = {
  Python: [SiPython, '#3776ab', '#e6eef7'],
  SQL: [FiDatabase, '#557ba0', '#e6eef7'],
  Java: [FaJava, '#b76a42', '#f9ebdc'],
  JavaScript: [SiJavascript, '#a77b08', '#fff5cf'],
  TypeScript: [SiTypescript, '#3178c6', '#e7effb'],
  HTML5: [SiHtml5, '#d85b35', '#fcebe2'],
  CSS: [SiCss3, '#3178c6', '#e7effb'],
  VBA: [SiVisualbasic, '#8560a0', '#f0e7f4'],
  React: [SiReact, '#1684a4', '#e3f3f7'],
  'Next.js': [SiNextdotjs, '#343139', '#edebef'],
  'Node.js': [SiNodedotjs, '#5f8b49', '#e9f0df'],
  Flask: [SiFlask, '#51474b', '#ede8e9'],
  Dash: [FiGrid, '#557ba0', '#e6eef7'],
  JUnit: [SiJunit5, '#5c855c', '#e6efdf'],
  GraphQL: [SiGraphql, '#b95c88', '#f8e6ef'],
  Pandas: [SiPandas, '#665c91', '#ede8f6'],
  Matplotlib: [FiBarChart2, '#5179a5', '#e6eef7'],
  'Scikit-learn': [SiScikitlearn, '#ba7c3c', '#fff0d8'],
  Statsmodels: [FiTrendingUp, '#79638e', '#f0e7f4'],
  MongoDB: [SiMongodb, '#498649', '#e6efdf'],
  'SQL Server': [SiMicrosoftsqlserver, '#ae5b63', '#f8e8eb'],
  'Oracle SQL Developer': [SiOracle, '#b95c64', '#f8e8eb'],
  'Azure Data Factory': [FiLayers, '#397ba2', '#e3f0f7'],
  'Azure Databricks': [SiDatabricks, '#c17455', '#fcebe2'],
  'VS Code': [SiVisualstudiocode, '#3981b0', '#e6eef7'],
  IntelliJ: [SiIntellijidea, '#51474b', '#ede8e9'],
  'Jupyter Notebook': [SiJupyter, '#c96f31', '#f9ebdc'],
  'Microsoft Excel': [SiMicrosoftexcel, '#28764e', '#e2f0e7'],
  Git: [SiGit, '#c36b4d', '#fcebe2'],
  GitHub: [SiGithub, '#51474b', '#ede8e9'],
  Postman: [SiPostman, '#c17455', '#fcebe2'],
  Jira: [SiJira, '#3476c1', '#e4edf9'],
  Confluence: [SiConfluence, '#3476c1', '#e4edf9'],
  Figma: [SiFigma, '#a15b81', '#f2e5f0'],
  Canva: [SiCanva, '#378c98', '#e1f2f3'],
};

export default function SkillBadges() {
  const [category, setCategory] = useState('All');
  const visibleSkills = category === 'All' ? Object.values(skillGroups).flat() : skillGroups[category];
  return (
    <section className="skills-section" id="skills">
      <div className="section-wrap">
        <div className="skills-heading">
          <h2>Skills</h2>
          <div className="skill-filters" role="group" aria-label="Skill categories">
            {['All', ...Object.keys(skillGroups)].map(group => (
              <button key={group} aria-pressed={category === group} aria-controls="skill-badges" onClick={() => setCategory(group)}>{group}</button>
            ))}
          </div>
        </div>
        <ul className="skill-badges" id="skill-badges" aria-label={`${category} skills`}>
          {visibleSkills.map(name => {
            const [Icon, color, background] = skillIcons[name];
            return (
              <li className="skill-badge" key={name}>
                <span className="skill-circle" style={{ '--logo-color': color, '--logo-background': background }}>
                  <Icon aria-hidden="true" focusable="false" />
                </span>
                <span className="skill-name">{name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
