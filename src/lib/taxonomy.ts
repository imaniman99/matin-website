/** Fixed lists shared by the content schemas, the CMS and the pages. */
export const categories = [
  'language',
  'arts',
  'youth',
  'community',
  'newcomers',
  'lectures',
  'music',
  'celebration',
] as const;
export type Category = (typeof categories)[number];

export const faqTopics = ['general', 'programs', 'events', 'volunteering', 'donations'] as const;

export const resourceCategories = ['guide', 'newcomers', 'community', 'partners'] as const;

/** News categories: official Matin news, and Matin's own reflections on Montréal culture. */
export const newsCategories = ['updates', 'community'] as const;
export type NewsCategory = (typeof newsCategories)[number];
