import type { Metadata } from "next"
import { BenficiosRepsolView } from "./components/Beneficios-Repsol-View"

export const metadata: Metadata = {
  title: "Beneficios Repsol — Automotores Inka",
  description:
    "Ahorra en cada viaje con los beneficios exclusivos Repsol Más de Automotores Inka. Descuentos en Premier, Regular, Diesel y GLP en Lima, Trujillo, Chimbote y Chiclayo.",
  openGraph: {
    title: "Beneficios Repsol — Automotores Inka",
    description:
      "Descuentos exclusivos en combustible para clientes Automotores Inka.",
    url: "https://automotoresinka.pe/comercial/beneficios-repsol",
    siteName: "Automotores Inka",
    locale: "es_PE",
    type: "website",
  },
  alternates: {
    canonical: "https://automotoresinka.pe/comercial/beneficios-repsol",
  },
  robots: { index: true, follow: true },
}

export default function BeneficiosRepsolPage() {
  return <BenficiosRepsolView />
}
