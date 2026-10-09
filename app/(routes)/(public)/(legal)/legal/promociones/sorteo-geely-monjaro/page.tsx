import type { Metadata } from "next"
import { PreventaMonjaroView } from "./components/Preventa-Monjaro-View"

export const metadata: Metadata = {
  title: "Preventa Geely Monjaro EM-i 2027 — Automotores Inka",
  description:
    "Términos y condiciones de la campaña Preventa Monjaro EM-i 2027 en Automotores Inka.",
  alternates: {
    canonical:
      "https://automotoresinka.pe/legal/promociones/sorteo-geely-monjaro",
  },
  robots: { index: true, follow: true },
}

export default function SorteoPage() {
  return <PreventaMonjaroView />
}
