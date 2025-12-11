/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // 👈 CRITICAL: Static Export
    images: {
        unoptimized: true, // Required for 'export' unless using custom loader
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.graphassets.com',
            },
            {
                protocol: 'https',
                hostname: 'ap-south-1.graphassets.com',
            }
        ],
    },
    trailingSlash: true,
};

export default nextConfig;
