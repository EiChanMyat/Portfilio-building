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
  | 'spoken'
  | 'other';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export type ProjectStatus = 'completed' | 'in-progress' | 'prototype';

export type ProjectFilter = 'all' | 'web' | 'fullstack' | 'vision';

export type ProjectThumbnail = 'network' | 'dashboard' | 'tasks' | 'desktop' | 'vision' | 'delivery';

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
  name: 'Ei Chan Myat',
  role: 'SOFTWARE ENGINEERING STUDENT',
  shortRole: 'Software Engineering Student',
  osName: 'Ei Chan Myat OS',
  greeting: "Hello, I'm Ei Chan Myat",
  introduction:
    
    "I'm a Software Engineering student at the University of Information Technology in Yangon. I love turning ideas into useful applications, from full-stack web apps to computer-vision projects.",
  specialization: 'Full-stack web apps and computer vision.',
  currentFocus:
    
    'Sharpening my TypeScript, Next.js and Python skills, and studying Japanese for JLPT N3.',
  location: 'Yangon, Myanmar',
  workPreference: 'Open to internship opportunities',
  availability: 'Open to internship opportunities',
  currentlyCoding: 'Currently coding',
  terminalStatus: '> Building apps and studying Japanese_',
  bio:
    
    "I'm a fifth-year Software Engineering student at the University of Information Technology (UIT) in Yangon. I began with Java and PHP, then grew into full-stack web development and computer vision. What I enjoy most is making ideas real by building applications, like Toma, my gamified habit-tracking app. I'm also learning Japanese. I passed JLPT N4 and am preparing for N3, partly because I admire the discipline, punctuality and teamwork in Japanese work culture. You can count on me to be honest, hardworking and always eager to learn something new.",
  interests: [
    'Full-stack web development',
    'Computer vision',
    'Japanese language and culture',
    'Building useful applications',
  ],
  hobbies: ['Photography', 'Chess'],
  learningGoals: [
    'Japanese: JLPT N3',
    'TypeScript, Next.js and Tailwind CSS',
    'Python and APIs',
  ],
  careerObjective:
    
    "I want to start as a developer, learn how a team builds and maintains real systems, and keep growing my skills. Over time, I'd like to take on more responsibility, such as designing and improving larger parts of a system, and become an engineer my team and customers can trust.",
  technologiesSummary: ['Java', 'PHP', 'JavaScript', 'React', 'MySQL', 'MongoDB', 'JLPT N4'],
  stats: {
    projectsCompleted: '5',
    technologiesUsed: '15+',
    yearsBuilding: '4',
    availability: 'Open to internships',
  },
};

export const socialLinks: SocialLinks = {
  email: 'eichanmyat2020@gmail.com',
  github: 'https://github.com/EiChanMyat',
  linkedin: 'https://www.linkedin.com/in/ei-chan-myat-6126a844b',
};

export const snakeGame = {
  name: 'Snake Game',
  url: 'https://snake-game-lac.vercel.app/',
};

export const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: 'languages', label: 'Programming Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'databases', label: 'Databases' },
  { id: 'tools', label: 'Tools and Platforms' },
  { id: 'spoken', label: 'Spoken Languages' },
  { id: 'other', label: 'Other Knowledge' },
];

export const skills: Skill[] = [
  { name: 'Java', category: 'languages', level: 'comfortable' },
  { name: 'PHP', category: 'languages', level: 'comfortable' },
  { name: 'JavaScript', category: 'languages', level: 'comfortable' },
  { name: 'Python', category: 'languages', level: 'learning' },
  { name: 'TypeScript', category: 'languages', level: 'learning' },
  { name: 'HTML', category: 'frontend', level: 'comfortable' },
  { name: 'CSS', category: 'frontend', level: 'comfortable' },
  { name: 'React', category: 'frontend', level: 'comfortable' },
  { name: 'Bootstrap', category: 'frontend', level: 'comfortable' },
  { name: 'jQuery', category: 'frontend', level: 'comfortable' },
  { name: 'Next.js', category: 'frontend', level: 'learning' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'learning' },
  { name: 'FastAPI', category: 'backend', level: 'learning' },
  { name: 'MySQL (phpMyAdmin)', category: 'databases', level: 'comfortable' },
  { name: 'MongoDB', category: 'databases', level: 'comfortable' },
  { name: 'Supabase', category: 'databases', level: 'comfortable' },
  { name: 'Git', category: 'tools', level: 'comfortable' },
  { name: 'GitHub', category: 'tools', level: 'comfortable' },
  { name: 'Japanese (JLPT N4)', category: 'spoken', level: 'working' },
  { name: 'English (Intermediate)', category: 'spoken', level: 'working' },
  { name: 'APIs', category: 'other', level: 'learning' },
  { name: 'Computer vision (YOLOv8)', category: 'other', level: 'learning' },
];

export const projects: Project[] = [
  {
    id: 'deli-app',
    name: 'Deli App',
    summary:
      'A multi-role food delivery platform for Yangon with login, search, live order tracking and an admin dashboard.',
    problem:
      'Food delivery needs customers, restaurants and admins to work from the same live order data, with a separate view for each role.',
    features: [
      'Multi-role login for different kinds of users',
      'Search to find food and restaurants',
      'Live order tracking',
      'Admin dashboard',
      'Data mining on platform data',
    ],
    contribution:
      'Full-stack developer. I worked on both the Next.js front end and the MongoDB-backed back end.',
    challenge:
      'Keeping one set of order data consistent across several user roles while showing live order status.',
    outcome:
      'A working multi-role platform that covers the ordering flow from login to order tracking.',
    technologies: ['Next.js', 'TypeScript', 'MongoDB'],
    tags: ['web', 'fullstack'],
    status: 'completed',
    github: 'https://github.com/LAPyae23/deli_app',
    live: '',
    thumbnail: 'delivery',
  },
  {
    id: 'smart-energy',
    name: 'Smart Energy-Saving System',
    summary:
      'A real-time computer-vision system that detects whether a room is occupied from a webcam feed and automates energy saving.',
    problem:
      'Lights and appliances are often left on in empty rooms. This system uses a camera to notice when nobody is there.',
    features: [
      'Real-time person detection from a webcam with YOLOv8',
      'Room occupancy status',
      'Automatic energy-saving actions',
      'FastAPI backend that connects detection and the interface',
    ],
    contribution:
      'Front-end and UI developer. I built the interface for a system that runs YOLOv8 detection behind a FastAPI backend.',
    challenge:
      'Showing real-time detection results clearly while the backend processes a live webcam feed.',
    outcome:
      'A working system that turns webcam detection into automatic energy-saving decisions.',
    technologies: ['Python', 'YOLOv8', 'FastAPI'],
    tags: ['vision', 'web'],
    status: 'completed',
    github: 'https://github.com/MinnThikeTunn/Vision-based-Smart-Energy-saving-system',
    live: '',
    thumbnail: 'vision',
  },
  {
    id: 'toma',
    name: 'Toma: Habit Tracker',
    summary:
      'A gamified self-care and habit-tracking web app with a focus timer, mood journal, to-do list, money tracker and achievements.',
    problem:
      'Self-care habits are easy to drop when tracking feels like a chore. Toma adds achievements to make daily routines more rewarding.',
    features: [
      'Focus timer',
      'Mood journal',
      'To-do list',
      'Money tracker',
      'Achievements that reward progress',
    ],
    contribution:
      'Software developer. I designed and built the app with HTML, Tailwind CSS and JavaScript.',
    challenge:
      'Bringing several small tools into one app that feels consistent and easy to use.',
    outcome: 'A live web app that puts a person\'s daily self-care tools in one place.',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript'],
    tags: ['web'],
    status: 'completed',
    github: '',
    live: 'https://toma-self-improve-og.vercel.app/',
    thumbnail: 'tasks',
  },
  {
    id: 'etms',
    name: 'Employee Task Management System',
    summary:
      'A web system for managing employees and tasks, with attendance, daily reports, notifications and chat. It is built on an open-source base.',
    problem:
      'Teams need one place to assign tasks, track attendance, collect daily reports and talk to each other.',
    features: [
      'Employee and task management',
      'Attendance tracking',
      'Daily reports',
      'Notifications',
      'Built-in chat',
    ],
    contribution:
      'Software developer. I worked on the system with PHP, MySQL, Bootstrap and jQuery, building on an open-source project.',
    challenge:
      'Understanding and extending an existing open-source codebase instead of starting from scratch.',
    outcome: 'A deployed demo that covers day-to-day employee and task management.',
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'jQuery'],
    tags: ['web', 'fullstack'],
    status: 'completed',
    github: '',
    live: 'https://etms-demo.great-site.net',
    thumbnail: 'dashboard',
  },
  {
    id: 'portfolio-os',
    name: 'Personal Portfolio OS',
    summary:
      'This retro pixel desktop portfolio, built as a windowed interface that presents my projects and skills.',
    problem:
      'A standard single-page portfolio can feel generic. I wanted something memorable that still stays readable and accessible.',
    features: [
      'Reusable window manager with focus, minimize and maximize',
      'Responsive desktop, tablet and mobile layouts',
      'Keyboard shortcuts, start menu and terminal',
      'Content stored in one editable data file',
    ],
    contribution:
      'Web developer. I built the desktop shell, window system, theming and portfolio sections.',
    challenge:
      'Making overlapping windows feel like a desktop OS without hiding content or breaking mobile use.',
    outcome:
      'A portfolio that presents my projects and experience through an original retro interface.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    tags: ['web'],
    status: 'completed',
    github: 'https://github.com/EiChanMyat',
    live: 'https://portfilio-building.vercel.app/',
    thumbnail: 'desktop',
  },
];

export const experience: ExperienceItem[] = [
  {
    id: 'exp-uit',
    category: 'academic',
    position: 'Software Engineering Student',
    organization: 'University of Information Technology (UIT)',
    dateRange: '2022 – Present',
    location: 'Yangon, Myanmar',
    bullets: [
      'Completed four years of the Software Engineering program and now in the 5th year.',
      'Studied Java, PHP and full-stack web development.',
      'Built web, management and computer-vision projects alongside my studies.',
    ],
    technologies: ['Java', 'PHP', 'JavaScript', 'MySQL'],
  },
  {
    id: 'exp-projects',
    category: 'personal',
    position: 'Software Developer',
    organization: 'Web and Computer-Vision Projects',
    dateRange: '2022 – Present',
    location: 'Yangon, Myanmar',
    bullets: [
      'Built Deli App, a multi-role food delivery platform for Yangon, as a full-stack developer.',
      'Built the front end and UI for a YOLOv8 and FastAPI system that detects room occupancy to save energy.',
      'Created Toma, a gamified habit tracker, and this portfolio website.',
    ],
    technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Python', 'FastAPI', 'React'],
  },
  {
    id: 'exp-coursework',
    category: 'coursework',
    position: 'Relevant Coursework',
    organization: 'University of Information Technology (UIT)',
    dateRange: '2022 – Present',
    location: 'Yangon, Myanmar',
    bullets: [
      'Computer Vision',
      'Data Analysis and Management',
      'Distributed Programming',
      'Software Construction and Evolution',
      'Professional Communications',
    ],
    technologies: ['Java', 'PHP', 'Python'],
  },
];

export const volunteer: ExperienceItem[] = [
  {
    id: 'vol-uit-fresher',
    category: 'volunteer',
    position: 'Event Volunteer',
    organization: 'UIT Fresher Welcome 2024',
    dateRange: '2024',
    location: 'Yangon, Myanmar',
    bullets: [
      'Volunteered at the UIT Fresher Welcome event as part of a team of student volunteers.',
      'Received a Certificate of Appreciation for dedication, time and effort.',
    ],
    technologies: ['Teamwork'],
  },
  {
    id: 'vol-htamane',
    category: 'volunteer',
    position: 'Event Volunteer',
    organization: 'Htamane Festival (school event)',
    dateRange: '',
    location: 'Yangon, Myanmar',
    bullets: ['Volunteered at the school Htamane Festival.'],
    technologies: ['Teamwork'],
  },
  {
    id: 'vol-blood',
    category: 'volunteer',
    position: 'Regular Blood Donor',
    organization: 'Voluntary blood donation',
    dateRange: 'Ongoing',
    location: 'Yangon, Myanmar',
    bullets: ['Have donated blood 8 times so far.'],
    technologies: [],
  },
  {
    id: 'vol-clubs',
    category: 'volunteer',
    position: 'Club Member',
    organization: 'Photography Club and Chess Club',
    dateRange: '',
    location: 'Yangon, Myanmar',
    bullets: ['Member of both the photography club and the chess club.'],
    technologies: [],
  },
];

export const education: EducationItem[] = [
  {
    id: 'edu-uit',
    degree: 'Software Engineering (5th year, 4th year completed)',
    university: 'University of Information Technology (UIT), Yangon',
    years: '2022 – Present',
    subjects: [
      'Java',
      'PHP',
      'Full-stack web development',
      'Computer Vision',
      'Data Analysis and Management',
      'Distributed Programming',
      'Software Construction and Evolution',
    ],
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-jlpt-n4',
    name: 'JLPT N4 (Japanese-Language Proficiency Test), Passed',
    issuer: 'Japan Foundation and JEES',
    year: '2023',
  },
  {
    id: 'cert-ket',
    name: 'Cambridge English: Key (KET), CEFR A2, Pass with Merit',
    issuer: 'Cambridge Assessment English',
    year: '2018',
  },
];

export const awards: Award[] = [
  {
    id: 'award-fresher-welcome',
    name: 'Certificate of Appreciation',
    year: '2024',
    description: 'Awarded by UIT for volunteering at UIT Fresher Welcome 2024.',
  },
];

export const resume = {
  path: '/resume.pdf',
  lastUpdated: 'November 2026',
};

/**
 * Leave empty to use the mailto fallback.
 * Later you can set a Formspree/EmailJS/custom endpoint, e.g. "https://formspree.io/f/xxxx".
 */
export const contactFormEndpoint = '';

export const siteMeta = {
  title: 'Ei Chan Myat | Software Engineering Student',
  description:
    'Portfolio of Ei Chan Myat, a Software Engineering student in Yangon who builds full-stack web apps and computer-vision projects.',
  canonical: 'https://portfilio-building.vercel.app/',
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
