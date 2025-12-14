/** @type {import('next').NextConfig} */
const nextConfig = {
    // 1. CRITICAL: Remove "output: export" to allow server-side rendering for the Admin UI.

    // 2. Prevent Next.js from trying to bundle these server-side packages
    serverExternalPackages: [
        '@payloadcms/bundler-webpack',
        '@payloadcms/db-postgres',
        'payload',
        'sharp',
        'express',
        'graphql'
    ],

    // 3. Allow standard image optimization (unless you specifically need unoptimized)
    images: {
        unoptimized: true,
    },

    // 4. Ensure Webpack is used (redundant with --webpack flag but good for safety)
    webpack: (config) => {
        return config;
    },
};

export default nextConfig;