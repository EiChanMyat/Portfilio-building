import { useEffect, useState } from 'react';

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
}

export function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return {
    now,
    timeLabel: formatTime(now),
    dateLabel: formatDate(now),
  };
}

export function useSessionTimer(active: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [active]);

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  const label = `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;

  return { seconds, label };
}
