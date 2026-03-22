
import { createTool } from '@mastra/core/tools';
import { PgVector } from '@mastra/pg';
import { embed } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';

export const searchNerdBrain = createTool({
  id: 'search-nerd-brain',
  description: 'Search the sovereign knowledge base (Markdown & PDFs) for relevant context.',
  inputSchema: z.object({
    query: z.string().describe('The search query to retrieve context for'),
  }),
  execute: async ({ query }) => {

    if (!process.env.DATABASE_URL) {
      return { error: 'DATABASE_URL not configured' };
    }

    try {
      const vectorStore = new PgVector({ id: 'nerd-brain', connectionString: process.env.DATABASE_URL });

      // Generate embedding for query
      const { embedding } = await embed({
        model: google.textEmbeddingModel('gemini-embedding-001'),
        value: query,
      });

      // Query vector store
      // Validated against Mastra RAG Docs (Pattern: pgVector.query with queryVector)
      const results = await vectorStore.query({
        indexName: 'nerd_brain', // Confirmed valid snake_case
        queryVector: Array.from(embedding),
        topK: 5,
        includeMetadata: true
      } as any);

      return {
        results: results.map((r: any) => ({
          score: r?.score,
          content: r?.metadata?.text || 'No text content',
          source: r?.metadata?.filename || 'Unknown source',
          type: r?.metadata?.type
        }))
      };

    } catch (error: any) {
      console.error('Search tool error:', error);
      return { error: `Failed to search nerd brain: ${error.message}` };
    }
  },
});
