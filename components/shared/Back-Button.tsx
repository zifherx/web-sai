"use client"

import { cn } from "@/lib"
import { ArrowLeft } from "lucide-react"

export function BackButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.history.back()}
      className={cn(
        "flex items-center justify-center gap-2 rounded-xl border border-gray-custom-300/60 py-3.5",
        "font-headOffice-medium text-sm text-gray-custom-700",
        "transition-all duration-200 hover:border-sky-custom-300 hover:text-sky-custom-500"
      )}
    >
      <ArrowLeft size={16} aria-hidden="true" />
      {label}
    </button>
  )
}
