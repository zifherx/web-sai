import { marcaService, vehiculoService } from "@/services"
import { MARCA_MODELO_PAGE_PROPS } from "@/types/marcamodelo.types"
import { Metadata } from "next"
import { MarcaModeloView } from "./components/Marca-Modelo-View"

export async function generateMetadata({
  params,
}: MARCA_MODELO_PAGE_PROPS): Promise<Metadata> {
  const { marca, modelo } = await params

  try {
    const vehiculo = await vehiculoService.getBySlug(modelo)
    const marcaData = await marcaService.getBySlug(marca)

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
  } catch {
    return { title: "Vehículo - Automotores Inka" }
  }
}

export default async function MarcaModeloPage({
  params,
}: MARCA_MODELO_PAGE_PROPS) {
  const { marca, modelo } = await params

  return <MarcaModeloView marcaSlug={marca} modeloSlug={modelo} />
}
