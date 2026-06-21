import type { NextConfig } from "next";

const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel-insights.com https://*.vercel-insights.com https://plausible.io https://cdn.plausible.io https://www.googletagmanager.com",
  "connect-src 'self' https://vitals.vercel-insights.com https://api.vercel-insights.com https://plausible.io https://stats.plausible.io",
  "upgrade-insecure-requests"
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=()' },
          { key: 'Content-Security-Policy', value: ContentSecurityPolicy }
        ]
      }
    ];
  }
};

export default nextConfig;
