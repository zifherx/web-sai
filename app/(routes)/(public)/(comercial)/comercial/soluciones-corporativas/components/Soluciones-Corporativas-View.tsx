import { CorporativoBeneficios } from "@/components/modules/(soluciones-corporativas)/Corporativo-Beneficios"
import { CorporativoHero } from "@/components/modules/(soluciones-corporativas)/Corporativo-Hero"
import { CorporativoIntro } from "@/components/modules/(soluciones-corporativas)/Corporativo-Intro"
import {
  CORPORATIVO_BENEFICIOS,
  CORPORATIVO_FORM,
  CORPORATIVO_HERO,
  CORPORATIVO_INTRO,
} from "@/constants/corporativo.constants"
import { CorporativoForm } from "@/components/modules/(soluciones-corporativas)/Corporativo-Form"

export function SolucionesCorporativasView() {
  return (
    <main>
      <CorporativoHero hero={CORPORATIVO_HERO} />
      <CorporativoIntro intro={CORPORATIVO_INTRO} />
      <CorporativoForm formulario={CORPORATIVO_FORM} />
      <CorporativoBeneficios beneficios={CORPORATIVO_BENEFICIOS} />
    </main>
  )
}
