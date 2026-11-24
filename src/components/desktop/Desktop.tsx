import { useCallback, useEffect, useRef, useState } from 'react';
import { isUsableHttpUrl } from '../../data/portfolio';
import { isEditorUnlocked } from '../../data/editorLock';
import { useDesktop } from '../../hooks/useDesktop';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useClock } from '../../hooks/useClock';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { playUiBlip } from '../../hooks/useUiSound';
import type { WindowId } from '../../types/windows';
import { WINDOW_CONFIG } from '../../types/windows';
import { PixelBuddy } from '../ui/PixelAvatar';
import { NotificationStack } from '../ui/Notification';
import { ContactWindow } from '../ui/ContactForm';
import { TerminalWindow } from '../ui/Terminal';
import { RetroWindow } from '../windows/RetroWindow';
import { WelcomeWindow } from '../windows/WelcomeWindow';
import { AboutWindow } from '../windows/AboutWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { ExperienceWindow } from '../windows/ExperienceWindow';
import { EducationWindow } from '../windows/EducationWindow';
import { ResumeWindow } from '../windows/ResumeWindow';
import { VolunteerWindow } from '../windows/VolunteerWindow';
import { ThemeWindow } from '../windows/ThemeWindow';
import { EditorWindow } from '../windows/EditorWindow';
import {
  IconAbout,
  IconContact,
  IconEdit,
  IconEducation,
  IconExperience,
  IconGithub,
  IconLinkedIn,
  IconProjects,
  IconResume,
  IconSkills,
  IconVolunteer,
  IconHome,
  IconTerminal,
  IconTheme,
} from '../ui/PixelIcons';
import { DesktopIcon } from './DesktopIcon';
import { EditorLock } from './EditorLock';
import { IdentityCard } from './IdentityCard';
import { Taskbar } from './Taskbar';
import { Wallpaper } from './Wallpaper';

export function Desktop() {
  const {
    openWindow,
    notify,
    startOpen,
    setStartOpen,
    openWindows,
    getWindow,
  } = useDesktop();
  const { socialLinks } = usePortfolio();
  const { timeLabel, dateLabel } = useClock();
  const isMobile = useIsMobile();
  const greeted = useRef(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [lockOpen, setLockOpen] = useState(false);

  const openApp = useCallback(
    (id: WindowId) => {
      const alreadyOpen = Boolean(getWindow(id)?.isOpen);
      openWindow(id);
      playUiBlip();
      if (!alreadyOpen) {
        const title = WINDOW_CONFIG.find((item) => item.id === id)?.title ?? id;
        notify({ title, message: 'Application opened.', tone: 'info' });
      }
    },
    [getWindow, notify, openWindow],
  );

  const requestEditor = useCallback(() => {
    setSelectedIcon('editor');
    if (isEditorUnlocked()) {
      openApp('editor');
      return;
    }
    setLockOpen(true);
  }, [openApp]);

  useEffect(() => {
    if (greeted.current) return;
    greeted.current = true;
    notify({
      title: 'Welcome.exe',
      message: 'Desktop ready. Open a shortcut or use the Start menu.',
      tone: 'info',
    });
  }, [notify]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      if (event.key === 'Escape') {
        if (startOpen) setStartOpen(false);
        return;
      }
      if (typing) return;
      const map: Record<string, WindowId> = { p: 'projects', a: 'about', c: 'contact' };
      const id = map[event.key.toLowerCase()];
      if (id) {
        event.preventDefault();
        openApp(id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openApp, setStartOpen, startOpen]);

  const openLink = (url: string, label: string) => {
    if (!isUsableHttpUrl(url)) {
      notify({
        title: `${label} not set`,
        message: `Open Edit and set your ${label} link.`,
        tone: 'error',
      });
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isWindowOpen = (id: WindowId) => Boolean(openWindows.find((win) => win.id === id));

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden">
      <a className="skip-link font-display text-sm" href="#welcome-title">
        Skip to welcome window
      </a>
      <Wallpaper />
      <header className="pointer-events-none relative z-10 flex items-start justify-between gap-2 px-3 pt-3">
        <div className="pointer-events-auto">
          <IdentityCard />
        </div>
        <div className="pointer-events-auto flex w-[7.75rem] shrink-0 flex-col items-stretch gap-2">
          <div className="pixel-border hidden bg-[var(--window-bg)] px-3 py-2 text-right sm:block">
            <p className="font-display text-sm">{timeLabel}</p>
            <p className="font-body text-xs text-[var(--muted-text)]">{dateLabel}</p>
          </div>
          <button
            type="button"
            className="retro-btn retro-btn-primary flex min-h-10 items-center justify-center gap-1.5 px-2 py-1.5"
            aria-label="Edit portfolio content"
            onClick={requestEditor}
          >
            <IconEdit size={16} />
            <span className="font-display text-sm">Edit</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 min-h-0 flex-1 overflow-hidden">
        <nav
          aria-label="Desktop shortcuts"
          className={
            isMobile
              ? 'grid grid-cols-4 justify-items-center gap-x-1 gap-y-2 overflow-y-auto px-2 pb-2 pt-3'
              : 'desktop-icon-nav absolute left-2 top-1 flex max-h-[calc(100%-0.5rem)] flex-col flex-wrap content-start items-center gap-1'
          }
        >
          <DesktopIcon
            label="About Me"
            icon={<IconAbout size={28} />}
            selected={selectedIcon === 'about'}
            isOpen={isWindowOpen('about')}
            onSelect={() => setSelectedIcon('about')}
            onOpen={() => openApp('about')}
          />
          <DesktopIcon
            label="My Projects"
            icon={<IconProjects size={28} />}
            selected={selectedIcon === 'projects'}
            isOpen={isWindowOpen('projects')}
            onSelect={() => setSelectedIcon('projects')}
            onOpen={() => openApp('projects')}
          />
          <DesktopIcon
            label="Skills"
            icon={<IconSkills size={28} />}
            selected={selectedIcon === 'skills'}
            isOpen={isWindowOpen('skills')}
            onSelect={() => setSelectedIcon('skills')}
            onOpen={() => openApp('skills')}
          />
          <DesktopIcon
            label="Experience"
            icon={<IconExperience size={28} />}
            selected={selectedIcon === 'experience'}
            isOpen={isWindowOpen('experience')}
            onSelect={() => setSelectedIcon('experience')}
            onOpen={() => openApp('experience')}
          />
          <DesktopIcon
            label="Education"
            icon={<IconEducation size={28} />}
            selected={selectedIcon === 'education'}
            isOpen={isWindowOpen('education')}
            onSelect={() => setSelectedIcon('education')}
            onOpen={() => openApp('education')}
          />
          <DesktopIcon
            label="Resume"
            icon={<IconResume size={28} />}
            selected={selectedIcon === 'resume'}
            isOpen={isWindowOpen('resume')}
            onSelect={() => setSelectedIcon('resume')}
            onOpen={() => openApp('resume')}
          />
          <DesktopIcon
            label="Volunteer"
            icon={<IconVolunteer size={28} />}
            selected={selectedIcon === 'volunteer'}
            isOpen={isWindowOpen('volunteer')}
            onSelect={() => setSelectedIcon('volunteer')}
            onOpen={() => openApp('volunteer')}
          />
          <DesktopIcon
            label="Contact"
            icon={<IconContact size={28} />}
            selected={selectedIcon === 'contact'}
            isOpen={isWindowOpen('contact')}
            onSelect={() => setSelectedIcon('contact')}
            onOpen={() => openApp('contact')}
          />
          <DesktopIcon
            label="GitHub"
            icon={<IconGithub size={28} />}
            selected={selectedIcon === 'github'}
            onSelect={() => setSelectedIcon('github')}
            onOpen={() => openLink(socialLinks.github, 'GitHub')}
          />
          {isUsableHttpUrl(socialLinks.linkedin) && (
            <DesktopIcon
              label="LinkedIn"
              icon={<IconLinkedIn size={28} />}
              selected={selectedIcon === 'linkedin'}
              onSelect={() => setSelectedIcon('linkedin')}
              onOpen={() => openLink(socialLinks.linkedin, 'LinkedIn')}
            />
          )}
        </nav>

        <RetroWindow id="welcome" icon={<IconHome size={16} />}>
          <WelcomeWindow />
        </RetroWindow>
        <RetroWindow id="about" icon={<IconAbout size={16} />}>
          <AboutWindow />
        </RetroWindow>
        <RetroWindow id="projects" icon={<IconProjects size={16} />}>
          <ProjectsWindow />
        </RetroWindow>
        <RetroWindow id="skills" icon={<IconSkills size={16} />}>
          <SkillsWindow />
        </RetroWindow>
        <RetroWindow id="experience" icon={<IconExperience size={16} />}>
          <ExperienceWindow />
        </RetroWindow>
        <RetroWindow id="education" icon={<IconEducation size={16} />}>
          <EducationWindow />
        </RetroWindow>
        <RetroWindow id="resume" icon={<IconResume size={16} />}>
          <ResumeWindow />
        </RetroWindow>
        <RetroWindow id="volunteer" icon={<IconVolunteer size={16} />}>
          <VolunteerWindow />
        </RetroWindow>
        <RetroWindow id="contact" icon={<IconContact size={16} />}>
          <ContactWindow />
        </RetroWindow>
        <RetroWindow id="terminal" icon={<IconTerminal size={16} />}>
          <TerminalWindow />
        </RetroWindow>
        <RetroWindow id="theme" icon={<IconTheme size={16} />}>
          <ThemeWindow />
        </RetroWindow>
        <RetroWindow id="editor" icon={<IconEdit size={16} />}>
          <EditorWindow />
        </RetroWindow>
      </main>

      <PixelBuddy />
      <NotificationStack />
      <Taskbar />
      {lockOpen && (
        <EditorLock
          onUnlock={() => {
            setLockOpen(false);
            openApp('editor');
          }}
          onCancel={() => setLockOpen(false)}
        />
      )}
    </div>
  );
}
