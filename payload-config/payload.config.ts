// payload-config/payload.config.ts
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. IMPORT YOUR MANUAL MAP DIRECTLY
// We use a relative path to go up one level (..), then into app/(payload)/admin/
import { importMap } from '../app/(payload)/admin/importMap';

// 2. IMPORT COLLECTIONS
import { Users } from '../collections/Users';
import { Categories } from '../collections/Categories';
import { Posts } from '../collections/Posts';
import { Media } from '../collections/Media';

// 3. IMPORT LEXICAL EDITOR
import { lexicalEditor } from '@payloadcms/richtext-lexical';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
  editor: lexicalEditor({}), // Global default Rich Text editor
  collections: [
    Users, // Must be first - required for authentication
    Posts,
    Categories,
    Media,
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: true, // Force schema sync - adds missing columns automatically
  }),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_SECRET',
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
});