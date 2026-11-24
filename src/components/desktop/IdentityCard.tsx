import { usePortfolio } from '../../hooks/usePortfolio';
import { ProfilePhoto } from '../ui/ProfilePhoto';

export function IdentityCard() {
  const { personalInfo } = usePortfolio();

  return (
    <div className="pixel-border max-w-[min(92vw,300px)] bg-[var(--window-bg)] px-4 py-3">
      <div className="flex items-center gap-3">
        <ProfilePhoto size={64} className="shrink-0 border-2 border-[var(--dark-outline)]" />
        <div className="min-w-0">
          <h1 className="font-display text-xl leading-tight sm:text-2xl">{personalInfo.name}</h1>
          <p className="mt-1 font-display text-sm text-[var(--muted-text)]">{personalInfo.shortRole}</p>
        </div>
      </div>
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
