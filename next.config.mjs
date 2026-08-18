/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  experimental: {
    // Proxy buffers request bodies up to this limit before the route
    // handler sees them; keep it above TRANSPARENCY_MAX_UPLOAD_BYTES so
    // legitimate PDF uploads aren't silently truncated before our own
    // size validation ever runs.
    proxyClientMaxBodySize: "15mb",
  },
};

export default nextConfig;
