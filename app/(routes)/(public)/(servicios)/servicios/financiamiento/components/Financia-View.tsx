"use client"

import { Step1Marca } from "@/components/modules/(financiamiento)/Step1-Marca"
import { Step2Modelo } from "@/components/modules/(financiamiento)/Step2-Modelo"
import { Step3Sede } from "@/components/modules/(financiamiento)/Step3-Sede"
import { Step4Contacto } from "@/components/modules/(financiamiento)/Step4-Contacto"
import { WizardSidebar } from "@/components/modules/(financiamiento)/Wizard-Sidebar"
import { BreadcrumbFinanciamiento } from "@/components/shared/Breadcrumb-Financiamiento"
import {
  Step1Data,
  Step2Data,
  Step3Data,
  Step4Data,
} from "@/constants/financiamiento.constant"
import { useState } from "react"

export function FinanciaView() {
  const [currentStep, setCurrentStep] = useState(1)

  // Datos acumulados de cada paso
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null)
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null)
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

  const handleStep4 = (data: Step4Data) => {
    const payload = { ...step1Data, ...step2Data, ...step3Data, ...data }
    console.log(`[FinanciaView] Formulario completo:`, payload)
    console.table(payload)
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
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
