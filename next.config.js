/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};
module.exports = {
  async redirects() {
    return [
      {
        source: "/login",
        has: [{ type: "cookie", key: "faunaSecret" }],
        permanent: false,
        destination: "/personal",
      },
      {
        source: "/signup",
        has: [{ type: "cookie", key: "faunaSecret" }],
        permanent: false,
        destination: "/personal",
      },
      {
        source: "/",
        has: [{ type: "cookie", key: "faunaSecret" }],
        permanent: false,
        destination: "/personal",
      },
    ];
  },
};
