import { skillLevelLabels, type Skill, type SkillLevel } from '../../data/portfolio';

const LEVEL_DOTS: Record<SkillLevel, number> = {
  learning: 1,
  working: 2,
  comfortable: 3,
};

export function SkillBadge({ skill }: { skill: Skill }) {
  const filled = LEVEL_DOTS[skill.level];

  return (
    <li className="pixel-border-inset flex items-center justify-between gap-3 bg-[var(--window-inset)] px-2 py-2">
      <div>
        <p className="font-display text-sm">{skill.name}</p>
        <p className="font-body text-xs text-[var(--muted-text)]">{skillLevelLabels[skill.level]}</p>
      </div>
      <div className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((dot) => (
          <span
            key={dot}
            className="h-3 w-3 border-2 border-[var(--dark-outline)]"
            style={{
              background: dot <= filled ? 'var(--accent-orange)' : 'var(--window-bg)',
            }}
          />
        ))}
      </div>
    </li>
  );
}
