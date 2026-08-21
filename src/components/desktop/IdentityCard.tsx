import { personalInfo } from '../../data/portfolio';

export function IdentityCard() {
  return (
    <div className="pixel-border max-w-[min(92vw,300px)] bg-[var(--window-bg)] px-4 py-3">
      <h1 className="font-display text-xl leading-tight sm:text-2xl">{personalInfo.name}</h1>
      <p className="mt-1 font-display text-sm text-[var(--muted-text)]">{personalInfo.shortRole}</p>
      <p className="mt-2 font-body text-sm leading-relaxed text-[var(--dark-text)]">
        {personalInfo.specialization}
      </p>
      <p className="mt-3 flex items-center gap-2 font-body text-sm">
        <span className="inline-block h-2.5 w-2.5 bg-[var(--success-green)]" aria-hidden="true" />
        {personalInfo.availability}
      </p>
    </div>
  );
}
