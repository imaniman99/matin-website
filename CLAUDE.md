# Matin Intercultural Institute website: standing rules

These rules apply to every page, now and in the future. Read them before changing anything.

## 1. Identity and wording

- Matin is an **INSTITUTE**, not a community centre. Its scope is culture, dialogue, research, and social development.
- The organization's legal objects do NOT allow teaching services. **Never use these words anywhere on the site** (text, buttons, alt text, meta tags, URLs, code comments visible to users):
  - EN: course, class, training, teaching, school
  - FR: cours, formation, enseignement, école
  - (CSS class names and code keywords such as `class=` are not user-facing and are fine.)
- Tone: professional and credible, but warm and human. Not stiff, not overly casual.
- No food or party imagery.
- Use the texts the institute provides **EXACTLY** as written: no rewording, no "improvements," same order, same punctuation (including French « » quotation marks and spaces before French colons and semicolons). `src/lib/frenchTypo.ts` only turns existing spaces into non-breaking ones; it never adds or removes punctuation.
- No `[PLACEHOLDER]` tags and no placeholder or sample text anywhere. Content that is not provided yet is simply not shown (lists show a short empty-state message; optional settings such as address, phone, email and hours are hidden until set).

## 2. Typography

- **Playfair Display, bold:** page titles, section titles, card titles, headlines.
- **Montserrat:** all body text, labels, buttons.
- Both are self-hosted through `@fontsource` (imported in `src/styles/global.css`); the CSP blocks Google Fonts, so do not add a Google Fonts link.
- Desktop sizes: small-caps label about 22px; hero headline about 88px; hero paragraph about 22px. Scale down smoothly on tablet and mobile with `clamp()` so nothing overflows.

## 3. Colors: ONLY turquoise and gold, plus neutrals

Defined as tokens in `src/styles/global.css` (`@theme`). Always use the tokens (`text-primary`, `bg-tint`, `var(--color-gold)`…), never raw hex values.

| Token | Value | Use |
| --- | --- | --- |
| `--color-turquoise` | `#14A3A0` | Turquoise accents |
| `--color-primary` | `#0E8F8C` | Darker turquoise: headlines, primary buttons |
| `--color-gold` | `#D8A94B` | Gold: lines, maple leaves, gold buttons |
| `--color-gold-dark` | `#A87412` | Darker gold: icons, and text that is large or bold |
| `--color-ink` | `#2F3B3B` | Body text (neutral dark gray) |
| `--color-muted` | `#5A6464` | Secondary text (neutral gray) |
| `--color-tint` | `#EFF8F8` | Very light turquoise background |
| `--color-line` | `#D6EBEA` | Card borders and dividers |

- Backgrounds: white or very light turquoise (`tint`) only.
- Do NOT use dark green, navy, or any other color.
- **ONE EXCEPTION:** the "A word from our President" band on the About page keeps its deep teal background (`--color-president: #0A5C63`, with `--color-president-gold` and `--color-president-cream` for its text). No other place may use these three tokens.

## 4. Style

- Clean, calm, lots of white space.
- No gradients, no heavy shadows or effects, no decorative patterns (no waves, rays or glows).
- **Cards:** one shared style for the whole site, the `.card` class: white, softly rounded corners, very light border, generous padding, no shadow.
- **Section titles:** always use `src/components/ui/SectionHeader.astro`: title centered, and under it a thin gold line on each side of a small gold maple leaf (`LeafRule.astro`, inline SVG). Use this same component for every section title.

## 5. Accessibility and responsiveness

- Real heading hierarchy: one `h1` per page, then `h2`/`h3` in order.
- Contrast: white on `#0E8F8C` (3.9:1) and `#0E8F8C` or `#A87412` on white (3.9:1, 4.1:1) only pass WCAG AA for large text. So:
  - button text is bold and at least 19px (the `.btn` class does this);
  - `primary` and `gold-dark` color only headings, large or bold-and-≥19px text, and icons;
  - small text and links stay `ink` or `muted`.
- Everything works with the keyboard, with visible focus styles (turquoise outline; light gold inside the President band).
- Decorative icons, lines and maple leaves get `aria-hidden="true"`. Meaningful images get proper alt text in both languages.
- Set the `lang` attribute correctly on each language version (`BaseLayout.astro` does this: `fr-CA`, `en-CA`, `fa`).
- Fully responsive: desktop, tablet, mobile, with no horizontal scroll.
- English and French versions must have IDENTICAL layout and design. Only the text changes. (Each page is one view in `src/views/` rendered by both `src/pages/en/` and `src/pages/fr/`.)

## 6. Future pages

When asked for another page (Programs, Events, News, Get Involved, Contact), write its content in both English and French, in the same tone and design, following every rule above, especially the banned-words rule.

---

## How the project is organized

- **Stack:** Astro 7 (static), Tailwind CSS 4, TypeScript. Deployed on Netlify. `npm run dev` for local work, `npm run build` to check types, build and index search.
- **Pages:** `src/pages/{fr,en,fa}/…` are thin wrappers; the markup lives in `src/views/*.astro` and takes a `lang` prop.
- **Languages:** French (default) and English are complete; Persian (`fa`, RTL) covers Home, About (values only), Get Involved and Contact. Localized URLs are in `src/i18n/routes.ts`.
- **Interface strings:** `src/i18n/fr.ts` (defines the type), `en.ts`, `fa.ts`.
- **Editable content:** YAML in `src/content/` (schemas in `src/content.config.ts`). About page texts: `src/content/about/about.yaml`; mission and contact details: `src/content/settings/site.yaml`.
- **Logo:** the original files are `assets/logo-circle.jpg` and `assets/logo-vertical.jpg`. `npm run icons` cuts the circle into `src/assets/brand/logo-circle.png` (used by the home hero) and the favicons. Never redraw, recolor or add rings around the logo.
- **President photo:** add `src/assets/brand/president.jpg` (or .png / .webp) and it replaces the initials badge automatically.
- **Windows note:** don't rewrite French source files with PowerShell `Get-Content | Set-Content` (it corrupts UTF-8); use the editor tools or Node.
