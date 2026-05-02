import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  date: z.date(),
  lede: z.string(),

  // Free-form badge label rendered top-left of article (e.g. "EXPERIMENT LOG",
  // "CASE FILE", "FIELD NOTE", "บันทึก"). Omit for no badge.
  format: z.string().optional(),

  // Display
  temperature: z.enum(['risk', 'medium', 'low']).optional(),
  readTime: z.string().optional(),
  wordCount: z.number().optional(),
  code: z.string().optional(),
  sidenote: z.string().optional(),
  latest: z.boolean().optional(),

  // Cross-linking (Phase 3)
  soulmate: z.string().optional(),
  references: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional(),
});

export const collections = {
  insurance: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/insurance' }),
    schema: articleSchema,
  }),
  meat: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/meat' }),
    schema: articleSchema,
  }),
  note: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/note' }),
    schema: articleSchema,
  }),
};
