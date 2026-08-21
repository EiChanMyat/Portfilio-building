import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { useDesktop } from '../../hooks/useDesktop';

const AUTO_DISMISS_MS = 4000;

export function NotificationStack() {
  const { notices, dismissNotice } = useDesktop();
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed right-3 bottom-16 z-[1100] flex w-[min(92vw,280px)] flex-col gap-2">
      <AnimatePresence>
        {notices.map((notice) => (
          <NotificationCard
            key={notice.id}
            id={notice.id}
            title={notice.title}
            message={notice.message}
            tone={notice.tone}
            reduced={Boolean(reduced)}
            onClose={dismissNotice}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function NotificationCard({
  id,
  title,
  message,
  tone,
  reduced,
  onClose,
}: {
  id: string;
  title: string;
  message: string;
  tone: 'info' | 'success' | 'error';
  reduced: boolean;
  onClose: (id: string) => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(() => onClose(id), AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [id, onClose]);

  const accent =
    tone === 'success' ? 'var(--success-green)' : tone === 'error' ? 'var(--error-red)' : 'var(--soft-lavender)';

  return (
    <motion.div
      role="status"
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
      transition={{ duration: reduced ? 0.15 : 0.4, ease: 'easeOut' }}
      className="pointer-events-auto pixel-border bg-[var(--window-bg)] p-3"
    >
      <div className="mb-1 h-2" style={{ background: accent }} />
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-sm">{title}</p>
          <p className="font-body text-xs leading-relaxed">{message}</p>
        </div>
        <button
          type="button"
          className="retro-icon-btn"
          aria-label="Dismiss notification"
          onClick={() => onClose(id)}
        >
          x
        </button>
      </div>
    </motion.div>
  );
}
