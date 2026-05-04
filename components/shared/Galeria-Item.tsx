import { cn } from "@/lib"
import { GALERIA_ITEM_PROPS } from "@/types"
import Image from "next/image"

export function GaleriaItem({ height, img, nombre }: GALERIA_ITEM_PROPS) {
  return (
    <div className={cn("group relative overflow-hidden rounded-2xl", height)}>
      <Image
        src={img.imageUrl}
        alt={img.name || nombre}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
        draggable={false}
      />
    </div>
  )
}
