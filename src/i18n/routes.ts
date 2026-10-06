/**
 * Single source of truth for localized URLs.
 * Every page has a stable key; each language has its own translated slug.
 * The language toggle and hreflang tags read from here, so FR ↔ EN always
 * point to the *equivalent* page.
 */
export const languages = ['fr', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'fr';

export const routes = {
  home: { fr: '', en: '' },
  about: { fr: 'a-propos', en: 'about' },
  programs: { fr: 'programmes', en: 'programs' },
  events: { fr: 'evenements', en: 'events' },
  news: { fr: 'actualites', en: 'news' },
  gallery: { fr: 'galerie', en: 'gallery' },
  getInvolved: { fr: 's-impliquer', en: 'get-involved' },
  resources: { fr: 'ressources', en: 'resources' },
  contact: { fr: 'contact', en: 'contact' },
  faq: { fr: 'faq', en: 'faq' },
  privacy: { fr: 'confidentialite', en: 'privacy' },
  terms: { fr: 'conditions-utilisation', en: 'terms-of-use' },
  accessibility: { fr: 'accessibilite', en: 'accessibility' },
  search: { fr: 'recherche', en: 'search' },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

/** Translated URL segments for news categories, e.g. /fr/actualites/categorie/jeunesse/ */
export const categorySegment = { fr: 'categorie', en: 'category' } as const;
export const categorySlugs = {
  language: { fr: 'langues', en: 'languages' },
  arts: { fr: 'arts', en: 'arts' },
  youth: { fr: 'jeunesse', en: 'youth' },
  community: { fr: 'communaute', en: 'community' },
  newcomers: { fr: 'nouveaux-arrivants', en: 'newcomers' },
  lectures: { fr: 'conferences', en: 'lectures' },
  music: { fr: 'musique-cinema', en: 'music-film' },
  celebration: { fr: 'fetes', en: 'celebrations' },
} as const satisfies Record<string, Record<Lang, string>>;

/** Build a localized path, e.g. path('events', 'en', 'summer-fest') → /en/events/summer-fest/ */
export function path(key: RouteKey, lang: Lang, ...rest: (string | number)[]): string {
  const parts = [lang, routes[key][lang], ...rest.map(String)].filter(Boolean);
  return `/${parts.join('/')}/`;
}

/** Same page in both languages — feeds the toggle and hreflang. */
export function alternatesFor(key: RouteKey, ...rest: (string | number)[]): Record<Lang, string> {
  return { fr: path(key, 'fr', ...rest), en: path(key, 'en', ...rest) };
}

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (languages as readonly string[]).includes(value);
}

export const otherLang = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');
