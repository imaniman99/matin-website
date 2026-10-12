# Contenu à fournir avant la mise en ligne · Content to provide before launch

Everything below is content or a decision that only the institute can provide.

- The site contains **no sample or placeholder content**: anything not yet provided is simply not shown (empty lists show a short message).
- Every build prints the list of content files still marked `placeholder: true`. That list should be empty before launch.
- How to edit each file: see [`GUIDE_ADMIN.md`](GUIDE_ADMIN.md).

Legend: ☐ to do · ⚠ important / legal

---

## 0. Organization-wide (`src/content/settings/site.yaml`)

These details appear on many pages (footer, Contact, About, structured data for Google).

- ✔ **Mission** (FR + EN): supplied by the institute on 2026-10-11.
- ☐ **Street address and postal code** (`address`). Hidden until set.
- ☐ **Phone** (`phone`). Hidden until set.
- ☐ **Public email** (`email`). Hidden until set.
- ☐ **Opening hours** (`hours`, FR + EN). Hidden until set.
- ✔ **Social media URLs:** YouTube, LinkedIn and Instagram point to the institute's pages.
- ☐ **Registered charity number** (`charityNumber`). Leave empty if there is none.
- ✔ Donate button, membership and impact numbers were removed from the site.
- ⚠ ☐ **Person in charge of personal information** (`privacyOfficer`: name, title, email). Law 25 requires this person to be named. Until it is set, the privacy policy points to the Contact page.

## 1. Domain, accounts and settings (technical contact)

- ✔ **Domain name:** `https://matincc.ca` is the default in `astro.config.mjs`; `SITE_URL` in Netlify overrides it. It's used for canonical URLs, the sitemap and share previews.
- ✔ **GitHub repository:** <https://github.com/imaniman99/matin-website> (private).
- ☐ **Netlify site** (see README → Deploying).
- ☐ **Build hook** → `BUILD_HOOK_URL` (daily rebuild for past events).
- ☐ **Deploy-failed email notification** for the content editor.
- ✔ **Form delivery:** Netlify Forms with email notifications; test submission received on 2026-10-10. `formsEnabled: true`.
- ☐ **Newsletter:** keep the default (stored in Netlify Forms) or create a Brevo account (API key, FR/EN lists, double opt-in template).
- ☐ **Analytics:** none (default), Plausible (≈ US$9/month, cookieless) or GA4.
- ☐ **Anti-spam:** Cloudflare Turnstile keys, only if spam becomes a problem.
- ☐ Fill in the **technical contact** at the end of `GUIDE_ADMIN.md` (FR and EN). The GitHub address is already filled in.
- ☐ Give the director access: repository **Settings → Collaborators → Add people** (they need a free GitHub account).

## 2. Brand

- ☐ **Vector logo (SVG)** from a designer. The current logos are JPG images. The favicons and share image are cut from the original round logo (`assets/logo-circle.jpg`); the header recreates the wordmark in HTML, but an official SVG would make the favicon, footer logo and share image sharper and would allow a true monochrome version.
- ☐ Once you have the final logo: replace `assets/logo-circle.jpg`, then run `npm run icons`.
- ☐ Optional: a custom **share image** (`public/og-default.jpg`, 1200×630) with a real photo.

## 3. Home (`/fr/`)

The hero, “Who We Are”, “Our Areas of Work”, “Get Involved” and newsletter texts were supplied by the institute and are used verbatim (hero updated 2026-10-11). Other home texts (section intros, empty states, interest form) are in `src/i18n/fr.ts` / `en.ts` / `fa.ts`.

- ✔ Testimonials, partner strip, impact numbers and the sample events and news were removed.
- ☐ **Translations:** have fluent speakers review the French and Persian texts listed in [`TRANSLATIONS_FOR_REVIEW.md`](TRANSLATIONS_FOR_REVIEW.md) (regenerate with `npm run translations`).

## 4. About (`src/content/about/about.yaml`, team, documents)

- ✔ **Who We Are, Mission, Vision, values, story (2026) and the President's message** were supplied by the institute on 2026-10-11 and are used verbatim.
- ☐ **President's photo** (optional): add `src/assets/brand/president.jpg` (or .png / .webp) and it replaces the "RM" initials automatically.
- ☐ **Persian** Who We Are, Mission, Vision and story: not translated yet, so the Persian About page shows the values only.
- ☐ **Team and board** (`src/content/team/`) and **annual reports / governance PDFs** (`src/content/documents/`): no entries yet. These sections were removed from the About page (it ends with the President's message); decide where they should appear once there is real content.

## 5. Programs (`src/content/programs/`, no entries yet)

For each program, provide: title, summary, full description, audience, schedule, location, fees, facilitator, registration link (optional), photo and alt text (optional). Never describe a program as a course, class, training or school (see `CLAUDE.md`).

## 6. Events (`src/content/events/`, 4 samples)

- ☐ Replace the 2 upcoming and 2 past sample events with real ones. Each needs:
  - date and time;
  - venue and address;
  - price;
  - registration link;
  - description;
  - photo (optional).
- ☐ Sample registration links point to the Zeffy home page; replace them.

## 7. News (`src/content/news/`, 3 samples)

- ☐ Replace the 3 sample articles, or delete them and publish a first real one.
- ☐ Author names: currently « Équipe Matin ».

## 8. Gallery (`src/content/gallery/`, no albums yet)

- ☐ Real photos only, with consent from the people shown. No food or party imagery.

## 9. Get Involved (`src/content/involvement/involvement.yaml`)

- ☐ **Volunteer roles** (3 drafted roles): confirm or rewrite.
- ☐ **Volunteer intro text** and **partnership text** (`volunteerIntro`, `partnersText`): not shown until provided.

## 10. Resources (`src/content/resources/`)

- ✔ "Immigration au Québec" and "Apprendre le français" (Québec.ca) are real links, checked on 2026-10-05.
- ☐ Add partner organizations and other real resources when available.

## 11. FAQ (`src/content/faq/`, no entries yet)

- ☐ Write the real questions and answers. The answer on **tax receipts** depends on whether the institute is a registered charity.

## 12. Contact page

- ☐ Nothing specific beyond the settings in section 0. The intro sentence promises a reply "within two business days": confirm that you can keep that promise.
- ☐ Contact form subjects (`form.subjects` in `src/i18n/fr.ts` / `en.ts`): adjust the list if needed.

## 13. Legal pages (`src/content/legal/`) ⚠

All three are **drafts** and should be reviewed, ideally by a legal adviser, before launch.

- ⚠ ☐ **Privacy policy:**
  - confirm the person in charge (section 0);
  - confirm the **retention periods** (2 years for contact messages, 3 years for volunteer applications);
  - confirm the list of providers (Netlify; Brevo if used; Zeffy; Cloudflare if Turnstile is enabled);
  - add any other tool the institute uses (CRM, mailing tool, etc.);
  - carry out the **Law 25 assessment** required before transferring personal information outside Québec.
- ☐ **Terms of use:** validate.
- ☐ **Accessibility statement:** validate the 5-business-day response promise.

## 14. Interface texts written for the site (review)

These texts are not placeholders, but I wrote them. They are in `src/i18n/fr.ts` and `src/i18n/en.ts`:

- ☐ the introduction sentence under each page title (`lede`);
- ☐ the newsletter text (« une fois par mois »: confirm the frequency);
- ☐ the cookie banner text.
