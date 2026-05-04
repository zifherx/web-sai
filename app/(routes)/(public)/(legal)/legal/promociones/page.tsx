import { LegalArticle } from "@/components/modules/(legal)/Legal-Article"
import { LEGAL_PROMOCIONES } from "@/constants/legal.constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legales Promociones — Automotores Inka",
  description:
    "Bases y condiciones legales de las promociones vigentes de Automotores Inka.",
  alternates: { canonical: "https://automotoresinka.pe/legal/promociones" },
  robots: { index: true, follow: true },
}

export default function PromocionesPage() {
  return <LegalArticle page={LEGAL_PROMOCIONES} />
}
