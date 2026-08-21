import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Notice, WindowId, WindowRuntimeState } from '../types/windows';
import { WINDOW_CONFIG, getWelcomeBounds } from '../types/windows';
import { useTheme } from '../hooks/useTheme';
import { DesktopContext, type DesktopContextValue } from './desktop-context';

const Z_START = 20;

function clampPosition(x: number, y: number) {
  const maxX = Math.max(8, window.innerWidth - 120);
  const maxY = Math.max(8, window.innerHeight - 56);
  return {
    x: Math.min(Math.max(0, x), maxX),
    y: Math.min(Math.max(0, y), maxY),
  };
}

function createInitialWindows(): WindowRuntimeState[] {
  const welcome = getWelcomeBounds();
  return WINDOW_CONFIG.map((config, index) => {
    const bounds = config.id === 'welcome' ? welcome : config.defaultBounds;
    return {
      ...config,
      defaultBounds: bounds,
      isOpen: config.id === 'welcome',
      isMinimized: false,
      isMaximized: false,
      zIndex: config.id === 'welcome' ? Z_START + WINDOW_CONFIG.length : Z_START + index,
      restoreBounds: bounds,
      userMoved: false,
      autoHeight: config.id === 'welcome',
    };
  });
}

export function DesktopProvider({
  children,
  restartIntro,
}: {
  children: ReactNode;
  restartIntro: () => void;
}) {
  const [windows, setWindows] = useState<WindowRuntimeState[]>(createInitialWindows);
  const [activeId, setActiveId] = useState<WindowId | null>('welcome');
  const [startOpen, setStartOpen] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const zRef = useRef(Z_START + WINDOW_CONFIG.length);
  const { theme, setTheme, toggleTheme } = useTheme();

  useEffect(() => {
    const onResize = () => {
      const nextWelcome = getWelcomeBounds();
      setWindows((current) =>
        current.map((win) => {
          if (win.id !== 'welcome' || win.userMoved || win.isMaximized) return win;
          return {
            ...win,
            defaultBounds: nextWelcome,
            restoreBounds: nextWelcome,
          };
        }),
      );
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const notify = useCallback((notice: Omit<Notice, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setNotices((current) => [...current.slice(-3), { ...notice, id }]);
  }, []);

  const dismissNotice = useCallback((id: string) => {
    setNotices((current) => current.filter((item) => item.id !== id));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    zRef.current += 1;
    const nextZ = zRef.current;
    setWindows((current) =>
      current.map((win) =>
        win.id === id ? { ...win, zIndex: nextZ, isMinimized: false } : win,
      ),
    );
    setActiveId(id);
    setStartOpen(false);
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    zRef.current += 1;
    const nextZ = zRef.current;
    setWindows((current) =>
      current.map((win) =>
        win.id === id
          ? { ...win, isOpen: true, isMinimized: false, zIndex: nextZ }
          : win,
      ),
    );
    setActiveId(id);
    setStartOpen(false);
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((current) =>
      current.map((win) =>
        win.id === id
          ? { ...win, isOpen: false, isMinimized: false, isMaximized: false }
          : win,
      ),
    );
    setActiveId((current) => (current === id ? null : current));
  }, []);

  const closeAllWindows = useCallback(() => {
    setWindows((current) =>
      current.map((win) =>
        win.isOpen
          ? { ...win, isOpen: false, isMinimized: false, isMaximized: false }
          : win,
      ),
    );
    setActiveId(null);
    setStartOpen(false);
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((current) =>
      current.map((win) => (win.id === id ? { ...win, isMinimized: true } : win)),
    );
    setActiveId((current) => (current === id ? null : current));
  }, []);

  const toggleMaximize = useCallback((id: WindowId) => {
    setWindows((current) =>
      current.map((win) => {
        if (win.id !== id) return win;
        return { ...win, isMaximized: !win.isMaximized, isMinimized: false };
      }),
    );
    setActiveId(id);
  }, []);

  const moveWindow = useCallback((id: WindowId, x: number, y: number) => {
    const next = clampPosition(x, y);
    setWindows((current) =>
      current.map((win) => {
        if (win.id !== id || win.isMaximized) return win;
        return {
          ...win,
          defaultBounds: { ...win.defaultBounds, x: next.x, y: next.y },
          restoreBounds: { ...win.restoreBounds, x: next.x, y: next.y },
          userMoved: true,
        };
      }),
    );
  }, []);

  const getWindow = useCallback(
    (id: WindowId) => windows.find((win) => win.id === id),
    [windows],
  );

  const openWindows = useMemo(
    () => windows.filter((win) => win.isOpen),
    [windows],
  );

  const toggleStart = useCallback(() => {
    setStartOpen((open) => !open);
  }, []);

  const value = useMemo<DesktopContextValue>(
    () => ({
      windows,
      activeId,
      startOpen,
      notices,
      theme,
      openWindow,
      closeWindow,
      closeAllWindows,
      minimizeWindow,
      toggleMaximize,
      focusWindow,
      moveWindow,
      setStartOpen,
      toggleStart,
      setTheme,
      toggleTheme,
      notify,
      dismissNotice,
      getWindow,
      openWindows,
      restartIntro,
    }),
    [
      windows,
      activeId,
      startOpen,
      notices,
      theme,
      openWindow,
      closeWindow,
      closeAllWindows,
      minimizeWindow,
      toggleMaximize,
      focusWindow,
      moveWindow,
      toggleStart,
      setTheme,
      toggleTheme,
      notify,
      dismissNotice,
      getWindow,
      openWindows,
      restartIntro,
    ],
  );

  return <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>;
}
