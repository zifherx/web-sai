/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  serverExternalPackages: ["mongoose"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Previene que el browser adivine el tipo de contenido
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Controla cuánta info del referrer se envía
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Previene que la página se cargue en un iframe (clickjacking)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Habilita protección XSS del browser (legacy pero útil)
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // HSTS — fuerza HTTPS por 1 año (solo producción)
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000; includeSubDomains",
                },
              ]
            : []),
          // Permisos de APIs del browser - deshabilita las que no usas
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=()",
          },
        ],
      },
    ]
  },
  logging:
    process.env.NODE_ENV === "development"
      ? { fetches: { fullUrl: true } }
      : undefined,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
