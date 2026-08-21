import { useDesktop } from '../../hooks/useDesktop';

export function Wallpaper() {
  const { theme } = useDesktop();
  const isNight = theme === 'night';

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: isNight
            ? 'linear-gradient(to bottom, var(--desktop-sky) 0%, #2a1844 38%, var(--sunset-pink) 68%, var(--peach) 88%, var(--warm-cream) 100%)'
            : 'linear-gradient(to bottom, var(--desktop-sky) 0%, #d9b4d4 28%, var(--sunset-pink) 52%, var(--peach) 74%, var(--warm-cream) 100%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-25 mix-blend-multiply"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0 3px, color-mix(in srgb, var(--dark-outline) 10%, transparent) 3px 4px)',
        }}
      />
      {isNight ? <PixelMoon /> : <PixelSun />}
      <Cloud className="left-[7%] top-[10%]" scale={1} />
      <Cloud className="right-[10%] top-[16%]" scale={0.85} />
      <Cloud className="left-[38%] top-[8%] hidden sm:block" scale={0.7} />
      {isNight ? <NightStars /> : (
        <>
          <SunsetStars />
          <DayBirds />
        </>
      )}
      <Cityscape />
    </div>
  );
}

function PixelSun() {
  return (
    <svg
      className="pixel-art absolute left-1/2 top-[22%] h-20 w-20 -translate-x-1/2 sm:h-28 sm:w-28"
      viewBox="0 0 48 48"
      shapeRendering="crispEdges"
    >
      <rect x="22" y="2" width="4" height="6" fill="var(--sun)" opacity="0.85" />
      <rect x="22" y="40" width="4" height="6" fill="var(--sun)" opacity="0.85" />
      <rect x="2" y="22" width="6" height="4" fill="var(--sun)" opacity="0.85" />
      <rect x="40" y="22" width="6" height="4" fill="var(--sun)" opacity="0.85" />
      <rect x="8" y="8" width="4" height="4" fill="var(--sun)" opacity="0.7" />
      <rect x="36" y="8" width="4" height="4" fill="var(--sun)" opacity="0.7" />
      <rect x="8" y="36" width="4" height="4" fill="var(--sun)" opacity="0.7" />
      <rect x="36" y="36" width="4" height="4" fill="var(--sun)" opacity="0.7" />
      <rect x="14" y="10" width="20" height="28" fill="var(--sun)" />
      <rect x="10" y="14" width="28" height="20" fill="var(--sun)" />
      <rect x="18" y="8" width="12" height="32" fill="#fff3c4" />
      <rect x="12" y="16" width="24" height="16" fill="#fff3c4" />
    </svg>
  );
}

function PixelMoon() {
  return (
    <svg
      className="pixel-art absolute left-1/2 top-[22%] h-20 w-20 -translate-x-1/2 sm:h-28 sm:w-28"
      viewBox="0 0 48 48"
      shapeRendering="crispEdges"
    >
      <rect x="16" y="8" width="20" height="32" fill="#e6c56a" />
      <rect x="12" y="12" width="28" height="24" fill="#e6c56a" />
      <rect x="14" y="10" width="24" height="28" fill="#ffe69a" />
      <rect x="20" y="8" width="8" height="4" fill="#fff3c4" />
      <rect x="26" y="10" width="12" height="28" fill="#241536" />
      <rect x="22" y="12" width="18" height="24" fill="#241536" />
      <rect x="24" y="14" width="6" height="4" fill="#3a2848" />
      <rect x="16" y="18" width="4" height="4" fill="#d4b85a" />
      <rect x="14" y="26" width="3" height="3" fill="#d4b85a" />
    </svg>
  );
}

function Cloud({ className, scale }: { className: string; scale: number }) {
  return (
    <svg
      className={`pixel-art absolute opacity-80 ${className}`}
      style={{ transform: `scale(${scale})` }}
      width="92"
      height="40"
      viewBox="0 0 92 40"
      shapeRendering="crispEdges"
    >
      <rect x="24" y="8" width="28" height="8" fill="var(--cloud)" />
      <rect x="16" y="16" width="52" height="8" fill="var(--cloud)" />
      <rect x="8" y="24" width="72" height="8" fill="var(--cloud)" />
      <rect x="36" y="4" width="16" height="8" fill="var(--cloud)" />
      <rect x="20" y="20" width="8" height="4" fill="#ffe6f0" opacity="0.45" />
    </svg>
  );
}

function SunsetStars() {
  return (
    <>
      <Star left="14%" top="7%" size="sm" />
      <Star left="22%" top="13%" size="sm" />
      <Star left="82%" top="9%" size="sm" />
      <Star left="72%" top="15%" size="sm" />
      <Star left="62%" top="6%" size="sm" />
    </>
  );
}

function DayBirds() {
  return (
    <>
      <BirdFlock className="left-[18%] top-[18%]" />
      <BirdFlock className="left-[58%] top-[14%]" />
      <BirdFlock className="right-[16%] top-[22%] hidden sm:block" />
    </>
  );
}

function BirdFlock({ className }: { className: string }) {
  return (
    <svg
      className={`pixel-art day-birds absolute h-6 w-16 opacity-55 ${className}`}
      viewBox="0 0 64 24"
      shapeRendering="crispEdges"
    >
      <Bird x={4} y={8} />
      <Bird x={22} y={4} />
      <Bird x={38} y={10} />
      <Bird x={50} y={6} />
    </svg>
  );
}

function Bird({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="2" height="2" fill="#5c4c63" />
      <rect x={x + 6} y={y} width="2" height="2" fill="#5c4c63" />
      <rect x={x + 2} y={y + 2} width="4" height="2" fill="#5c4c63" />
    </g>
  );
}

const NIGHT_STARS: { left: string; top: string; size: 'sm' | 'md' | 'lg'; delay?: string }[] = [
  { left: '4%', top: '6%', size: 'sm' },
  { left: '9%', top: '13%', size: 'md', delay: '0.4s' },
  { left: '13%', top: '4%', size: 'sm' },
  { left: '17%', top: '19%', size: 'lg', delay: '1.1s' },
  { left: '22%', top: '8%', size: 'sm' },
  { left: '26%', top: '15%', size: 'md', delay: '0.7s' },
  { left: '31%', top: '3%', size: 'sm' },
  { left: '35%', top: '11%', size: 'md' },
  { left: '40%', top: '6%', size: 'sm', delay: '1.6s' },
  { left: '45%', top: '17%', size: 'lg' },
  { left: '50%', top: '4%', size: 'sm' },
  { left: '55%', top: '12%', size: 'md', delay: '0.3s' },
  { left: '60%', top: '7%', size: 'sm' },
  { left: '65%', top: '16%', size: 'md', delay: '1.3s' },
  { left: '70%', top: '5%', size: 'lg' },
  { left: '75%', top: '11%', size: 'sm', delay: '0.9s' },
  { left: '80%', top: '8%', size: 'md' },
  { left: '85%', top: '14%', size: 'sm', delay: '1.7s' },
  { left: '90%', top: '6%', size: 'md' },
  { left: '94%', top: '12%', size: 'sm' },
  { left: '6%', top: '23%', size: 'sm' },
  { left: '12%', top: '27%', size: 'md', delay: '1.8s' },
  { left: '19%', top: '24%', size: 'sm' },
  { left: '28%', top: '22%', size: 'md' },
  { left: '37%', top: '26%', size: 'sm', delay: '0.6s' },
  { left: '48%', top: '21%', size: 'md' },
  { left: '57%', top: '25%', size: 'sm', delay: '0.5s' },
  { left: '66%', top: '23%', size: 'lg', delay: '1.4s' },
  { left: '74%', top: '27%', size: 'sm' },
  { left: '83%', top: '21%', size: 'md' },
  { left: '91%', top: '26%', size: 'sm', delay: '1.0s' },
  { left: '8%', top: '33%', size: 'sm' },
  { left: '21%', top: '31%', size: 'md', delay: '0.8s' },
  { left: '33%', top: '34%', size: 'sm' },
  { left: '52%', top: '32%', size: 'sm' },
  { left: '63%', top: '30%', size: 'md', delay: '1.2s' },
  { left: '77%', top: '33%', size: 'sm' },
  { left: '88%', top: '31%', size: 'md' },
];

function NightStars() {
  return (
    <>
      {NIGHT_STARS.map((star) => (
        <Star
          key={`${star.left}-${star.top}`}
          left={star.left}
          top={star.top}
          size={star.size}
          delay={star.delay}
          twinkle
        />
      ))}
    </>
  );
}

function Star({
  left,
  top,
  size = 'sm',
  delay,
  twinkle = false,
}: {
  left: string;
  top: string;
  size?: 'sm' | 'md' | 'lg';
  delay?: string;
  twinkle?: boolean;
}) {
  const dim = size === 'lg' ? 'h-1.5 w-1.5' : size === 'md' ? 'h-1 w-1' : 'h-px w-px min-h-px min-w-px';
  return (
    <span
      className={`absolute bg-[var(--star)] ${dim} ${twinkle ? 'night-star' : 'opacity-70'}`}
      style={{ left, top, animationDelay: delay }}
    />
  );
}

function Cityscape() {
  return (
    <div className="absolute bottom-14 left-0 right-0 h-80 sm:h-96">
      <div className="absolute bottom-0 left-0 right-0 flex h-24 items-end opacity-80">
        {FAR.map((h, i) => (
          <span key={`f-${i}`} className="flex-1" style={{ height: `${h}%`, background: 'var(--city-far)' }} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-32 items-end">
        {MID.map((h, i) => (
          <span key={`m-${i}`} className="relative flex-1" style={{ height: `${h}%`, background: 'var(--city-mid)' }}>
            {i % 3 === 0 && (
              <span className="absolute right-1 top-0 h-2 w-px bg-[var(--city)]" />
            )}
          </span>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-36 items-end sm:h-40">
        {NEAR.map((building, i) => (
          <span
            key={`n-${i}`}
            className="relative flex-1"
            style={{ height: `${building}%`, background: 'var(--city)' }}
          >
            <span className="absolute left-1/3 top-2 h-1.5 w-1.5 bg-[#ffe69a] opacity-70" />
            <span className="absolute right-1/4 top-6 h-1.5 w-1.5 bg-[#ffafcc] opacity-50" />
            {i % 4 === 1 && <span className="absolute left-1/2 top-0 h-3 w-1 -translate-x-1/2 bg-[var(--city-mid)]" />}
            {i % 5 === 2 && <span className="absolute right-1 top-0 h-2 w-2 bg-[var(--city-far)]" />}
          </span>
        ))}
      </div>
      <EiffelTower />
    </div>
  );
}

function EiffelTower() {
  const iron = 'var(--city)';
  const beam = 'var(--city-mid)';
  const lamp = '#ffe69a';

  return (
    <svg
      className="pixel-art pointer-events-none absolute right-1 bottom-0 z-[1] h-[19rem] w-28 sm:right-4 sm:h-[22rem] sm:w-36"
      viewBox="0 0 80 200"
      shapeRendering="crispEdges"
    >
      <rect x="39" y="0" width="2" height="14" fill={iron} />
      <rect x="37" y="12" width="6" height="2" fill={beam} />
      <rect x="36" y="14" width="8" height="10" fill={iron} />
      <rect x="38" y="16" width="4" height="4" fill={lamp} />
      <rect x="34" y="24" width="4" height="28" fill={iron} />
      <rect x="42" y="24" width="4" height="28" fill={iron} />
      <rect x="38" y="30" width="4" height="2" fill={beam} />
      <rect x="38" y="38" width="4" height="2" fill={beam} />
      <rect x="30" y="52" width="20" height="4" fill={beam} />
      <rect x="32" y="51" width="16" height="2" fill={iron} />
      <rect x="34" y="54" width="2" height="2" fill={lamp} />
      <rect x="44" y="54" width="2" height="2" fill={lamp} />
      <rect x="30" y="56" width="5" height="22" fill={iron} />
      <rect x="45" y="56" width="5" height="22" fill={iron} />
      <rect x="35" y="62" width="10" height="2" fill={beam} />
      <rect x="36" y="70" width="8" height="2" fill={beam} />
      <rect x="24" y="78" width="32" height="5" fill={beam} />
      <rect x="26" y="77" width="28" height="2" fill={iron} />
      <rect x="28" y="80" width="2" height="2" fill={lamp} />
      <rect x="50" y="80" width="2" height="2" fill={lamp} />
      <rect x="22" y="83" width="6" height="20" fill={iron} />
      <rect x="52" y="83" width="6" height="20" fill={iron} />
      <rect x="30" y="90" width="20" height="2" fill={beam} />
      <rect x="32" y="96" width="16" height="2" fill={beam} />
      <rect x="18" y="103" width="7" height="22" fill={iron} />
      <rect x="55" y="103" width="7" height="22" fill={iron} />
      <rect x="28" y="108" width="24" height="2" fill={beam} />
      <rect x="30" y="116" width="20" height="2" fill={beam} />
      <rect x="10" y="125" width="60" height="6" fill={beam} />
      <rect x="12" y="124" width="56" height="2" fill={iron} />
      <rect x="16" y="127" width="2" height="2" fill={lamp} />
      <rect x="38" y="127" width="4" height="2" fill={lamp} />
      <rect x="62" y="127" width="2" height="2" fill={lamp} />
      <rect x="10" y="131" width="8" height="18" fill={iron} />
      <rect x="62" y="131" width="8" height="18" fill={iron} />
      <rect x="22" y="140" width="36" height="2" fill={beam} />
      <rect x="6" y="149" width="9" height="24" fill={iron} />
      <rect x="65" y="149" width="9" height="24" fill={iron} />
      <rect x="20" y="156" width="40" height="2" fill={beam} />
      <rect x="2" y="173" width="11" height="27" fill={iron} />
      <rect x="67" y="173" width="11" height="27" fill={iron} />
      <rect x="18" y="180" width="44" height="2" fill={beam} />
      <rect x="0" y="198" width="14" height="2" fill={iron} />
      <rect x="66" y="198" width="14" height="2" fill={iron} />
    </svg>
  );
}

const FAR = [30, 42, 28, 50, 36, 44, 32, 48, 26, 40, 34, 46];
const MID = [45, 62, 50, 70, 48, 78, 42, 66, 54, 72, 46, 60, 52];
const NEAR = [55, 78, 62, 88, 58, 92, 50, 80, 64, 70, 48, 52, 44, 40];
