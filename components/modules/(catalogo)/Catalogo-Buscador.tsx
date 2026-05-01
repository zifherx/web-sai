"use client"

import { SearchSelect } from "@/components/shared/Search-Select"
import { Button } from "@/components/ui/button"
import { PRICE_RANGES } from "@/constants/catalogo.constants"
import { cn } from "@/lib/utils"
import { CATALOGO_BUSCAR_PROPS } from "@/types/catalogo.types"
import { IOptionSelect } from "@/types/searchSelect.types"

export const ALL_BRANDS = "todos"

export function CatalogoBuscador({
  loadingMarcas,
  marcaValue,
  marcas,
  modeloValue,
  modelos,
  onBuscar,
  onMarcaChange,
  onModeloChange,
  onPrecioChange,
  precioValue,
}: CATALOGO_BUSCAR_PROPS) {
  const marcaOptions: IOptionSelect[] = [
    { value: ALL_BRANDS, label: "Todos" },
    ...marcas.map((marca) => ({
      value: marca.slug,
      label: marca.name,
    })),
  ]

  const modeloOptions: IOptionSelect[] = modelos.map((v) => ({
    value: v.slug,
    label: v.name,
  }))

  const isTodos = !marcaValue || marcaValue === ALL_BRANDS

  return (
    <div
      className={cn(
        "absolute bottom-0 left-1/2 z-20",
        "-translate-x-1/2 translate-y-1/2",
        "w-full max-w-5xl px-4"
      )}
    >
      <div
        className={cn(
          "rounded-3xl bg-white px-8 py-8",
          "shadow-2xl shadow-black/10",
          "border border-gray-custom-300/40"
        )}
      >
        <h2 className="mb-6 text-center font-headOffice-bold text-xl text-sky-custom-500 md:text-3xl">
          Busca el auto de tus sueños
        </h2>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Marca */}
          <SearchSelect
            id="catalogo-marca"
            placeholder="Marca"
            value={marcaValue}
            onChange={onMarcaChange}
            options={marcaOptions}
            disabled={loadingMarcas}
          />

          {/* Modelo */}
          <SearchSelect
            id="catalogo-modelo"
            placeholder={
              isTodos
                ? "Todos los modelos"
                : modeloOptions.length === 0
                  ? "Sin modelos"
                  : "Modelo"
            }
            value={modeloValue}
            onChange={onModeloChange}
            options={modeloOptions}
            disabled={isTodos}
          />

          {/* Rango de precio */}
          <SearchSelect
            id="catalogo-precio"
            placeholder="Rango de precio"
            value={precioValue}
            onChange={onPrecioChange}
            options={PRICE_RANGES}
          />

          {/* CTA */}
          <Button
            onClick={onBuscar}
            aria-label="Buscar vehículos"
            className={cn(
              "shrink-0 rounded-2xl px-8 py-7",
              "bg-sky-custom-500 font-headOffice-bold text-sm tracking-widest text-white uppercase",
              "transition-all duration-200 hover:bg-sky-custom-700 active:scale-[0.98]",
              "w-full cursor-pointer md:w-auto"
            )}
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  )
}
