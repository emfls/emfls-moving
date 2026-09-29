# Launch Checklist

## Foundation & Search Launch

- [x] Site identity and minimum distinct Korean moving timeline
- [x] About, privacy, editorial policy, contact, and custom 404 pages
- [x] Custom-domain canonical metadata and descriptions
- [x] Public robots.txt and sitemap.xml for the five indexable routes
- [x] Per-site IndexNow key and matching public verifier file
- [x] Local `npm run check`, `npm run build`, 4 foundation tests, and `git diff --check`
- [x] Fixed-viewport browser QA in Chrome: 390 × 844 and 1440 × 900 CSS px; measured document/body scroll width equals each viewport width at both sizes
- [ ] PROJECT_HISTORY and repo docs synchronized
- [ ] Commit/push to existing `main` branch
- [ ] Existing Cloudflare Pages Production updated and verified
- [ ] Real unknown-route Production response returns HTTP 404
- [ ] Google Search Console property and sitemap submission verified
- [ ] Naver Search Advisor property and sitemap submission verified
- [ ] IndexNow POST submitted for live canonical URLs
- [ ] Daum status checked and any login/consent boundary recorded
- [ ] Registry and Handoff Index synchronized

Do not infer deployment or Search Engine completion from local build output. Update this list only when the respective remote or Production evidence is available.

Known non-blocking browser note: no custom favicon is currently part of the foundation scope, so browsers may request `/favicon.ico` and receive 404. Page routes and scripts verified without additional browser console errors.
