import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    transpilePackages: ['three'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.eu-west-3.amazonaws.com',
                pathname: '/833910365045-portfolio/**', // adapte si ton chemin change
            },
            {
                protocol: 'https',
                hostname: '**.tile.openstreetmap.org', // wildcard tile subdomains (a.tile, b.tile, etc.)
            },
        ],
    },
};

export default nextConfig;
