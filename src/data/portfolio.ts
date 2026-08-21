// EDIT THIS FILE TO UPDATE YOUR PORTFOLIO CONTENT

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  shortRole: string;
  osName: string;
  greeting: string;
  introduction: string;
  specialization: string;
  currentFocus: string;
  location: string;
  workPreference: string;
  availability: string;
  currentlyCoding: string;
  terminalStatus: string;
  bio: string;
  interests: string[];
  hobbies: string[];
  learningGoals: string[];
  careerObjective: string;
  technologiesSummary: string[];
  stats: {
    projectsCompleted: string;
    technologiesUsed: string;
    yearsBuilding: string;
    availability: string;
  };
}

export type SkillLevel = 'comfortable' | 'working' | 'learning';

export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'tools'
  | 'testing'
  | 'other';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export type ProjectStatus = 'completed' | 'in-progress' | 'prototype';

export type ProjectFilter = 'all' | 'web' | 'fullstack' | 'networking' | 'security';

export type ProjectThumbnail = 'network' | 'dashboard' | 'tasks' | 'desktop';

export interface Project {
  id: string;
  name: string;
  summary: string;
  problem: string;
  features: string[];
  contribution: string;
  challenge: string;
  outcome: string;
  technologies: string[];
  tags: ProjectFilter[];
  status: ProjectStatus;
  github: string;
  live: string;
  thumbnail: ProjectThumbnail;
}

export type ExperienceCategory =
  | 'employment'
  | 'internship'
  | 'freelance'
  | 'academic'
  | 'personal'
  | 'team'
  | 'volunteer'
  | 'coursework';

export interface ExperienceItem {
  id: string;
  category: ExperienceCategory;
  position: string;
  organization: string;
  dateRange: string;
  location: string;
  bullets: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  university: string;
  years: string;
  subjects: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface Award {
  id: string;
  name: string;
  year: string;
  description: string;
}

export const personalInfo: PersonalInfo = {
  name: '[YOUR NAME]',
  role: 'FULL-STACK SOFTWARE ENGINEER',
  shortRole: 'Software Engineer',
  osName: '[YOUR NAME] OS',
  greeting: "Hello, I'm [YOUR NAME]",
  introduction:
    "I'm a software engineer who enjoys turning ideas into reliable, accessible, and user-friendly applications. I work across frontend and backend development, with a focus on clean code, thoughtful interfaces, and practical problem-solving.",
  specialization: 'Building secure, reliable, and user-friendly applications.',
  currentFocus:
    '[Your current professional focus, e.g. full-stack web apps and network security labs.]',
  location: '[CITY, COUNTRY]',
  workPreference: '[REMOTE / HYBRID / ONSITE]',
  availability: 'Available for opportunities',
  currentlyCoding: 'Currently coding',
  terminalStatus: '> Building useful software one commit at a time_',
  bio: "[Write a short personal biography here. Mention how you got into software, what kind of problems you like solving, and what you care about in your work. Keep it honest and recruiter-friendly.]",
  interests: ['[WEB DEVELOPMENT]', '[SECURITY]', '[AI]', '[CLOUD]'],
  hobbies: ['[YOUR HOBBIES]'],
  learningGoals: [
    '[Technology or skill you are currently learning]',
    '[Another learning goal]',
  ],
  careerObjective:
    '[Describe the kind of role, team, or problems you want to work on next.]',
  technologiesSummary: ['TypeScript', 'React', 'Node.js', 'Python', 'SQL'],
  stats: {
    projectsCompleted: '[N]',
    technologiesUsed: '[N]',
    yearsBuilding: '[N]',
    availability: 'Open to opportunities',
  },
};

export const socialLinks: SocialLinks = {
  email: '[YOUR EMAIL]',
  github: '[YOUR GITHUB URL]',
  linkedin: '[YOUR LINKEDIN URL]',
};

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: 'languages', label: 'Programming Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'databases', label: 'Databases' },
  { id: 'tools', label: 'Tools and Platforms' },
  { id: 'testing', label: 'Testing' },
  { id: 'other', label: 'Other Knowledge' },
];

export const skills: Skill[] = [
  { name: 'JavaScript', category: 'languages', level: 'comfortable' },
  { name: 'TypeScript', category: 'languages', level: 'comfortable' },
  { name: 'Python', category: 'languages', level: 'working' },
  { name: 'Java', category: 'languages', level: 'working' },
  { name: 'React', category: 'frontend', level: 'comfortable' },
  { name: 'HTML', category: 'frontend', level: 'comfortable' },
  { name: 'CSS', category: 'frontend', level: 'comfortable' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'comfortable' },
  { name: 'Node.js', category: 'backend', level: 'working' },
  { name: 'Express', category: 'backend', level: 'working' },
  { name: 'Django', category: 'backend', level: 'learning' },
  { name: 'PostgreSQL', category: 'databases', level: 'working' },
  { name: 'MySQL', category: 'databases', level: 'working' },
  { name: 'MongoDB', category: 'databases', level: 'learning' },
  { name: 'Git', category: 'tools', level: 'comfortable' },
  { name: 'GitHub', category: 'tools', level: 'comfortable' },
  { name: 'Docker', category: 'tools', level: 'learning' },
  { name: 'Linux', category: 'tools', level: 'working' },
  { name: 'VS Code', category: 'tools', level: 'comfortable' },
  { name: 'Vitest', category: 'testing', level: 'working' },
  { name: 'Jest', category: 'testing', level: 'working' },
  { name: 'Playwright', category: 'testing', level: 'learning' },
  { name: 'REST APIs', category: 'other', level: 'comfortable' },
  { name: 'Responsive design', category: 'other', level: 'comfortable' },
  { name: 'Networking', category: 'other', level: 'working' },
  { name: 'Security fundamentals', category: 'other', level: 'working' },
];

export const projects: Project[] = [
  {
    id: 'secure-access',
    name: 'Enterprise Secure Remote Access',
    summary:
      'A virtual enterprise network lab for secure remote access, isolation, and controlled security testing.',
    problem:
      'Teams need a realistic way to practice firewall policy, VPN access, and network segmentation without exposing a live production environment.',
    features: [
      'Site-to-site style remote access with OpenVPN',
      'Firewall policies and network isolation on pfSense',
      'Segmented lab hosts on Ubuntu Server and Windows',
      'Controlled testing workflow with Kali Linux',
    ],
    contribution:
      '[Describe your role: topology design, firewall rules, VPN setup, documentation, or testing.]',
    challenge:
      'Keeping lab networks isolated while still allowing authenticated remote access and repeatable security tests.',
    outcome:
      'A reusable virtual enterprise environment for demonstrating secure remote access patterns. Some hardening and documentation tasks are still in progress.',
    technologies: [
      'pfSense',
      'OpenVPN',
      'Ubuntu Server',
      'Windows',
      'Kali Linux',
      'GNS3',
      'VirtualBox',
    ],
    tags: ['networking', 'security'],
    status: 'in-progress',
    github: '',
    live: '',
    thumbnail: 'network',
  },
  {
    id: 'reliability-dashboard',
    name: 'Reliability Ratio Dashboard',
    summary:
      'A dashboard for monitoring and visualizing reliability metrics so teams can spot issues early.',
    problem:
      'Reliability data was scattered, which made it hard to compare trends, filter incidents, and support decisions.',
    features: [
      'Charts for uptime, error ratio, and incident trends',
      'Filters by service, date range, and severity',
      'Lightweight data processing for summary cards',
      'Decision-support view for weekly reliability review',
    ],
    contribution:
      '[Describe what you built: UI, data transforms, chart logic, or API integration.]',
    challenge:
      'Presenting several related metrics clearly without overwhelming the viewer.',
    outcome:
      'A prototype dashboard that turns raw reliability numbers into a readable operations view.',
    technologies: ['React', 'TypeScript', 'Charting', 'CSS'],
    tags: ['web'],
    status: 'prototype',
    github: '',
    live: '',
    thumbnail: 'dashboard',
  },
  {
    id: 'task-manager',
    name: 'Full-Stack Task Manager',
    summary:
      'A task app with authentication, CRUD operations, filtering, and database persistence.',
    problem:
      'I needed a complete full-stack project that covers real application flows rather than isolated UI widgets.',
    features: [
      'User authentication and protected routes',
      'Create, edit, complete, and delete tasks',
      'Filtering and status views',
      'Responsive interface with persistent storage',
    ],
    contribution:
      '[Describe frontend, backend, data model, and any auth work you completed.]',
    challenge:
      'Keeping validation, auth, and CRUD flows consistent across the client and server.',
    outcome:
      'A working full-stack starter that demonstrates end-to-end feature delivery.',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL'],
    tags: ['web', 'fullstack'],
    status: 'completed',
    github: '',
    live: '',
    thumbnail: 'tasks',
  },
  {
    id: 'portfolio-os',
    name: 'Personal Portfolio OS',
    summary:
      'This retro pixel desktop portfolio, built as a reusable windowed interface for recruiters.',
    problem:
      'A standard single-page portfolio can feel generic. I wanted something memorable that still stays readable and accessible.',
    features: [
      'Reusable window manager with focus, minimize, and maximize',
      'Responsive desktop, tablet, and mobile layouts',
      'Keyboard shortcuts, start menu, and terminal',
      'Content stored in one editable data file',
    ],
    contribution:
      'Designed and implemented the desktop shell, window system, theming, accessibility, and portfolio sections.',
    challenge:
      'Making overlapping windows feel like a desktop OS without hiding content or breaking mobile use.',
    outcome:
      'A recruiter-friendly portfolio that presents projects and experience through an original retro interface.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    tags: ['web'],
    status: 'completed',
    github: '',
    live: '',
    thumbnail: 'desktop',
  },
];

export const experience: ExperienceItem[] = [
  {
    id: 'exp-academic',
    category: 'academic',
    position: '[PROJECT ROLE, e.g. Frontend Developer]',
    organization: '[COURSE / UNIVERSITY PROJECT NAME]',
    dateRange: '[START – END]',
    location: '[CITY, COUNTRY]',
    bullets: [
      '[Achievement: what you designed, built, or shipped]',
      '[Achievement: a concrete technical decision and why it mattered]',
      '[Achievement: collaboration, documentation, or demo outcome]',
    ],
    technologies: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
  },
  {
    id: 'exp-personal',
    category: 'personal',
    position: 'Independent Developer',
    organization: 'Personal Projects',
    dateRange: '[YEAR – Present]',
    location: '[CITY, COUNTRY]',
    bullets: [
      '[Describe a project you built end-to-end]',
      '[Mention a bug, constraint, or design problem you solved]',
      '[Note what you learned and reused later]',
    ],
    technologies: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: 'exp-team',
    category: 'team',
    position: '[TEAM ROLE]',
    organization: '[HACKATHON / CLASS TEAM / CLUB]',
    dateRange: '[DATES]',
    location: '[CITY, COUNTRY / Remote]',
    bullets: [
      '[What you owned on the team]',
      '[How you coordinated or reviewed work]',
      '[Result of the project or demo]',
    ],
    technologies: ['[Tech 1]', '[Tech 2]'],
  },
  {
    id: 'exp-coursework',
    category: 'coursework',
    position: 'Relevant Coursework',
    organization: '[UNIVERSITY NAME]',
    dateRange: '[START YEAR–GRADUATION YEAR]',
    location: '[CITY, COUNTRY]',
    bullets: [
      '[Course: e.g. Data Structures — key project or topic]',
      '[Course: e.g. Computer Networks — lab or assignment highlight]',
      '[Course: e.g. Databases — schema or query work]',
    ],
    technologies: ['[Languages / tools used in class]'],
  },
];

export const education: EducationItem[] = [
  {
    id: 'edu-1',
    degree: '[DEGREE NAME]',
    university: '[UNIVERSITY NAME]',
    years: '[START YEAR–GRADUATION YEAR]',
    subjects: ['[Subject 1]', '[Subject 2]', '[Subject 3]'],
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: '[CERTIFICATION NAME]',
    issuer: '[ISSUING ORGANIZATION]',
    year: '[YEAR]',
  },
];

export const awards: Award[] = [
  {
    id: 'award-1',
    name: '[AWARD OR ACHIEVEMENT]',
    year: '[YEAR]',
    description: '[One-line description, or delete this item if not applicable]',
  },
];

export const resume = {
  path: '/resume.pdf',
  lastUpdated: '[LAST UPDATED DATE]',
};

/**
 * Leave empty to use the mailto fallback.
 * Later you can set a Formspree/EmailJS/custom endpoint, e.g. "https://formspree.io/f/xxxx".
 */
export const contactFormEndpoint = '';

export const siteMeta = {
  title: '[YOUR NAME] | Software Engineer',
  description:
    'Portfolio of [YOUR NAME], a software engineer building reliable, accessible, and user-friendly applications.',
  canonical: 'https://your-domain.example/',
};

export function isPlaceholder(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  return trimmed.includes('[YOUR') || (trimmed.startsWith('[') && trimmed.endsWith(']'));
}

export function isUsableHttpUrl(value: string): boolean {
  if (isPlaceholder(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isUsableEmail(value: string): boolean {
  if (isPlaceholder(value)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const experienceLabels: Record<ExperienceCategory, string> = {
  employment: 'Employment',
  internship: 'Internship',
  freelance: 'Freelance',
  academic: 'Academic Experience',
  personal: 'Personal Projects',
  team: 'Team Projects',
  volunteer: 'Volunteer',
  coursework: 'Relevant Coursework',
};

export const skillLevelLabels: Record<SkillLevel, string> = {
  comfortable: 'Comfortable',
  working: 'Working Knowledge',
  learning: 'Learning',
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  prototype: 'Prototype',
};
