import type { Metadata } from "next"
import { LibroReclamacionesView } from "./components/Libro-Reclamaciones-View"

export const metadata: Metadata = {
  title: "Libro de Reclamaciones — Automotores Inka",
  description:
    "Ingresa tu reclamo o queja de forma digital. Automotores Inka garantiza tu derecho como consumidor conforme a la Ley N° 29571.",
  robots: { index: false, follow: false }, // no indexar formularios
}

export default function LibroDeReclamacionesPage() {
  return <LibroReclamacionesView />
}
