import { INDENT_CLASS } from "@/constants"
import { cn } from "@/lib"
import { LEGAL_SECTION_PROPS } from "@/types"
import { LegalParrafo } from "./Legal-Parrafo"

export function LegalSection({ section }: LEGAL_SECTION_PROPS) {
  const { parrafos, title, indentLevel = 0 } = section

  return (
    <div className="flex flex-col gap-3">
      {title && (
        <h2
          className={cn(
            "font-headOffice-bold text-base text-sky-custom-500 md:text-lg",
            INDENT_CLASS[indentLevel]
          )}
        >
          {title}
        </h2>
      )}
      <div
        className={cn(
          "flex flex-col gap-2",
          indentLevel > 0 && INDENT_CLASS[indentLevel]
        )}
      >
        {parrafos.map((parrafo) => (
          <LegalParrafo key={parrafo.id} parrafo={parrafo} />
        ))}
      </div>
    </div>
  )
}
