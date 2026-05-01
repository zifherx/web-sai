import { Skeleton } from "@/components/ui/skeleton"
import { useActiveMarcas } from "@/hooks/queries/use-marca"
import { cn } from "@/lib/utils"
import { IMarcaSelect, STEP1_MARCA_PROPS } from "@/types/financiamiento.types"
import Image from "next/image"

export function Step1Marca({ initialData, onNext }: STEP1_MARCA_PROPS) {
  const { data: marcas, isLoading } = useActiveMarcas()

  const handleSelect = (marca: IMarcaSelect) => {
    onNext({
      marcaId: marca.id,
      marcaNombre: marca.name,
      marcaSlug: marca.slug,
    })
  }

  return (
    <div className="p-4 md:p-8">
      <div className="rounded-2xl bg-gray-custom-100 px-2 py-4 md:px-5 md:py-8">
        <h2 className="font-headOffice-bold text-xl tracking-wide text-sky-custom-500 md:text-5xl md:tracking-wider">
          Elige tu Marca Favorita
        </h2>
        <p className="mt-1 font-textOffice-regular text-lg leading-5 tracking-tight text-gray-custom-900 md:text-xl md:leading-6">
          Selecciona la marca de tu preferencia para ver los modelos disponibles
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {isLoading &&
          Array(9)
            .fill(null)
            .map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}

        {!isLoading &&
          marcas?.map((marca) => {
            const isSelected = initialData?.marcaId === marca.id
            return (
              <button
                key={marca.id}
                onClick={() => handleSelect(marca)}
                aria-pressed={isSelected}
                aria-label={`Seleccionar ${marca.name}`}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 rounded-2xl p-4",
                  "cursor-pointer border-2 transition-all duration-200",
                  "hover:border-sky-custom-300 hover:bg-sky-custom-50",
                  isSelected
                    ? "border-sky-custom-500 bg-sky-custom-50 shadow-md"
                    : "border-gray-custom-300/50 bg-white"
                )}
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={marca.imageUrl}
                    alt={marca.name}
                    fill
                    sizes="180px"
                    className="object-contain object-center drop-shadow-sm"
                    draggable={false}
                  />
                </div>
              </button>
            )
          })}
      </div>
    </div>
  )
}
