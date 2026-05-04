import { SEPARA_CITA_PAGE_PROPS } from "@/types"
import type { Metadata } from "next"
import { SeparaCitaView } from "./components/Separa-Cita-View"

export const metadata: Metadata = {
  title: "Separa tu Cita — Automotores Inka",
  description:
    "Agenda tu cita de servicio técnico o mantenimiento en el taller autorizado Automotores Inka más cercano. Rápido, fácil y sin colas.",
  alternates: {
    canonical: "https://automotoresinka.pe/servicios/separa-tu-cita",
  },
  robots: { index: true, follow: true },
}

export default async function SeparaTuCitaPage({
  searchParams,
}: SEPARA_CITA_PAGE_PROPS) {
  const params = await searchParams
  return <SeparaCitaView initialCiudad={params.ciudad ?? ""} />
}
