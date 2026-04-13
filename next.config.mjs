/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.kavi.com",
				port: "8080", // kosongkan kalau port 80
			},
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000", // kosongkan kalau port 80
			},
        ],
    },
};

export default nextConfig;
