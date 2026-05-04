import { parseBoldText } from "@/lib/global.functions"
import { LEGAL_PARRAFO_PROPS } from "@/types/legal.types"

export function LegalParrafo({ parrafo }: LEGAL_PARRAFO_PROPS) {
  const { text } = parrafo

  const isDashItem = text.trimStart().startsWith("- ")
  if (isDashItem) {
    const content = text.trimStart().slice(2)

    return (
      <div className="flex items-start gap-2.5 pl-4">
        <span
          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-custom-500"
          aria-hidden="true"
        />
        <p className="text-justify font-headOffice-regular text-sm leading-relaxed text-gray-custom-900 md:text-base">
          {parseBoldText(content)}
        </p>
      </div>
    )
  }

  return (
    <p className="text-justify font-textOffice-regular text-sm leading-relaxed text-gray-custom-900 md:text-base">
      {parseBoldText(text)}
    </p>
  )
}
