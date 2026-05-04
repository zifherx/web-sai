import { BOTTOM_BAR_PROPS } from "@/types"
import Link from "next/link"

export function BottomBar({ bottom }: BOTTOM_BAR_PROPS) {
  const { copyright, designedBy } = bottom

  return (
    <div className="flex flex-col items-center gap-2 font-textOffice-regular text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-center tracking-widest">{copyright}</p>

      <p className="hidden gap-1 sm:flex">
        {designedBy.label}{" "}
        <Link
          href={designedBy.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 transition-colors hover:text-white"
        >
          {designedBy.author}
        </Link>
      </p>
    </div>
  )
}
