import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
  title: z.string(),
  category: z.enum(['case', 'experiment', 'field-note']),
  date: z.date(),
  lede: z.string(),
  temperature: z.enum(['risk', 'medium', 'low']),
  footerType: z.enum(['analysis', 'cooking']),
  author: z.string().optional().default('ณัฐพล'),
  readTime: z.string().optional(),
  wordCount: z.number().optional(),
  code: z.string().optional(),
  sidenote: z.string().optional(),
  latest: z.boolean().optional(),
});

export const collections = {
  'case': defineCollection({ type: 'content', schema: articleSchema }),
  'experiment': defineCollection({ type: 'content', schema: articleSchema }),
  'field-note': defineCollection({ type: 'content', schema: articleSchema }),
};
