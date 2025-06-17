/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      new URL("https://cdn.discordapp.com/**"),
      new URL("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/**"),
      new URL("https://jv9d42ys1c.ufs.sh/f/**"),
    ],
  },
};

export default config;
