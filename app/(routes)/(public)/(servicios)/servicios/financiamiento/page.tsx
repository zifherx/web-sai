import type { Metadata } from "next"
import { FinanciaView } from "./components/Financia-View"

export const metadata: Metadata = {
  title: "Financia tu Auto — Automotores Inka",
  description:
    "Encuentra tu auto ideal en simples pasos. Elige tu marca, modelo y concesionario. Evalúa tu financiamiento con Automotores Inka.",
  alternates: { canonical: "https://automotoresinka.pe/financia-tu-auto" },
  robots: { index: true, follow: true },
}

export default function FinanciaTuAutoPage() {
  return <FinanciaView />
}
