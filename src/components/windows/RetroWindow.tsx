import { useRef, useEffect, type PointerEvent, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useDesktop } from '../../hooks/useDesktop';
import { useIsMobile } from '../../hooks/useMediaQuery';
import type { WindowId } from '../../types/windows';
import { TASKBAR_HEIGHT } from '../../types/windows';
import { WindowControls } from './WindowControls';

interface RetroWindowProps {
  id: WindowId;
  icon?: ReactNode;
  children: ReactNode;
}

export function RetroWindow({ id, icon, children }: RetroWindowProps) {
  const {
    getWindow,
    activeId,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    moveWindow,
  } = useDesktop();
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const moveWindowRef = useRef(moveWindow);

  useEffect(() => {
    moveWindowRef.current = moveWindow;
  }, [moveWindow]);

  const win = getWindow(id);
  const isActive = activeId === id;
  const visible = Boolean(win?.isOpen && !win.isMinimized && !(isMobile && !isActive));

  const onTitlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!win || isMobile || win.isMaximized) return;
    if ((event.target as HTMLElement).closest('button')) return;

    event.preventDefault();
    focusWindow(id);

    const startX = event.clientX;
    const startY = event.clientY;
    const origX = win.defaultBounds.x;
    const origY = win.defaultBounds.y;

    const onMove = (moveEvent: globalThis.PointerEvent) => {
      moveEvent.preventDefault();
      moveWindowRef.current(
        id,
        origX + (moveEvent.clientX - startX),
        origY + (moveEvent.clientY - startY),
      );
    };

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  if (!win || !visible) return null;

  const bounds = win.defaultBounds;
  const isWelcome = id === 'welcome';
  const maxWidth = isWelcome
    ? Math.min(bounds.width, window.innerWidth - 220)
    : Math.min(bounds.width, window.innerWidth - 24);
  const maxHeight = Math.min(bounds.height, window.innerHeight - TASKBAR_HEIGHT - 50);
  const desktopStyle = win.isMaximized
    ? {
        top: 8,
        left: 8,
        width: 'calc(100vw - 16px)',
        height: `calc(100dvh - ${TASKBAR_HEIGHT + 16}px)`,
        maxHeight: `calc(100dvh - ${TASKBAR_HEIGHT + 16}px)`,
        zIndex: win.zIndex,
      }
    : {
        top: Math.max(8, bounds.y),
        left: Math.max(isWelcome ? 112 : 8, bounds.x),
        width: maxWidth,
        height: isWelcome ? 'auto' : maxHeight,
        maxWidth: isWelcome ? 'calc(100vw - 220px)' : 'calc(100vw - 24px)',
        maxHeight: `calc(100dvh - ${TASKBAR_HEIGHT + 50}px)`,
        zIndex: win.zIndex,
      };

  return (
    <section
      role="dialog"
      aria-labelledby={`${id}-title`}
      aria-modal={isMobile}
      className={`retro-window flex flex-col overflow-hidden ${isActive ? 'is-active' : ''} ${
        isMobile ? 'fixed inset-x-2 top-2 bottom-16 z-40' : 'fixed'
      } ${reducedMotion ? '' : 'window-enter'}`}
      style={isMobile ? { zIndex: win.zIndex } : desktopStyle}
      onMouseDown={() => focusWindow(id)}
    >
      <div
        className={`retro-titlebar flex min-h-11 shrink-0 items-center gap-2 px-2 py-1 select-none touch-none ${
          isMobile || win.isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        }`}
        onPointerDown={onTitlePointerDown}
      >
        <span className="grid h-5 w-5 place-items-center" aria-hidden="true">
          {icon}
        </span>
        <h2
          id={`${id}-title`}
          className="min-w-0 flex-1 truncate font-display text-sm text-[var(--dark-text)]"
        >
          {win.title}
        </h2>
        <WindowControls
          isMaximized={win.isMaximized || isMobile}
          showMaximize={!isMobile}
          onMinimize={() => minimizeWindow(id)}
          onMaximize={() => toggleMaximize(id)}
          onClose={() => closeWindow(id)}
        />
      </div>
      <div className="pixel-scrollbar min-h-0 flex-1 overflow-auto bg-[var(--window-bg)] p-3 font-body text-base leading-relaxed sm:p-4">
        {children}
      </div>
    </section>
  );
}
