import { useEffect, useRef, useState } from 'react';

interface TermLine {
  type: 'prompt' | 'output' | 'string' | 'commit' | 'empty';
  text?: string;
}

const LINES_ES: TermLine[] = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'output', text: '→  Alejandro Virgili — Senior Dev & Product Builder' },
  { type: 'empty' },
  { type: 'prompt', text: '$ cat stack.json' },
  { type: 'string', text: '{' },
  { type: 'output', text: '  "languages": ["Java", "Dart", "TypeScript", "Python", "SQL"],' },
  { type: 'output', text: '  "stack": ["Spring Boot", "Flutter", "Node.js", "AWS", "Angular", "AI", "Supabase"],' },
  { type: 'output', text: '  "building": "products from 0 → 1"' },
  { type: 'string', text: '}' },
  { type: 'empty' },
  { type: 'prompt', text: '$ git log --oneline -1' },
  { type: 'commit' },
];

const LINES_EN: TermLine[] = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'output', text: '→  Alejandro Virgili — Senior Dev & Product Builder' },
  { type: 'empty' },
  { type: 'prompt', text: '$ cat stack.json' },
  { type: 'string', text: '{' },
  { type: 'output', text: '  "languages": ["Java", "Dart", "TypeScript", "Python", "SQL"],' },
  { type: 'output', text: '  "stack": ["Spring Boot", "Flutter", "Node.js", "AWS", "Angular", "AI", "Supabase"],' },
  { type: 'output', text: '  "building": "products from 0 → 1"' },
  { type: 'string', text: '}' },
  { type: 'empty' },
  { type: 'prompt', text: '$ git log --oneline -1' },
  { type: 'commit' },
];

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

interface Props {
  lastCommit?: string;
}

export default function AnimatedTerminal({ lastCommit }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [commitText, setCommitText] = useState(
    lastCommit ?? 'a3f2b1c  feat: loading latest commit...',
  );

  // Listen for lang changes and commit updates from LiveCommitFeed
  useEffect(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'es' || saved === 'en') setLang(saved);

    const langHandler = (e: Event) => {
      const l = (e as CustomEvent<'es' | 'en'>).detail;
      setLang(l);
    };
    const commitHandler = (e: Event) => {
      const text = (e as CustomEvent<string>).detail;
      setCommitText(text);
    };
    window.addEventListener('langchange', langHandler);
    window.addEventListener('commitloaded', commitHandler);
    return () => {
      window.removeEventListener('langchange', langHandler);
      window.removeEventListener('commitloaded', commitHandler);
    };
  }, []);

  useEffect(() => {
    // Each effect run gets its own cancelled flag — prevents parallel animations
    let cancelled = false;

    async function runAnimation() {
      const body = bodyRef.current;
      if (!body) return;
      body.innerHTML = '';

      const lines = lang === 'en' ? LINES_EN : LINES_ES;

      for (const line of lines) {
        if (cancelled) return;

        if (line.type === 'empty') {
          const el = document.createElement('div');
          el.className = 'term-empty';
          body.appendChild(el);
          await sleep(80);
          continue;
        }

        const text = line.type === 'commit' ? commitText : (line.text ?? '');
        const lineEl = document.createElement('div');
        lineEl.className = 'term-line';
        body.appendChild(lineEl);

        const span = document.createElement('span');
        span.className =
          line.type === 'prompt' ? 'term-prompt'
          : line.type === 'string' ? 'term-string'
          : line.type === 'commit' ? 'term-commit'
          : 'term-output';
        lineEl.appendChild(span);

        const charDelay = line.type === 'prompt' ? 38 : 12;
        for (const ch of text) {
          if (cancelled) return;
          span.textContent += ch;
          await sleep(charDelay);
        }
        if (line.type === 'prompt') await sleep(300);
      }

      // Blinking cursor
      if (!cancelled) {
        const cursorLine = document.createElement('div');
        cursorLine.className = 'term-line';
        const cursor = document.createElement('span');
        cursor.className = 'term-cursor';
        cursorLine.appendChild(cursor);
        body.appendChild(cursorLine);
      }
    }

    runAnimation();
    return () => { cancelled = true; };
  }, [lang, commitText]);

  return (
    <div className="terminal" role="complementary" aria-label="Terminal interactivo">
      <div className="terminal-bar" aria-hidden="true">
        <span className="term-dot red" />
        <span className="term-dot yellow" />
        <span className="term-dot green" />
        <span className="terminal-title">avirgili — zsh</span>
      </div>
      <div
        ref={bodyRef}
        className="terminal-body"
        aria-live="polite"
        aria-label="Contenido del terminal"
      />
    </div>
  );
}
