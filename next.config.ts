import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/canteen',
  images: { unoptimized: true },
  trailingSlash: true,
}

export default nextConfig
