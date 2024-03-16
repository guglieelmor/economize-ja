/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: 'loose',
  },
  images: {
    domains: ['github.com', 'bmwkzuyijstlnsevtxlm.supabase.co']
  },
};

module.exports = nextConfig;
