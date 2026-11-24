/** Simple desktop lock for the Edit button. This is not real security — it only stops casual visitors. */
export const EDITOR_PASSWORD = '77';
export const EDITOR_UNLOCK_KEY = 'portfolio-os-editor-unlocked';

export function isEditorUnlocked(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(EDITOR_UNLOCK_KEY) === '1';
}

export function unlockEditor() {
  sessionStorage.setItem(EDITOR_UNLOCK_KEY, '1');
}

export function checkEditorPassword(value: string): boolean {
  return value.trim() === EDITOR_PASSWORD;
}
