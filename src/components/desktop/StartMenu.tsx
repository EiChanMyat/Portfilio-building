import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useDesktop } from '../../hooks/useDesktop';
import type { WindowId } from '../../types/windows';
import {
  IconAbout,
  IconContact,
  IconEducation,
  IconExperience,
  IconHome,
  IconProjects,
  IconRestart,
  IconResume,
  IconSkills,
  IconVolunteer,
  IconTerminal,
  IconTheme,
} from '../ui/PixelIcons';

const ITEMS: { id: WindowId | 'restart'; label: string; icon: typeof IconHome }[] = [
  { id: 'welcome', label: 'Home', icon: IconHome },
  { id: 'about', label: 'About', icon: IconAbout },
  { id: 'projects', label: 'Projects', icon: IconProjects },
  { id: 'skills', label: 'Skills', icon: IconSkills },
  { id: 'experience', label: 'Experience', icon: IconExperience },
  { id: 'education', label: 'Education', icon: IconEducation },
  { id: 'resume', label: 'Resume', icon: IconResume },
  { id: 'volunteer', label: 'Volunteer', icon: IconVolunteer },
  { id: 'contact', label: 'Contact', icon: IconContact },
  { id: 'theme', label: 'Theme settings', icon: IconTheme },
  { id: 'terminal', label: 'Terminal', icon: IconTerminal },
  { id: 'restart', label: 'Restart intro animation', icon: IconRestart },
];

export function StartMenu() {
  const { startOpen, setStartOpen, openWindow, restartIntro } = useDesktop();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOpen) return;

    const onPointer = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        const startBtn = (event.target as HTMLElement).closest('[data-start-button]');
        if (!startBtn) setStartOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setStartOpen(false);
    };

    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [startOpen, setStartOpen]);

  return (
    <AnimatePresence>
      {startOpen && (
        <motion.div
          ref={ref}
          role="menu"
          aria-label="Start menu"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: reduced ? 0 : 0.14 }}
          className="pixel-border absolute bottom-14 left-1 z-[90] max-h-[min(70vh,420px)] w-[min(92vw,260px)] overflow-auto bg-[var(--window-bg)]"
        >
          <div className="flex">
            <div className="w-7 bg-[var(--sunset-pink)] [writing-mode:vertical-rl] rotate-180 px-1 py-2 font-pixel text-[8px] text-[var(--dark-text)]">
              Portfolio OS
            </div>
            <ul className="flex-1 py-1">
              {ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="menuitem"
                      className="flex min-h-11 w-full items-center gap-2 px-2 text-left hover:bg-[var(--window-yellow)]"
                      onClick={() => {
                        if (item.id === 'restart') {
                          restartIntro();
                          return;
                        }
                        openWindow(item.id);
                      }}
                    >
                      <Icon size={20} />
                      <span className="font-display text-sm">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="border-t-2 border-[var(--dark-outline)] px-2 py-1 font-body text-xs text-[var(--muted-text)]">
            Portfolio OS v1.0
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
