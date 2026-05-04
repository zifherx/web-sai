"use client"

import { ReclamoConsumer } from "@/components/modules/(reclamo)/Reclamo-Consumer"
import { ReclamoDetalle } from "@/components/modules/(reclamo)/Reclamo-Detalle"
import { ReclamoHeader } from "@/components/modules/(reclamo)/Reclamo-Header"
import { ReclamoLegal } from "@/components/modules/(reclamo)/Reclamo-Legal"
import { ReclamoProducto } from "@/components/modules/(reclamo)/Reclamo-Producto"
import { ReclamoData, ReclamoSchema } from "@/constants"
import { useCrearReclamo } from "@/hooks"
import { toastError, toastSuccess } from "@/lib"
import type { SedeType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function LibroReclamacionesView() {
  const router = useRouter()
  const [sedeSeleccionada, setSedeSeleccionada] = useState<SedeType | null>(
    null
  )

  const formReclamo = useForm<ReclamoData>({
    resolver: zodResolver(ReclamoSchema),
    defaultValues: {
      isConforme: false,
      importeBien: 0,
    },
  })

  const { mutate: crearReclamo, isPending } = useCrearReclamo({
    onSuccess: (resultado) => {
      toastSuccess.reclamo(resultado.numeroReclamo)
      router.push(
        `/libro-de-reclamaciones/gracias?nro=${resultado.numeroReclamo}`
      )
    },
    onError: (err) => {
      toastError.reclamo(err.message)
      console.error("[LibroReclamaciones] Error:", err.message)
    },
  })

  const onSubmit = async (data: ReclamoData) => {
    const payload = {
      ...data,
      sedeCodexHR: data.sedeCodexHR ?? data.sedeCompra,
      sedeCompra: sedeSeleccionada?.name ?? "",
      sedeDireccion: sedeSeleccionada?.address ?? "",
    }
    crearReclamo(payload)
  }

  return (
    <div className="min-h-screen bg-sky-custom-50">
      <div className="mx-auto max-w-6xl space-y-5 px-3 py-10 sm:px-4 sm:py-14">
        {/* Header Informativo */}
        <ReclamoHeader />

        {/* Formulario en 3 secciones */}
        <form
          onSubmit={formReclamo.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Sección 1 - Consumidor */}
          <ReclamoConsumer form={formReclamo} />

          {/* Sección 2 - Bien contratado */}
          <ReclamoProducto
            form={formReclamo}
            sedeSeleccionada={sedeSeleccionada}
            onSedeChange={setSedeSeleccionada}
          />

          {/* Sección 3 - Detalle del reclamo */}
          <ReclamoDetalle form={formReclamo} isLoading={isPending} />
        </form>

        <ReclamoLegal />
      </div>
    </div>
  )
}
