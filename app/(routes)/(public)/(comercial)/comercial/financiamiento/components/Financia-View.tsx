"use client"

import { Step1Marca } from "@/components/modules/(financiamiento)/Step1-Marca"
import { Step2Modelo } from "@/components/modules/(financiamiento)/Step2-Modelo"
import { Step3Sede } from "@/components/modules/(financiamiento)/Step3-Sede"
import { Step4Contacto } from "@/components/modules/(financiamiento)/Step4-Contacto"
import { WizardSidebar } from "@/components/modules/(financiamiento)/Wizard-Sidebar"
import { BreadcrumbFinanciamiento } from "@/components/shared/Breadcrumb-Financiamiento"
import { Step1Data, Step2Data, Step3Data, Step4Data } from "@/constants"
import { useCrearCotizacion } from "@/hooks"
import { toastError, toastSuccess } from "@/lib"
import { FINANCIAMIENTO_VIEW_PROPS } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function FinanciamientoView({
  initialMarcaId = "",
  initialMarcaSlug = "",
  initialMarcaNombre = "",
  initialMarcaIdNovaly = 0,
  initialVehiculoId = "",
  initialVehiculoSlug = "",
  initialVehiculoNombre = "",
  initialPrecioBase = 0,
}: FINANCIAMIENTO_VIEW_PROPS) {
  const router = useRouter()

  const hasPreselection = Boolean(initialMarcaId && initialVehiculoId)
  const [currentStep, setCurrentStep] = useState<number>(
    hasPreselection ? 3 : 1
  )

  // Datos acumulados de cada paso
  const [step1Data, setStep1Data] = useState<Step1Data | null>(
    hasPreselection
      ? {
          marcaId: initialMarcaId,
          marcaSlug: initialMarcaSlug,
          marcaNombre: initialMarcaNombre,
          marcaIdNovaly: initialMarcaIdNovaly,
        }
      : null
  )
  const [step2Data, setStep2Data] = useState<Step2Data | null>(
    hasPreselection
      ? {
          vehiculoId: initialVehiculoId,
          vehiculoSlug: initialVehiculoSlug,
          vehiculoNombre: initialVehiculoNombre,
          precioBase: initialPrecioBase,
        }
      : null
  )
  const [step3Data, setStep3Data] = useState<Step3Data | null>(null)

  const goToStep = (step: number) => setCurrentStep(step)
  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 4))
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1))

  const handleStep1 = (data: Step1Data) => {
    setStep1Data(data)

    if (step1Data?.marcaId !== data.marcaId) {
      setStep2Data(null)
      setStep3Data(null)
    }
    nextStep()
  }

  const handleStep2 = (data: Step2Data) => {
    setStep2Data(data)
    nextStep()
  }

  const handleStep3 = (data: Step3Data) => {
    setStep3Data(data)
    nextStep()
  }

  const { mutate: crearCotizacion, isPending } = useCrearCotizacion({
    onSuccess: (resultado) => {
      toastSuccess.cotizacion()
      router.push(`/comercial/financiamiento/gracias?id=${resultado.id}`)
    },
    onError: (err) => {
      toastError.cotizacion(err.message)
      console.error(
        "[FinanciamientoView] Error al crear cotización",
        err.message
      )
    },
  })

  const handleStep4 = (data: Step4Data) => {
    if (!step2Data || !step3Data) return

    crearCotizacion({
      // Cliente
      nombres: data.nombres,
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento,
      celular: data.celular,
      email: data.email,
      usoDatosPersonales: data.aceptaPolitica,
      aceptaPromociones: data.autorizaMarketing ?? false,

      // Datos de la cotización
      vehiculoId: step2Data.vehiculoId,
      sedeId: step3Data.sedeId,
      ciudad: step3Data.sedeCiudad,
      intencionCompra: data.intencionCompra,
      _novaly: {
        marcaNombre: step1Data?.marcaNombre ?? "",
        vehiculoNombre: step2Data.vehiculoNombre,
        idMarca: step1Data?.marcaIdNovaly ?? 0,
        idTienda: step3Data.sedeIdTiendaNovaly ?? 0,
      },
    })
  }

  const stepsCompleted = {
    1: !!step1Data,
    2: !!step2Data,
    3: !!step3Data,
    4: false,
  }

  return (
    <div className="min-h-screen bg-sky-custom-50">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        {/* Breadcrumb */}
        <BreadcrumbFinanciamiento />

        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="font-headOffice-bold text-4xl text-gray-custom-900 md:text-5xl">
            Encuentra tu <span className="text-sky-custom-500">Auto Ideal</span>
          </h1>
          <p className="mt-2 font-textOffice-regular text-base text-gray-custom-700">
            Te ayudamos a encontrar el vehículo perfecto en simples pasos
          </p>
        </div>

        {/* Layout: sidebar + contenido */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          {/* Sidebar de progreso */}
          <WizardSidebar
            currentStep={currentStep}
            stepsCompleted={stepsCompleted}
            onStepClick={goToStep}
          />

          {/* Panel de contenido */}
          <div className="flex-1 overflow-hidden rounded-2xl bg-white shadow-sm">
            {currentStep === 1 && (
              <Step1Marca onNext={handleStep1} initialData={step1Data} />
            )}
            {currentStep === 2 && step1Data && (
              <Step2Modelo
                marca={step1Data}
                onNext={handleStep2}
                onBack={prevStep}
                initialData={step2Data}
              />
            )}
            {currentStep === 3 && step1Data && step2Data && (
              <Step3Sede
                onNext={handleStep3}
                onBack={prevStep}
                initialData={step3Data}
              />
            )}
            {currentStep === 4 && step1Data && step2Data && step3Data && (
              <Step4Contacto
                resumen={{ ...step1Data, ...step2Data, ...step3Data }}
                onSubmit={handleStep4}
                onBack={prevStep}
                isLoading={isPending}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
