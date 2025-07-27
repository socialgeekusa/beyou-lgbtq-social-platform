import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable static export for mobile deployment
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  experimental: {
    esmExternals: false,
  },
  // Configure for mobile deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : '',
  // PWA configuration will be added here
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

export default nextConfig
