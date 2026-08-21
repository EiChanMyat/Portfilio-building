import { personalInfo } from '../../data/portfolio';

interface BootScreenProps {
  onSkip: () => void;
}

export function BootScreen({ onSkip }: BootScreenProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#2a1b33] text-[#78B87A]">
      <div className="w-[min(92vw,420px)] pixel-border bg-[#1a1222] p-6">
        <p className="font-pixel text-[10px] leading-6 text-[#ffe69a] sm:text-xs">
          {personalInfo.osName}
        </p>
        <p className="mt-4 font-body text-sm text-[#cde8c8]">
          Booting desktop environment
          <span className="blink">_</span>
        </p>
        <div
          className="mt-5 h-5 border-2 border-[#ffe69a] bg-[#120c18]"
          role="progressbar"
          aria-label="Loading portfolio"
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="boot-bar-fill h-full bg-[#78B87A]" />
        </div>
        <button type="button" className="retro-btn mt-6 w-full" onClick={onSkip}>
          Skip
        </button>
      </div>
    </div>
  );
}
