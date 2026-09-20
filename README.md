# HerTech Future

The website for [HerTech Future](https://hertechfuture.co.uk), the women in tech
society at Manchester Metropolitan University.

> The future of tech is hers.

Built and maintained by Huma, founder and chair of the society.

---

## Why it is built this way

The site is deliberately **static and data-free**. It collects no personal
information, sets no cookies and runs no analytics or third-party scripts.
Membership and event tickets are handled by the Students' Union, so the society
never holds a member list off their platform.

That is a design decision, not a limitation. It means:

- no UK GDPR obligations, because there is nothing to process
- no cookie banner, because there are no non-essential cookies
- no database and no authentication, so there is nothing to breach
- every page is pre-rendered at build time and served from a CDN

If the site ever needs to take a sign-up, the validation layer in
`src/lib/schemas.ts` is already the right place to start.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript, `strict` mode |
| Styling | Tailwind CSS v4, configured in CSS via `@theme` |
| Validation | Zod, run at build time |
| Hosting | Vercel |
| CI | GitHub Actions: typecheck, lint, build, audit |

## Running it locally

Requires Node 22 (see `.nvmrc`).

```bash
nvm use            # or install Node 22 from nodejs.org
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run typecheck  # TypeScript, no build output
npm run lint       # ESLint
npm run build      # production build
npm run check      # all three, the same as CI
```

## Project structure

```
src/
├── app/                    routes -- one folder per URL
│   ├── layout.tsx          shell: fonts, header, footer, sitewide metadata
│   ├── page.tsx            /
│   ├── events/[slug]/      one page per event, generated at build time
│   ├── sitemap.ts          generated /sitemap.xml
│   └── robots.ts           generated /robots.txt
├── components/
│   ├── ui/                 generic primitives: Button, Card, Section, Container
│   ├── layout/             header, footer, skip link
│   └── features/           components that know about our data, e.g. EventCard
├── content/                the editable content: events, committee, pillars
└── lib/
    ├── schemas.ts          Zod schemas -- content is validated at build time
    ├── events.ts           query layer: upcoming, past, by slug, formatting
    ├── site.ts             site name, URL and every external link
    └── cn.ts               class name helper
```

The rule that keeps this tidy: **`ui/` never imports from `content/`.** Generic
components stay generic and reusable; anything that knows what an event is
lives in `features/`.

## Adding an event

1. Open `src/content/events.ts`.
2. Copy an existing entry and change the values. Dates are `YYYY-MM-DD`, times
   are 24-hour `HH:MM`.
3. `npm run build` to check it. A malformed entry fails the build with a message
   naming the field — that is Zod doing its job.
4. Commit and push. Vercel deploys automatically.

Events move from "upcoming" to "past" based on the time of the last build, so a
push is what updates them.

## Security

- Security headers, including a Content Security Policy, are set in
  `next.config.ts` and documented line by line there.
- No secrets in the repository. `.env*` is gitignored. If a secret is ever
  committed, rotate it — removing the commit is not enough.
- Dependabot and `npm audit --audit-level=high` in CI cover dependencies.
- Verify the deployed headers at [securityheaders.com](https://securityheaders.com).

## Accessibility

Targets WCAG 2.2 AA. Skip link, visible focus rings, semantic landmarks,
logical heading order, 4.5:1 contrast, 44px touch targets, and reduced-motion
support. Tested with Lighthouse, axe DevTools, and by navigating without a
mouse.

## Licence

Code is available for reference. The HerTech Future name, logo and brand belong
to the society.
