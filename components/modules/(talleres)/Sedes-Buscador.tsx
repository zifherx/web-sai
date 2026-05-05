import { SearchSelect } from "@/components/shared/Search-Select"
import { Button } from "@/components/ui/button"
import { ALL_CITIES } from "@/constants"
import { cn } from "@/lib"
import { IOptionSelect, SEDE_BUSCADOR_PROPS } from "@/types"

export function SedesBuscador({
  ciudadValue,
  ciudades,
  localValue,
  locales,
  onCiudadChange,
  onLocalChange,
  onSearch,
}: SEDE_BUSCADOR_PROPS) {
  const ciudadOptions: IOptionSelect[] = [
    { value: ALL_CITIES, label: "Todos" },
    ...ciudades.map((c) => ({
      value: c.toLowerCase(),
      label: c,
    })),
  ]

  const localOptions: IOptionSelect[] = locales.map((s) => ({
    value: s.id,
    label: s.name,
  }))

  return (
    <div
      className={cn(
        "absolute bottom-0 left-1/2 z-20",
        "-translate-x-1/2 translate-y-1/2",
        "w-full max-w-4xl px-4"
      )}
    >
      <div
        className={cn(
          "rounded-3xl bg-white px-8 py-8",
          "shadow-2xl shadow-black/10",
          "border border-gray-custom-300/40"
        )}
      >
        <h2 className="mb-6 text-center font-headOffice-bold text-2xl text-sky-custom-500 md:text-3xl">
          Encuentra nuestros locales y talleres
        </h2>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Ciudad */}
          <SearchSelect
            id="filter-ciudad"
            placeholder="Ciudad"
            value={ciudadValue}
            onChange={onCiudadChange}
            options={ciudadOptions}
          />

          {/* Local - depende de la ciudad */}
          <SearchSelect
            id="filter-local"
            placeholder={
              !ciudadValue || ciudadValue === ALL_CITIES
                ? "Todos los locales"
                : localOptions.length === 0
                  ? "Sin locales disponibles"
                  : "Local"
            }
            value={localValue}
            onChange={onLocalChange}
            options={localOptions}
            disabled={!ciudadValue || ciudadValue === ALL_CITIES}
          />

          <Button
            onClick={() => onSearch(ciudadValue, localValue)}
            aria-label="Buscar locales y talleres"
            className={cn(
              "shrink-0 cursor-pointer rounded-2xl px-8 py-7",
              "bg-sky-custom-500 font-headOffice-bold text-sm tracking-widest text-white uppercase",
              "transition-all duration-200",
              "hover:bg-sky-custom-700",
              "active:scale-[0.98]",
              "w-full md:w-auto"
            )}
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  )
}
