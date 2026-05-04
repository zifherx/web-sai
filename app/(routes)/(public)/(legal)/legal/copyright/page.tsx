import { LegalArticle } from "@/components/modules/(legal)/Legal-Article"
import { LEGAL_COPYRIGHT } from "@/constants/legal.constants"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Propiedad Intelectual — Automotores Inka",
  description:
    "Política de propiedad intelectual y copyright de Automotores Inka.",
  alternates: { canonical: "https://automotoresinka.pe/legal/copyright" },
  robots: { index: true, follow: true },
}

export default function CopyrightPage() {
  return <LegalArticle page={LEGAL_COPYRIGHT} />
}
