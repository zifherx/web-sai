import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { QueryProvider } from "@/providers/QueryProvider"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import NextTopLoader from "nextjs-toploader"
import {
  dmSans,
  fontMono,
  hyundaiSansHeadBold,
  hyundaiSansHeadLight,
  hyundaiSansHeadMedium,
  hyundaiSansHeadRegular,
  hyundaiSansTextbold,
  hyundaiSansTextBoldItalic,
  hyundaiSansTextMedium,
  hyundaiSansTextMediumItalic,
  hyundaiSansTextRegular,
  hyundaiSansTextRegularItalic,
} from "../fonts"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: {
    template: "%s — Automotores Inka",
    default: "Automotores Inka | Concesionario Multimarca Perú",
  },
  description:
    "Concesionario multimarca autorizado con presencia en Lima, Trujillo, Chimbote y Chiclayo. Venta de vehículos nuevos: Changan, Hyundai, Mazda, Subaru, Renault, Suzuki, JAC, HAVAL, DFSK, JMC y más. Más de 12 años en el rubro automotriz peruano.",

  // ─── Autoría y aplicación ─────────────────────────────────

  creator: "Ziphonex Tech",
  generator: "Next.js",
  applicationName: "Automotores Inka",
  referrer: "origin-when-cross-origin",

  // ─── Keywords ─────────────────────────────────────────────

  keywords: [
    "comprar auto nuevo Peru",
    "concesionario multimarca Peru",
    "Automotores Inka",
    "Changan Peru",
    "Hyundai Peru",
    "Mazda Peru",
    "Subaru Peru",
    "Renault Peru",
    "JAC Peru",
    "JMC Peru",
    "autos nuevos Trujillo",
    "autos nuevos Lima",
    "autos nuevos Chiclayo",
    "autos nuevos Chimbote",
    "camionetas 4x4 Peru",
    "autos GLP Peru",
    "financiamiento automotriz Peru",
    "taller autorizado Hyundai",
    "taller autorizado Changan",
    "vehículos comerciales Peru",
  ],

  // ─── Open Graph ───────────────────────────────────────────

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "https://www.automotoresinka.pe",
    siteName: "Automotores Inka",
    title: "Automotores Inka | Concesionario Multimarca Perú",
    description:
      "Venta de vehículos nuevos en Lima, Trujillo, Chimbote y Chiclayo. Marcas: Changan, Hyundai, Mazda, Subaru, Renault, JAC, JMC y más.",
    images: [
      {
        url: "https://www.automotoresinka.pe/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Automotores Inka — Concesionario Multimarca Perú",
      },
    ],
  },

  // ─── Twitter / X ──────────────────────────────────────────

  twitter: {
    card: "summary_large_image",
    title: "Automotores Inka | Concesionario Multimarca Perú",
    description:
      "Venta de vehículos nuevos en Lima, Trujillo, Chimbote y Chiclayo.",
    images: ["https://www.automotoresinka.pe/og-image.jpg"],
  },

  // ─── Robots ───────────────────────────────────────────────

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ─── Canonical ────────────────────────────────────────────

  alternates: {
    canonical: "https://www.automotoresinka.pe",
    languages: { "es-PE": "https://www.automotoresinka.pe/es-PE" },
  },

  // ─── Verificaciones ───────────────────────────────────────

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "",
  },

  // ─── Formato ──────────────────────────────────────────────

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // ─── Favicon / Iconos ─────────────────────────────────────

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es-PE"
      suppressHydrationWarning
      className={cn("font-sans", geist.variable)}
    >
      <body
        suppressHydrationWarning
        className={cn(
          "antialiased",
          fontMono.variable,
          "font-sans",
          dmSans.variable,
          hyundaiSansHeadBold.variable,
          hyundaiSansHeadMedium.variable,
          hyundaiSansHeadRegular.variable,
          hyundaiSansHeadLight.variable,
          hyundaiSansTextbold.variable,
          hyundaiSansTextMedium.variable,
          hyundaiSansTextRegular.variable,
          hyundaiSansTextBoldItalic.variable,
          hyundaiSansTextMediumItalic.variable,
          hyundaiSansTextRegularItalic.variable
        )}
      >
        <NextTopLoader
          color="#0ea5e9"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #0ea5e9, 0 0 5px #0ea5e9"
          zIndex={9999}
        />
        <QueryProvider>{children}</QueryProvider>

        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
            classNames: {
              toast: "font-textOffice-regular",
              title: "font-textOffice-medium",
              description: "font-textOffice-regular text-xs",
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
