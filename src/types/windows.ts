export const WINDOW_IDS = [
  'welcome',
  'about',
  'projects',
  'skills',
  'experience',
  'education',
  'resume',
  'volunteer',
  'contact',
  'terminal',
  'theme',
  'editor',
] as const;

export type WindowId = (typeof WINDOW_IDS)[number];

export interface WindowBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WindowConfig {
  id: WindowId;
  title: string;
  defaultBounds: WindowBounds;
}

export interface WindowRuntimeState extends WindowConfig {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  restoreBounds: WindowBounds;
  userMoved: boolean;
  autoHeight?: boolean;
}

export interface Notice {
  id: string;
  title: string;
  message: string;
  tone: 'info' | 'success' | 'error';
}

export const TASKBAR_HEIGHT = 56;
export const ICON_COLUMN = 120;

export function getWelcomeBounds(): WindowBounds {
  if (typeof window === 'undefined') {
    return { x: 160, y: 36, width: 760, height: 560 };
  }
  const width = Math.min(780, Math.max(300, window.innerWidth - 220));
  const height = Math.max(280, window.innerHeight - TASKBAR_HEIGHT - 50);
  const x = Math.max(ICON_COLUMN, Math.round((window.innerWidth - width) / 2));
  const y = x < 310 ? 118 : 28;
  return { x, y, width, height };
}

export const WINDOW_CONFIG: WindowConfig[] = [
  {
    id: 'welcome',
    title: 'Welcome.exe',
    defaultBounds: { x: 160, y: 36, width: 760, height: 560 },
  },
  {
    id: 'about',
    title: 'about_me.txt',
    defaultBounds: { x: 140, y: 48, width: 560, height: 500 },
  },
  {
    id: 'projects',
    title: 'project_explorer',
    defaultBounds: { x: 130, y: 40, width: 780, height: 540 },
  },
  {
    id: 'skills',
    title: 'skills_manager.exe',
    defaultBounds: { x: 150, y: 56, width: 560, height: 480 },
  },
  {
    id: 'experience',
    title: 'career_history.log',
    defaultBounds: { x: 148, y: 44, width: 560, height: 520 },
  },
  {
    id: 'education',
    title: 'education.dat',
    defaultBounds: { x: 160, y: 60, width: 520, height: 460 },
  },
  {
    id: 'resume',
    title: 'resume.pdf',
    defaultBounds: { x: 200, y: 80, width: 440, height: 400 },
  },
  {
    id: 'volunteer',
    title: 'volunteer.log',
    defaultBounds: { x: 176, y: 52, width: 540, height: 480 },
  },
  {
    id: 'contact',
    title: 'send_message.exe',
    defaultBounds: { x: 170, y: 48, width: 540, height: 540 },
  },
  {
    id: 'terminal',
    title: 'command.com',
    defaultBounds: { x: 220, y: 100, width: 500, height: 360 },
  },
  {
    id: 'theme',
    title: 'display.cpl',
    defaultBounds: { x: 240, y: 120, width: 440, height: 340 },
  },
  {
    id: 'editor',
    title: 'content_editor.exe',
    defaultBounds: { x: 120, y: 36, width: 720, height: 560 },
  },
];
