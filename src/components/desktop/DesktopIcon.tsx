import type { KeyboardEvent, ReactNode } from 'react';

interface DesktopIconProps {
  label: string;
  icon: ReactNode;
  onOpen: () => void;
  selected?: boolean;
  isOpen?: boolean;
  onSelect?: () => void;
}

export function DesktopIcon({
  label,
  icon,
  onOpen,
  selected = false,
  isOpen = false,
  onSelect,
}: DesktopIconProps) {
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <button
      type="button"
      className={`desktop-icon flex w-[84px] flex-col items-center gap-1 p-1 text-[var(--icon-label)] ${
        selected ? 'is-selected' : ''
      } ${isOpen ? 'is-open' : ''}`}
      aria-pressed={selected}
      onClick={() => {
        onSelect?.();
        onOpen();
      }}
      onDoubleClick={onOpen}
      onKeyDown={onKeyDown}
    >
      <span className="icon-face pixel-border relative grid h-12 w-12 place-items-center bg-[var(--window-bg)]">
        {icon}
        {isOpen && (
          <span className="absolute -bottom-1 h-1.5 w-1.5 bg-[var(--success-green)]" aria-hidden="true" />
        )}
      </span>
      <span className="text-center font-display text-[11px] leading-tight [text-shadow:1px_1px_0_var(--white-highlight)]">
        {label}
      </span>
    </button>
  );
}
