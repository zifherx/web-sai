import { AUTOMOTORES_INKA_ORG } from "@/shared/infrastructure/seo/schema/sai.const"
import { VehiculoSeoSchema } from "@/types"

export function buildVehicleSchema(
  vehiculo: VehiculoSeoSchema,
  marcaNombre: string,
  marcaSlug: string
) {
  const url = `https://automotoresinka.pe/catalogo/${marcaSlug}/${vehiculo.slug}`
  const imagenes =
    vehiculo.galeria && vehiculo.galeria.length > 0
      ? vehiculo.galeria.map((g) => g.imageUrl)
      : [vehiculo.imageUrl]

  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: vehiculo.name,
    description: `${vehiculo.name} de ${marcaNombre}, disponible en Automotores Inka.${vehiculo.isNuevo ? " Vehículo nuevo 0KM." : ""}`,
    brand: {
      "@type": "Brand",
      name: marcaNombre,
    },
    model: vehiculo.name,
    image: imagenes,
    url,
    ...(vehiculo.isGLP ? { fuelType: "GLP" } : {}),
    itemCondition: vehiculo.isNuevo
      ? "https://schema.org/NewCondition"
      : "https://schema.org/UsedCondition",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: vehiculo.precioBase,
      availability: "https://schema.org/InStock",
      url,
      seller: {
        "@type": "AutoDealer",
        ...AUTOMOTORES_INKA_ORG,
      },
    },
  }
}
