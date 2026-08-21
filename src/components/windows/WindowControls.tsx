interface WindowControlsProps {
  isMaximized: boolean;
  showMaximize?: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
}

export function WindowControls({
  isMaximized,
  showMaximize = true,
  onMinimize,
  onMaximize,
  onClose,
}: WindowControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className="retro-icon-btn"
        aria-label="Minimize window"
        onClick={(event) => {
          event.stopPropagation();
          onMinimize();
        }}
      >
        _
      </button>
      {showMaximize && (
        <button
          type="button"
          className="retro-icon-btn"
          aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
          onClick={(event) => {
            event.stopPropagation();
            onMaximize();
          }}
        >
          {isMaximized ? '▣' : '□'}
        </button>
      )}
      <button
        type="button"
        className="retro-icon-btn close-btn"
        aria-label="Close window"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
      >
        x
      </button>
    </div>
  );
}
