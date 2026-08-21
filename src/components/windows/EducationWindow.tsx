import {
  awards,
  certifications,
  education,
} from '../../data/portfolio';

export function EducationWindow() {
  return (
    <div className="space-y-4 font-body text-base leading-relaxed">
      {education.map((item) => (
        <section key={item.id} className="pixel-border-inset bg-[var(--window-inset)] p-3">
          <h3 className="font-display text-base">{item.degree}</h3>
          <p>{item.university}</p>
          <p className="text-sm text-[var(--muted-text)]">{item.years}</p>
          <p className="mt-2">Relevant subjects: {item.subjects.join(', ')}</p>
        </section>
      ))}

      <section>
        <h3 className="font-display text-base">Certifications</h3>
        <ul className="mt-2 space-y-2">
          {certifications.map((item) => (
            <li key={item.id} className="pixel-border-inset p-2 text-sm">
              {item.name} · {item.issuer} · {item.year}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-display text-base">Awards</h3>
        <ul className="mt-2 space-y-2">
          {awards.map((item) => (
            <li key={item.id} className="pixel-border-inset p-2 text-sm">
              {item.name} ({item.year}) — {item.description}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
