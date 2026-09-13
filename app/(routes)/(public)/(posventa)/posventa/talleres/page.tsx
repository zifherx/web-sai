import { JsonLd } from "@/components/shared/Json-Ld"
import { sedeServerService } from "@/services/server/sede.server"
import { buildAutoRepairListSchema } from "@/shared/infrastructure/seo/schema/build-autorepair-schema"
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
    url: "https://automotoresinka.pe/posventa/talleres",
    siteName: "Automotores Inka",
    locale: "es_PE",
    type: "website",
  },
  alternates: { canonical: "https://automotoresinka.pe/posventa/talleres" },
  robots: { index: true, follow: true },
}

export default async function TalleresPage() {
  const sedes = await sedeServerService.getTallers().catch((err) => {
    console.error("[TalleresPage] sedeServerService.getTallers() falló:", err)
    return []
  })

  return (
    <>
      {sedes.length > 0 && <JsonLd data={buildAutoRepairListSchema(sedes)} />}
      <TalleresView initialSedes={sedes} />
    </>
  )
}
