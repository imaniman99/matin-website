import type { Lang } from '@/i18n/routes';
import { NBSP } from './frenchTypo';

export const TIME_ZONE = 'America/Toronto'; // Montréal uses Eastern Time.

/**
 * Event times are entered in the CMS as Montréal local time without an offset
 * ("2026-10-24T19:00"). Convert them to a real instant, accounting for EST/EDT.
 */
export function montrealTime(local: string): Date {
  const [datePart, timePart = '00:00'] = local.split('T');
  const [y, m, d] = datePart.split('-').map(Number);
  const [hh, mm] = timePart.split(':').map(Number);
  const asUtc = Date.UTC(y, m - 1, d, hh, mm);
  // Offset of Montréal at (approximately) that instant, in minutes.
  const offset = tzOffsetMinutes(new Date(asUtc));
  const guess = new Date(asUtc - offset * 60_000);
  // Re-check once in case the guess crossed a DST boundary.
  const offset2 = tzOffsetMinutes(guess);
  return offset2 === offset ? guess : new Date(asUtc - offset2 * 60_000);
}

function tzOffsetMinutes(date: Date): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TIME_ZONE,
      hourCycle: 'h23',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  const local = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return Math.round((local - date.getTime()) / 60_000);
}

const locale = (lang: Lang) => (lang === 'fr' ? 'fr-CA' : 'en-CA');

/**
 * « 4 octobre 2026 » / "October 4, 2026".
 * `dateOnly` for calendar dates parsed from YAML (stored as UTC midnight).
 */
export function formatDate(date: Date, lang: Lang, dateOnly = true): string {
  return new Intl.DateTimeFormat(locale(lang), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: dateOnly ? 'UTC' : TIME_ZONE,
  }).format(date);
}

/** « samedi 24 octobre 2026 » / "Saturday, October 24, 2026" */
export function formatLongDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(locale(lang), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: TIME_ZONE,
  }).format(date);
}

/** Québec 24 h style « 19 h » / « 19 h 30 »; English "7:00 p.m." */
export function formatTime(date: Date, lang: Lang): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TIME_ZONE,
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  );
  if (lang === 'fr') {
    const h = String(Number(parts.hour));
    return parts.minute === '00' ? `${h}${NBSP}h` : `${h}${NBSP}h${NBSP}${parts.minute}`;
  }
  return new Intl.DateTimeFormat('en-CA', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: TIME_ZONE,
  }).format(date);
}

export function formatTimeRange(start: Date, end: Date | undefined, lang: Lang): string {
  return end ? `${formatTime(start, lang)} – ${formatTime(end, lang)}` : formatTime(start, lang);
}

/** Short pieces for date badges: { day: "24", month: "oct." } */
export function dateBadge(date: Date, lang: Lang) {
  const day = new Intl.DateTimeFormat(locale(lang), { day: 'numeric', timeZone: TIME_ZONE }).format(
    date,
  );
  const month = new Intl.DateTimeFormat(locale(lang), {
    month: 'short',
    timeZone: TIME_ZONE,
  }).format(date);
  return { day, month };
}
