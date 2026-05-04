import { Metadata } from "next"
import { SolucionesCoporativasGracias } from "./components/Soluciones-Coporativas-Gracias"

export const metadata: Metadata = {
  title: "Solicitud Corporativa Enviada — Automotores Inka",
  description:
    "Tu solicitud de soluciones corporativas ha sido recibida. Nuestro equipo comercial te contactará a la brevedad.",
  robots: { index: false, follow: false },
}

export default function GraciasSolucinesCorporativasPage() {
  return <SolucionesCoporativasGracias />
}
