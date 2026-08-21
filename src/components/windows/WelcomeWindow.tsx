import { personalInfo } from '../../data/portfolio';
import { useDesktop } from '../../hooks/useDesktop';
import { PixelAvatar } from '../ui/PixelAvatar';

export function WelcomeWindow() {
  const { openWindow } = useDesktop();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="pixel-border shrink-0">
          <PixelAvatar size={112} />
        </div>
        <div className="min-w-0 text-center sm:text-left">
          <p className="font-display text-2xl leading-tight text-[var(--dark-text)]">
            {personalInfo.greeting}
          </p>
          <p className="mt-2 font-display text-base text-[var(--muted-text)]">{personalInfo.role}</p>
          <p className="mt-3 font-body text-base leading-relaxed text-[var(--dark-text)]">
            {personalInfo.introduction}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 border-2 border-[var(--dark-outline)] bg-[var(--window-inset)] px-2 py-1 font-body text-sm">
          <span className="h-2.5 w-2.5 bg-[var(--success-green)]" aria-hidden="true" />
          {personalInfo.availability}
        </span>
      </div>

      <ul className="flex flex-wrap gap-2">
        {personalInfo.technologiesSummary.map((tech) => (
          <li
            key={tech}
            className="border-2 border-[var(--dark-outline)] bg-[var(--soft-lavender)] px-2 py-1 font-display text-xs"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="grid gap-2 sm:grid-cols-3">
        <button type="button" className="retro-btn retro-btn-primary" onClick={() => openWindow('projects')}>
          View Projects
        </button>
        <button type="button" className="retro-btn" onClick={() => openWindow('resume')}>
          Download Resume
        </button>
        <button type="button" className="retro-btn" onClick={() => openWindow('contact')}>
          Contact Me
        </button>
      </div>

      <p className="border-2 border-[var(--dark-outline)] bg-[#1a1222] px-3 py-2 font-body text-sm text-[#78B87A]">
        {personalInfo.terminalStatus.replace(/_$/, '')}
        <span className="blink">_</span>
      </p>
    </div>
  );
}
