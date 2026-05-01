import { CodigosConducta } from "@/components/modules/(empresa)/Codigos-Conducta"
import { HeroBanner } from "@/components/modules/(empresa)/Hero-Banner"
import { PilaresInka } from "@/components/modules/(empresa)/Pilares-Inka"
import { QuienesSomos } from "@/components/modules/(empresa)/Quienes-Somos"
import { ValoresInka } from "@/components/modules/(empresa)/Valores-Inka"

export function EmpresaView() {
  return (
    <div>
      <HeroBanner />
      <QuienesSomos />
      <PilaresInka />
      <ValoresInka />
      <CodigosConducta />
    </div>
  )
}
