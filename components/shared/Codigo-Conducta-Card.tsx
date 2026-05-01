import { parseBoldText } from "@/lib/global.functions"
import { cn } from "@/lib/utils"
import { CODIGO_CONDUCTA_CARD_PROPS } from "@/types/nosotros.types"

export function CodigoConductaCard({ codigo }: CODIGO_CONDUCTA_CARD_PROPS) {
  const { text } = codigo

  return (
    <li
      className={cn(
        "flex items-start gap-5",
        "rounded-2xl bg-white px-7 py-6",
        "border border-gray-custom-700/30",
        "shadow-sm"
      )}
    >
      <div className="mt-0.5 shrink-0" aria-hidden="true">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="14"
            cy="14"
            r="12"
            stroke="#1a5fba"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="14" cy="14" r="7" fill="#1a5fba" />
        </svg>
      </div>

      <p className="font-textOffice-regular text-base leading-relaxed text-gray-custom-700">
        {parseBoldText(text)}
      </p>
    </li>
  )
}
