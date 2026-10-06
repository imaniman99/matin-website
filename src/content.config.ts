/**
 * Content schemas. Every entry is a YAML file with French and English fields side by side.
 * A missing required field (in either language) fails the build with a clear message,
 * instead of silently producing a broken page.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categories, faqTopics, resourceCategories } from './lib/taxonomy';

/** A short bilingual text: both languages required (Bill 96: French never less complete). */
const bi = z.object({ fr: z.string().min(1), en: z.string().min(1) });
/** Optional bilingual text. */
const biOpt = z.object({ fr: z.string().default(''), en: z.string().default('') }).optional();
/** Localized URL slugs; fall back to the file name when absent. */
const slugs = z
  .object({
    fr: z.string().regex(/^[a-z0-9-]+$/),
    en: z.string().regex(/^[a-z0-9-]+$/),
  })
  .optional();
/** Local Montréal time without offset, e.g. 2026-10-24T19:00 */
const localDateTime = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/, 'Use the format YYYY-MM-DDTHH:MM');

const yaml = (dir: string) => glob({ pattern: '**/*.{yaml,yml}', base: `./src/content/${dir}` });

const programs = defineCollection({
  loader: yaml('programs'),
  schema: ({ image }) =>
    z.object({
      title: bi,
      urlSlug: slugs,
      summary: bi,
      body: bi,
      category: z.enum(categories),
      audience: bi,
      schedule: bi,
      location: bi,
      fees: bi,
      instructor: z.string().optional(),
      image: image().optional(),
      imageAlt: biOpt,
      registrationUrl: z.url().optional(),
      order: z.number().default(100),
      placeholder: z.boolean().default(false),
    }),
});

const events = defineCollection({
  loader: yaml('events'),
  schema: ({ image }) =>
    z
      .object({
        title: bi,
        urlSlug: slugs,
        summary: bi,
        body: bi,
        category: z.enum(categories),
        start: localDateTime,
        end: localDateTime.optional(),
        location: z.object({
          name: z.string(),
          address: z.string(),
          mapUrl: z.url().optional(),
        }),
        price: z
          .object({
            free: z.boolean().default(true),
            label: biOpt, // e.g. « 15 $ / 10 $ étudiants »
          })
          .default({ free: true }),
        image: image().optional(),
        imageAlt: biOpt,
        registrationUrl: z.url().optional(),
        placeholder: z.boolean().default(false),
      })
      .refine((e) => !e.end || e.end > e.start, {
        message: 'End time must be after start time',
        path: ['end'],
      }),
});

const news = defineCollection({
  loader: yaml('news'),
  schema: ({ image }) =>
    z.object({
      title: bi,
      urlSlug: slugs,
      excerpt: bi,
      body: bi,
      date: z.coerce.date(),
      author: z.string(),
      categories: z.array(z.enum(categories)).default([]),
      tags: z.array(z.string()).default([]),
      image: image().optional(),
      imageAlt: biOpt,
      placeholder: z.boolean().default(false),
    }),
});

const testimonials = defineCollection({
  loader: yaml('testimonials'),
  schema: z.object({
    quote: bi,
    name: z.string(),
    role: biOpt,
    order: z.number().default(100),
    placeholder: z.boolean().default(false),
  }),
});

const partners = defineCollection({
  loader: yaml('partners'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      logo: image().optional(),
      url: z.url().optional(),
      order: z.number().default(100),
      placeholder: z.boolean().default(false),
    }),
});

const settings = defineCollection({
  loader: yaml('settings'),
  schema: z.object({
    mission: bi,
    founded: z.number().int().optional(),
    address: z.object({
      street: z.string(),
      city: z.string().default('Montréal'),
      region: z.string().default('QC'),
      postalCode: z.string(),
      country: z.string().default('CA'),
    }),
    phone: z.string(),
    email: z.string(),
    hours: bi,
    social: z.object({
      facebook: z.url().optional(),
      instagram: z.url().optional(),
      youtube: z.url().optional(),
      linkedin: z.url().optional(),
    }),
    charityNumber: z.string().optional(),
    donateUrl: z.url(),
    /** Law 25: person in charge of the protection of personal information. */
    privacyOfficer: z.object({
      name: z.string(),
      title: bi,
      email: z.string(),
    }),
    impact: z.object({
      years: z.number(),
      cultures: z.number(),
      participants: z.number(),
      events: z.number(),
    }),
    placeholder: z.boolean().default(false),
  }),
});

const team = defineCollection({
  loader: yaml('team'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: bi,
      bio: bi,
      photo: image().optional(),
      group: z.enum(['staff', 'board']),
      order: z.number().default(100),
      placeholder: z.boolean().default(false),
    }),
});

/** Page-level content for "About" (vision, values, history, director's message). */
const about = defineCollection({
  loader: yaml('about'),
  schema: ({ image }) =>
    z.object({
      vision: bi,
      values: z.array(
        z.object({
          title: bi,
          text: bi,
          icon: z.enum(['dialogue', 'respect', 'openness', 'creativity', 'community', 'equity']),
        }),
      ),
      history: z.array(z.object({ year: z.string(), title: bi, text: bi })),
      director: z.object({
        name: z.string(),
        title: bi,
        message: bi,
        photo: image().optional(),
      }),
      placeholder: z.boolean().default(false),
    }),
});

/** Downloadable governance documents (annual reports, bylaws…). PDFs go in public/documents/. */
const documents = defineCollection({
  loader: yaml('documents'),
  schema: z.object({
    title: bi,
    year: z.number().int(),
    file: z
      .string()
      .regex(/^\/documents\/.+\.pdf$/, 'Use a path like /documents/rapport-2025.pdf')
      .optional(),
    order: z.number().default(100),
    placeholder: z.boolean().default(false),
  }),
});

const gallery = defineCollection({
  loader: yaml('gallery'),
  schema: ({ image }) =>
    z.object({
      title: bi,
      date: z.coerce.date(),
      description: biOpt,
      photos: z
        .array(z.object({ image: image(), alt: bi, caption: biOpt }))
        .min(1, 'An album needs at least one photo'),
      videos: z
        .array(
          z.object({
            youtubeId: z.string().regex(/^[\w-]{11}$/, 'Paste the 11-character YouTube video ID'),
            title: bi,
          }),
        )
        .default([]),
      placeholder: z.boolean().default(false),
    }),
});

const faq = defineCollection({
  loader: yaml('faq'),
  schema: z.object({
    topic: z.enum(faqTopics),
    question: bi,
    answer: bi,
    order: z.number().default(100),
    placeholder: z.boolean().default(false),
  }),
});

const resources = defineCollection({
  loader: yaml('resources'),
  schema: z
    .object({
      title: bi,
      description: bi,
      category: z.enum(resourceCategories),
      url: z.url().optional(),
      file: z.string().optional(), // e.g. /documents/guide-nouveaux-arrivants.pdf
      order: z.number().default(100),
      placeholder: z.boolean().default(false),
    })
    .refine((r) => r.url || r.file, { message: 'Provide either a link (url) or a file' }),
});

/** Get Involved page content: membership tiers, volunteer roles, donation impact. */
const involvement = defineCollection({
  loader: yaml('involvement'),
  schema: z.object({
    membershipIntro: bi,
    membershipUrl: z.url().optional(),
    tiers: z.array(
      z.object({
        name: bi,
        price: bi,
        benefits: z.array(bi),
        featured: z.boolean().default(false),
      }),
    ),
    volunteerIntro: bi,
    roles: z.array(z.object({ title: bi, text: bi })),
    partnersText: bi,
    donateText: bi,
    impactExamples: z.array(z.object({ amount: z.number(), text: bi })),
    placeholder: z.boolean().default(false),
  }),
});

/** Legal pages: privacy, terms, accessibility. Body is Markdown. */
const legal = defineCollection({
  loader: yaml('legal'),
  schema: z.object({
    title: bi,
    updated: z.coerce.date(),
    body: bi,
    placeholder: z.boolean().default(false),
  }),
});

export const collections = {
  programs,
  events,
  news,
  testimonials,
  partners,
  settings,
  team,
  about,
  documents,
  gallery,
  faq,
  resources,
  involvement,
  legal,
};
