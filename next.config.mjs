import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable strict linting during build to prevent config errors from blocking deployment
    eslint: {
        ignoreDuringBuilds: true,
    },
    
    // 1. CRITICAL: Remove "output: export" to allow server-side rendering.

    // 2. Prevent Next.js from trying to bundle these server-side packages
    serverExternalPackages: [
        '@payloadcms/bundler-webpack',
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

    // 4. SILENCE THE NOISE (Updated for Next.js 15 / Sass 3.0)
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

    // 5. Ensure Webpack is used
    webpack: (config) => {
        return config;
    },
};

// Wrap the config with Payload's utility
export default withPayload(nextConfig);