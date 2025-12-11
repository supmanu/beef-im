/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    // 🛑 RATE LIMIT PROTECTION
    // Force Next.js to build pages sequentially (1 by 1) to avoid hitting
    // Hygraph's "Too Many Requests" API limit.
    experimental: {
        workerThreads: false,
        cpus: 1,
    },

    images: {
        unoptimized: true,
    },
};

export default nextConfig;
