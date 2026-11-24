import { useEffect, useRef, useState, type FormEvent } from 'react';
import { checkEditorPassword, unlockEditor } from '../../data/editorLock';

export function EditorLock({
  onUnlock,
  onCancel,
}: {
  onUnlock: () => void;
  onCancel: () => void;
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onCancel]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!checkEditorPassword(password)) {
      setError(true);
      setPassword('');
      inputRef.current?.focus();
      return;
    }
    unlockEditor();
    onUnlock();
  };

  return (
    <div
      className="fixed inset-0 z-[2000] grid place-items-center bg-[color-mix(in_srgb,var(--dark-outline)_45%,transparent)] p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-lock-title"
        className="retro-window is-active w-[min(92vw,360px)] overflow-hidden"
      >
        <div className="retro-titlebar flex min-h-11 items-center px-2">
          <h2 id="editor-lock-title" className="font-display text-sm">
            permission.dll
          </h2>
        </div>
        <form className="space-y-3 bg-[var(--window-bg)] p-4" onSubmit={submit}>
          <p className="font-body text-sm leading-relaxed">
            Enter the editor password to change portfolio details.
          </p>
          <label className="block font-display text-sm" htmlFor="editor-password">
            Password
            <input
              ref={inputRef}
              id="editor-password"
              className="retro-input mt-1"
              type="password"
              autoComplete="off"
              aria-describedby="editor-password-hint"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(false);
              }}
            />
          </label>
          <p id="editor-password-hint" className="font-body text-xs text-[var(--muted-text)]">
            Hint: code name
          </p>
          {error && <p className="field-error">Wrong password. Try again.</p>}
          <div className="flex gap-2">
            <button type="submit" className="retro-btn retro-btn-primary min-h-11 flex-1">
              Unlock
            </button>
            <button type="button" className="retro-btn min-h-11" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
