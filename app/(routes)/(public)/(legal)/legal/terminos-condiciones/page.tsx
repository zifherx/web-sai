import { LegalArticle } from "@/components/modules/(legal)/Legal-Article"
import { LEGAL_TERMINOS } from "@/constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones — Automotores Inka",
  description:
    "Términos, condiciones y políticas de privacidad de Automotores Inka.",
  alternates: { canonical: "https://automotoresinka.pe/legal/terminos" },
  robots: { index: true, follow: true },
}

export default function TerminosCondicionesPage() {
  return <LegalArticle page={LEGAL_TERMINOS} />
}
