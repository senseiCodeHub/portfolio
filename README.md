# SenseiCodeHub — Portfolio

A modern personal portfolio for **Robiul Islam (RobiCodes)**, built with Next.js App Router, React, and TypeScript, ready for Vercel deployment.

## Stack
- Next.js App Router
- React + TypeScript
- Responsive custom CSS
- SEO and Open Graph metadata

## Features
- Responsive portfolio with About, selected projects, technology stack, and contact sections
- Project cards linking to relevant repositories and live projects
- No admin dashboard, database-backed CMS, or email-sending feature
- Contact actions link to public social profiles

## Local development
Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel
Import `senseiCodeHub/portfolio` into Vercel and keep the root directory set to the repository root. Vercel should detect Next.js automatically. Set `main` as the production branch.

The site is a Next.js application and does not require a separate PHP runtime or database. The public portfolio has no admin panel or server-side email system.
