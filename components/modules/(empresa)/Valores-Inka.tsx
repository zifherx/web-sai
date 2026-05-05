import { ValoresCard } from "@/components/shared/Valores-Card"
import { VALORES_SAI } from "@/constants"

export function ValoresInka() {
  const { headingNeutral, headingAccent, subtitle, valores } = VALORES_SAI

  return (
    <section className="w-full bg-[#ECF1F9] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10">
          <h2 className="mb-2 font-headOffice-bold text-3xl md:text-4xl">
            <span className="text-gray-custom-900">{headingNeutral}</span>{" "}
            <span className="text-sky-custom-500">{headingAccent}</span>
          </h2>
          <p className="font-textOffice-regular text-xl text-gray-custom-900">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
          {valores.map((valor) => (
            <div key={valor.id} className="sm:col-span-2">
              <ValoresCard valor={valor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
