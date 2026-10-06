/**
 * Cookie consent (Québec Law 25: privacy by default).
 * Nothing optional runs until the visitor says yes; refusing is as easy as accepting.
 * The choice is kept in localStorage (no cookie) and can be changed at any time
 * from the "Manage cookies" link in the footer.
 */
import { PUBLIC_ANALYTICS_PROVIDER, PUBLIC_GA_ID, PUBLIC_PLAUSIBLE_DOMAIN } from 'astro:env/client';

const KEY = 'matin-consent';
const VERSION = 1; // bump to ask everyone again after a policy change

export interface Consent {
  v: number;
  analytics: boolean;
  date: string;
}

export function readConsent(): Consent | null {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Consent | null;
    return raw && raw.v === VERSION ? raw : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean): Consent {
  const consent = { v: VERSION, analytics, date: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(consent));
  } catch {
    /* private mode: the choice simply isn't remembered */
  }
  applyConsent(consent);
  return consent;
}

export const analyticsEnabled = PUBLIC_ANALYTICS_PROVIDER !== 'none';

let loaded = false;

/** Loads (or unloads) analytics according to the consent. */
export function applyConsent(consent: Consent | null) {
  if (!consent?.analytics) {
    if (loaded) {
      // Withdrawn consent: remove GA cookies, then reload so no script keeps running.
      for (const c of document.cookie.split(';')) {
        const name = c.split('=')[0].trim();
        if (name.startsWith('_ga')) {
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, '')}`;
          document.cookie = `${name}=; Max-Age=0; path=/`;
        }
      }
      location.reload();
    }
    return;
  }
  if (loaded || !analyticsEnabled) return;
  loaded = true;

  if (PUBLIC_ANALYTICS_PROVIDER === 'plausible' && PUBLIC_PLAUSIBLE_DOMAIN) {
    const s = document.createElement('script');
    s.defer = true;
    s.src = 'https://plausible.io/js/script.js';
    s.dataset.domain = PUBLIC_PLAUSIBLE_DOMAIN;
    document.head.append(s);
  }

  if (PUBLIC_ANALYTICS_PROVIDER === 'ga4' && PUBLIC_GA_ID) {
    const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer.push(arguments);
    };
    w.gtag('js', new Date());
    w.gtag('config', PUBLIC_GA_ID, { anonymize_ip: true, allow_google_signals: false });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(PUBLIC_GA_ID)}`;
    document.head.append(s);
  }
}
