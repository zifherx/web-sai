import { PilaresCard } from "@/components/shared/Pilares-Card"
import { PILARES_SAI } from "@/constants"

export function PilaresInka() {
  return (
    <section className="w-full bg-[#ECF1F9] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PILARES_SAI.map((valor) => (
            <PilaresCard key={valor.id} contenido={valor} />
          ))}
        </div>
      </div>
    </section>
  )
}
