import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  isUsableHttpUrl,
  projectStatusLabels,
  type ProjectFilter,
} from '../../data/portfolio';
import { usePortfolio } from '../../hooks/usePortfolio';
import { ProjectCard, ProjectThumbnail } from './ProjectCard';

const FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'vision', label: 'Computer Vision' },
];

export function ProjectExplorer() {
  const { projects } = usePortfolio();
  const [filter, setFilter] = useState<ProjectFilter>('all');
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? '');
  const reduced = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((project) => project.tags.includes(filter)),
    [filter, projects],
  );

  const selected = visible.find((project) => project.id === selectedId) ?? visible[0];

  if (!selected) {
    return <p className="font-body">No projects in this filter yet.</p>;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`retro-btn min-h-10 px-3 py-1 text-sm ${filter === item.id ? 'retro-btn-primary' : ''}`}
            onClick={() => {
              setFilter(item.id);
              const next = item.id === 'all' ? projects[0] : projects.find((p) => p.tags.includes(item.id));
              if (next) setSelectedId(next.id);
            }}
            aria-pressed={filter === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-[230px_1fr] md:items-start">
        <div className="pixel-border-inset max-h-56 overflow-auto bg-[var(--window-inset)] md:max-h-[28rem]">
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              selected={project.id === selected.id}
              onSelect={() => setSelectedId(project.id)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={selected.id}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 4 }}
            transition={{ duration: reduced ? 0 : 0.16 }}
            className="space-y-3 font-body text-base leading-relaxed"
          >
            <ProjectThumbnail type={selected.thumbnail} name={selected.name} />
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg">{selected.name}</h3>
              <span
                className="border-2 border-[var(--dark-outline)] px-2 py-0.5 font-display text-xs"
                style={{
                  background:
                    selected.status === 'completed'
                      ? 'var(--success-green)'
                      : selected.status === 'in-progress'
                        ? 'var(--accent-orange)'
                        : 'var(--soft-lavender)',
                }}
              >
                {projectStatusLabels[selected.status]}
              </span>
            </div>
            <p>{selected.summary}</p>
            <section>
              <h4 className="font-display text-sm">Problem solved</h4>
              <p>{selected.problem}</p>
            </section>
            <section>
              <h4 className="font-display text-sm">Main features</h4>
              <ul className="list-disc pl-5">
                {selected.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4 className="font-display text-sm">My contribution</h4>
              <p>{selected.contribution}</p>
            </section>
            <section>
              <h4 className="font-display text-sm">Technical challenge</h4>
              <p>{selected.challenge}</p>
            </section>
            <ul className="flex flex-wrap gap-1">
              {selected.technologies.map((tech) => (
                <li key={tech} className="border-2 border-[var(--dark-outline)] bg-[var(--peach)] px-2 py-0.5 font-display text-xs">
                  {tech}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <ProjectLink href={selected.github} label="GitHub" />
              <ProjectLink href={selected.live} label="Live Demo" />
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  const usable = isUsableHttpUrl(href);
  if (!usable) {
    return (
      <button type="button" className="retro-btn" disabled title="Coming soon">
        {label}: Coming soon
      </button>
    );
  }
  return (
    <a className="retro-btn inline-flex items-center justify-center no-underline" href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

export function ProjectsWindow() {
  return <ProjectExplorer />;
}
