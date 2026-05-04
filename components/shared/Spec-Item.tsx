import { SPEC_ITEM_PROPS } from "@/types"

export function SpecItem({ spec }: SPEC_ITEM_PROPS) {
  const { mainTitle, superTitle, subTitle } = spec

  return (
    <div className="flex flex-col items-center gap-1 px-8 py-4 text-center">
      {/* SuperTitle — label pequeño encima */}
      <p className="font-textOffice-regular text-sm text-gray-custom-700">
        {superTitle}
      </p>

      {/* MainTitle — valor grande */}
      <p className="font-headOffice-bold text-3xl text-gray-custom-900 md:text-4xl">
        {mainTitle}
      </p>

      {/* SubTitle — detalle pequeño abajo */}
      {subTitle && (
        <p className="font-textOffice-medium text-sm text-gray-custom-700">
          {subTitle}
        </p>
      )}
    </div>
  )
}
