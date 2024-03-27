/** @type {import('next').NextConfig} */
import { config } from "dotenv";
config();
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "localhost",
      "as1.ftcdn.net",
      "www.balancaservice.com.br",
      "static.ecosweb.com.br",
      "ph-cdn3.ecosweb.com.br",
      "example.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
  env: {
    API: process.env.API,
    HOST: process.env.HOST,
    SECRET: process.env.SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    OAUTH_REDIRECT_URL: process.env.OAUTH_REDIRECT_URL
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
