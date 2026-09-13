import { buildOpeningHoursSpecification } from "@/shared/infrastructure/seo/schema/build-autodealer-schema"
import { SedeTallerSeoSchema } from "@/types"

export function buildAutoRepairSchema(sede: SedeTallerSeoSchema) {
  return {
    "@type": "AutoRepair",
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
    openingHoursSpecification: buildOpeningHoursSpecification(
      sede.horarioTaller
    ),
    areaServed: sede.ciudad,
    parentOrganization: { "@type": "Organization", name: "Automotores Inka" },
  }
}

export function buildAutoRepairListSchema(sedes: SedeTallerSeoSchema[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: sedes.map((sede, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: buildAutoRepairSchema(sede),
    })),
  }
}
