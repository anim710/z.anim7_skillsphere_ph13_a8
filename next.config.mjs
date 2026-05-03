// /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //   /* config options here */
//   reactCompiler: true,
// // };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongodb"],
  reactCompiler: true,
  // images: {
  //   remotePatterns: [
  //     { protocol: "https", hostname: "images.unsplash.com" },
  //     { protocol: "https", hostname: "randomuser.me" },
  //     { protocol: "https", hostname: "ui-avatars.com" },
  //   ],
  // },
};

export default nextConfig;
