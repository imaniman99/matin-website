/**
 * Rebuilds the site every morning so that events that ended yesterday move to
 * "Past events", and the home page always shows the next upcoming ones.
 *
 * Setup (once, in Netlify): Site configuration → Build & deploy → Build hooks →
 * "Add build hook", then save its URL as the environment variable BUILD_HOOK_URL.
 */
import type { Config } from '@netlify/functions';

export default async () => {
  const hook = process.env.BUILD_HOOK_URL;
  if (!hook) {
    console.warn('BUILD_HOOK_URL is not set — skipping the daily rebuild.');
    return new Response('BUILD_HOOK_URL not configured', { status: 200 });
  }
  const res = await fetch(`${hook}?trigger_title=${encodeURIComponent('Daily rebuild (events)')}`, {
    method: 'POST',
  });
  console.log(`Daily rebuild triggered: HTTP ${res.status}`);
  return new Response(null, { status: res.ok ? 200 : 502 });
};

export const config: Config = {
  // 09:15 UTC = 05:15 in Montréal in summer (EDT), 04:15 in winter (EST):
  // after every evening event has ended, before anyone checks the site.
  schedule: '15 9 * * *',
};
