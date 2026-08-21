import { useEffect, useState } from 'react';

export type ThemeId = 'sunset' | 'night';

const STORAGE_KEY = 'portfolio-os-theme';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'sunset';
    return localStorage.getItem(STORAGE_KEY) === 'night' ? 'night' : 'sunset';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    const color = theme === 'night' ? '#241536' : '#CDB4DB';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', color);
  }, [theme]);

  const setTheme = (next: ThemeId) => setThemeState(next);
  const toggleTheme = () => setThemeState((prev) => (prev === 'sunset' ? 'night' : 'sunset'));

  return { theme, setTheme, toggleTheme };
}
