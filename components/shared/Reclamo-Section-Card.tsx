import { RECLAMO_SECTION_CARD_PROPS } from "@/types"

export function ReclamoSectionCard({
  children,
  icon,
  numero,
  title,
}: RECLAMO_SECTION_CARD_PROPS) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Header de sección */}
      <div className="flex items-center gap-4 border-b border-gray-custom-300/40 bg-gray-custom-100 px-6 py-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-custom-500 text-white">
          {icon}
        </div>
        <h2 className="font-headOffice-bold text-base text-gray-custom-900 md:text-lg">
          {numero}. {title}
        </h2>
      </div>

      {/* Contenido */}
      <div className="p-4 md:p-8">{children}</div>
    </div>
  )
}
