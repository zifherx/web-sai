import { cn } from "@/lib/utils"
import { COLOR_PICKER_PROPS } from "@/types/marcamodelo.types"

export function ColorPicker({
  colorActivo,
  colores,
  onColorChange,
}: COLOR_PICKER_PROPS) {
  return (
    <div
      className="flex flex-wrap gap-5"
      role="radiogroup"
      aria-label="Seleccionar color"
    >
      {colores.map((color) => {
        const isSelected = colorActivo?.hex === color.hex

        return (
          <button
            key={color.hex}
            role="radio"
            aria-checked={isSelected}
            aria-label={color.label}
            title={color.label}
            onClick={() => onColorChange(color)}
            className={cn(
              "h-7 w-7 rounded-full transition-all duration-200",
              "cursor-pointer border-2 border-white",
              "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-sky-custom-500",
              isSelected
                ? "scale-110 ring-2 ring-sky-custom-500 ring-offset-2"
                : "hover:scale-110 hover:ring-2 hover:ring-gray-custom-500 hover:ring-offset-1"
            )}
            style={{ backgroundColor: color.hex }}
          />
        )
      })}
    </div>
  )
}
