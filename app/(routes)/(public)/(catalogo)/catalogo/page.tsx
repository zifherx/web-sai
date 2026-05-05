import { CATALOGO_PAGE_PROPS } from "@/types"
import type { Metadata } from "next"
import { CatalogoView } from "./components/Catalogo-View"

export const metadata: Metadata = {
  title: "Catálogo de Vehículos — Automotores Inka",
  description:
    "Explora nuestro catálogo de más de 14 marcas. Filtra por marca, modelo y rango de precio. Evalúa tu financiamiento y simula tu crédito online.",
  openGraph: {
    title: "Catálogo de Vehículos — Automotores Inka",
    description:
      "Encuentra tu próximo vehículo entre las mejores marcas del mercado.",
    url: "https://automotoresinka.pe/catalogo",
    siteName: "Automotores Inka",
    locale: "es_PE",
    type: "website",
  },
  alternates: { canonical: "https://automotoresinka.pe/catalogo" },
  robots: { index: true, follow: true },
}

export default async function CatalogoPage({
  searchParams,
}: CATALOGO_PAGE_PROPS) {
  const params = await searchParams

  return (
    <CatalogoView
      initialMarca={params.marca ?? ""}
      initialModelo={params.modelo ?? ""}
      initialPrecioMin={params.precioMin ? Number(params.precioMin) : undefined}
      initialPrecioMax={params.precioMax ? Number(params.precioMax) : undefined}
    />
  )
}
