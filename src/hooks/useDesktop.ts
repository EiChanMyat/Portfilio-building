import { useContext } from 'react';
import { DesktopContext } from '../context/desktop-context';

export function useDesktop() {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error('useDesktop must be used within DesktopProvider');
  }
  return context;
}
