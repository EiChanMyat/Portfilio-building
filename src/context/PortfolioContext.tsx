import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  getDefaultSnapshot,
  loadSnapshot,
  persistSnapshot,
  withExampleProjects,
  type PortfolioSnapshot,
} from '../data/portfolioStore';
import { PortfolioContext, type PortfolioContextValue } from './portfolio-context';

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState<PortfolioSnapshot>(loadSnapshot);

  useEffect(() => {
    const restored = withExampleProjects(snapshot.projects);
    if (JSON.stringify(restored) === JSON.stringify(snapshot.projects)) return;
    setSnapshot((current) => {
      const next = { ...current, projects: withExampleProjects(current.projects) };
      persistSnapshot(next);
      return next;
    });
  }, [snapshot.projects]);

  useEffect(() => {
    document.title = snapshot.siteMeta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', snapshot.siteMeta.description);
  }, [snapshot.siteMeta.description, snapshot.siteMeta.title]);

  const save = useCallback((patch: Partial<PortfolioSnapshot>) => {
    setSnapshot((current) => {
      const next = { ...current, ...patch };
      persistSnapshot(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    const defaults = getDefaultSnapshot();
    persistSnapshot(defaults);
    setSnapshot(defaults);
  }, []);

  const value = useMemo<PortfolioContextValue>(
    () => ({
      ...snapshot,
      save,
      resetAll,
    }),
    [resetAll, save, snapshot],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
