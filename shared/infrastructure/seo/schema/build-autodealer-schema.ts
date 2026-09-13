import { HorarioIndividual, SedeSeoSchema } from "@/types"

function parseHorario(horario: string): HorarioIndividual | null {
  const match = horario.match(/(\d{1,2}:\d{2})\s*a\s*(\d{1,2}:\d{2})/)
  if (!match) return null
  const [, opens, closes] = match
  return { opens, closes }
}

export function buildOpeningHoursSpecification(schedule: {
  scheduleRegular: string
  scheduleExtended: string
}) {
  const specs: Record<string, unknown>[] = []

  const semana = parseHorario(schedule.scheduleRegular)
  if (semana) {
    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: semana.opens,
      closes: semana.closes,
    })
  }

  const sabado = parseHorario(schedule.scheduleExtended)
  if (sabado) {
    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: sabado.opens,
      closes: sabado.closes,
    })
  }

  return specs.length > 0 ? specs : undefined
}

export function buildAutoDealerSchema(sede: SedeSeoSchema) {
  return {
    "@type": "AutoDealer",
    name: sede.name,
    image: sede.imageUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: sede.address,
      addressLocality: sede.ciudad,
      addressCountry: "PE",
    },
    ...(sede.coordenadasMapa
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: sede.coordenadasMapa.latitud,
            longitude: sede.coordenadasMapa.longitud,
          },
        }
      : {}),
    ...(sede.linkHowArrived ? { hasMap: sede.linkHowArrived } : {}),
    openingHoursSpecification: buildOpeningHoursSpecification(
      sede.horarioVentas
    ),
    parentOrganization: { "@type": "Organization", name: "Automotores Inka" },
  }
}

export function buildAutoDealerListSchema(sedes: SedeSeoSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sedes.map((sede, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: buildAutoDealerSchema(sede),
    })),
  }
}
