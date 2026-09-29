# Project History

## 2026-09-16 — Stage 2 Minimal Bootstrap

- Created minimal Astro + TypeScript static scaffold.
- Added thin-site `noindex, nofollow`.
- Added standard EMFLS repository documentation.
- Site-specific identity, content, infrastructure, and search work intentionally deferred.

## 2026-09-30 — Foundation & Search Launch First

- Replaced the bootstrap placeholder with a Korean moving-date planning site covering D-30, D-14, D-7, D-1, move day, and the first week after moving.
- Added shared responsive layout, canonical/title/description/Open Graph metadata, About, Privacy, Editorial Policy, Contact, and branded noindex 404 pages.
- Added an allow-all `robots.txt`, a five-route production sitemap, and a unique 128-bit IndexNow key with its matching public verifier file.
- Added four built-output foundation tests for routes/canonicals/trust metadata, robots/sitemap, 404 output, and IndexNow key consistency.
- Recorded scope boundaries: no legal or lease interpretation, vendor rankings, unsupported prices, user inputs, saved schedule data, login, or tracking.
- Local verification: `npm run check` passed with zero diagnostics; `npm run build` emitted six static pages; `npm test` passed 4/4; `git diff --check` passed. Chrome visual QA passed at 390 × 844 and 1440 × 900 CSS px; `innerWidth` matched `documentElement.scrollWidth` and `body.scrollWidth` at both sizes.
- Known non-blocking browser note: the default favicon request returns 404 because no favicon is in the foundation scope. No additional page-script errors observed.
- Production, live 404, Google/Naver submissions, IndexNow POST, and Daum state remain pending at this entry. See `LAUNCH_CHECKLIST.md` for evidence-gated completion.
