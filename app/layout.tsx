import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Robiul Islam — SenseiCodeHub', template: '%s | SenseiCodeHub' },
  description: 'Robiul Islam (RobiCodes), a web and API developer from Bangladesh building thoughtful digital products, APIs, and mobile experiences.',
  applicationName: 'SenseiCodeHub',
  openGraph: { title: 'Robiul Islam — SenseiCodeHub', description: 'Building useful things for the web, APIs, and mobile.', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Robiul Islam — SenseiCodeHub', description: 'Web & API Developer from Bangladesh' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header className="site-header"><a className="brand" href="/" aria-label="SenseiCodeHub home"><span className="brand-mark">S<span>.</span></span><span>SenseiCodeHub</span></a><nav aria-label="Main navigation"><a href="/#about">About</a><a href="/#projects">Projects</a><a href="/#stack">Stack</a><a className="nav-contact" href="/#contact">Let’s talk <span>↗</span></a></nav></header>{children}<footer className="site-footer"><a className="brand" href="/"><span className="brand-mark">S<span>.</span></span><span>SenseiCodeHub</span></a><p>Designed & built by Robiul Islam · Bangladesh</p><div className="footer-links"><a href="https://github.com/senseiCodeHub" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:iam.robi693@gmail.com">Email ↗</a></div><small>© {new Date().getFullYear()} Robiul Islam. All rights reserved.</small></footer></body></html>;
