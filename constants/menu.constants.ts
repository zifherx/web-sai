import { NavMenuItem } from "@/types/auth.types"
import { Building2, Car, FileText, LayoutDashboard, Users } from "lucide-react"

export const Sidebar_Menu: NavMenuItem[] = [
  {
    label: "Dashboard",
    slug: "dashboard",
    icon: LayoutDashboard,
    color: "text-sky-600",
    hasSubmenu: false,
  },
  {
    label: "Vehículos",
    slug: "vehiculos",
    icon: Car,
    color: "text-emerald-600",
    hasSubmenu: false,
  },
  {
    label: "Sedes",
    slug: "sedes",
    icon: Building2,
    color: "text-amber-600",
    hasSubmenu: false,
  },
  {
    label: "Reclamos",
    slug: "reclamos",
    icon: FileText,
    color: "text-rose-600",
    hasSubmenu: false,
  },
  {
    label: "Usuarios",
    slug: "usuarios",
    icon: Users,
    color: "text-violet-600",
    hasSubmenu: false,
    roles: ["admin"], // solo admin ve este ítem en el sidebar
  },
]
