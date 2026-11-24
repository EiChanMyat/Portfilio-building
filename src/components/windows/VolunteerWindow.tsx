import { usePortfolio } from '../../hooks/usePortfolio';

export function VolunteerWindow() {
  const { volunteer } = usePortfolio();

  if (volunteer.length === 0) {
    return <p className="font-body text-base">No volunteer entries yet. Add one from Edit.</p>;
  }

  return (
    <ol className="relative space-y-5 border-l-4 border-[var(--dark-outline)] pl-4">
      {volunteer.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute -left-[1.4rem] top-1 h-3 w-3 border-2 border-[var(--dark-outline)] bg-[var(--sunset-pink)]" />
          <p className="font-display text-xs text-[var(--muted-text)]">Volunteer</p>
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
          {item.technologies.length > 0 && (
            <p className="mt-2 font-body text-sm text-[var(--muted-text)]">
              {item.technologies.join(' · ')}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
