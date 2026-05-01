import { cn } from "@/lib/utils"
import { PILARES_CARD_PROPS } from "@/types/nosotros.types"
import Image from "next/image"

export function PilaresCard({ contenido }: PILARES_CARD_PROPS) {
  const { content, imageSrc, title } = contenido
  return (
    <div
      className={cn(
        "group flex flex-col",
        "rounded-2xl bg-white p-4",
        "border border-gray-custom-300",
        "shadow-sm hover:shadow-lg",
        "transition-all duration-300",
        "hover:border-blue-custom-500",
        "overflow-hidden"
      )}
    >
      <div
        className="relative block h-52 w-full overflow-hidden rounded-2xl"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={`/images/nosotros/${imageSrc}`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={cn(
            "rounded-2xl object-cover object-center",
            "transition-transform duration-500 ease-out",
            "group-hover:scale-110"
          )}
          draggable={false}
        />
      </div>

      <div className="flex flex-col justify-between gap-4 px-3 pt-6 pb-0">
        <h3 className="font-headOffice-medium text-2xl tracking-wide text-blue-custom-500 md:text-3xl">
          {title}
        </h3>

        <p className="font-textOffice-regular text-lg leading-6 tracking-tighter text-gray-custom-900">
          {content}
        </p>
      </div>
    </div>
  )
}
