import {
  awards,
  certifications,
  contactFormEndpoint,
  education,
  experience,
  volunteer,
  personalInfo,
  projects,
  resume,
  siteMeta,
  skills,
  socialLinks,
  type Award,
  type Certification,
  type EducationItem,
  type ExperienceItem,
  type PersonalInfo,
  type Project,
  type Skill,
  type SocialLinks,
} from './portfolio';

export const PORTFOLIO_STORAGE_KEY = 'portfolio-os-content-v2';

export interface PortfolioSnapshot {
  personalInfo: PersonalInfo;
  socialLinks: SocialLinks;
  skills: Skill[];
  projects: Project[];
  experience: ExperienceItem[];
  volunteer: ExperienceItem[];
  education: EducationItem[];
  certifications: Certification[];
  awards: Award[];
  resume: { path: string; lastUpdated: string };
  contactFormEndpoint: string;
  siteMeta: { title: string; description: string; canonical: string };
}

export function getDefaultSnapshot(): PortfolioSnapshot {
  return structuredClone({
    personalInfo,
    socialLinks,
    skills,
    projects,
    experience,
    volunteer,
    education,
    certifications,
    awards,
    resume,
    contactFormEndpoint,
    siteMeta,
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function preferFreshName<T extends Record<string, unknown>>(stored: T, defaults: T): T {
  const next = { ...defaults, ...stored };
  for (const key of Object.keys(defaults)) {
    const storedValue = stored[key];
    const defaultValue = defaults[key];
    if (
      typeof storedValue === 'string' &&
      typeof defaultValue === 'string' &&
      storedValue.includes('[YOUR NAME]')
    ) {
      next[key] = defaultValue as T[Extract<keyof T, string>];
    }
  }
  return next;
}

function isPlaceholderProject(project: Project): boolean {
  return project.name.trim() === 'New project' && !project.summary.trim();
}

export function withExampleProjects(stored: Project[]): Project[] {
  const examples = getDefaultSnapshot().projects;
  const storedById = new Map(stored.map((project) => [project.id, project]));
  const restoredExamples = examples.map((example) => storedById.get(example.id) ?? example);
  const extras = stored.filter(
    (project) =>
      !examples.some((example) => example.id === project.id) && !isPlaceholderProject(project),
  );
  return [...restoredExamples, ...extras];
}

export function loadSnapshot(): PortfolioSnapshot {
  const defaults = getDefaultSnapshot();
  if (typeof window === 'undefined') return defaults;
  try {
    const raw = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) return defaults;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return defaults;
    const snapshot = {
      ...defaults,
      personalInfo: isRecord(parsed.personalInfo)
        ? preferFreshName(
            parsed.personalInfo as unknown as PersonalInfo,
            defaults.personalInfo,
          )
        : defaults.personalInfo,
      socialLinks: isRecord(parsed.socialLinks)
        ? { ...defaults.socialLinks, ...(parsed.socialLinks as unknown as SocialLinks) }
        : defaults.socialLinks,
      skills:
        Array.isArray(parsed.skills) && parsed.skills.length > 0
          ? (parsed.skills as Skill[])
          : defaults.skills,
      projects: withExampleProjects(
        Array.isArray(parsed.projects) ? (parsed.projects as Project[]) : defaults.projects,
      ),
      experience: Array.isArray(parsed.experience)
        ? (parsed.experience as ExperienceItem[])
        : defaults.experience,
      volunteer: Array.isArray(parsed.volunteer)
        ? (parsed.volunteer as ExperienceItem[])
        : defaults.volunteer,
      education: Array.isArray(parsed.education)
        ? (parsed.education as EducationItem[])
        : defaults.education,
      certifications: Array.isArray(parsed.certifications)
        ? (parsed.certifications as Certification[])
        : defaults.certifications,
      awards: Array.isArray(parsed.awards) ? (parsed.awards as Award[]) : defaults.awards,
      resume: isRecord(parsed.resume)
        ? { ...defaults.resume, ...(parsed.resume as PortfolioSnapshot['resume']) }
        : defaults.resume,
      contactFormEndpoint:
        typeof parsed.contactFormEndpoint === 'string'
          ? parsed.contactFormEndpoint
          : defaults.contactFormEndpoint,
      siteMeta: isRecord(parsed.siteMeta)
        ? preferFreshName(
            parsed.siteMeta as PortfolioSnapshot['siteMeta'],
            defaults.siteMeta,
          )
        : defaults.siteMeta,
    };
    persistSnapshot(snapshot);
    return snapshot;
  } catch {
    return defaults;
  }
}

export function persistSnapshot(snapshot: PortfolioSnapshot) {
  window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(snapshot));
}

export function linesToList(value: string): string[] {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function listToLines(value: string[]): string {
  return value.join('\n');
}
