import { useState, type ReactNode } from 'react';
import {
  experienceLabels,
  skillCategories,
  skillLevelLabels,
  type Award,
  type Certification,
  type EducationItem,
  type ExperienceCategory,
  type ExperienceItem,
  type PersonalInfo,
  type Project,
  type ProjectFilter,
  type ProjectStatus,
  type ProjectThumbnail,
  type Skill,
  type SkillCategory,
  type SkillLevel,
} from '../../data/portfolio';
import { getDefaultSnapshot, linesToList, listToLines } from '../../data/portfolioStore';
import { useDesktop } from '../../hooks/useDesktop';
import { usePortfolio } from '../../hooks/usePortfolio';
import type { WindowId } from '../../types/windows';
import {
  IconAbout,
  IconContact,
  IconEducation,
  IconExperience,
  IconGithub,
  IconHome,
  IconIdCard,
  IconLinkedIn,
  IconProjects,
  IconResume,
  IconSkills,
  IconVolunteer,
} from '../ui/PixelIcons';

export type EditorSection =
  | 'welcome'
  | 'card'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'resume'
  | 'volunteer'
  | 'contact'
  | 'github'
  | 'linkedin';

const SECTIONS: {
  id: EditorSection;
  label: string;
  icon: (props: { size?: number }) => ReactNode;
  preview?: WindowId;
}[] = [
  { id: 'welcome', label: 'Welcome.exe', icon: IconHome, preview: 'welcome' },
  { id: 'card', label: 'Profile card', icon: IconIdCard },
  { id: 'about', label: 'About Me', icon: IconAbout, preview: 'about' },
  { id: 'projects', label: 'My Projects', icon: IconProjects, preview: 'projects' },
  { id: 'skills', label: 'Skills', icon: IconSkills, preview: 'skills' },
  { id: 'experience', label: 'Experience', icon: IconExperience, preview: 'experience' },
  { id: 'education', label: 'Education', icon: IconEducation, preview: 'education' },
  { id: 'resume', label: 'Resume', icon: IconResume, preview: 'resume' },
  { id: 'volunteer', label: 'Volunteer', icon: IconVolunteer, preview: 'volunteer' },
  { id: 'contact', label: 'Contact', icon: IconContact, preview: 'contact' },
  { id: 'github', label: 'GitHub', icon: IconGithub },
  { id: 'linkedin', label: 'LinkedIn', icon: IconLinkedIn },
];

export function EditorWindow() {
  const [section, setSection] = useState<EditorSection | null>(null);

  if (!section) {
    return <SectionPicker onChoose={setSection} />;
  }

  return (
    <div className="flex min-h-0 flex-col gap-3">
      <button type="button" className="retro-btn h-10 min-h-10 w-fit px-3 text-sm" onClick={() => setSection(null)}>
        Back to icons
      </button>
      {section === 'welcome' && <WelcomeEditor />}
      {section === 'card' && <CardEditor />}
      {section === 'about' && <AboutEditor />}
      {section === 'projects' && <ProjectsEditor />}
      {section === 'skills' && <SkillsEditor />}
      {section === 'experience' && <ExperienceEditor />}
      {section === 'education' && <EducationEditor />}
      {section === 'resume' && <ResumeEditor />}
      {section === 'volunteer' && <VolunteerEditor />}
      {section === 'contact' && <ContactEditor />}
      {section === 'github' && <LinkEditor field="github" label="GitHub URL" />}
      {section === 'linkedin' && <LinkEditor field="linkedin" label="LinkedIn URL" />}
    </div>
  );
}

function SectionPicker({ onChoose }: { onChoose: (id: EditorSection) => void }) {
  const { resetAll } = usePortfolio();
  const { notify } = useDesktop();

  return (
    <div className="space-y-3">
      <p className="font-body text-sm leading-relaxed">
        Choose an icon to edit. Save writes the new text into the matching window on this desktop.
      </p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SECTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                type="button"
                className="retro-btn flex h-auto min-h-16 w-full flex-col items-center gap-2 px-2 py-3"
                onClick={() => onChoose(item.id)}
              >
                <Icon size={28} />
                <span className="font-display text-sm">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="retro-btn w-full text-sm"
        onClick={() => {
          resetAll();
          notify({
            title: 'Reset',
            message: 'Portfolio content restored to the original file.',
            tone: 'info',
          });
        }}
      >
        Reset all saved edits
      </button>
    </div>
  );
}

function SaveBar({
  onSave,
  onReset,
  saveLabel = 'Save',
}: {
  onSave: () => void;
  onReset: () => void;
  saveLabel?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" className="retro-btn retro-btn-primary min-h-11 flex-1" onClick={onSave}>
        {saveLabel}
      </button>
      <button type="button" className="retro-btn min-h-11" onClick={onReset}>
        Reset section
      </button>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  multiline = false,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="font-display text-sm" htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          className="retro-textarea mt-1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          className="retro-input mt-1"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {hint && <p className="mt-1 font-body text-xs text-[var(--muted-text)]">{hint}</p>}
    </div>
  );
}

function finishSave(
  notify: ReturnType<typeof useDesktop>['notify'],
  openWindow: ReturnType<typeof useDesktop>['openWindow'],
  closeWindow: ReturnType<typeof useDesktop>['closeWindow'],
  title: string,
  preview: WindowId | undefined,
) {
  notify({ title: 'Saved', message: `${title} now shows your new information.`, tone: 'success' });
  closeWindow('editor');
  if (preview) openWindow(preview);
}

function CardEditor() {
  const { personalInfo, siteMeta, save } = usePortfolio();
  const { notify, openWindow, closeWindow } = useDesktop();
  const [name, setName] = useState(personalInfo.name);
  const [shortRole, setShortRole] = useState(personalInfo.shortRole);
  const [specialization, setSpecialization] = useState(personalInfo.specialization);
  const [availability, setAvailability] = useState(personalInfo.availability);

  const persistCard = () => {
    const nextName = name.trim() || personalInfo.name;
    save({
      personalInfo: {
        ...personalInfo,
        name: nextName,
        shortRole: shortRole.trim() || personalInfo.shortRole,
        specialization: specialization.trim() || personalInfo.specialization,
        availability: availability.trim() || personalInfo.availability,
      },
      siteMeta: {
        ...siteMeta,
        title: `${nextName} | Software Engineer`,
        description: `Portfolio of ${nextName}, a software engineer building reliable, accessible, and user-friendly applications.`,
      },
    });
    finishSave(notify, openWindow, closeWindow, 'Profile card', undefined);
  };

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        persistCard();
      }}
    >
      <p className="font-body text-sm text-[var(--muted-text)]">
        These fields show on the name card in the top-left of the desktop.
      </p>
      <Field id="card-name" label="Name" value={name} onChange={setName} />
      <Field id="card-role" label="Short role" value={shortRole} onChange={setShortRole} />
      <Field
        id="card-specialization"
        label="Tagline"
        value={specialization}
        onChange={setSpecialization}
        multiline
      />
      <Field id="card-availability" label="Availability" value={availability} onChange={setAvailability} />
      <SaveBar
        onSave={persistCard}
        onReset={() => {
          const defaults = getDefaultSnapshot().personalInfo;
          setName(defaults.name);
          setShortRole(defaults.shortRole);
          setSpecialization(defaults.specialization);
          setAvailability(defaults.availability);
        }}
      />
    </form>
  );
}

function WelcomeEditor() {
  const { personalInfo, save } = usePortfolio();
  const { notify, openWindow, closeWindow } = useDesktop();
  const [greeting, setGreeting] = useState(personalInfo.greeting);
  const [role, setRole] = useState(personalInfo.role);
  const [introduction, setIntroduction] = useState(personalInfo.introduction);
  const [availability, setAvailability] = useState(personalInfo.availability);
  const [technologies, setTechnologies] = useState(listToLines(personalInfo.technologiesSummary));
  const [terminalStatus, setTerminalStatus] = useState(personalInfo.terminalStatus);

  const persistWelcome = () => {
    save({
      personalInfo: {
        ...personalInfo,
        greeting: greeting.trim() || personalInfo.greeting,
        role: role.trim() || personalInfo.role,
        introduction: introduction.trim() || personalInfo.introduction,
        availability: availability.trim() || personalInfo.availability,
        technologiesSummary: linesToList(technologies),
        terminalStatus: terminalStatus.trim() || personalInfo.terminalStatus,
      },
    });
    finishSave(notify, openWindow, closeWindow, 'Welcome.exe', 'welcome');
  };

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        persistWelcome();
      }}
    >
      <p className="font-body text-sm text-[var(--muted-text)]">
        These fields show in the Welcome.exe home window.
      </p>
      <Field id="welcome-greeting" label="Greeting" value={greeting} onChange={setGreeting} />
      <Field id="welcome-role" label="Role" value={role} onChange={setRole} />
      <Field
        id="welcome-intro"
        label="Introduction"
        value={introduction}
        onChange={setIntroduction}
        multiline
      />
      <Field id="welcome-availability" label="Availability" value={availability} onChange={setAvailability} />
      <Field
        id="welcome-tech"
        label="Technology tags"
        value={technologies}
        onChange={setTechnologies}
        multiline
        hint="One technology per line."
      />
      <Field
        id="welcome-terminal"
        label="Terminal status line"
        value={terminalStatus}
        onChange={setTerminalStatus}
      />
      <SaveBar
        onSave={persistWelcome}
        onReset={() => {
          const defaults = getDefaultSnapshot().personalInfo;
          setGreeting(defaults.greeting);
          setRole(defaults.role);
          setIntroduction(defaults.introduction);
          setAvailability(defaults.availability);
          setTechnologies(listToLines(defaults.technologiesSummary));
          setTerminalStatus(defaults.terminalStatus);
        }}
      />
    </form>
  );
}

function AboutEditor() {
  const { personalInfo, siteMeta, save } = usePortfolio();
  const { notify, openWindow, closeWindow } = useDesktop();
  const [draft, setDraft] = useState<PersonalInfo>(() => structuredClone(personalInfo));

  const set = (key: keyof PersonalInfo, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const persistAbout = () => {
    const name = draft.name.trim() || personalInfo.name;
    const swap = (value: string) => value.replaceAll('[YOUR NAME]', name);
    const personal = {
      ...draft,
      name,
      greeting: swap(draft.greeting),
      osName: swap(draft.osName),
    };
    save({
      personalInfo: personal,
      siteMeta: {
        ...siteMeta,
        title: `${name} | Software Engineer`,
        description: `Portfolio of ${name}, a software engineer building reliable, accessible, and user-friendly applications.`,
      },
    });
    finishSave(notify, openWindow, closeWindow, 'About Me', 'about');
  };

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        persistAbout();
      }}
    >
      <Field id="about-name" label="Name" value={draft.name} onChange={(value) => set('name', value)} />
      <Field id="about-short-role" label="Short role" value={draft.shortRole} onChange={(value) => set('shortRole', value)} />
      <Field id="about-role" label="Full role" value={draft.role} onChange={(value) => set('role', value)} />
      <Field id="about-greeting" label="Greeting" value={draft.greeting} onChange={(value) => set('greeting', value)} />
      <Field
        id="about-intro"
        label="Introduction"
        value={draft.introduction}
        onChange={(value) => set('introduction', value)}
        multiline
      />
      <Field
        id="about-specialization"
        label="Specialization (desktop card)"
        value={draft.specialization}
        onChange={(value) => set('specialization', value)}
        multiline
      />
      <Field
        id="about-bio"
        label="Biography"
        value={draft.bio}
        onChange={(value) => set('bio', value)}
        multiline
      />
      <Field
        id="about-focus"
        label="Current focus"
        value={draft.currentFocus}
        onChange={(value) => set('currentFocus', value)}
        multiline
      />
      <Field
        id="about-objective"
        label="Career objective"
        value={draft.careerObjective}
        onChange={(value) => set('careerObjective', value)}
        multiline
      />
      <Field id="about-location" label="Location" value={draft.location} onChange={(value) => set('location', value)} />
      <Field
        id="about-work"
        label="Work preference"
        value={draft.workPreference}
        onChange={(value) => set('workPreference', value)}
      />
      <Field
        id="about-availability"
        label="Availability"
        value={draft.availability}
        onChange={(value) => set('availability', value)}
      />
      <Field
        id="about-interests"
        label="Interests"
        value={listToLines(draft.interests)}
        onChange={(value) => setDraft((current) => ({ ...current, interests: linesToList(value) }))}
        multiline
        hint="One interest per line."
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <Field
          id="about-projects"
          label="Projects completed"
          value={draft.stats.projectsCompleted}
          onChange={(value) =>
            setDraft((current) => ({ ...current, stats: { ...current.stats, projectsCompleted: value } }))
          }
        />
        <Field
          id="about-techs"
          label="Technologies used"
          value={draft.stats.technologiesUsed}
          onChange={(value) =>
            setDraft((current) => ({ ...current, stats: { ...current.stats, technologiesUsed: value } }))
          }
        />
        <Field
          id="about-years"
          label="Years building"
          value={draft.stats.yearsBuilding}
          onChange={(value) =>
            setDraft((current) => ({ ...current, stats: { ...current.stats, yearsBuilding: value } }))
          }
        />
      </div>
      <SaveBar
        onSave={persistAbout}
        onReset={() => setDraft(structuredClone(getDefaultSnapshot().personalInfo))}
      />
    </form>
  );
}

function emptyProject(): Project {
  return {
    id: `project-${Date.now()}`,
    name: 'New project',
    summary: '',
    problem: '',
    features: [],
    contribution: '',
    challenge: '',
    outcome: '',
    technologies: [],
    tags: ['web'],
    status: 'in-progress',
    github: '',
    live: '',
    thumbnail: 'desktop',
  };
}

const PROJECT_TAGS: { id: Exclude<ProjectFilter, 'all'>; label: string }[] = [
  { id: 'web', label: 'Web' },
  { id: 'fullstack', label: 'Full stack' },
  { id: 'networking', label: 'Networking' },
  { id: 'security', label: 'Security' },
];

function ProjectsEditor() {
  const { projects, save } = usePortfolio();
  const { notify, openWindow, closeWindow } = useDesktop();
  const [draft, setDraft] = useState<Project[]>(() => structuredClone(projects));
  const [selectedId, setSelectedId] = useState(draft[0]?.id ?? '');
  const selected = draft.find((item) => item.id === selectedId) ?? draft[0];

  const updateSelected = (patch: Partial<Project>) => {
    if (!selected) return;
    setDraft((current) => current.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {draft.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`retro-btn min-h-10 px-3 text-sm ${item.id === selected?.id ? 'retro-btn-primary' : ''}`}
            onClick={() => setSelectedId(item.id)}
          >
            {item.name}
          </button>
        ))}
        <button
          type="button"
          className="retro-btn min-h-10 px-3 text-sm"
          onClick={() => {
            const next = emptyProject();
            setDraft((current) => [...current, next]);
            setSelectedId(next.id);
          }}
        >
          Add project
        </button>
      </div>

      {selected ? (
        <div className="space-y-3">
          <Field id="proj-name" label="Name" value={selected.name} onChange={(value) => updateSelected({ name: value })} />
          <Field
            id="proj-summary"
            label="Summary"
            value={selected.summary}
            onChange={(value) => updateSelected({ summary: value })}
            multiline
          />
          <Field
            id="proj-problem"
            label="Problem solved"
            value={selected.problem}
            onChange={(value) => updateSelected({ problem: value })}
            multiline
          />
          <Field
            id="proj-features"
            label="Features"
            value={listToLines(selected.features)}
            onChange={(value) => updateSelected({ features: linesToList(value) })}
            multiline
            hint="One feature per line."
          />
          <Field
            id="proj-contribution"
            label="Your contribution"
            value={selected.contribution}
            onChange={(value) => updateSelected({ contribution: value })}
            multiline
          />
          <Field
            id="proj-challenge"
            label="Technical challenge"
            value={selected.challenge}
            onChange={(value) => updateSelected({ challenge: value })}
            multiline
          />
          <Field
            id="proj-outcome"
            label="Outcome"
            value={selected.outcome}
            onChange={(value) => updateSelected({ outcome: value })}
            multiline
          />
          <Field
            id="proj-tech"
            label="Technologies"
            value={selected.technologies.join(', ')}
            onChange={(value) => updateSelected({ technologies: linesToList(value) })}
            hint="Separate with commas or new lines."
          />
          <Field
            id="proj-github"
            label="GitHub URL"
            value={selected.github}
            onChange={(value) => updateSelected({ github: value })}
          />
          <Field
            id="proj-live"
            label="Live demo URL"
            value={selected.live}
            onChange={(value) => updateSelected({ live: value })}
          />
          <label className="block font-display text-sm">
            Status
            <select
              className="retro-input mt-1"
              value={selected.status}
              onChange={(event) => updateSelected({ status: event.target.value as ProjectStatus })}
            >
              <option value="completed">Completed</option>
              <option value="in-progress">In progress</option>
              <option value="prototype">Prototype</option>
            </select>
          </label>
          <label className="block font-display text-sm">
            Thumbnail
            <select
              className="retro-input mt-1"
              value={selected.thumbnail}
              onChange={(event) => updateSelected({ thumbnail: event.target.value as ProjectThumbnail })}
            >
              <option value="desktop">Desktop</option>
              <option value="dashboard">Dashboard</option>
              <option value="tasks">Tasks</option>
              <option value="network">Network</option>
            </select>
          </label>
          <fieldset>
            <legend className="font-display text-sm">Tags</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {PROJECT_TAGS.map((tag) => {
                const checked = selected.tags.includes(tag.id);
                return (
                  <label key={tag.id} className="flex items-center gap-2 font-body text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        const tags = checked
                          ? selected.tags.filter((item) => item !== tag.id)
                          : [...selected.tags, tag.id];
                        updateSelected({ tags });
                      }}
                    />
                    {tag.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
          <button
            type="button"
            className="retro-btn text-sm"
            onClick={() => {
              setDraft((current) => {
                const next = current.filter((item) => item.id !== selected.id);
                setSelectedId(next[0]?.id ?? '');
                return next;
              });
            }}
          >
            Delete this project
          </button>
        </div>
      ) : (
        <p className="font-body text-sm">No projects yet. Add one to get started.</p>
      )}

      <SaveBar
        onSave={() => {
          save({ projects: draft });
          finishSave(notify, openWindow, closeWindow, 'My Projects', 'projects');
        }}
        onReset={() => {
          const next = structuredClone(getDefaultSnapshot().projects);
          setDraft(next);
          setSelectedId(next[0]?.id ?? '');
        }}
      />
    </div>
  );
}

function SkillsEditor() {
  const { skills, save } = usePortfolio();
  const { notify, openWindow, closeWindow } = useDesktop();
  const [draft, setDraft] = useState<Skill[]>(() => structuredClone(skills));

  return (
    <div className="space-y-3">
      <ul className="space-y-2">
        {draft.map((skill, index) => (
          <li key={`${skill.name}-${index}`} className="pixel-border-inset space-y-2 p-2">
            <input
              className="retro-input"
              aria-label={`Skill ${index + 1} name`}
              value={skill.name}
              onChange={(event) =>
                setDraft((current) =>
                  current.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, name: event.target.value } : item,
                  ),
                )
              }
            />
            <div className="grid gap-2 sm:grid-cols-2">
              <select
                className="retro-input"
                aria-label={`${skill.name || 'Skill'} category`}
                value={skill.category}
                onChange={(event) =>
                  setDraft((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index
                        ? { ...item, category: event.target.value as SkillCategory }
                        : item,
                    ),
                  )
                }
              >
                {skillCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
              <select
                className="retro-input"
                aria-label={`${skill.name || 'Skill'} level`}
                value={skill.level}
                onChange={(event) =>
                  setDraft((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, level: event.target.value as SkillLevel } : item,
                    ),
                  )
                }
              >
                {(Object.keys(skillLevelLabels) as SkillLevel[]).map((level) => (
                  <option key={level} value={level}>
                    {skillLevelLabels[level]}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="retro-btn min-h-10 text-sm"
              onClick={() => setDraft((current) => current.filter((_, itemIndex) => itemIndex !== index))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="retro-btn"
        onClick={() =>
          setDraft((current) => [...current, { name: 'New skill', category: 'other', level: 'learning' }])
        }
      >
        Add skill
      </button>
      <SaveBar
        onSave={() => {
          save({ skills: draft.filter((skill) => skill.name.trim()) });
          finishSave(notify, openWindow, closeWindow, 'Skills', 'skills');
        }}
        onReset={() => setDraft(structuredClone(getDefaultSnapshot().skills))}
      />
    </div>
  );
}

function emptyExperience(): ExperienceItem {
  return {
    id: `exp-${Date.now()}`,
    category: 'personal',
    position: 'New role',
    organization: '',
    dateRange: '',
    location: '',
    bullets: [],
    technologies: [],
  };
}

function ExperienceEditor() {
  const { experience, save } = usePortfolio();
  const { notify, openWindow, closeWindow } = useDesktop();
  const [draft, setDraft] = useState<ExperienceItem[]>(() => structuredClone(experience));
  const [selectedId, setSelectedId] = useState(draft[0]?.id ?? '');
  const selected = draft.find((item) => item.id === selectedId) ?? draft[0];

  const updateSelected = (patch: Partial<ExperienceItem>) => {
    if (!selected) return;
    setDraft((current) => current.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {draft.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`retro-btn min-h-10 px-3 text-sm ${item.id === selected?.id ? 'retro-btn-primary' : ''}`}
            onClick={() => setSelectedId(item.id)}
          >
            {item.position}
          </button>
        ))}
        <button
          type="button"
          className="retro-btn min-h-10 px-3 text-sm"
          onClick={() => {
            const next = emptyExperience();
            setDraft((current) => [...current, next]);
            setSelectedId(next.id);
          }}
        >
          Add experience
        </button>
      </div>

      {selected ? (
        <div className="space-y-3">
          <label className="block font-display text-sm">
            Category
            <select
              className="retro-input mt-1"
              value={selected.category}
              onChange={(event) => updateSelected({ category: event.target.value as ExperienceCategory })}
            >
              {(Object.keys(experienceLabels) as ExperienceCategory[]).map((category) => (
                <option key={category} value={category}>
                  {experienceLabels[category]}
                </option>
              ))}
            </select>
          </label>
          <Field
            id="exp-position"
            label="Position"
            value={selected.position}
            onChange={(value) => updateSelected({ position: value })}
          />
          <Field
            id="exp-org"
            label="Organization"
            value={selected.organization}
            onChange={(value) => updateSelected({ organization: value })}
          />
          <Field
            id="exp-dates"
            label="Date range"
            value={selected.dateRange}
            onChange={(value) => updateSelected({ dateRange: value })}
          />
          <Field
            id="exp-location"
            label="Location"
            value={selected.location}
            onChange={(value) => updateSelected({ location: value })}
          />
          <Field
            id="exp-bullets"
            label="Highlights"
            value={listToLines(selected.bullets)}
            onChange={(value) => updateSelected({ bullets: linesToList(value) })}
            multiline
            hint="One bullet per line."
          />
          <Field
            id="exp-tech"
            label="Technologies"
            value={selected.technologies.join(', ')}
            onChange={(value) => updateSelected({ technologies: linesToList(value) })}
          />
          <button
            type="button"
            className="retro-btn text-sm"
            onClick={() => {
              setDraft((current) => {
                const next = current.filter((item) => item.id !== selected.id);
                setSelectedId(next[0]?.id ?? '');
                return next;
              });
            }}
          >
            Delete this entry
          </button>
        </div>
      ) : (
        <p className="font-body text-sm">No experience entries yet.</p>
      )}

      <SaveBar
        onSave={() => {
          save({ experience: draft });
          finishSave(notify, openWindow, closeWindow, 'Experience', 'experience');
        }}
        onReset={() => {
          const next = structuredClone(getDefaultSnapshot().experience);
          setDraft(next);
          setSelectedId(next[0]?.id ?? '');
        }}
      />
    </div>
  );
}

function emptyVolunteer(): ExperienceItem {
  return {
    id: `vol-${Date.now()}`,
    category: 'volunteer',
    position: 'New volunteer role',
    organization: '',
    dateRange: '',
    location: '',
    bullets: [],
    technologies: [],
  };
}

function VolunteerEditor() {
  const { volunteer, save } = usePortfolio();
  const { notify, openWindow, closeWindow } = useDesktop();
  const [draft, setDraft] = useState<ExperienceItem[]>(() => structuredClone(volunteer));
  const [selectedId, setSelectedId] = useState(draft[0]?.id ?? '');
  const selected = draft.find((item) => item.id === selectedId) ?? draft[0];

  const updateSelected = (patch: Partial<ExperienceItem>) => {
    if (!selected) return;
    setDraft((current) => current.map((item) => (item.id === selected.id ? { ...item, ...patch } : item)));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {draft.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`retro-btn min-h-10 px-3 text-sm ${item.id === selected?.id ? 'retro-btn-primary' : ''}`}
            onClick={() => setSelectedId(item.id)}
          >
            {item.position}
          </button>
        ))}
        <button
          type="button"
          className="retro-btn min-h-10 px-3 text-sm"
          onClick={() => {
            const next = emptyVolunteer();
            setDraft((current) => [...current, next]);
            setSelectedId(next.id);
          }}
        >
          Add volunteer role
        </button>
      </div>

      {selected ? (
        <div className="space-y-3">
          <Field
            id="vol-position"
            label="Role"
            value={selected.position}
            onChange={(value) => updateSelected({ position: value })}
          />
          <Field
            id="vol-org"
            label="Organization"
            value={selected.organization}
            onChange={(value) => updateSelected({ organization: value })}
          />
          <Field
            id="vol-dates"
            label="Date range"
            value={selected.dateRange}
            onChange={(value) => updateSelected({ dateRange: value })}
          />
          <Field
            id="vol-location"
            label="Location"
            value={selected.location}
            onChange={(value) => updateSelected({ location: value })}
          />
          <Field
            id="vol-bullets"
            label="Highlights"
            value={listToLines(selected.bullets)}
            onChange={(value) => updateSelected({ bullets: linesToList(value) })}
            multiline
            hint="One bullet per line."
          />
          <Field
            id="vol-tech"
            label="Skills or tools"
            value={selected.technologies.join(', ')}
            onChange={(value) => updateSelected({ technologies: linesToList(value) })}
          />
          <button
            type="button"
            className="retro-btn text-sm"
            onClick={() => {
              setDraft((current) => {
                const next = current.filter((item) => item.id !== selected.id);
                setSelectedId(next[0]?.id ?? '');
                return next;
              });
            }}
          >
            Delete this entry
          </button>
        </div>
      ) : (
        <p className="font-body text-sm">No volunteer entries yet.</p>
      )}

      <SaveBar
        onSave={() => {
          save({ volunteer: draft.map((item) => ({ ...item, category: 'volunteer' })) });
          finishSave(notify, openWindow, closeWindow, 'Volunteer', 'volunteer');
        }}
        onReset={() => {
          const next = structuredClone(getDefaultSnapshot().volunteer);
          setDraft(next);
          setSelectedId(next[0]?.id ?? '');
        }}
      />
    </div>
  );
}

function emptyEducation(): EducationItem {
  return {
    id: `edu-${Date.now()}`,
    degree: 'New degree',
    university: '',
    years: '',
    subjects: [],
  };
}

function emptyCert(): Certification {
  return { id: `cert-${Date.now()}`, name: 'New certification', issuer: '', year: '' };
}

function emptyAward(): Award {
  return { id: `award-${Date.now()}`, name: 'New award', year: '', description: '' };
}

function EducationEditor() {
  const { education, certifications, awards, save } = usePortfolio();
  const { notify, openWindow, closeWindow } = useDesktop();
  const [edu, setEdu] = useState<EducationItem[]>(() => structuredClone(education));
  const [certs, setCerts] = useState<Certification[]>(() => structuredClone(certifications));
  const [awardList, setAwardList] = useState<Award[]>(() => structuredClone(awards));

  return (
    <div className="space-y-4">
      <section className="space-y-3">
        <h3 className="font-display text-base">Education</h3>
        {edu.map((item, index) => (
          <div key={item.id} className="pixel-border-inset space-y-2 p-2">
            <Field
              id={`edu-degree-${item.id}`}
              label="Degree"
              value={item.degree}
              onChange={(value) =>
                setEdu((current) => current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, degree: value } : entry)))
              }
            />
            <Field
              id={`edu-uni-${item.id}`}
              label="University"
              value={item.university}
              onChange={(value) =>
                setEdu((current) =>
                  current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, university: value } : entry)),
                )
              }
            />
            <Field
              id={`edu-years-${item.id}`}
              label="Years"
              value={item.years}
              onChange={(value) =>
                setEdu((current) => current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, years: value } : entry)))
              }
            />
            <Field
              id={`edu-subjects-${item.id}`}
              label="Subjects"
              value={item.subjects.join(', ')}
              onChange={(value) =>
                setEdu((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, subjects: linesToList(value) } : entry,
                  ),
                )
              }
              hint="Separate with commas."
            />
            <button
              type="button"
              className="retro-btn min-h-10 text-sm"
              onClick={() => setEdu((current) => current.filter((_, entryIndex) => entryIndex !== index))}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="retro-btn text-sm" onClick={() => setEdu((current) => [...current, emptyEducation()])}>
          Add education
        </button>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-base">Certifications</h3>
        {certs.map((item, index) => (
          <div key={item.id} className="grid gap-2 sm:grid-cols-3">
            <input
              className="retro-input"
              aria-label="Certification name"
              value={item.name}
              onChange={(event) =>
                setCerts((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, name: event.target.value } : entry,
                  ),
                )
              }
            />
            <input
              className="retro-input"
              aria-label="Issuer"
              value={item.issuer}
              onChange={(event) =>
                setCerts((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, issuer: event.target.value } : entry,
                  ),
                )
              }
            />
            <div className="flex gap-2">
              <input
                className="retro-input"
                aria-label="Year"
                value={item.year}
                onChange={(event) =>
                  setCerts((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index ? { ...entry, year: event.target.value } : entry,
                    ),
                  )
                }
              />
              <button
                type="button"
                className="retro-btn min-h-10 px-2 text-sm"
                onClick={() => setCerts((current) => current.filter((_, entryIndex) => entryIndex !== index))}
              >
                X
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="retro-btn text-sm" onClick={() => setCerts((current) => [...current, emptyCert()])}>
          Add certification
        </button>
      </section>

      <section className="space-y-3">
        <h3 className="font-display text-base">Awards</h3>
        {awardList.map((item, index) => (
          <div key={item.id} className="space-y-2">
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                className="retro-input"
                aria-label="Award name"
                value={item.name}
                onChange={(event) =>
                  setAwardList((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index ? { ...entry, name: event.target.value } : entry,
                    ),
                  )
                }
              />
              <input
                className="retro-input"
                aria-label="Award year"
                value={item.year}
                onChange={(event) =>
                  setAwardList((current) =>
                    current.map((entry, entryIndex) =>
                      entryIndex === index ? { ...entry, year: event.target.value } : entry,
                    ),
                  )
                }
              />
            </div>
            <textarea
              className="retro-textarea"
              aria-label="Award description"
              value={item.description}
              onChange={(event) =>
                setAwardList((current) =>
                  current.map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, description: event.target.value } : entry,
                  ),
                )
              }
            />
            <button
              type="button"
              className="retro-btn min-h-10 text-sm"
              onClick={() => setAwardList((current) => current.filter((_, entryIndex) => entryIndex !== index))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="retro-btn text-sm"
          onClick={() => setAwardList((current) => [...current, emptyAward()])}
        >
          Add award
        </button>
      </section>

      <SaveBar
        onSave={() => {
          save({ education: edu, certifications: certs, awards: awardList });
          finishSave(notify, openWindow, closeWindow, 'Education', 'education');
        }}
        onReset={() => {
          const defaults = getDefaultSnapshot();
          setEdu(structuredClone(defaults.education));
          setCerts(structuredClone(defaults.certifications));
          setAwardList(structuredClone(defaults.awards));
        }}
      />
    </div>
  );
}

function ResumeEditor() {
  const { resume, save } = usePortfolio();
  const { notify, openWindow, closeWindow } = useDesktop();
  const [lastUpdated, setLastUpdated] = useState(resume.lastUpdated);

  return (
    <div className="space-y-3">
      <p className="font-body text-sm leading-relaxed">
        Keep your PDF at <code>public/resume.pdf</code>. You can change the last-updated label here.
      </p>
      <Field id="resume-updated" label="Last updated" value={lastUpdated} onChange={setLastUpdated} />
      <SaveBar
        onSave={() => {
          save({ resume: { ...resume, lastUpdated } });
          finishSave(notify, openWindow, closeWindow, 'Resume', 'resume');
        }}
        onReset={() => setLastUpdated(getDefaultSnapshot().resume.lastUpdated)}
      />
    </div>
  );
}

function ContactEditor() {
  const { socialLinks, contactFormEndpoint, personalInfo, save } = usePortfolio();
  const { notify, openWindow, closeWindow } = useDesktop();
  const [email, setEmail] = useState(socialLinks.email);
  const [github, setGithub] = useState(socialLinks.github);
  const [linkedin, setLinkedin] = useState(socialLinks.linkedin);
  const [location, setLocation] = useState(personalInfo.location);
  const [endpoint, setEndpoint] = useState(contactFormEndpoint);

  return (
    <div className="space-y-3">
      <Field id="contact-email-edit" label="Email" value={email} onChange={setEmail} />
      <Field
        id="contact-github-edit"
        label="GitHub URL"
        value={github}
        onChange={setGithub}
        hint="Use a full https:// URL."
      />
      <Field
        id="contact-linkedin-edit"
        label="LinkedIn URL"
        value={linkedin}
        onChange={setLinkedin}
        hint="Use a full https:// URL."
      />
      <Field id="contact-location-edit" label="Location" value={location} onChange={setLocation} />
      <Field
        id="contact-endpoint"
        label="Form endpoint (optional)"
        value={endpoint}
        onChange={setEndpoint}
        hint="Leave blank to use mailto. Formspree or similar goes here."
      />
      <SaveBar
        onSave={() => {
          save({
            socialLinks: {
              ...socialLinks,
              email: email.trim(),
              github: github.trim(),
              linkedin: linkedin.trim(),
            },
            personalInfo: {
              ...personalInfo,
              location: location.trim() || personalInfo.location,
            },
            contactFormEndpoint: endpoint.trim(),
          });
          finishSave(notify, openWindow, closeWindow, 'Contact', 'contact');
        }}
        onReset={() => {
          const defaults = getDefaultSnapshot();
          setEmail(defaults.socialLinks.email);
          setGithub(defaults.socialLinks.github);
          setLinkedin(defaults.socialLinks.linkedin);
          setLocation(defaults.personalInfo.location);
          setEndpoint(defaults.contactFormEndpoint);
        }}
      />
    </div>
  );
}

function LinkEditor({
  field,
  label,
}: {
  field: 'github' | 'linkedin';
  label: string;
}) {
  const { socialLinks, save } = usePortfolio();
  const { notify, closeWindow } = useDesktop();
  const [value, setValue] = useState(socialLinks[field]);
  const title = field === 'github' ? 'GitHub' : 'LinkedIn';

  return (
    <div className="space-y-3">
      <Field id={`${field}-url`} label={label} value={value} onChange={setValue} hint="Use a full https:// URL." />
      <SaveBar
        onSave={() => {
          save({ socialLinks: { ...socialLinks, [field]: value.trim() } });
          notify({
            title: 'Saved',
            message: `${title} now uses your saved link.`,
            tone: 'success',
          });
          closeWindow('editor');
        }}
        onReset={() => setValue(getDefaultSnapshot().socialLinks[field])}
      />
    </div>
  );
}
