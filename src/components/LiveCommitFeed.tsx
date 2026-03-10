import { useEffect, useState } from 'react';

interface Commit {
  hash: string;
  type: string;
  message: string;
  repo: string;
  repo_display?: string;
  timestamp: string;
}

interface FeedData {
  updated_at: string;
  commits: Commit[];
}

interface LangCols {
  commit: string;
  type: string;
  message: string;
  repo: string;
  time: string;
}

interface Props {
  feedUrl: string;
  limit?: number;
  pollInterval?: number;
  langCols?: LangCols;
  emptyText?: string;
}

const DEMO_COMMITS: Commit[] = [
  { hash: 'a3f2b1c', type: 'feat',     message: 'implement AI-powered search module',           repo: 'startup-os',    repo_display: 'Startup OS',    timestamp: new Date(Date.now() - 2*60000).toISOString() },
  { hash: '9c1a4d2', type: 'fix',      message: 'resolve auth token refresh race condition',    repo: 'alva-agentic',  repo_display: 'Alva Agentic',  timestamp: new Date(Date.now() - 1*3600000).toISOString() },
  { hash: '4e7b910', type: 'refactor', message: 'migrate user provider to Riverpod 2.0',        repo: 'alva-agentic',  repo_display: 'Alva Agentic',  timestamp: new Date(Date.now() - 3*3600000).toISOString() },
  { hash: '2f3c550', type: 'chore',    message: 'update CI/CD pipeline with Docker multi-stage',repo: 'startup-os',    repo_display: 'Startup OS',    timestamp: new Date(Date.now() - 5*3600000).toISOString() },
  { hash: '7d1a099', type: 'feat',     message: 'add encrypted transaction sync for UcashAI',   repo: 'ucashai',       repo_display: 'UcashAI',       timestamp: new Date(Date.now() - 8*3600000).toISOString() },
];

function badgeClass(type: string): string {
  if (type === 'feat') return 'commit-badge badge-feat';
  if (type === 'fix')  return 'commit-badge badge-fix';
  return 'commit-badge badge-default';
}

function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)    return `${diff}s`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

function isFresh(iso: string): boolean {
  return Date.now() - new Date(iso).getTime() < 10 * 60 * 1000;
}

const DEFAULT_COLS: LangCols = { commit: 'commit', type: 'tipo', message: 'mensaje', repo: 'repo', time: 'hace' };

export default function LiveCommitFeed({
  feedUrl,
  limit = 5,
  pollInterval = 60_000,
  langCols = DEFAULT_COLS,
  emptyText = 'No hay actividad reciente',
}: Props) {
  const [commits, setCommits] = useState<Commit[] | null>(null); // null = loading
  const [cols, setCols] = useState<LangCols>(langCols);

  useEffect(() => {
    const handler = (e: Event) => {
      const l = (e as CustomEvent<'es' | 'en'>).detail;
      setCols(
        l === 'en'
          ? { commit: 'commit', type: 'type', message: 'message', repo: 'repo', time: 'ago' }
          : { commit: 'commit', type: 'tipo', message: 'mensaje', repo: 'repo', time: 'hace' },
      );
    };
    window.addEventListener('langchange', handler);
    return () => window.removeEventListener('langchange', handler);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(feedUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error('Feed not available');
        const data: FeedData = await res.json();
        setCommits(data.commits.slice(0, limit));
        // Notify terminal of latest commit
        if (data.commits[0]) {
          const c = data.commits[0];
          window.dispatchEvent(
            new CustomEvent('commitloaded', { detail: `${c.hash}  ${c.type}: ${c.message}` }),
          );
        }
      } catch {
        setCommits(DEMO_COMMITS.slice(0, limit));
      }
    }

    load();
    const id = setInterval(load, pollInterval);
    return () => clearInterval(id);
  }, [feedUrl, limit, pollInterval]);

  // Skeleton while loading
  if (commits === null) {
    return (
      <div className="feed-wrap" aria-busy="true" aria-label="Cargando actividad">
        <ColHeader cols={cols} />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton-row" aria-hidden="true" style={{ borderBottom: i === 4 ? 'none' : undefined }}>
            <div className="skeleton-block" style={{ width: '64px' }} />
            <div className="skeleton-block" style={{ width: '40px' }} />
            <div className="skeleton-block" style={{ flex: 1, opacity: 1 - i * 0.15 }} />
            <div className="skeleton-block" style={{ width: '100px' }} />
            <div className="skeleton-block" style={{ width: '32px' }} />
          </div>
        ))}
      </div>
    );
  }

  if (commits.length === 0) {
    return (
      <div className="feed-wrap">
        <ColHeader cols={cols} />
        <div style={{ padding: '20px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>
          {emptyText}
        </div>
      </div>
    );
  }

  return (
    <div className="feed-wrap">
      <ColHeader cols={cols} />
      <div role="list" aria-label="Commits recientes">
        {commits.map((c, i) => (
          <div
            key={c.hash + i}
            className={`commit-row${i === 0 ? ' latest' : ''}`}
            role="listitem"
          >
            <span className="commit-hash mono">{c.hash}</span>
            <span className={badgeClass(c.type)}>{c.type}</span>
            <span className="commit-message">{c.message}</span>
            <span className="commit-repo">{c.repo_display ?? c.repo}</span>
            <time
              className={`commit-time${isFresh(c.timestamp) ? ' fresh' : ''}`}
              dateTime={c.timestamp}
            >
              {relativeTime(c.timestamp)}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColHeader({ cols }: { cols: LangCols }) {
  return (
    <div className="feed-col-row" aria-hidden="true">
      <span>{cols.commit}</span>
      <span>{cols.type}</span>
      <span>{cols.message}</span>
      <span>{cols.repo}</span>
      <span>{cols.time}</span>
    </div>
  );
}
