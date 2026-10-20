import {
  LEGAL_ACCESIBILIDAD,
  LEGAL_COPYRIGHT,
  LEGAL_PROMOCIONES,
  LEGAL_TERMINOS,
} from "@/constants"
import {
  type LegalSeedInput,
  type LegalSeedPromotion,
} from "@/modules/legal/application/dto/legal.dto"
import {
  type LegacySection,
  sectionsToRichContent,
} from "@/modules/legal/infrastructure/seed/legal-constants.converter"
import { limaEndOfDay, limaStartOfDay } from "@/shared/domain/lima-date"
import { EMPTY_RICH_CONTENT } from "@/shared/domain/rich-text/rich-content"

const PROMO_SECTION_IDS = {
  frenaSeguro: "prom-01",
  frenosHyundai: "prom-02",
  lubricacion: "prom-03",
} as const

const PROMO_SUBSECTION_IDS = {
  quickService: "promo-quick-service",
  ahorroONunca: "promo-ahorro-nunca",
  vehiculos: "catalogo-vehicular-legal",
} as const

function requireSection(id: string): LegacySection {
  const section = LEGAL_PROMOCIONES.sections.find((s) => s.id === id)
  if (!section)
    throw new Error(
      `Seed legal: no existe la sección "${id}" en LEGAL_PROMOCIONES`
    )
  return section
}

function requireSubsection(id: string): {
  heading: string
  sections: readonly LegacySection[]
} {
  const sub = LEGAL_PROMOCIONES.subsections?.find((s) => s.id === id)
  if (!sub)
    throw new Error(
      `Seed legal: no existe la subsección "${id}" en LEGAL_PROMOCIONES`
    )
  return sub
}

function promotionFromSection(
  slug: string,
  sectionId: string,
  dates: Pick<LegalSeedPromotion, "validFrom" | "validTo"> = {
    validFrom: null,
    validTo: null,
  }
): LegalSeedPromotion {
  const section = requireSection(sectionId)
  return {
    slug,
    title: (section.title ?? slug).trim(),
    content: sectionsToRichContent([{ ...section, title: "" }], 3),
    isActive: true,
    ...dates,
  }
}

function promotionFromSubsection(
  slug: string,
  subsectionId: string,
  dates: Pick<LegalSeedPromotion, "validFrom" | "validTo">
): LegalSeedPromotion {
  const sub = requireSubsection(subsectionId)
  return {
    slug,
    title: sub.heading.trim(),
    content: sectionsToRichContent(sub.sections, 3),
    isActive: true,
    ...dates,
  }
}

export function buildLegalSeed(): LegalSeedInput {
  return {
    pages: [
      {
        slug: "accesibilidad",
        title: LEGAL_ACCESIBILIDAD.heading,
        content: sectionsToRichContent(LEGAL_ACCESIBILIDAD.sections, 2),
        seo: {
          title: "Accesibilidad — Automotores Inka",
          description:
            "Política de accesibilidad web de Automotores Inka S.A.C.",
        },
      },
      {
        slug: "copyright",
        title: LEGAL_COPYRIGHT.heading,
        content: sectionsToRichContent(LEGAL_COPYRIGHT.sections, 2),
        seo: {
          title: "Propiedad Intelectual — Automotores Inka",
          description:
            "Política de propiedad intelectual y copyright de Automotores Inka.",
        },
      },
      {
        slug: "terminos",
        title: LEGAL_TERMINOS.heading,
        content: sectionsToRichContent(LEGAL_TERMINOS.sections, 2),
        seo: {
          title: "Términos y Condiciones — Automotores Inka",
          description:
            "Términos, condiciones y políticas de privacidad de Automotores Inka.",
        },
      },
      {
        slug: "promociones",
        title: LEGAL_PROMOCIONES.heading,
        content: EMPTY_RICH_CONTENT,
        seo: {
          title: "Legales Promociones — Automotores Inka",
          description:
            "Bases y condiciones legales de las promociones vigentes de Automotores Inka.",
        },
      },
    ],
    promotions: [
      promotionFromSection("frena-seguro", PROMO_SECTION_IDS.frenaSeguro),
      promotionFromSection(
        "campana-frenos-hyundai",
        PROMO_SECTION_IDS.frenosHyundai
      ),
      promotionFromSection(
        "campana-lubricacion",
        PROMO_SECTION_IDS.lubricacion
      ),
      promotionFromSubsection(
        "quick-service-2026",
        PROMO_SUBSECTION_IDS.quickService,
        {
          validFrom: limaStartOfDay("2026-09-21"),
          validTo: limaEndOfDay("2026-10-31"),
        }
      ),
      promotionFromSubsection(
        "ahorro-o-nunca-2025",
        PROMO_SUBSECTION_IDS.ahorroONunca,
        {
          validFrom: limaStartOfDay("2025-06-16"),
          validTo: limaEndOfDay("2025-07-31"),
        }
      ),
    ],
  }
}

export function buildVehicleLegalNotesSeed(): {
  title: string
  content: unknown
}[] {
  return requireSubsection(PROMO_SUBSECTION_IDS.vehiculos).sections.map(
    (section) => ({
      title: (section.title ?? "").trim(),
      content: sectionsToRichContent(
        [{ ...section, title: "", indentLevel: 0 }],
        3
      ),
    })
  )
}
