"use client"

import { NAVBAR_MOBILE_LINKS } from "@/constants"
import { cn } from "@/lib"
import { CircleDollarSign, Menu } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function MenuMobile() {
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  // Bloquea scroll del body mientras el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <div className="flex sm:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-custom-900 transition-colors hover:bg-gray-custom-100"
      >
        <Menu size={24} strokeWidth={2} />
      </button>

      {open && (
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/20 backdrop-blur-sm",
            "animate-in duration-200 fade-in-0"
          )}
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Drawer desde la derecha ── */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={cn(
          "shadow-3xl fixed top-1/12 right-0 z-50 h-64 w-60 rounded-l-3xl bg-white",
          "flex flex-col",
          "transition-transform duration-300 ease-[cubic-bezier(.25,.46,.45,.94)]",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Nav links */}
        <nav
          className="flex flex-col px-2 py-4"
          aria-label="Navegación principal"
        >
          {NAVBAR_MOBILE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3",
                "font-headOffice-bold text-lg text-sky-custom-500",
                "transition-colors duration-150 hover:bg-sky-custom-50 hover:text-sky-custom-500"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Separador */}
        <div className="mx-5 border-t border-gray-custom-300/40" />

        {/* CTA Financia aquí */}
        <div className="p-3">
          <Link
            href="/financia-tu-auto"
            onClick={() => setOpen(false)}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl py-3.5",
              "bg-sky-custom-500 font-headOffice-medium text-sm tracking-widest text-white uppercase",
              "transition-all duration-200 hover:bg-sky-custom-700"
            )}
          >
            <CircleDollarSign size={18} aria-hidden="true" />
            Financia Ahora
          </Link>
        </div>
      </div>
    </div>
  )
}
