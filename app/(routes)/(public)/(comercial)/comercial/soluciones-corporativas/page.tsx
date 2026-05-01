import type { Metadata } from "next"
import { SolucionesCorporativasView } from "./components/Soluciones-Corporativas-View"

export const metadata: Metadata = {
  title: "Soluciones Corporativas — Automotores Inka",
  description:
    "Soluciones corporativas flexibles para la gestión de tu flota empresarial. Cotiza ahora y descubre los beneficios exclusivos de Automotores Inka.",
  openGraph: {
    title: "Soluciones Corporativas — Automotores Inka",
    description:
      "Gestiona tu flota con el respaldo de la red de concesionarios más grande del norte del Perú.",
    url: "https://automotoresinka.pe/ventas/soluciones-corporativas",
    siteName: "Automotores Inka",
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://automotoresinka.pe/ventas/soluciones-corporativas",
  },
  robots: { index: true, follow: true },
}

export default function SolucionesCorporativasPage() {
  return <SolucionesCorporativasView />
}
