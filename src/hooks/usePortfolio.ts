import { useContext } from 'react';
import { PortfolioContext } from '../context/portfolio-context';

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
}
