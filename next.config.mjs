  /** @type {import('next').NextConfig} */
  import {config} from "dotenv"
  config()
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
        ],
      },
      env: {
          API: process.env.API
        },
    };
    
    export default nextConfig;
    