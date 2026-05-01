import { NavLink } from "@/components/shared/Nav-Link"
import { VehiculosDropdown } from "@/components/shared/Vehiculos-Dropdown"

export function MenuDesktop() {
  return (
    <div className="ml-auto hidden items-center gap-1 sm:flex">
      <VehiculosDropdown />
      <NavLink href="/nosotros/empresa">Nosotros</NavLink>
      <NavLink href="/separa-tu-cita">Separa tu cita</NavLink>
    </div>
  )
}
