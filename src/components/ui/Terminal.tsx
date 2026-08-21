import { useMemo, useState, type FormEvent, type KeyboardEvent } from 'react';
import { personalInfo } from '../../data/portfolio';
import { useDesktop } from '../../hooks/useDesktop';
import type { WindowId } from '../../types/windows';

const HELP = [
  'help       list commands',
  'about      open about_me.txt',
  'projects   open project_explorer',
  'skills     open skills_manager.exe',
  'contact    open send_message.exe',
  'clear      clear the screen',
];

export function Terminal() {
  const { openWindow } = useDesktop();
  const [lines, setLines] = useState<string[]>([
    `${personalInfo.osName} [Version 1.0]`,
    'Type help for a list of commands.',
  ]);
  const [value, setValue] = useState('');
  const prompt = useMemo(() => `${personalInfo.name.split(' ')[0].toLowerCase()}@portfolio:~$`, []);

  const run = (raw: string) => {
    const command = raw.trim().toLowerCase();
    const next = [...lines, `${prompt} ${raw}`];
    const map: Record<string, WindowId> = {
      about: 'about',
      projects: 'projects',
      skills: 'skills',
      contact: 'contact',
    };

    if (!command) {
      setLines(next);
      return;
    }
    if (command === 'clear') {
      setLines([]);
      return;
    }
    if (command === 'help') {
      setLines([...next, ...HELP]);
      return;
    }
    if (map[command]) {
      openWindow(map[command]);
      setLines([...next, `opening ${command}...`]);
      return;
    }
    setLines([...next, `'${raw}' is not recognized. Type help.`]);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    run(value);
    setValue('');
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className="min-h-[220px] border-2 border-[var(--dark-outline)] bg-[#1a1222] p-3 font-body text-sm text-[#78B87A]">
      {lines.map((line, index) => (
        <p key={`${line}-${index}`} className="whitespace-pre-wrap">
          {line}
        </p>
      ))}
      <form className="mt-2 flex items-center gap-2" onSubmit={onSubmit}>
        <label htmlFor="terminal-input" className="sr-only">
          Terminal command
        </label>
        <span aria-hidden="true">{prompt}</span>
        <input
          id="terminal-input"
          className="min-h-11 flex-1 border-0 bg-transparent text-[#cde8c8] outline-none"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}

export function TerminalWindow() {
  return <Terminal />;
}
