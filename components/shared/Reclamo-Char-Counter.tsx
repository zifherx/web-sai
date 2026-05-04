"use client"

import { RECLAMO_CHAR_COUNTER_PROPS } from "@/types"

export function ReclamoCharCounter({
  current,
  max,
  label = "Máximo",
}: RECLAMO_CHAR_COUNTER_PROPS) {
  const isOver = current > max
  return (
    <div className="flex flex-row items-center justify-between font-textOffice-regular text-xs text-gray-custom-900">
      <span>
        {label} {max} caracteres
      </span>
      <span
        className={isOver ? "font-headOffice-medium text-red-custom-500" : ""}
      >
        {current}/{max}
      </span>
    </div>
  )
}
