'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  avatar_url: string;
}

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  homepage: string | null;
}

const GITHUB_USER = 'senseiCodeHub';

async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`,
      { headers: { Accept: 'application/vnd.github+json' }, next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function relativeTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const secs = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (secs < 60) return 'just now';
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const stack = [
  'JavaScript / TypeScript',
  'Next.js & React',
  'REST API design',
  'Java & Android',
  'Flutter / Dart',
  'Firebase',
  'Responsive UI',
  'UI performance',
];

const featured = [
  {
    n: '01',
    title: 'AnimeHub',
    type: 'Streaming platform',
    desc: 'Anime and entertainment platform focused on discovery, watch progress, source selection, and a custom player.',
    stack: ['JavaScript', 'APIs', 'Web'],
    href: 'https://github.com/senseiCodeHub/AnimeHub',
    label: 'View repository',
  },
  {
    n: '02',
    title: 'KitsuPlay',
    type: 'Mobile application',
    desc: 'Anime discovery and playback experience with a clean mobile interface and multiple content sources.',
    stack: ['Flutter', 'Dart', 'REST APIs'],
    href: 'https://github.com/senseiCodeHub',
    label: 'Explore GitHub',
  },
];

const codeBlock = `
<span style="color:#a99aff">const</span> developer = { {
&nbsp;&nbsp;name: <span style="color:#c4f36b">'Robiul Islam'</span>,
&nbsp;&nbsp;alias: <span style="color:#c4f36b">'RobiCodes'</span>,
&nbsp;&nbsp;focus: [ {
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#c4f36b">'Web'</span>,
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#c4f36b">'APIs'</span>,
&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#c4f36b">'Mobile'</span>
&nbsp;&nbsp; } ],
&nbsp;&nbsp;mindset: <span style="color:#c4f36b">'Build. Learn. Improve.'</span>
} };
`.trim();

function Reveal({ children, className = '', id, delay = 0 }: { children: ReactNode; className?: string; id?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} id={id} className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

export default function Home() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [u, r] = await Promise.all([fetchGitHubUser(), fetchGitHubRepos()]);
      if (!cancelled) {
        setUser(u);
        setRepos(r);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="page">
      <section id="hero" className="hero">
        <div className="hero-ground">
          <div className="glow glow-1" />
          <div className="glow glow-2" />
          <div className="glow glow-3" />
        </div>
        <div className="wrap">
          <div className="hero-grid">
            <Reveal className="hero-copy" delay={0}>
              <p className="intro">Robiul Islam</p>
              <h1>I build digital experiences<br /><span className="emphasis">that solve real problems.</span></h1>
              <p className="hero-desc">
                Web &amp; API developer from Bangladesh, known as <strong>RobiCodes</strong>. I turn ideas
                into useful products — from web platforms and backend systems to mobile apps.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#github">
                  GitHub <span>→</span>
                </a>
                <a className="button button-ghost" href="#projects">
                  Work <span>→</span>
                </a>
              </div>
              <div className="social-row">
                <a href="https://github.com/senseiCodeHub" target="_blank" rel="noreferrer">
                  github.com/senseiCodeHub
                </a>
                <a href="https://www.facebook.com/iam.robi69/" target="_blank" rel="noreferrer">
                  facebook.com/iam.robi69
                </a>
              </div>
            </Reveal>

            <Reveal className="hero-proof" delay={0.3}>
              <div className="proof-card">
                <div className="proof-head">
                  <img
                    src={user?.avatar_url || 'https://avatars.githubusercontent.com/u/1'}
                    alt={user?.login || 'avatar'}
                    className="avatar"
                  />
                  <div className="proof-meta">
                    <h3>{user?.name || 'Robiul Islam'}</h3>
                    <p className="handle">@{user?.login || GITHUB_USER} · {user?.location || 'Bangladesh'}</p>
                  </div>
                </div>
                <div className="proof-body">
                  <div className="proof-bio">
                    {user?.bio || 'Building useful things for the web, APIs, and mobile.'}
                  </div>
                  <div className="proof-stats">
                    <div className="stat">
                      <span className="stat-value">{user?.public_repos ?? 0}</span>
                      <span className="stat-label">repos</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{user?.followers ?? 0}</span>
                      <span className="stat-label">followers</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{user?.following ?? 0}</span>
                      <span className="stat-label">following</span>
                    </div>
                  </div>
                </div>
                <pre className="code-box" dangerouslySetInnerHTML={{ __html: codeBlock }} />
                <a href="https://github.com/senseiCodeHub" target="_blank" rel="noreferrer" className="proof-cta">
                  Open profile <span>→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Reveal className="section about" id="about" delay={0.1}>
        <div className="wrap narrow">
          <h2 className="section-title">About</h2>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                I’m Robiul Islam, a web &amp; API developer from Bangladesh. I enjoy building products that are
                useful, performant, and pleasant to use. Currently focused on web platforms, APIs, and mobile
                experiences.
              </p>
              <p>
                Open to collaboration on interesting projects. Reach me on GitHub or Facebook.
              </p>
            </div>
            <div className="about-list">
              <div className="list-item">
                <span className="list-label">Role</span>
                <span className="list-value">Web &amp; API Developer</span>
              </div>
              <div className="list-item">
                <span className="list-label">Location</span>
                <span className="list-value">{user?.location || 'Bangladesh'}</span>
              </div>
              <div className="list-item">
                <span className="list-label">Public repos</span>
                <span className="list-value">{user?.public_repos ?? 0}</span>
              </div>
              <div className="list-item">
                <span className="list-label">Followers</span>
                <span className="list-value">{user?.followers ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="section github" id="github" delay={0.1}>
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">GitHub</h2>
            <p className="section-desc">Live activity from{' '}
              <a href={user?.html_url || `https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
                @{user?.login || GITHUB_USER}
              </a>
            </p>
          </div>

          <div className="github-stats">
            <div className="stat-card">
              <div className="stat-value">{user?.public_repos ?? '--'}</div>
              <div className="stat-label">Public repos</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{user?.followers ?? '--'}</div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{user?.following ?? '--'}</div>
              <div className="stat-label">Following</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{user?.location || 'Bangladesh'}</div>
              <div className="stat-label">Location</div>
            </div>
          </div>

          {loading ? (
            <div className="repos-skeleton">
              {[0, 1, 2].map((i) => (
                <div key={i} className="repo-skeleton" />
              ))}
            </div>
          ) : (
            <div className="repo-grid">
              {repos.length > 0 ? (
                repos.map((repo) => (
                  <article key={repo.name} className="repo-card">
                    <div className="repo-top">
                      <h3 className="repo-title">{repo.name}</h3>
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-external">
                        →
                      </a>
                    </div>
                    {repo.description && <p className="repo-desc">{repo.description}</p>}
                    <div className="repo-meta">
                      <span className="repo-chip">{repo.language || '—'}</span>
                      <span className="repo-updated"><span aria-hidden="true">●</span> {relativeTime(repo.updated_at)}</span>
                    </div>
                    <div className="repo-stats">
                      <span className="repo-stat"><span aria-hidden="true">★</span> {repo.stargazers_count}</span>
                      <span className="repo-stat"><span aria-hidden="true">⌘</span> {repo.forks_count}</span>
                      {repo.homepage && (
                        <span className="repo-stat"><span aria-hidden="true">🔗</span> Live</span>
                      )}
                    </div>
                    <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-cta">
                      View repository <span>→</span>
                    </a>
                  </article>
                ))
              ) : (
                <p className="empty">Unable to load repositories at the moment.</p>
              )}
            </div>
          )}
        </div>
      </Reveal>

      <Reveal className="section projects" id="projects" delay={0.1}>
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title">Featured work</h2>
            <p className="section-desc">Selected projects.</p>
          </div>
          <div className="project-grid">
            {featured.map((p) => (
              <article key={p.title} className="project-card">
                <div className="project-meta">
                  <span className="project-type">{p.type}</span>
                  <a href={p.href} target="_blank" rel="noreferrer" className="project-link">{p.label} <span>→</span></a>
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.stack.map((s) => (
                    <span key={s} className="project-tag">{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section stack" id="stack" delay={0.1}>
        <div className="wrap narrow">
          <h2 className="section-title">Stack</h2>
          <div className="stack-pills">
            {stack.map((item, i) => (
              <span key={item} className="stack-pill" style={{ transitionDelay: `${i * 0.05}s` }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="section contact" id="contact" delay={0.1}>
        <div className="wrap narrow">
          <div className="contact-card">
            <h2 className="section-title">Let’s talk</h2>
            <p>Have a project in mind or want to collaborate?</p>
            <div className="contact-links">
              <a href="https://github.com/senseiCodeHub" target="_blank" rel="noreferrer" className="button button-primary">
                GitHub <span>→</span>
              </a>
              <a href="https://www.facebook.com/iam.robi69/" target="_blank" rel="noreferrer" className="button button-ghost">
                Facebook <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
