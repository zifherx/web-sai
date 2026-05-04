import { FINANCIAMIENTO_GRACIAS_PAGE_PROPS } from "@/types"
import type { Metadata } from "next"
import { FinanciamientoGraciasView } from "./Financiamiento-Gracias-View"

export const metadata: Metadata = {
  title: "Cotización Registrada — Automotores Inka",
  description:
    "Tu solicitud de cotización ha sido recibida. Un asesor de Automotores Inka se pondrá en contacto contigo a la brevedad.",
  robots: { index: false, follow: false },
}

export default async function FinanciamientoGraciasPage({
  searchParams,
}: FINANCIAMIENTO_GRACIAS_PAGE_PROPS) {
  const { id } = await searchParams
  return <FinanciamientoGraciasView cotizacionId={id} />
}
