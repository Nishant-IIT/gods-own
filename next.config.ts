import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server be reached from other devices on the LAN (phone/tablet
  // testing). Hostname only — scheme and port are ignored by the matcher.
  allowedDevOrigins: ["192.168.0.107"],
  images: {
    // ImageKit delivery for the studio's media library. `search` is left open
    // because every URL carries a `?tr=` transformation string.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/godsown/**",
      },
    ],
  },
};

export default nextConfig;
