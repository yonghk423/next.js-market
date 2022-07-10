/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imagedelivery.net"],
  },
  env : {
    CLOUDFLARE_TOKEN : "-tHiOYxTSwnDqfeGL79ylStCXc59VuNPn1b9CYeq"
  }
}

module.exports = nextConfig
