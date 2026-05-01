import type { Metadata } from "next"
import { EmpresaView } from "./components/Empresa-View"

export const metadata: Metadata = {
  title: "Nosotros - Automotores Inka",
  description:
    "Conoce Automotores Inka S.A.C., la red de concesionarios multimarca más grande del norte del Perú. Más de 20 años de experiencia, altos estándares de calidad y el cliente como prioridad.",
  openGraph: {
    title: "Nosotros — Automotores Inka",
    description:
      "Conoce nuestra historia, valores y compromiso con el cliente en Automotores Inka.",
    url: "https://automotoresinka.pe/nosotros",
    siteName: "Automotores Inka",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://automotoresinka.pe/og/nosotros.jpg", // 1200×630
        width: 1200,
        height: 630,
        alt: "Cluster Automotores Inka — el más grande del norte del Perú",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros — Automotores Inka",
    description:
      "Conoce nuestra historia, valores y compromiso con el cliente.",
    images: ["https://automotoresinka.pe/og/nosotros.jpg"],
  },
  alternates: {
    canonical: "https://automotoresinka.pe/nosotros",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function EmpresaPage() {
  return <EmpresaView />
}
