import { CodigoConductaCard } from "@/components/shared/Codigo-Conducta-Card"
import { CODIGOS_CONDUCTA_SAI } from "@/constants"

export function CodigosConducta() {
  const { headingNeutral, headingAccent, codigos } = CODIGOS_CONDUCTA_SAI

  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <h2 className="mb-12 text-center font-headOffice-bold text-3xl md:text-4xl">
          <span className="text-gray-custom-900">{headingNeutral} </span>
          <span className="text-sky-custom-500">{headingAccent}</span>
        </h2>

        <ul className="flex flex-col gap-5">
          {codigos.map((codigo) => (
            <CodigoConductaCard key={codigo.id} codigo={codigo} />
          ))}
        </ul>
      </div>
    </section>
  )
}
