import { LegalArticle } from "@/components/modules/(legal)/Legal-Article"
import { LEGAL_ACCESIBILIDAD } from "@/constants/legal.constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accesibilidad — Automotores Inka",
  description: "Política de accesibilidad web de Automotores Inka S.A.C.",
  alternates: { canonical: "https://automotoresinka.pe/legal/accesibilidad" },
  robots: { index: true, follow: true },
}

export default function AccesibilidadPage() {
  return <LegalArticle page={LEGAL_ACCESIBILIDAD} />
}
