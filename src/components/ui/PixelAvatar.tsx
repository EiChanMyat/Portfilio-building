import { useEffect, useState } from 'react';

export function PixelAvatar({ size = 96 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel portrait of the developer"
      className="pixel-art"
    >
      <rect width="48" height="48" fill="#CDB4DB" />
      <rect x="2" y="2" width="44" height="44" fill="#FFC8A2" />
      <rect x="10" y="6" width="28" height="10" fill="#FFAFCC" />
      <rect x="8" y="10" width="6" height="14" fill="#FFAFCC" />
      <rect x="34" y="10" width="6" height="14" fill="#FFAFCC" />
      <rect x="14" y="12" width="20" height="16" fill="#F3C2A4" />
      <rect x="16" y="18" width="4" height="3" fill="#33283A" />
      <rect x="28" y="18" width="4" height="3" fill="#33283A" />
      <rect x="14" y="17" width="20" height="2" fill="#46364A" />
      <rect x="14" y="17" width="2" height="8" fill="#46364A" />
      <rect x="32" y="17" width="2" height="8" fill="#46364A" />
      <rect x="18" y="22" width="2" height="2" fill="#FF8FAB" />
      <rect x="28" y="22" width="2" height="2" fill="#FF8FAB" />
      <rect x="22" y="24" width="4" height="2" fill="#E8A08A" />
      <rect x="12" y="28" width="24" height="16" fill="#B8A1D9" />
      <rect x="18" y="30" width="12" height="8" fill="#FFF3C4" />
      <rect x="20" y="32" width="8" height="2" fill="#78B87A" />
      <rect x="8" y="30" width="6" height="4" fill="#F3C2A4" />
      <rect x="34" y="30" width="6" height="4" fill="#F3C2A4" />
      <rect x="0" y="0" width="48" height="48" fill="none" stroke="#46364A" strokeWidth="2" />
    </svg>
  );
}

export function PixelBuddy() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const originX = window.innerWidth - 36;
      const originY = window.innerHeight - 92;
      const dx = Math.max(-1, Math.min(1, (event.clientX - originX) / 140));
      const dy = Math.max(-1, Math.min(1, (event.clientY - originY) / 140));
      setOffset({ x: dx * 2, y: dy * 2 });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      className="pointer-events-none absolute right-3 bottom-16 z-[15] hidden sm:block"
      aria-hidden="true"
    >
      <svg width="44" height="44" viewBox="0 0 32 32" shapeRendering="crispEdges" className="pixel-art">
        <rect x="8" y="10" width="16" height="14" fill="var(--buddy-body)" stroke="#46364A" strokeWidth="2" />
        <rect x="10" y="6" width="4" height="6" fill="var(--buddy-body)" stroke="#46364A" strokeWidth="2" />
        <rect x="18" y="6" width="4" height="6" fill="var(--buddy-body)" stroke="#46364A" strokeWidth="2" />
        <rect x="12" y="14" width="3" height="3" fill="#FFFDF3" />
        <rect x="18" y="14" width="3" height="3" fill="#FFFDF3" />
        <rect
          x={12.5 + offset.x}
          y={14.5 + offset.y}
          width="2"
          height="2"
          fill="#33283A"
        />
        <rect
          x={18.5 + offset.x}
          y={14.5 + offset.y}
          width="2"
          height="2"
          fill="#33283A"
        />
        <rect x="14" y="20" width="4" height="2" fill="#33283A" />
      </svg>
    </div>
  );
}
