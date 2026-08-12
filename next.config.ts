/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Disables persistent disk cache to prevent macOS ENOENT rename crashes
    config.cache = false;
    return config;
  },
};

export default nextConfig;