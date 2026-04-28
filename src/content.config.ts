import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  category: z.enum(['case', 'experiment', 'field-note']),
  date: z.date(),
  lede: z.string(),
  temperature: z.enum(['risk', 'medium', 'low']),
  footerType: z.enum(['analysis', 'beef']),
  author: z.string().optional().default('ณัฐพล'),
  readTime: z.string().optional(),
  wordCount: z.number().optional(),
  code: z.string().optional(),
  sidenote: z.string().optional(),
  latest: z.boolean().optional(),
});

export const collections = {
  'case': defineCollection({ loader: glob({ pattern: "**/*.mdx", base: "./src/content/case" }), schema: articleSchema }),
  'experiment': defineCollection({ loader: glob({ pattern: "**/*.mdx", base: "./src/content/experiment" }), schema: articleSchema }),
  'field-note': defineCollection({ loader: glob({ pattern: "**/*.mdx", base: "./src/content/field-note" }), schema: articleSchema }),
};
