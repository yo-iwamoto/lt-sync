/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  pageExtensions: ['page.tsx', 'handler.ts'],
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com', // for Google OAuth user
      'avatars.githubusercontent.com', // for GitHub OAuth user
    ],
  },
  experimental: {
    outputStandalone: true,
  },
};
