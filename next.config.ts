import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the iPhone/Android browser on the same Wi-Fi to load the
  // Next.js development client and hydrate interactive React controls.
  allowedDevOrigins: ["192.168.3.5"],
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
