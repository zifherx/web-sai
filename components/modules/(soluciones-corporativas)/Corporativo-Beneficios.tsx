import { cn } from "@/lib/utils"
import { CORPORATIVO_BENEFICIOS_PROPS } from "@/types/corporativo.types"

export function CorporativoBeneficios({
  beneficios,
}: CORPORATIVO_BENEFICIOS_PROPS) {
  return (
    <section className="w-full py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="mb-10 font-headOffice-bold text-3xl text-gray-custom-900 md:text-4xl">
          Beneficios
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {beneficios.map((beneficio) => {
            const Icon = beneficio.icon
            const isDark = beneficio.variant === "dark"
            return (
              <div
                key={beneficio.id}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl p-6",
                  "transition-shadow duration-200 hover:shadow-md",
                  isDark ? "bg-sky-custom-500" : "bg-sky-custom-300"
                )}
              >
                <div
                  className="mt-16 flex h-14 w-14 items-center justify-center rounded-xl bg-white"
                  aria-hidden="true"
                >
                  <Icon
                    size={40}
                    strokeWidth={2}
                    className="text-sky-custom-500"
                  />
                </div>

                <h3 className="font-headOffice-bold text-lg leading-tight text-white md:text-xl">
                  {beneficio.title}
                </h3>

                <p className="font-textOffice-regular text-sm leading-snug text-gray-custom-100">
                  {beneficio.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
