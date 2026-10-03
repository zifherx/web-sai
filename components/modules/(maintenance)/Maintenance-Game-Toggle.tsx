"use client"

import { cn } from "@/lib/utils"
import { Gamepad2, X } from "lucide-react"
import dynamic from "next/dynamic"
import { useState } from "react"

const loadGame = () =>
  import("@/components/modules/(maintenance)/Car-Runner-Game").then(
    (m) => m.CarRunnerGame
  )

const CarRunnerGame = dynamic(loadGame, {
  ssr: false,
  loading: () => (
    <div className="aspect-800/220 w-full animate-pulse rounded-2xl bg-gray-custom-100" />
  ),
})

export function MaintenanceGameToggle() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {open && <CarRunnerGame />}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        // Precarga el chunk al pasar el mouse/enfocar: el clic se siente instantáneo
        onPointerEnter={() => void loadGame()}
        onFocus={() => void loadGame()}
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl px-6 py-3",
          "font-headOffice-bold text-sm tracking-widest uppercase",
          "transition-all duration-200",
          "cursor-pointer",
          open
            ? "border-2 border-gray-custom-500 text-gray-custom-900 hover:bg-gray-custom-100"
            : "bg-sky-custom-500 text-white hover:bg-sky-custom-700"
        )}
      >
        {open ? (
          <>
            <X size={16} aria-hidden="true" /> Cerrar juego
          </>
        ) : (
          <>
            <Gamepad2 size={18} aria-hidden="true" /> ¿Jugamos mientras tanto?
          </>
        )}
      </button>
    </div>
  )
}
