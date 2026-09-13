import { JsonLd } from "@/components/shared/Json-Ld"
import { sedeServerService } from "@/services/server/sede.server"
import { buildAutoDealerListSchema } from "@/shared/infrastructure/seo/schema/build-autodealer-schema"
import type { Metadata } from "next"
import { UbicanosView } from "./components/Ubicanos-View"

export const metadata: Metadata = {
  title: "Red de Atención — Automotores Inka",
  description:
    "Encuentra nuestras sedes, concesionarios y talleres autorizados Automotores Inka en Lima, Trujillo, Chimbote y Chiclayo. Ubica el más cercano a ti.",
  alternates: { canonical: "https://automotoresinka.pe/nosotros/ubicanos" },
  robots: { index: true, follow: true },
}

export default async function UbicanosPage() {
  const sedes = await sedeServerService.getActive().catch((err) => {
    console.error("[UbicanosPage] sedeService.getActive() falló:", err)
    return []
  })

  return (
    <>
      {sedes.length > 0 && <JsonLd data={buildAutoDealerListSchema(sedes)} />}
      <UbicanosView initialSedes={sedes} />
    </>
  )
}
