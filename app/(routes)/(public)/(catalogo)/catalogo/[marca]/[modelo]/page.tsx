import { JsonLd } from "@/components/shared/Json-Ld"
import { marcaService, vehiculoService } from "@/services"
import { buildVehicleSchema } from "@/shared/infrastructure/seo/schema/build-schema"
import { MARCA_MODELO_PAGE_PROPS } from "@/types"
import { Metadata } from "next"
import { cache } from "react"
import { MarcaModeloView } from "./components/Marca-Modelo-View"

const getVehiculo = cache((slug: string) => vehiculoService.getBySlug(slug))
const getMarca = cache((slug: string) => marcaService.getBySlug(slug))

export async function generateMetadata({
  params,
}: MARCA_MODELO_PAGE_PROPS): Promise<Metadata> {
  const { marca, modelo } = await params

  try {
    const vehiculo = await getVehiculo(modelo)
    const marcaData = await getMarca(marca)

    return {
      title: `${vehiculo.name} — ${marcaData.name} | Automotores Inka`,
      description: `Conoce el ${vehiculo.name} de ${marcaData.name}. Desde $${vehiculo.precioBase.toLocaleString()}. Cotiza ahora en Automotores Inka.`,
      openGraph: {
        title: `${vehiculo.name} — ${marcaData.name}`,
        description: `Explora el ${vehiculo.name}: colores, galería y especificaciones técnicas.`,
        images: [
          {
            url: vehiculo.imageUrl,
            width: 1200,
            height: 630,
            alt: vehiculo.name,
          },
        ],
        url: `https://automotoresinka.pe/catalogo/${marca}/${modelo}`,
        siteName: "Automotores Inka",
        locale: "es_PE",
        type: "website",
      },
      alternates: {
        canonical: `https://automotoresinka.pe/catalogo/${marca}/${modelo}`,
      },
    }
  } catch (err) {
    console.error(
      `[generateMetadata] Falló para marca="${marca}" modelo="${modelo}":`,
      err
    )
    return { title: "Vehículo - Automotores Inka" }
  }
}

export default async function MarcaModeloPage({
  params,
}: MARCA_MODELO_PAGE_PROPS) {
  const { marca, modelo } = await params

  const [vehiculo, marcaData] = await Promise.all([
    getVehiculo(modelo).catch((err) => {
      console.error(`[MarcaModeloPage] getVehiculo("${modelo}") falló:`, err)
      return null
    }),
    getMarca(marca).catch((err) => {
      console.error(`[MarcaModeloPage] getMarca("${marca}") falló:`, err)
      return null
    }),
  ])

  return (
    <>
      {vehiculo && (
        <JsonLd
          data={buildVehicleSchema(vehiculo, marcaData?.name ?? marca, marca)}
        />
      )}
      <MarcaModeloView marcaSlug={marca} modeloSlug={modelo} />
    </>
  )
}
