"use client"

import { cn } from "@/lib/utils"
import { useAuthTransition } from "@/providers/Auth-Transition.provider"
import { Car } from "lucide-react"

export function AuthTransitionOverlay() {
  const { isActive, message } = useAuthTransition()

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!isActive}
      className={cn(
        "fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 bg-slate-900/95 backdrop-blur-sm transition-opacity duration-300",
        isActive
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <div className="relative flex h-24 w-64 items-center">
        <div className="absolute right-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-0.5 w-8 rounded-full bg-sky-400/70"
              style={{
                animation: "auth-speed-line 900ms ease-out infinite",
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>

        <div
          className="relative z-10 ml-auto rounded-full bg-sky-500/10 p-4"
          style={{ animation: "auth-car-bounce 900ms ease-in-out infinite" }}
        >
          <Car className="h-10 w-10 text-sky-400" strokeWidth={1.5} />
        </div>
      </div>

      <div
        className="h-1 w-64 rounded-full bg-[repeating-linear-gradient(90deg,#64748b_0_16px,transparent_16px_32px)]"
        style={{ animation: "auth-road-scroll 600ms linear infinite" }}
      />

      <p className="text-sm font-medium text-slate-200">{message}</p>
    </div>
  )
}
