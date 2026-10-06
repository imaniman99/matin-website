import type { APIRoute, GetStaticPaths } from 'astro';
import { getEvents, slugOf, type EventEntry } from '@/lib/content';
import { eventIcs } from '@/lib/calendar';
import { languages, path, type Lang } from '@/i18n/routes';

/** One .ics file per event and language: /ics/<event-id>-fr.ics */
export const getStaticPaths = (async () => {
  const events = await getEvents();
  return events.flatMap((event) =>
    languages.map((lang) => ({ params: { file: `${event.id}-${lang}` }, props: { event, lang } })),
  );
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const { event, lang } = props as { event: EventEntry; lang: Lang };
  const url = new URL(path('events', lang, slugOf(event, lang)), site).href;
  return new Response(eventIcs(event, lang, url), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
