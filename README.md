# Matin – Institut interculturel · Website

Bilingual (French-first) website for **Matin – Institut interculturel / Intercultural Institute**, Montréal.
French lives at `/fr/`, English at `/en/`, and `/` redirects to French (Charter of the French Language).

- **Content editors:** read [`GUIDE_ADMIN.md`](GUIDE_ADMIN.md) (French and English, no technical knowledge needed).
- **Before launch:** work through [`CONTENT_TODO.md`](CONTENT_TODO.md). Every build also prints the list of entries still marked `placeholder: true`.

---

## Stack and why

| Need                                      | Choice                                                                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Fast, cheap, mostly static bilingual site | [Astro 7](https://astro.build) (static output), content collections with Zod validation           |
| Styling                                   | Tailwind CSS v4, brand tokens in `src/styles/global.css`                                          |
| Hosting, forms, scheduled jobs            | Netlify (free tier): static hosting, Netlify Forms, Netlify Functions                             |
| Search                                    | [Pagefind](https://pagefind.app): static index built after each build, no server                  |
| Content editing                           | YAML files in the repository, edited in GitHub's web editor (no CMS, see [Decisions](#decisions)) |

No framework runtime ships to visitors: interactivity (menu, carousel, filters, calendar, lightbox, forms, consent) is small vanilla TypeScript.

## Getting started

Requirements: **Node.js 22.12+** and npm.

```bash
npm install
npm run dev        # http://localhost:4321 → redirects to /fr/
```

| Command                           | What it does                                                                  |
| --------------------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`                     | Development server with hot reload                                            |
| `npm run build`                   | Optimizes images → type-checks → builds `dist/` → builds the search index     |
| `npm run preview`                 | Serves the built `dist/` (use this to test search, CSP and analytics consent) |
| `npm run images`                  | Runs the image optimizer on its own                                           |
| `npm run icons`                   | Regenerates favicons and the social-share image from `assets/logo-circle.jpg` |
| `npm run lint` / `npm run format` | ESLint / Prettier                                                             |

Some features only work on a build (`npm run build && npm run preview`): site search, the Content Security Policy and analytics consent. Forms and Netlify Functions only work once deployed to Netlify.

## Project structure

```
assets/                    Original logo files (source for icons)
integrations/              Build-time placeholder report
netlify/functions/         daily-rebuild, newsletter (Brevo), submission-created (Turnstile)
public/                    Favicons, share image, _redirects, manifest
scripts/                   optimize-images.mjs (prebuild), generate-icons.mjs
src/
  assets/uploads/          Photos used by content (gallery, events, news, team…)
  components/              brand/ (logo, waves, sunrise) · content/ · forms/ · layout/ · ui/
  content/                 ← all editable content, one YAML file per entry
  content.config.ts        Content schemas (what fields exist, which are required)
  i18n/                    fr.ts / en.ts (all interface text), routes.ts (translated URLs)
  layouts/                 BaseLayout (head, header, footer), PageLayout (inner pages)
  lib/                     Dates (Montréal time, 24 h), French typography, SEO, calendar, sitemap
  pages/fr/ · pages/en/    One small route file per page and language
  scripts/                 Client scripts: forms, cookie consent
  views/                   The page templates shared by both languages
```

## How content works

Each collection in `src/content/` (events, news, programs, team, gallery, faq, resources, testimonials, partners, documents, legal, about, involvement, settings) holds one YAML file per entry, with **French and English side by side**:

```yaml
title:
  fr: 'Soirée musiques du monde'
  en: 'World Music Night'
```

- Both languages are **required** for every text field. A missing field fails the build with a message naming the file, so a broken page never goes live.
- `urlSlug` gives translated URLs (`/fr/evenements/soiree-…` ↔ `/en/events/world-music-night`). The FR/EN switch always links to the equivalent page.
- Event times are entered as **Montréal local time** (`2026-10-24T19:00`), so daylight saving time is handled automatically.
- Body fields are Markdown. French text gets Québec typography automatically (non-breaking space before `:` and inside « », no space before `; ! ?`).
- `src/content/settings/site.yaml` holds the organization details: address, hours, social links, donation URL, impact numbers and the privacy officer.

## Languages

- Interface text lives in `src/i18n/fr.ts` and `src/i18n/en.ts`. TypeScript enforces that both have the same keys.
- Translated URL segments live in `src/i18n/routes.ts`.
- Each page outputs `lang`, canonical and `hreflang` alternates (`fr-CA`, `en-CA`, `x-default` → French). `/sitemap.xml` lists every page with its translated alternate.

## Deploying to Netlify

1. Push the repository to GitHub.
2. In Netlify: **Add new site → Import an existing project →** choose the repository. Build settings are read from `netlify.toml` (`npm run build`, publish `dist`, Node 22).
3. **Site configuration → Environment variables:** add the values you need from [`.env.example`](.env.example). At minimum, set `SITE_URL` to the final domain.
4. **Build hook for the daily rebuild:** Site configuration → Build & deploy → Build hooks → _Add build hook_. Copy its URL into the `BUILD_HOOK_URL` variable. The `daily-rebuild` function then rebuilds the site every morning (≈ 5 a.m. Montréal) so ended events move to "Past events".
5. **Forms → Enable form detection.** Then add email notifications under **Forms → Form notifications** for `contact` and `benevolat` (and `newsletter` if you don't use Brevo).
6. **Deploy notifications → Add notification → Email → "Deploy failed"**, sent to the content editor and the technical contact. A content mistake fails the build (the live site stays as it was), and this email is how editors find out what to fix.
7. Connect the domain (Domain management), then redeploy so `SITE_URL` takes effect.

### Environment variables

All are optional; the site works without them. See `.env.example` for details.

| Variable                                                                         | Purpose                                                                                                            |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `SITE_URL`                                                                       | Final domain (canonical URLs, sitemap, share previews)                                                             |
| `BUILD_HOOK_URL`                                                                 | Daily rebuild (past events)                                                                                        |
| `PUBLIC_ANALYTICS_PROVIDER`, `PUBLIC_PLAUSIBLE_DOMAIN`, `PUBLIC_GA_ID`           | `none` (default), `plausible` or `ga4`. Loaded only after consent; the cookie banner appears only when this is set |
| `PUBLIC_NEWSLETTER_MODE`                                                         | `netlify` (default: sign-ups stored in Netlify Forms) or `brevo`                                                   |
| `BREVO_API_KEY`, `BREVO_LIST_ID_FR`, `BREVO_LIST_ID_EN`, `BREVO_DOI_TEMPLATE_ID` | Brevo double opt-in (the person confirms by email)                                                                 |
| `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NETLIFY_API_TOKEN`         | Optional Cloudflare Turnstile anti-spam                                                                            |

`PUBLIC_*` variables are baked in at build time: redeploy after changing them.

## Forms and newsletter

- **Contact** (`contact`) and **volunteer** (`benevolat`) forms use **Netlify Forms**. They have a honeypot field, bilingual validation with an error summary, and a required consent checkbox.
- **Free-tier limit:** Netlify's free plan includes only a limited number of form submissions per month (historically 100/month on the Starter plan). Check the current figure at <https://www.netlify.com/pricing/>. If the institute outgrows it, upgrade or move the forms to a provider such as Formspree.
- **Newsletter:** by default, sign-ups are stored in Netlify Forms (export them as CSV). Set `PUBLIC_NEWSLETTER_MODE=brevo` and the Brevo variables to send them to Brevo with double opt-in, which is the recommended proof of consent under CASL. The confirmation link returns visitors to `/fr/?infolettre=confirmee`, which shows a thank-you message.
- **Turnstile (optional):** the widget loads only when someone starts filling in a form. The `submission-created` function verifies each submission and deletes the ones that fail.
- **Privacy:** form submissions are processed by Netlify on servers outside Québec (mainly the U.S.). The privacy policy states this, as Law 25 requires.

## Privacy, consent and security

- **Québec Law 25:** no optional cookie or tracker loads before consent. With `PUBLIC_ANALYTICS_PROVIDER=none` (default), the site sets **no** optional cookies and shows no banner. YouTube videos and Google Maps load only when clicked.
- Visitors can change their choice at any time with "Gérer les témoins / Manage cookies" in the footer. It is stored in `localStorage`, not a cookie.
- **Content Security Policy:** generated per page by Astro, with hashes for its own inline scripts (`security.csp` in `astro.config.mjs`). If you add a third-party script, add its domain there. Other headers (HSTS, frame-ancestors, etc.) are in `netlify.toml`.
- No secrets are in the repository: only `.env.example` is committed.

## Images

- Put photos in `src/assets/uploads/…`. Before every build, `scripts/optimize-images.mjs`:
  - rotates photos upright;
  - shrinks anything over **2000 px** on the long edge;
  - re-compresses heavy files;
  - **strips EXIF metadata, including GPS location**.
    Already-optimized files are left untouched.
- Astro then generates responsive AVIF/WebP versions for the pages.
- **When to move photos to an external host (e.g. Cloudinary):** the repository holds every original. Plan a move to Cloudinary (or another image CDN) if any of these happens:
  - the repository passes roughly **500 MB–1 GB**;
  - there are more than a few hundred photos;
  - builds take several minutes because of image processing.
    The gallery schema would then store image URLs instead of files.

## Search

`pagefind --site dist` runs after each build and indexes each language separately, so French searches return French pages.

Home and listing pages are excluded (their items each have their own page), and so are related-content blocks (`data-pagefind-ignore`). The search page is `/fr/recherche/` and `/en/search/`.

## Quality checks (done in Phase 5)

- **Accessibility:** axe-core (WCAG 2.1 A/AA + best practices) reports no violations on any page template, including the open mobile menu and cookie dialog. The keyboard path was checked: skip link, focus ring, menu/dialog focus return.
- **Lighthouse** (mobile, simulated slow 4G, median of runs): performance **91–96**, accessibility **100**, best practices **100**, SEO **100**. Desktop performance is ≈ 97.
- **Responsive:** checked at 375, 768, 1024, 1280 and 1440 px, with no horizontal scrolling.
- **Not yet tested:** real browsers other than Chromium/Edge (Firefox, Safari/iOS). Test them on the deployed site.

## Decisions

- **No CMS.** It was considered (Keystatic) and dropped. Content is edited directly in GitHub's web editor (see `GUIDE_ADMIN.md`); schema validation catches mistakes before they go live.
- **French by default**, with every text field required in both languages, so French is never less complete than English.
- **Logo:** the circular logo is a raster image, so the header uses an HTML/CSS lockup and the hero an SVG wordmark. A vector (SVG) version from a designer is recommended (see `CONTENT_TODO.md`).

## Maintenance

- `npm outdated` / `npm update` every few months, then `npm run build` to confirm nothing broke.
- The daily rebuild also keeps the footer year and event pages current.
