import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 1. CRITICAL: Remove "output: export" to allow server-side rendering.

    // 2. Prevent Next.js from trying to bundle these server-side packages
    serverExternalPackages: [
        '@payloadcms/bundler-webpack',
        '@payloadcms/db-postgres',
        'payload',
        'sharp',
        'express',
        'graphql'
    ],

    // 3. Allow standard image optimization
    images: {
        unoptimized: true,
    },

    // 4. SILENCE THE NOISE (The new part)
    // This suppresses the "Sass @import rules are deprecated" warnings
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
        quietDeps: true,
    },

    // 5. Ensure Webpack is used
    webpack: (config) => {
        return config;
    },
};

// Wrap the config with Payload's utility
export default withPayload(nextConfig);