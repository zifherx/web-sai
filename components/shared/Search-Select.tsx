import { cn } from "@/lib"
import { SEARCH_SELECT_PROPS } from "@/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export function SearchSelect({
  id,
  onChange,
  options,
  placeholder,
  value,
  disabled = false,
}: SEARCH_SELECT_PROPS) {
  return (
    <div className="relative min-w-0 flex-1">
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id={id}
          className={cn(
            "h-auto! w-full! min-w-0! flex-1 rounded-2xl! px-5! py-4!",
            "border! border-transparent! bg-gray-custom-100!",
            "font-textOffice-regular! text-sm!",
            value ? "text-gray-custom-900!" : "text-gray-custom-700!",
            "ring-0! ring-offset-0! outline-none!",
            "transition-all duration-200",
            "focus:border-sky-custom-300! focus:ring-2! focus:ring-sky-custom-100!",
            disabled && "cursor-not-allowed opacity-50",
            "[&>svg]:shrink-0! [&>svg]:text-gray-custom-700! [&>svg]:opacity-100!"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          className={cn(
            "overflow-hidden rounded-2xl!",
            "border border-gray-custom-300/60 bg-white!",
            "shadow-xl shadow-black/10",
            "z-9999!",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-5",
            "min-w-(--radix-select-trigger-width)!",
            "p-1.5"
          )}
          position="popper"
          sideOffset={8}
          avoidCollisions
        >
          {options.length === 0 ? (
            <div className="px-4 py-3 text-center text-sm text-gray-custom-700">
              Sin opciones disponibles
            </div>
          ) : (
            options.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className={cn(
                  "cursor-pointer! rounded-xl! px-4! py-3!",
                  "font-textOffice-regular! text-sm! text-gray-custom-900!",
                  "focus:bg-sky-custom-50! focus:text-sky-custom-700!",
                  "data-[state=checked]:bg-sky-custom-100! data-[state=checked]:text-sky-custom-700!",
                  "[&_span.absolute]:hidden!",
                  "pl-4!"
                )}
              >
                {opt.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
