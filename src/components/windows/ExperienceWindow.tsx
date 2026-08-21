import { experience, experienceLabels } from '../../data/portfolio';

export function ExperienceWindow() {
  return (
    <ol className="relative space-y-5 border-l-4 border-[var(--dark-outline)] pl-4">
      {experience.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute -left-[1.4rem] top-1 h-3 w-3 border-2 border-[var(--dark-outline)] bg-[var(--accent-orange)]" />
          <p className="font-display text-xs text-[var(--muted-text)]">
            {experienceLabels[item.category]}
          </p>
          <h3 className="font-display text-base">{item.position}</h3>
          <p className="font-body text-base">
            {item.organization} · {item.location}
          </p>
          <p className="font-body text-sm text-[var(--muted-text)]">{item.dateRange}</p>
          <ul className="mt-2 list-disc pl-5 font-body text-base leading-relaxed">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="mt-2 font-body text-sm text-[var(--muted-text)]">
            {item.technologies.join(' · ')}
          </p>
        </li>
      ))}
    </ol>
  );
}
