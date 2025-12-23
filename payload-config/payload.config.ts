import { buildConfig } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import {
  BlockquoteFeature,
  BlocksFeature,
  CodeBlock,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalHTML,
  LinkFeature,
} from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import sharp from 'sharp';

// Import your collections
import { Users } from '../collections/Users';
import { Posts } from '../collections/Posts';
import { Categories } from '../collections/Categories';
import { Media } from '../collections/Media';
import { Articles } from '../collections/Articles';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    // Note: importMap is now handled automatically via layout.tsx
  },

  // Keep the editor config
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(),
      BlockquoteFeature(),
      BlocksFeature({
        blocks: [CodeBlock()],
      }),
      HorizontalRuleFeature(),
      LinkFeature({
        enabledCollections: ['articles'],
      }),
    ],
  }),

  collections: [
    Users,
    Posts,
    Categories,
    Media,
    Articles,
  ],

  sharp,

  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_HERE',

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // 🛡️ THE SOVEREIGN SHIELD: 
    // Setting this to false prevents Payload from automatically 
    // trying to manage (and delete) tables it doesn't recognize (like nerd_brain).
    push: false,
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