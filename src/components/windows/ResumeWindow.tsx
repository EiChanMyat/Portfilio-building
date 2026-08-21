import { resume } from '../../data/portfolio';
import { useResumeExists } from '../../hooks/useResumeExists';
import { IconResume } from '../ui/PixelIcons';

export function ResumeWindow() {
  const exists = useResumeExists(resume.path);

  return (
    <div className="space-y-4">
      <div className="pixel-border flex items-center gap-3 bg-[var(--window-yellow)] p-3">
        <IconResume size={48} />
        <div>
          <h3 className="font-display text-lg">Resume preview</h3>
          <p className="font-body text-sm text-[var(--muted-text)]">Last updated: {resume.lastUpdated}</p>
        </div>
      </div>

      {exists === false && (
        <p className="border-2 border-[var(--dark-outline)] bg-[var(--peach)] p-3 font-body text-sm">
          Resume file not found. Add your PDF at <code>public/resume.pdf</code> and the buttons below will activate.
        </p>
      )}

      {exists === null && <p className="font-body text-sm">Checking for resume file…</p>}

      <div className="grid gap-2 sm:grid-cols-2">
        {exists ? (
          <>
            <a className="retro-btn retro-btn-primary inline-flex items-center justify-center no-underline" href={resume.path} download>
              Download Resume
            </a>
            <a className="retro-btn inline-flex items-center justify-center no-underline" href={resume.path} target="_blank" rel="noreferrer">
              View Resume
            </a>
          </>
        ) : (
          <>
            <button type="button" className="retro-btn retro-btn-primary" disabled>
              Download Resume
            </button>
            <button type="button" className="retro-btn" disabled>
              View Resume
            </button>
          </>
        )}
      </div>
    </div>
  );
}
