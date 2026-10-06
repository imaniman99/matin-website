# Contenu à fournir avant la mise en ligne · Content to provide before launch

Everything below is **invented sample content** or a decision that only the institute can make.

- Texts containing `[PLACEHOLDER]` are visible on the site until replaced.
- Every build prints the list of content files still marked `placeholder: true`. That list should be empty before launch.
- How to edit each file: see [`GUIDE_ADMIN.md`](GUIDE_ADMIN.md).

Legend: ☐ to do · ⚠ important / legal

---

## 0. Organization-wide (`src/content/settings/site.yaml`)

These details appear on many pages (footer, Contact, About, structured data for Google).

- ☐ **Mission** (FR + EN, 1–3 sentences). The current text is a placeholder.
- ☐ **Founding year** (`founded`). Currently the sample value `2020`.
- ☐ **Street address and postal code.**
- ☐ **Phone.**
- ☐ **Public email** (currently `info@matin-institut.example`).
- ☐ **Opening hours** (FR + EN).
- ☐ **Social media URLs.** They currently point to the generic Facebook / Instagram / YouTube / LinkedIn home pages. Delete any network the institute doesn't use.
- ☐ **Registered charity number** (`charityNumber`). Leave empty if there is none: the tax-receipt sentence then stays hidden on the Donate section.
- ☐ **Donation page URL** (`donateUrl`). Currently the Zeffy home page; replace it with the institute's own Zeffy, CanadaHelps or Stripe page.
- ☐ **Impact numbers** (years, cultures, participants, events). These are sample figures.
- ⚠ ☐ **Person in charge of personal information** (`privacyOfficer`: name, title, email). Law 25 requires this person to be named, and the privacy policy displays it.

## 1. Domain, accounts and settings (technical contact)

- ☐ **Domain name.** Set `SITE_URL` in Netlify. It's used for canonical URLs, the sitemap and share previews.
- ☐ **GitHub repository and Netlify site** (see README → Deploying).
- ☐ **Build hook** → `BUILD_HOOK_URL` (daily rebuild for past events).
- ☐ **Deploy-failed email notification** for the content editor.
- ☐ **Form notification emails** (where contact and volunteer messages are sent).
- ☐ **Newsletter:** keep the default (stored in Netlify Forms) or create a Brevo account (API key, FR/EN lists, double opt-in template).
- ☐ **Analytics:** none (default), Plausible (≈ US$9/month, cookieless) or GA4.
- ☐ **Anti-spam:** Cloudflare Turnstile keys, only if spam becomes a problem.
- ☐ Fill in the **GitHub address** and **technical contact** at the end of `GUIDE_ADMIN.md` (FR and EN).

## 2. Brand

- ☐ **Vector logo (SVG)** from a designer. The current logos are JPG images. The header and hero recreate the wordmark in HTML/SVG, but an official SVG would make the favicon, footer logo and share image sharper and would allow a true monochrome version.
- ☐ Once you have the final logo: replace `assets/logo-circle.jpg`, then run `npm run icons`.
- ☐ Optional: a custom **share image** (`public/og-default.jpg`, 1200×630) with a real photo.

## 3. Home (`/fr/`)

The home page pulls most of its content from the collections below. Its own texts are in `src/i18n/fr.ts` / `en.ts` (`home` section). **I wrote them; please review:**

- ☐ Hero line « Un lieu de rencontre, à Montréal, où les cultures se découvrent… »
- ☐ « Un pont entre les cultures, au cœur de Montréal »
- ☐ Section intros (programs, events, call to action « Faites partie du dialogue »).
- ☐ **Testimonials** (`src/content/testimonials/`, 3 files). They're invented: replace them with real quotes, **with each person's permission**.
- ☐ **Partners** (`src/content/partners/`, 5 files). Add each partner's name, URL and logo, or delete the files to hide the strip.

## 4. About (`src/content/about/about.yaml`, team, documents)

- ☐ **Vision** (placeholder).
- ☐ **Values:** six values were drafted (Dialogue, Respect, Ouverture, Créativité, Communauté, Équité). Confirm or rewrite them.
- ☐ **History timeline:** 4 sample milestones (2020–2026). Replace them with the real story.
- ☐ **Message from the director:** name, title, the message itself, and a photo (optional).
- ☐ **Team and board** (`src/content/team/`, 4 sample people): names, roles, short bios, photos (optional; initials are shown otherwise). Get each person's consent to publish.
- ☐ **Annual reports and governance PDFs** (`src/content/documents/`, 2 samples). Put the PDFs in `public/documents/` and set `file: /documents/name.pdf`. Until then they show "Bientôt disponible".

## 5. Programs (`src/content/programs/`, 3 samples)

For each program, provide:

- ☐ title;
- ☐ summary;
- ☐ full description;
- ☐ audience;
- ☐ schedule;
- ☐ location;
- ☐ fees;
- ☐ instructor;
- ☐ registration link (optional; without one, the button sends people to the Contact page);
- ☐ photo and alt text (optional; a branded illustration is shown otherwise).

The samples are: francisation et conversation · arts et traditions · jeunes ambassadeurs. Rename, replace or delete them.

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

## 8. Gallery (`src/content/gallery/`, 1 sample album)

- ☐ The 6 photos in `src/assets/uploads/gallery/fete-ete-2026/` are **generated illustrations** labelled "Photo provisoire". Replace them with real photos, with consent from the people shown.
- ☐ The sample video ID (`XXXXXXXXXXX`) doesn't exist and won't play. Replace it with a real YouTube video ID, or remove the `videos` entry.

## 9. Get Involved (`src/content/involvement/involvement.yaml`)

- ☐ **Membership tiers:** names, prices, benefits (3 samples: Étudiant·e / Individuel / Famille).
- ☐ **Membership sign-up link** (`membershipUrl`). Currently the Zeffy home page.
- ☐ **Volunteer roles** (3 samples) and the volunteer intro text.
- ☐ **Partnership text** and **donation text.**
- ☐ **"Your gift in action" examples** (25 $ / 50 $ / 100 $). These must be **true** before they go online.

## 10. Resources (`src/content/resources/`)

- ✔ "Immigration au Québec" and "Apprendre le français" (Québec.ca) are real links, checked on 2026-10-05.
- ☐ « Guide d'accueil » (sample): provide the real guide (PDF in `public/documents/` + `file:`) or remove it.
- ☐ « Ville de Montréal – diversité et inclusion »: confirm or replace with a more precise page.
- ☐ Partner organization (sample): add the real partners.

## 11. FAQ (`src/content/faq/`, 6 samples)

- ☐ Check every question and answer. The answer on **tax receipts** depends on whether the institute is a registered charity.

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
- ☐ **Accessibility statement:** validate the "known limitations" paragraph and the 5-business-day response promise.

## 14. Interface texts written for the site (review)

These texts are not placeholders, but I wrote them. They are in `src/i18n/fr.ts` and `src/i18n/en.ts`:

- ☐ the introduction sentence under each page title (`lede`);
- ☐ the newsletter text (« une fois par mois »: confirm the frequency);
- ☐ the cookie banner text.
