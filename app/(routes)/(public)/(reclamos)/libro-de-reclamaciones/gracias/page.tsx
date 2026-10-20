import { ReclamoGraciasView } from "@/app/(routes)/(public)/(reclamos)/libro-de-reclamaciones/gracias/components/Reclamo-Gracias-View"
import { type GRACIAS_PAGE_RECLAMO_PROPS } from "@/types"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reclamo Registrado — Automotores Inka",
  description:
    "Tu reclamo ha sido registrado exitosamente. Te contactaremos a la brevedad.",
  robots: { index: false, follow: false },
}

export default async function GraciasReclamoPage({
  searchParams,
}: GRACIAS_PAGE_RECLAMO_PROPS) {
  const { nro } = await searchParams

  return <ReclamoGraciasView numeroReclamo={nro ?? ""} />
}
