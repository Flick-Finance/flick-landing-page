import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root: an unrelated lockfile higher up the drive makes
    // Turbopack guess, and warn, on every build.
    root: path.resolve(import.meta.dirname),
  },
};

export default nextConfig;
