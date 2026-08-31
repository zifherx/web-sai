import { Metadata } from "next"
import { PortadaModule } from "./components/Portada-Module"

export const metadata: Metadata = {
  title: "Portadas | CMS",
}

export default function PortadaPage() {
  return <PortadaModule />
}
