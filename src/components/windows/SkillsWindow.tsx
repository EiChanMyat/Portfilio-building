import { useMemo, useState } from 'react';
import { skillCategories, type SkillCategory } from '../../data/portfolio';
import { usePortfolio } from '../../hooks/usePortfolio';
import { SkillBadge } from '../ui/SkillBadge';

type Filter = 'all' | SkillCategory;

export function SkillsWindow() {
  const { skills } = usePortfolio();
  const [filter, setFilter] = useState<Filter>('all');

  const visible = useMemo(
    () => (filter === 'all' ? skills : skills.filter((skill) => skill.category === filter)),
    [filter, skills],
  );

  const groups = filter === 'all' ? skillCategories : skillCategories.filter((item) => item.id === filter);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={`retro-btn min-h-10 px-3 py-1 text-sm ${filter === 'all' ? 'retro-btn-primary' : ''}`}
          onClick={() => setFilter('all')}
          aria-pressed={filter === 'all'}
        >
          All
        </button>
        {skillCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`retro-btn min-h-10 px-3 py-1 text-sm ${filter === category.id ? 'retro-btn-primary' : ''}`}
            onClick={() => setFilter(category.id)}
            aria-pressed={filter === category.id}
          >
            {category.label}
          </button>
        ))}
      </div>

      {groups.map((group) => {
        const items = visible.filter((skill) => skill.category === group.id);
        if (items.length === 0) return null;
        return (
          <section key={group.id}>
            <h3 className="font-display text-sm">{group.label}</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {items.map((skill, index) => (
                <SkillBadge key={`${skill.category}-${skill.name}-${index}`} skill={skill} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
