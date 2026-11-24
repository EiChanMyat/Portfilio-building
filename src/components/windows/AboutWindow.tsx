import { usePortfolio } from '../../hooks/usePortfolio';

export function AboutWindow() {
  const { personalInfo } = usePortfolio();

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_210px]">
      <div className="space-y-4 font-body text-base leading-relaxed">
        <section>
          <h3 className="font-display text-base">Biography</h3>
          <p className="mt-1">{personalInfo.bio}</p>
        </section>
        <section>
          <h3 className="font-display text-base">Current focus</h3>
          <p className="mt-1">{personalInfo.currentFocus}</p>
        </section>
        <section>
          <h3 className="font-display text-base">Career objective</h3>
          <p className="mt-1">{personalInfo.careerObjective}</p>
        </section>
        <section>
          <h3 className="font-display text-base">Location & work preference</h3>
          <p className="mt-1">
            {personalInfo.location} · {personalInfo.workPreference}
          </p>
        </section>
        <section>
          <h3 className="font-display text-base">Interests</h3>
          <ul className="mt-1 list-disc pl-5">
            {personalInfo.interests.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="pixel-border h-fit bg-[var(--window-yellow)] p-3">
        <h3 className="font-display text-sm">Developer stats</h3>
        <dl className="mt-3 space-y-3 font-body text-sm">
          <div>
            <dt className="text-[var(--muted-text)]">Projects completed</dt>
            <dd className="font-display text-lg">{personalInfo.stats.projectsCompleted}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted-text)]">Technologies used</dt>
            <dd className="font-display text-lg">{personalInfo.stats.technologiesUsed}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted-text)]">Years learning/building</dt>
            <dd className="font-display text-lg">{personalInfo.stats.yearsBuilding}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted-text)]">Availability</dt>
            <dd>{personalInfo.stats.availability}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
