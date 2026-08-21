import { useDesktop } from '../../hooks/useDesktop';

export function ThemeWindow() {
  const { theme, setTheme } = useDesktop();

  return (
    <div className="space-y-4">
      <p className="font-body text-sm">
        Choose a desktop palette. Your selection is saved in this browser.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className={`pixel-border p-3 text-left ${theme === 'sunset' ? 'outline outline-2 outline-[var(--accent-orange)]' : ''}`}
          onClick={() => setTheme('sunset')}
          aria-pressed={theme === 'sunset'}
        >
          <span className="block h-12 bg-[linear-gradient(#cdb4db,#ffafcc,#ffc8a2)]" />
          <span className="mt-2 block font-display">Sunset Mode</span>
          <span className="font-body text-xs text-[var(--muted-text)]">
            Pink, peach, lavender, and cream
          </span>
        </button>
        <button
          type="button"
          className={`pixel-border p-3 text-left ${theme === 'night' ? 'outline outline-2 outline-[var(--accent-orange)]' : ''}`}
          onClick={() => setTheme('night')}
          aria-pressed={theme === 'night'}
        >
          <span className="block h-12 bg-[linear-gradient(#241536,#6a4a88,#e6c56a)]" />
          <span className="mt-2 block font-display">Night Mode</span>
          <span className="font-body text-xs text-[var(--muted-text)]">
            Deep purple desktop with gold window accents
          </span>
        </button>
      </div>
    </div>
  );
}
