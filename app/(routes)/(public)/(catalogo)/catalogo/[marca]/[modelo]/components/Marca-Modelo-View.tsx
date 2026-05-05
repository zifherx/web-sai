"use client"

import { VehiculoCTA } from "@/components/modules/(marca_modelo)/Vehiculo-CTA"
import { VehiculoFeatures } from "@/components/modules/(marca_modelo)/Vehiculo-Features"
import { VehiculoGaleria } from "@/components/modules/(marca_modelo)/Vehiculo-Galeria"
import { VehiculoHero } from "@/components/modules/(marca_modelo)/Vehiculo-Hero"
import { MarcaModeloSkeleton } from "@/components/shared/Marca-Modelo-Skeleton"
import { useMarcaBySlug, useVehiculoBySlug } from "@/hooks"
import { IColor, MARCA_MODELO_VIEW_PROPS } from "@/types"
import { notFound } from "next/navigation"
import { useState } from "react"

export function MarcaModeloView({
  marcaSlug,
  modeloSlug,
}: MARCA_MODELO_VIEW_PROPS) {
  const { data: vehiculo, isLoading, isError } = useVehiculoBySlug(modeloSlug)
  const { data: marca } = useMarcaBySlug(marcaSlug)

  const [colorActivo, setColorActivo] = useState<IColor | null>(null)
  const imagenActiva = colorActivo?.carColor ?? vehiculo?.imageUrl ?? ""

  if (isLoading) return <MarcaModeloSkeleton />
  if (isError || !vehiculo) return notFound()

  const coloresActivos = vehiculo.colores.filter((c) => c.isActive)
  const colorInicial = colorActivo ?? coloresActivos[0] ?? null

  return (
    <main>
      <VehiculoHero
        vehiculo={vehiculo}
        marca={marca}
        marcaSlug={marcaSlug}
        imagenActiva={imagenActiva}
        colorActivo={colorInicial}
        colores={coloresActivos}
        onColorChange={setColorActivo}
      />
      <VehiculoFeatures features={vehiculo.features} />
      <VehiculoGaleria
        galeria={vehiculo.galeria}
        fichaTecnica={vehiculo.fichaTecnica}
        nombre={vehiculo.name}
      />
      <VehiculoCTA
        marca={marca}
        marcaSlug={marcaSlug}
        vehiculo={vehiculo}
        imagenActiva={imagenActiva}
      />
    </main>
  )
}
