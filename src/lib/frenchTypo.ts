/**
 * Québec French typography (OQLF conventions):
 *  - non-breaking space before the colon « : »
 *  - non-breaking spaces inside guillemets « like this »
 *  - NO space before ; ! ? (unlike France)
 *
 * Only touches spaces that are already adjacent to the punctuation, so URLs,
 * times like 19:00 and Markdown syntax are left alone.
 */
export const NBSP = String.fromCharCode(0x00a0); // non-breaking space
const NNBSP = String.fromCharCode(0x202f); // narrow non-breaking space

const anySpace = `[ ${NBSP}${NNBSP}]`;
const openQuote = new RegExp(`«${anySpace}*`, 'g');
const closeQuote = new RegExp(`${anySpace}*»`, 'g');
const beforeColon = new RegExp(`[ ${NNBSP}]+:`, 'g');
const beforeStrongPunct = new RegExp(`${anySpace}+([;!?])`, 'g');

export function frenchTypo(input: string): string {
  return input
    .replace(openQuote, `«${NBSP}`)
    .replace(closeQuote, `${NBSP}»`)
    .replace(beforeColon, `${NBSP}:`)
    .replace(beforeStrongPunct, '$1');
}

/** Applies French typography only when the language is French. */
export const typo = (text: string, lang: string): string =>
  lang === 'fr' ? frenchTypo(text) : text;
