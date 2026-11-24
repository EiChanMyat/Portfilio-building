import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  label?: string;
};

function PixelSvg({ size = 32, label, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : 'presentation'}
      className="pixel-art"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconAbout({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFC8A2" />
      <rect x="2" y="2" width="28" height="28" fill="none" stroke="#46364A" strokeWidth="2" />
      <rect x="10" y="6" width="12" height="10" fill="#F4C7A8" stroke="#46364A" strokeWidth="2" />
      <rect x="12" y="8" width="2" height="2" fill="#33283A" />
      <rect x="18" y="8" width="2" height="2" fill="#33283A" />
      <rect x="8" y="16" width="16" height="10" fill="#B8A1D9" stroke="#46364A" strokeWidth="2" />
      <rect x="14" y="12" width="4" height="2" fill="#FFAFCC" />
    </PixelSvg>
  );
}

export function IconProjects({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#CDB4DB" />
      <rect x="4" y="10" width="24" height="16" fill="#FFE69A" stroke="#46364A" strokeWidth="2" />
      <rect x="4" y="7" width="11" height="5" fill="#FFC8A2" stroke="#46364A" strokeWidth="2" />
      <rect x="8" y="14" width="6" height="2" fill="#F6A23C" />
      <rect x="16" y="18" width="8" height="2" fill="#FFAFCC" />
    </PixelSvg>
  );
}

export function IconSkills({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFF3C4" />
      <rect x="6" y="8" width="20" height="14" fill="#33283A" stroke="#46364A" strokeWidth="2" />
      <rect x="8" y="10" width="16" height="8" fill="#78B87A" />
      <rect x="10" y="12" width="2" height="2" fill="#FFFDF3" />
      <rect x="14" y="12" width="8" height="2" fill="#FFE69A" />
      <rect x="12" y="22" width="8" height="3" fill="#46364A" />
    </PixelSvg>
  );
}

export function IconExperience({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFC8A2" />
      <rect x="7" y="12" width="18" height="14" fill="#B8A1D9" stroke="#46364A" strokeWidth="2" />
      <rect x="12" y="8" width="8" height="6" fill="#FFAFCC" stroke="#46364A" strokeWidth="2" />
      <rect x="10" y="16" width="12" height="2" fill="#FFE69A" />
    </PixelSvg>
  );
}

export function IconEducation({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#CDB4DB" />
      <rect x="6" y="14" width="20" height="6" fill="#FFE69A" stroke="#46364A" strokeWidth="2" />
      <rect x="10" y="8" width="12" height="8" fill="#FFAFCC" stroke="#46364A" strokeWidth="2" />
      <rect x="14" y="20" width="4" height="6" fill="#46364A" />
    </PixelSvg>
  );
}

export function IconResume({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#CDB4DB" />
      <rect x="8" y="4" width="16" height="24" fill="#FFFDF3" stroke="#46364A" strokeWidth="2" />
      <rect x="16" y="4" width="8" height="6" fill="#FFE69A" stroke="#46364A" strokeWidth="2" />
      <rect x="11" y="13" width="10" height="2" fill="#46364A" />
      <rect x="11" y="17" width="8" height="2" fill="#B8A1D9" />
      <rect x="11" y="21" width="6" height="2" fill="#FFAFCC" />
    </PixelSvg>
  );
}

export function IconVolunteer({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFAFCC" />
      <rect x="6" y="8" width="20" height="16" fill="#FFFDF3" stroke="#46364A" strokeWidth="2" />
      <rect x="14" y="11" width="4" height="10" fill="#D95D5D" />
      <rect x="11" y="14" width="10" height="4" fill="#D95D5D" />
      <rect x="8" y="20" width="4" height="2" fill="#78B87A" />
      <rect x="20" y="20" width="4" height="2" fill="#78B87A" />
    </PixelSvg>
  );
}

export function IconContact({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFAFCC" />
      <rect x="5" y="9" width="22" height="14" fill="#FFFDF3" stroke="#46364A" strokeWidth="2" />
      <rect x="5" y="9" width="22" height="2" fill="#46364A" />
      <rect x="7" y="12" width="8" height="2" fill="#B8A1D9" />
      <rect x="7" y="16" width="14" height="2" fill="#FFC8A2" />
    </PixelSvg>
  );
}

export function IconGithub({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFF3C4" />
      <rect x="8" y="8" width="16" height="14" fill="#46364A" />
      <rect x="10" y="12" width="3" height="3" fill="#FFE69A" />
      <rect x="19" y="12" width="3" height="3" fill="#FFE69A" />
      <rect x="13" y="18" width="6" height="2" fill="#FFAFCC" />
      <rect x="6" y="14" width="3" height="6" fill="#46364A" />
      <rect x="23" y="14" width="3" height="6" fill="#46364A" />
    </PixelSvg>
  );
}

export function IconLinkedIn({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#B8A1D9" />
      <rect x="6" y="6" width="20" height="20" fill="#FFE69A" stroke="#46364A" strokeWidth="2" />
      <rect x="10" y="10" width="4" height="12" fill="#46364A" />
      <rect x="16" y="14" width="6" height="8" fill="#46364A" />
      <rect x="10" y="10" width="4" height="3" fill="#FFAFCC" />
    </PixelSvg>
  );
}

export function IconHome({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFC8A2" />
      <rect x="6" y="14" width="20" height="12" fill="#FFE69A" stroke="#46364A" strokeWidth="2" />
      <rect x="8" y="8" width="16" height="8" fill="#FFAFCC" stroke="#46364A" strokeWidth="2" />
      <rect x="14" y="18" width="4" height="8" fill="#46364A" />
    </PixelSvg>
  );
}

export function IconTerminal({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#33283A" />
      <rect x="4" y="6" width="24" height="20" fill="#3d2a48" stroke="#FFE69A" strokeWidth="2" />
      <rect x="8" y="12" width="2" height="6" fill="#78B87A" />
      <rect x="12" y="16" width="10" height="2" fill="#78B87A" />
    </PixelSvg>
  );
}

export function IconTheme({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#CDB4DB" />
      <rect x="6" y="8" width="12" height="16" fill="#FFE69A" stroke="#46364A" strokeWidth="2" />
      <rect x="14" y="8" width="12" height="16" fill="#46364A" stroke="#46364A" strokeWidth="2" />
      <rect x="18" y="12" width="4" height="4" fill="#FFE69A" />
    </PixelSvg>
  );
}

export function IconRestart({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFAFCC" />
      <rect x="8" y="8" width="16" height="16" fill="none" stroke="#46364A" strokeWidth="3" />
      <rect x="20" y="6" width="6" height="6" fill="#F6A23C" stroke="#46364A" strokeWidth="2" />
    </PixelSvg>
  );
}

export function IconClear({ size = 16, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFE69A" />
      <rect x="10" y="5" width="16" height="12" fill="#CDB4DB" stroke="#46364A" strokeWidth="2" />
      <rect x="10" y="5" width="16" height="4" fill="#B8A1D9" />
      <rect x="4" y="12" width="16" height="13" fill="#FFFDF3" stroke="#46364A" strokeWidth="2" />
      <rect x="4" y="12" width="16" height="4" fill="#FFAFCC" />
      <rect x="21" y="18" width="3" height="3" fill="#D95D5D" />
      <rect x="24" y="21" width="3" height="3" fill="#D95D5D" />
      <rect x="27" y="24" width="3" height="3" fill="#D95D5D" />
      <rect x="27" y="18" width="3" height="3" fill="#D95D5D" />
      <rect x="21" y="24" width="3" height="3" fill="#D95D5D" />
    </PixelSvg>
  );
}

export function IconStart({ size = 20, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#F6A23C" />
      <rect x="8" y="14" width="16" height="10" fill="#FFAFCC" stroke="#46364A" strokeWidth="2" />
      <rect x="12" y="8" width="8" height="8" fill="#FFE69A" stroke="#46364A" strokeWidth="2" />
      <rect x="14" y="10" width="2" height="2" fill="#46364A" />
      <rect x="18" y="10" width="2" height="2" fill="#46364A" />
    </PixelSvg>
  );
}

export function IconSound({ size = 18, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFF3C4" />
      <rect x="6" y="12" width="6" height="8" fill="#46364A" />
      <rect x="12" y="8" width="4" height="16" fill="#46364A" />
      <rect x="18" y="10" width="2" height="12" fill="#F6A23C" />
      <rect x="22" y="8" width="2" height="16" fill="#F6A23C" />
    </PixelSvg>
  );
}

export function IconIdCard({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFF8E8" />
      <rect x="4" y="6" width="24" height="20" fill="#FFFDF3" stroke="#46364A" strokeWidth="2" />
      <rect x="8" y="10" width="10" height="3" fill="#46364A" />
      <rect x="8" y="15" width="16" height="2" fill="#B8A1D9" />
      <rect x="8" y="19" width="8" height="2" fill="#78B87A" />
    </PixelSvg>
  );
}

export function IconEdit({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFE69A" />
      <rect x="6" y="22" width="12" height="4" fill="#FFC8A2" stroke="#46364A" strokeWidth="2" />
      <rect x="10" y="16" width="10" height="8" fill="#F6A23C" stroke="#46364A" strokeWidth="2" />
      <rect x="16" y="8" width="8" height="10" fill="#F6A23C" stroke="#46364A" strokeWidth="2" />
      <rect x="22" y="6" width="5" height="5" fill="#FFAFCC" stroke="#46364A" strokeWidth="2" />
    </PixelSvg>
  );
}

export function IconCopy({ size = 14, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFE69A" />
      <rect x="10" y="6" width="16" height="16" fill="#FFFDF3" stroke="#46364A" strokeWidth="2" />
      <rect x="6" y="10" width="16" height="16" fill="#FFC8A2" stroke="#46364A" strokeWidth="2" />
    </PixelSvg>
  );
}

export function IconMuted({ size = 18, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#FFF3C4" />
      <rect x="6" y="12" width="6" height="8" fill="#46364A" />
      <rect x="12" y="8" width="4" height="16" fill="#46364A" />
      <rect x="20" y="10" width="8" height="2" fill="#D95D5D" />
      <rect x="23" y="7" width="2" height="18" fill="#D95D5D" />
    </PixelSvg>
  );
}

export function IconSnake({ size, label }: IconProps) {
  return (
    <PixelSvg size={size} label={label}>
      <rect width="32" height="32" fill="#CDEAC0" />
      <rect x="6" y="20" width="4" height="4" fill="#78B87A" stroke="#46364A" strokeWidth="1" />
      <rect x="10" y="20" width="4" height="4" fill="#78B87A" stroke="#46364A" strokeWidth="1" />
      <rect x="14" y="20" width="4" height="4" fill="#78B87A" stroke="#46364A" strokeWidth="1" />
      <rect x="14" y="16" width="4" height="4" fill="#78B87A" stroke="#46364A" strokeWidth="1" />
      <rect x="14" y="12" width="4" height="4" fill="#78B87A" stroke="#46364A" strokeWidth="1" />
      <rect x="15" y="13" width="1" height="1" fill="#33283A" />
      <rect x="17" y="13" width="1" height="1" fill="#33283A" />
      <rect x="22" y="13" width="6" height="5" fill="#E5536B" stroke="#46364A" strokeWidth="1" />
      <rect x="24" y="11" width="2" height="2" fill="#46364A" />
      <rect x="26" y="9" width="3" height="2" fill="#78B87A" />
    </PixelSvg>
  );
}
