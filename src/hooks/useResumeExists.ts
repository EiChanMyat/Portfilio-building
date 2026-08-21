import { useEffect, useState } from 'react';

export function useResumeExists(path: string) {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const head = await fetch(path, { method: 'HEAD' });
        if (cancelled) return;
        if (head.ok) {
          setExists(true);
          return;
        }
        if (head.status === 405) {
          const get = await fetch(path, { method: 'GET' });
          if (!cancelled) setExists(get.ok);
          return;
        }
        setExists(false);
      } catch {
        if (!cancelled) setExists(false);
      }
    }

    void check();
    return () => {
      cancelled = true;
    };
  }, [path]);

  return exists;
}
