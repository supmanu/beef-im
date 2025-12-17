import { buildConfig } from 'payload'; // ✅ Fixed: Imported directly from 'payload'
import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';

// Import your collections
import { Users } from '../collections/Users';
import { Posts } from '../collections/Posts';
import { Categories } from '../collections/Categories';
import { Media } from '../collections/Media';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    // Note: importMap is now handled automatically via layout.tsx
  },

  // Keep the editor config
  editor: lexicalEditor({}),

  collections: [
    Users,
    Posts,
    Categories,
    Media,
  ],

  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // In production, you might want to disable push and use migrations instead
    push: true,
  }),

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET_NAME || 'nwn-assets',
      config: {
        endpoint: process.env.R2_ENDPOINT,
        region: process.env.R2_REGION || 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
      },
    }),
  ],

  serverURL: process.env.NODE_ENV === 'production' ? process.env.PAYLOAD_PUBLIC_SERVER_URL : undefined,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});