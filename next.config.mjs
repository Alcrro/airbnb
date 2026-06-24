/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		HOST_URI: process.env.HOST_URI,
		MONGO_URI: process.env.MONGO_URI,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,
	},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "3000",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "a0.muscache.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "airbnb.alexandru-roventa.ro",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
