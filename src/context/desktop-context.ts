import { createContext } from 'react';
import type { Notice, WindowId, WindowRuntimeState } from '../types/windows';
import type { ThemeId } from '../hooks/useTheme';

export interface DesktopContextValue {
  windows: WindowRuntimeState[];
  activeId: WindowId | null;
  startOpen: boolean;
  notices: Notice[];
  theme: ThemeId;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  closeAllWindows: () => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  moveWindow: (id: WindowId, x: number, y: number) => void;
  setStartOpen: (open: boolean) => void;
  toggleStart: () => void;
  setTheme: (theme: ThemeId) => void;
  toggleTheme: () => void;
  notify: (notice: Omit<Notice, 'id'>) => void;
  dismissNotice: (id: string) => void;
  getWindow: (id: WindowId) => WindowRuntimeState | undefined;
  openWindows: WindowRuntimeState[];
  restartIntro: () => void;
}

export const DesktopContext = createContext<DesktopContextValue | null>(null);
