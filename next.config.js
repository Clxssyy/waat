/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      new URL("https://cdn.discordapp.com/**"),
      new URL("https://jv9d42ys1c.ufs.sh/f/**"),
    ],
  },
};

export default config;
