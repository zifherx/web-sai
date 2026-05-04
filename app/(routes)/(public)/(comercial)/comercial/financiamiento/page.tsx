import { FINANCIA_TU_AUTO_PAGE_PROPS } from "@/types"
import type { Metadata } from "next"
import { FinanciamientoView } from "./components/Financia-View"

export const metadata: Metadata = {
  title: "Financia tu Auto — Automotores Inka",
  description:
    "Encuentra tu auto ideal en simples pasos. Elige tu marca, modelo y concesionario. Evalúa tu financiamiento con Automotores Inka.",
  alternates: {
    canonical: "https://automotoresinka.pe/servicios/financiamiento",
  },
  robots: { index: true, follow: true },
}

export default async function FinanciaTuAutoPage({
  searchParams,
}: FINANCIA_TU_AUTO_PAGE_PROPS) {
  const params = await searchParams

  return (
    <FinanciamientoView
      initialMarcaId={params.marcaId ?? ""}
      initialMarcaSlug={params.marcaSlug ?? ""}
      initialMarcaNombre={params.marcaNombre ?? ""}
      initialMarcaIdNovaly={Number(params.marcaIdNovaly) ?? 0}
      // Preselección de modelo (step2)
      initialVehiculoId={params.vehiculoId ?? ""}
      initialVehiculoSlug={params.vehiculoSlug ?? ""}
      initialVehiculoNombre={params.vehiculoNombre ?? ""}
      initialPrecioBase={params.precioBase ? Number(params.precioBase) : 0}
    />
  )
}
