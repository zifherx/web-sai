import type { Metadata } from "next"
import { UbicanosView } from "./components/Ubicanos-View"

export const metadata: Metadata = {
  title: "Red de Atención — Automotores Inka",
  description:
    "Encuentra nuestras sedes, concesionarios y talleres autorizados Automotores Inka en Lima, Trujillo, Chimbote y Chiclayo. Ubica el más cercano a ti.",
  alternates: { canonical: "https://automotoresinka.pe/nosotros/ubicanos" },
  robots: { index: true, follow: true },
}

export default function UbicanosPage() {
  return <UbicanosView />
}
