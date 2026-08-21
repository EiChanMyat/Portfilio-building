import { projectStatusLabels, type Project, type ProjectThumbnail } from '../../data/portfolio';

const scenes: Record<ProjectThumbnail, { bg: string; label: string }> = {
  network: { bg: '#b8a1d9', label: 'Network lab thumbnail' },
  dashboard: { bg: '#ffc8a2', label: 'Dashboard thumbnail' },
  tasks: { bg: '#ffafcc', label: 'Task manager thumbnail' },
  desktop: { bg: '#cdb4db', label: 'Portfolio desktop thumbnail' },
};

export function ProjectCard({
  project,
  selected,
  onSelect,
}: {
  project: Project;
  selected: boolean;
  onSelect: () => void;
}) {
  const scene = scenes[project.thumbnail];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected}
      className={`flex w-full items-center gap-2 border-2 px-2 py-2 text-left ${
        selected
          ? 'border-[var(--dark-outline)] bg-[var(--window-yellow)]'
          : 'border-transparent bg-transparent hover:bg-[var(--window-inset)]'
      }`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center border-2 border-[var(--dark-outline)]" style={{ background: scene.bg }} aria-hidden="true">
        <span className="h-3 w-4 bg-[var(--white-highlight)]" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-sm">{project.name}</span>
        <span className="block truncate font-body text-xs text-[var(--muted-text)]">
          {projectStatusLabels[project.status]}
        </span>
      </span>
    </button>
  );
}

export function ProjectThumbnail({ type, name }: { type: ProjectThumbnail; name: string }) {
  return (
    <div
      className="pixel-border relative h-28 overflow-hidden"
      role="img"
      aria-label={`${name} pixel preview`}
    >
      {type === 'network' && <NetworkArt />}
      {type === 'dashboard' && <DashboardArt />}
      {type === 'tasks' && <TasksArt />}
      {type === 'desktop' && <DesktopArt />}
    </div>
  );
}

function NetworkArt() {
  return (
    <div className="flex h-full items-end justify-around bg-[#b8a1d9] px-3 pb-2" aria-hidden="true">
      <span className="h-10 w-8 bg-[#ffe69a] shadow-[2px_2px_0_#46364a]" />
      <span className="h-16 w-10 bg-[#ffafcc] shadow-[2px_2px_0_#46364a]" />
      <span className="h-12 w-8 bg-[#fff3c4] shadow-[2px_2px_0_#46364a]" />
    </div>
  );
}

function DashboardArt() {
  return (
    <div className="grid h-full grid-cols-3 gap-1 bg-[#ffc8a2] p-2" aria-hidden="true">
      <span className="bg-[#78b87a]" />
      <span className="bg-[#f6a23c]" />
      <span className="bg-[#ffafcc]" />
      <span className="col-span-3 bg-[#fffdf3]" />
    </div>
  );
}

function TasksArt() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 bg-[#ffafcc] p-3" aria-hidden="true">
      <span className="h-3 bg-[#fffdf3]" />
      <span className="h-3 w-4/5 bg-[#ffe69a]" />
      <span className="h-3 w-2/3 bg-[#fff3c4]" />
    </div>
  );
}

function DesktopArt() {
  return (
    <div className="relative h-full bg-[#cdb4db]" aria-hidden="true">
      <span className="absolute bottom-0 left-0 right-0 h-8 bg-[#ffc8a2]" />
      <span className="absolute left-1/2 top-4 h-10 w-16 -translate-x-1/2 bg-[#ffe69a] shadow-[2px_2px_0_#46364a]" />
    </div>
  );
}
