// payload-config/payload.config.ts
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. IMPORT YOUR MANUAL MAP DIRECTLY
// We use a relative path to go up one level (..), then into app/(payload)/admin/
import { importMap } from '../app/(payload)/admin/importMap';

// 2. IMPORT COLLECTIONS
import { Categories } from '../collections/Categories';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const Posts = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'content',
      type: 'textarea' as const,
    },
  ],
};

export default buildConfig({
  // In dev, omit serverURL to let Payload auto-detect. In production, set via env.
  serverURL: process.env.NODE_ENV === 'production' ? process.env.PAYLOAD_PUBLIC_SERVER_URL : undefined,
  admin: {
    // 2. HARD-WIRE THE MAP HERE
    // This tells Payload: "Stop looking. Here is the map."
    importMap,
    meta: {
      titleSuffix: ' | Nerd With Nart',
      icons: [{ rel: 'icon', url: '/favicon.ico' }],
    },
  },
  collections: [
    Posts,
    Categories,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_SECRET',
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
});