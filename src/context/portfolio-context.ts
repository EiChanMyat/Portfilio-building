import { createContext } from 'react';
import type { PortfolioSnapshot } from '../data/portfolioStore';

export interface PortfolioContextValue extends PortfolioSnapshot {
  save: (patch: Partial<PortfolioSnapshot>) => void;
  resetAll: () => void;
}

export const PortfolioContext = createContext<PortfolioContextValue | null>(null);
