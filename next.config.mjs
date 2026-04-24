import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 1. CRITICAL: Remove "output: export" to allow server-side rendering.

    // 2. Prevent Next.js from trying to bundle these server-side packages
    serverExternalPackages: [
        '@payloadcms/db-postgres',
        'payload',
        'sharp',
        'express',
        'graphql',
        '@mastra/*'
    ],

    // 3. Allow standard image optimization
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.graphassets.com',
            },
            {
                protocol: 'https',
                hostname: 'nerd-with-nart.vercel.app',
            },
            {
                protocol: 'https',
                hostname: 'assets.nerdwithnart.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'beef.im',
            },
            {
                protocol: 'https',
                hostname: 'www.beef.im',
            },
            {
                protocol: 'https',
                hostname: 'assets.beef.im',
            },
            {
                protocol: 'https',
                hostname: '**.r2.dev',
            },
            {
                protocol: 'https',
                hostname: '**.r2.cloudflarestorage.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
            },
        ],
    },

    // 4. SILENCE THE NOISE (Updated for Next.js 16 / Sass 3.0)
    sassOptions: {
        // We add 'import' to silence the specific warning you are seeing
        silenceDeprecations: ['legacy-js-api', 'import'],
        quietDeps: true,
        logger: {
            warn: function (message) {
                // filter out specific deprecation warnings
                if (message.includes('Deprecation Warning')) return;
                console.warn(message);
            },
        },
    },

};

// Wrap the config with Payload's utility
export default withPayload(nextConfig);