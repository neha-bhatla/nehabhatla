import LinkedOutImage from '../images/LinkedOut.png';
import rbcGamLogo from '../images/organizations/rbc-gam.svg';
import tdLogo from '../images/organizations/td.png';
import ontarioLogo from '../images/organizations/ontario.svg';
import redCrossLogo from '../images/organizations/canadian-red-cross.svg';
import mcmasterLogo from '../images/organizations/mcmaster.png';

// Portfolio content updated from Neha's September 2026 résumé.
export const Bio = {
  name: 'Neha Bhatla',
  roles: ['Software Engineering & Management', 'Co-op Student'],
  headline: 'Software Engineering & Management co-op student at McMaster University.',
  description: 'I’m continuing my internship part-time at RBC Global Asset Management while studying at McMaster. I’m learning more about building software, working with data, and the business side of technology. I’m always happy to meet new people and try something new, and I’m excited for what’s still to come!',
  email: 'bhatlan@mcmaster.ca',
  github: 'https://github.com/neha-bhatla',
  linkedin: 'https://www.linkedin.com/in/neha-bhatla',
};

export const experiences = [
  {
    id: 'rbc',
    logo: rbcGamLogo,
    role: 'Analytics Software Engineer',
    company: 'RBC Global Asset Management',
    team: 'Performance and Analytics',
    date: 'January 2026 – Present',
    location: 'Toronto, ON',
    type: 'Work experience',
    art: 'coin',
    variant: 0,
    highlights: [
      'Owned end-to-end automation of a 100+ page monthly reporting deck and 5+ supporting reports using Python, Pandas, SQL Server, Oracle DB, and Matplotlib, replacing 2–3 business days of manual work with a recurring workflow for any reporting period.',
      'Designed the architecture for a 50+ page daily investment report using reusable Python report objects, Pandas, Matplotlib, and PdfPages, supporting a senior portfolio manager’s daily trading decisions.',
      'Automated ETF proxy returns and benchmark-relative fund performance calculations with Python and SQL, loading results into the reporting database and saving analysts 3–5 days per month.',
      'Built a Python and SQL QA scanner in the team’s Dash app to flag fund-list issues, plus a Scikit-learn model to detect anomalies in fund returns relative to benchmark returns, NAVs, and holdings.',
    ],
    skills: ['Python', 'Pandas', 'SQL Server', 'Oracle DB', 'Matplotlib', 'Dash', 'Scikit-learn'],
  },
  {
    id: 'td',
    logo: tdLogo,
    role: 'Software Engineer',
    company: 'TD Bank',
    team: 'Core Banking Technology Team',
    date: 'September 2025 – December 2025',
    location: 'Toronto, ON',
    type: 'Work experience',
    art: 'laptop',
    variant: 1,
    highlights: [
      'Built data retention pipelines with Azure Data Factory and Databricks to automate privacy-compliant deletion of millions of records during a mainframe modernization initiative.',
      'Remediated AppSec vulnerabilities across microservices by updating dependencies, deploying to DEV/SIT, and validating fixes through SCA scans.',
      'Investigated API data flows and validated a core microservice and its Azure SQL database using SQL Server and Postman, documenting the work in Jira and Confluence.',
    ],
    skills: ['Azure Data Factory', 'Azure Databricks', 'SQL Server', 'Postman', 'Jira', 'Confluence'],
  },
  {
    id: 'ontario',
    logo: ontarioLogo,
    role: 'I&IT Service Designer',
    company: 'Ontario Public Service',
    team: 'Ministry of Education',
    date: 'May 2024 – August 2024',
    location: 'Toronto, ON',
    type: 'Work experience',
    art: 'book',
    variant: 0,
    highlights: [
      'Designed 300+ functional screen prototypes in Figma for a province-wide application, collaborating with developers and business analysts to support over 16 million Ontarians.',
      'Conducted UX research, developed wireframes, and produced system documentation and technical diagrams to support application development in an Agile environment.',
    ],
    skills: ['Figma', 'UX research', 'Wireframing', 'Technical documentation', 'Agile'],
  },
  {
    id: 'red-cross',
    logo: redCrossLogo,
    role: 'Director of Graphic Design',
    company: 'McMaster Red Cross',
    team: 'Activities & leadership',
    date: 'September 2024 – Present',
    location: 'Hamilton, ON',
    type: 'Leadership',
    art: 'star',
    variant: 0,
    highlights: [
      'Created graphics in Canva and Figma aligned with the McMaster Red Cross’ mission and branding, increasing social media engagement by over 40%.',
    ],
    skills: ['Canva', 'Figma', 'Graphic design', 'Branding'],
  },
];

export const education = [
  {
    id: 'mcmaster',
    logo: mcmasterLogo,
    school: 'McMaster University',
    location: 'Hamilton, ON',
    date: 'September 2022 – May 2028',
    degree: 'Bachelor of Engineering in Software Engineering and Management (Co-op)',
    courses: ['Object-Oriented Programming', 'Databases', 'Data Structures and Algorithms', 'Software Architecture'],
    awards: [
      'Engineering Dean’s Excellence Scholarship — $7,500',
      'Engineering Research Experience Award — $6,000',
      'McMaster Engineering Award of Excellence — $3,000',
    ],
  },
];

export const projects = [
  {
    id: 'linkedout',
    title: 'LinkedOut Reach',
    date: 'HackThe6ix 2024',
    category: 'AI & CONNECTION',
    art: 'laptop',
    summary: 'Connecting job seekers with relevant professionals.',
    description: 'Co-developed a full-stack networking application that matches job seekers with relevant LinkedIn professionals. Integrated the Cohere API for profile matching and used Selenium and BeautifulSoup for web scraping, with a Python and Flask backend, MongoDB, and a React and TypeScript frontend.',
    image: LinkedOutImage,
    tags: ['Python', 'Flask', 'MongoDB', 'Cohere API', 'React', 'TypeScript', 'Selenium', 'BeautifulSoup'],
    github: 'https://github.com/neha-bhatla/LinkedOutReach.git',
  },
  {
    id: 'stock-model',
    title: 'Stock Market Prediction Model',
    date: 'Personal project',
    category: 'DATA & ANALYTICS',
    art: 'coin',
    summary: 'Exploring S&P 500 trends with regression.',
    description: 'Developed a regression-based model to analyze and predict S&P 500 trends using historical market data. Used Pandas to evaluate model performance and identify key market drivers, with Statsmodels, Matplotlib, and JupyterLab supporting the analysis.',
    tags: ['Python', 'Pandas', 'Statsmodels', 'Matplotlib', 'JupyterLab'],
  },
];

export const skillGroups = {
  Languages: ['Python', 'SQL', 'Java', 'JavaScript', 'TypeScript', 'HTML5', 'CSS', 'VBA'],
  Development: ['React', 'Next.js', 'Node.js', 'Flask', 'Dash', 'JUnit', 'GraphQL'],
  'Data & analytics': ['Pandas', 'Matplotlib', 'Scikit-learn', 'Statsmodels', 'MongoDB', 'SQL Server', 'Oracle SQL Developer', 'Azure Data Factory', 'Azure Databricks'],
  'Tools & design': ['VS Code', 'IntelliJ', 'Jupyter Notebook', 'Microsoft Excel', 'Git', 'GitHub', 'Postman', 'Jira', 'Confluence', 'Figma', 'Canva'],
};

// Retained for compatibility with the original, unused Skills component.
export const skills = [];
