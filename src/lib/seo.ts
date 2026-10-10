import type { UiLang } from '@/i18n/routes';
import type { getSettings } from './content';

type Settings = Awaited<ReturnType<typeof getSettings>>;

/** schema.org NGO for the whole site (name, logo, address, social profiles). */
export function organizationJsonLd(
  settings: Settings,
  lang: UiLang,
  site: URL,
  description: string,
) {
  const sameAs = Object.values(settings.social).filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': new URL('/#organization', site).href,
    name: lang === 'fr' ? 'Institut interculturel Matin' : 'Matin Intercultural Institute',
    alternateName: [
      lang === 'fr' ? 'Matin Intercultural Institute' : 'Institut interculturel Matin',
      'مؤسسه بین‌فرهنگی متین',
    ],
    slogan: lang === 'fr' ? 'Cultures en dialogue' : 'Cultures in Dialogue',
    url: new URL(`/${lang}/`, site).href,
    logo: new URL('/icons/logo-512.png', site).href,
    image: new URL('/og-default.jpg', site).href,
    description,
    email: settings.email,
    telephone: settings.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address.street,
      addressLocality: settings.address.city,
      addressRegion: settings.address.region,
      postalCode: settings.address.postalCode,
      addressCountry: settings.address.country,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[], site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.url, site).href,
    })),
  };
}
