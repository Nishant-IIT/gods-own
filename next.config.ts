import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server be reached from other devices on the LAN (phone/tablet
  // testing). Hostname only — scheme and port are ignored by the matcher.
  allowedDevOrigins: ["192.168.0.107"],
};

export default nextConfig;
