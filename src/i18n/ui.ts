import fr, { type Dictionary } from './fr';
import en from './en';
import type { Lang } from './routes';
import { typo } from '@/lib/frenchTypo';

const dictionaries: Record<Lang, Dictionary> = { fr, en };

// Dotted key paths into the dictionary, e.g. "nav.about".
type Leaves<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends string ? `${P}${K}` : Leaves<T[K], `${P}${K}.`>;
}[keyof T & string];
export type TKey = Leaves<Dictionary>;

/**
 * Returns a translator bound to one language.
 * `t('carousel.slideOf', { n: 1, total: 3 })` → "Témoignage 1 sur 3"
 */
export function useTranslations(lang: Lang) {
  const dict = dictionaries[lang];
  return function t(key: TKey, vars?: Record<string, string | number>): string {
    let value: unknown = dict;
    for (const part of key.split('.')) value = (value as Record<string, unknown>)?.[part];
    if (typeof value !== 'string') throw new Error(`Missing translation "${key}" for ${lang}`);
    const filled = vars
      ? value.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`))
      : value;
    return typo(filled, lang);
  };
}

/** Pick the right language from a bilingual content field { fr, en }. */
export function pick<T>(field: { fr: T; en: T } | undefined, lang: Lang): T | undefined {
  if (!field) return undefined;
  const value = field[lang];
  return typeof value === 'string' ? (typo(value, lang) as T) : value;
}
