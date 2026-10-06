// Build-time safety net: lists every content entry still flagged `placeholder: true`
// so that invented sample content never goes live unnoticed.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(ya?ml|json|md|mdoc)$/.test(entry.name)) out.push(full);
  }
  return out;
}

/** @returns {import('astro').AstroIntegration} */
export default function placeholderReport() {
  let root = '';
  return {
    name: 'matin:placeholder-report',
    hooks: {
      'astro:config:done': ({ config }) => {
        root = fileURLToPath(config.root);
      },
      'astro:build:done': async ({ logger }) => {
        const contentDir = join(root, 'src', 'content');
        const files = await walk(contentDir).catch(() => []);
        const flagged = [];
        for (const file of files) {
          const text = await readFile(file, 'utf8');
          if (/^\s*"?placeholder"?\s*:\s*true\b/m.test(text)) flagged.push(relative(root, file));
        }
        if (flagged.length === 0) {
          logger.info('No placeholder content left. ✔');
          return;
        }
        const bar = '━'.repeat(64);
        logger.warn(
          [
            '',
            bar,
            `⚠  ${flagged.length} content entr${flagged.length > 1 ? 'ies are' : 'y is'} still marked placeholder: true`,
            '   Replace with real content before launch (see CONTENT_TODO.md):',
            ...flagged.map((f) => `   • ${f.replaceAll('\\', '/')}`),
            bar,
          ].join('\n'),
        );
      },
    },
  };
}
