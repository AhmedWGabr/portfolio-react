/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; img-src 'self' data: https://placehold.co; script-src 'none'; connect-src 'self'",
    unoptimized: true,
  },
  output: 'export',
  basePath: '/portfolio-react', // Add the repository name as the base path
};

export default nextConfig;
