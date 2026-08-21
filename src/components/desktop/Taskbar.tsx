import { personalInfo } from '../../data/portfolio';
import { useDesktop } from '../../hooks/useDesktop';
import { useClock, useSessionTimer } from '../../hooks/useClock';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { playUiBlip, useUiSound } from '../../hooks/useUiSound';
import { IconClear, IconMuted, IconSound, IconStart, IconTheme } from '../ui/PixelIcons';
import { StartMenu } from './StartMenu';

export function Taskbar() {
  const {
    openWindows,
    activeId,
    toggleStart,
    startOpen,
    focusWindow,
    openWindow,
    closeAllWindows,
    theme,
  } = useDesktop();
  const { timeLabel } = useClock();
  const { label: sessionLabel } = useSessionTimer(true);
  const isMobile = useIsMobile();
  const sound = useUiSound();

  return (
    <footer className="relative z-[1000] flex h-14 items-center gap-1.5 border-t-[3px] border-[var(--dark-outline)] bg-[var(--taskbar-bg)] px-1.5">
      <button
        type="button"
        data-start-button
        className={`taskbar-btn retro-btn flex h-10 min-h-10 items-center gap-1 px-2 ${startOpen ? 'translate-x-px translate-y-px' : ''}`}
        aria-expanded={startOpen}
        aria-haspopup="menu"
        onClick={toggleStart}
      >
        <IconStart size={16} />
        <span className="hidden font-display sm:inline">Start</span>
      </button>

      <button
        type="button"
        className="taskbar-btn retro-btn flex h-10 min-h-10 items-center gap-1 px-2 disabled:opacity-40"
        aria-label="Close all windows"
        title="Close all windows"
        disabled={openWindows.length === 0}
        onClick={() => {
          closeAllWindows();
          playUiBlip();
        }}
      >
        <IconClear size={16} />
        <span className="hidden font-display sm:inline">Clear</span>
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto py-1">
        {openWindows.map((win) => {
          const pressed = activeId === win.id && !win.isMinimized;
          return (
            <button
              key={win.id}
              type="button"
              className={`taskbar-btn h-10 min-h-10 shrink-0 border-2 border-[var(--dark-outline)] px-2 font-display text-xs ${
                pressed ? 'bg-[var(--window-yellow)] shadow-[inset_1px_1px_0_var(--dark-outline)]' : 'bg-[var(--taskbar-face)]'
              }`}
              aria-pressed={pressed}
              onClick={() => focusWindow(win.id)}
            >
              {isMobile ? win.title.split(/[.\s]/)[0] : win.title}
            </button>
          );
        })}
      </div>

      <div className="ml-auto flex items-center gap-1">
        <p
          className="hidden px-1 font-body text-[10px] text-[var(--muted-text)] sm:block"
          title="Time spent on this site"
        >
          {sessionLabel}
        </p>
        <p className="hidden items-center gap-1 px-1 font-body text-[10px] text-[var(--muted-text)] md:flex">
          <span className="h-2 w-2 bg-[var(--success-green)]" aria-hidden="true" />
          {personalInfo.currentlyCoding}
        </p>
        <button
          type="button"
          className="taskbar-btn retro-icon-btn h-10 w-10 min-h-10"
          aria-label={sound.enabled ? 'Mute background music' : 'Play soft background music'}
          title={sound.enabled ? 'Mute music' : 'Play music'}
          aria-pressed={sound.enabled}
          onClick={sound.toggle}
        >
          {sound.enabled ? <IconSound size={16} /> : <IconMuted size={16} />}
        </button>
        <button
          type="button"
          className="taskbar-btn retro-icon-btn h-10 w-10 min-h-10"
          aria-label={theme === 'night' ? 'Open theme settings, night mode on' : 'Open theme settings, sunset mode on'}
          onClick={() => openWindow('theme')}
        >
          <IconTheme size={16} />
        </button>
        <time
          className="border-2 border-[var(--dark-outline)] bg-[var(--taskbar-face)] px-2 py-1 font-display text-xs"
          dateTime={new Date().toISOString()}
        >
          {timeLabel}
        </time>
      </div>
      <StartMenu />
    </footer>
  );
}
