import { useCallback, useEffect, useState } from 'react';
import { DesktopProvider } from './context/DesktopContext';
import { BootScreen } from './components/desktop/BootScreen';
import { Desktop } from './components/desktop/Desktop';
import { usePrefersReducedMotion } from './hooks/useMediaQuery';

const BOOT_KEY = 'portfolio-os-has-booted';

function AppShell() {
  const reducedMotion = usePrefersReducedMotion();
  const [booted, setBooted] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    return sessionStorage.getItem(BOOT_KEY) === '1';
  });

  useEffect(() => {
    if (booted || reducedMotion) return;
    const id = window.setTimeout(() => {
      sessionStorage.setItem(BOOT_KEY, '1');
      setBooted(true);
    }, 1500);
    return () => window.clearTimeout(id);
  }, [booted, reducedMotion]);

  const skip = () => {
    sessionStorage.setItem(BOOT_KEY, '1');
    setBooted(true);
  };

  const restartIntro = useCallback(() => {
    sessionStorage.removeItem(BOOT_KEY);
    setBooted(false);
  }, []);

  if (!booted && !reducedMotion) {
    return <BootScreen onSkip={skip} />;
  }

  return (
    <DesktopProvider restartIntro={restartIntro}>
      <Desktop />
    </DesktopProvider>
  );
}

export default function App() {
  return <AppShell />;
}
