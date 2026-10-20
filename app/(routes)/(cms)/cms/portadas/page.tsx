import { PortadaModule } from "@/app/(routes)/(cms)/cms/portadas/components/Portada-Module"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Portadas | CMS",
}

export default function PortadaPage() {
  return <PortadaModule />
}
