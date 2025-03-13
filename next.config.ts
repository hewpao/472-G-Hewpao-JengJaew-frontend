import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["s3.cnc.cs.sci.ku.ac.th"], // Add your S3 domain here
  },
};

export default nextConfig;
