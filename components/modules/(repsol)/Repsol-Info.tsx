import { REPSOL_INFO_PROPS } from "@/types/repsol.types"

export function RepsolInfo({ info }: REPSOL_INFO_PROPS) {
  const { description, headingAccent, headingNeutral } = info

  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-5 font-headOffice-bold text-3xl md:text-5xl">
          <span className="text-gray-custom-900">{headingNeutral} </span>
          <span className="text-sky-custom-500">{headingAccent}</span>
        </h2>
        <p className="font-textOffice-regular text-base leading-relaxed text-gray-custom-900 md:text-lg">
          {description}
        </p>
      </div>
    </section>
  )
}
