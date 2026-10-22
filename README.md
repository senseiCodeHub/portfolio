# SenseiCodeHub — Portfolio

A modern personal portfolio for **Robiul Islam (RobiCodes)**, built with Next.js App Router, React, and TypeScript, ready for Vercel deployment.

## Stack
- Next.js App Router
- React + TypeScript
- Responsive custom CSS
- SEO and Open Graph metadata
- No PHP runtime, Composer, or database required for the current portfolio presentation

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
Import `senseiCodeHub/portfolio` into Vercel and keep the root directory set to the repository root. Vercel should detect Next.js automatically. Configure `main` as the production branch after reviewing and merging the migration pull request.

## Migration scope
The portfolio frontend is now Next.js-only. Legacy PHP pages, PHP layout includes, and the Composer configuration have been removed from the migration branch. The site includes About, selected projects, technology stack, and contact sections under the **SenseiCodeHub** identity. Project cards link to relevant live pages or GitHub repositories.

The former PHP site's database-driven project manager, admin area, and server-side contact form are not included in this frontend migration. Contact currently uses an email link, so no database credentials or email secrets are exposed in the frontend.
