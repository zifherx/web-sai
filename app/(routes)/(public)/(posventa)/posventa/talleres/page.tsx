import type { Metadata } from "next"
import { TalleresView } from "./components/Talleres-View"

export const metadata: Metadata = {
  title: "Nuestros Talleres — Automotores Inka",
  description:
    "Encuentra nuestras sedes, concesionarios y talleres autorizados Automotores Inka en todo el Perú. Filtra por ciudad o local y contáctanos.",
  openGraph: {
    title: "Nuestros Talleres — Automotores Inka",
    description:
      "Encuentra nuestras sedes y talleres autorizados en todo el Perú.",
    url: "https://automotoresinka.pe/ubicanos",
    siteName: "Automotores Inka",
    locale: "es_PE",
    type: "website",
  },
  alternates: { canonical: "https://automotoresinka.pe/ubicanos" },
  robots: { index: true, follow: true },
}

export default function TalleresPage() {
  return <TalleresView />
}
