import { RepsolBeneficios } from "@/components/modules/(repsol)/Repsol-Beneficios"
import { RepsolCTA } from "@/components/modules/(repsol)/Repsol-CTA"
import { RepsolHero } from "@/components/modules/(repsol)/Repsol-Hero"
import { RepsolInfo } from "@/components/modules/(repsol)/Repsol-Info"
import { RepsolVentajas } from "@/components/modules/(repsol)/Repsol-Ventajas"
import { RepsolVideo } from "@/components/modules/(repsol)/Repsol-Video"
import {
  REPSOL_CTA,
  REPSOL_HERO,
  REPSOL_INFO,
  REPSOL_VENTAJAS,
  REPSOL_VIDEO,
} from "@/constants"

export function BenficiosRepsolView() {
  return (
    <main>
      <RepsolHero hero={REPSOL_HERO} />
      <RepsolInfo info={REPSOL_INFO} />
      <RepsolBeneficios />
      <RepsolVentajas ventajas={REPSOL_VENTAJAS} />
      <RepsolCTA callToAction={REPSOL_CTA} />
      <RepsolVideo video={REPSOL_VIDEO} />
    </main>
  )
}
