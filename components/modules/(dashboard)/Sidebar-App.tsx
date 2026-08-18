"use client"

import { LogoSidebar } from "@/components/modules/(dashboard)/Logo-Sidebar"
import { NavMenu } from "@/components/modules/(dashboard)/Nav-Menu"
import { NavUser } from "@/components/modules/(dashboard)/Nav-User"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Sidebar_Menu } from "@/constants/menu.constants"
import { AuthUsuario } from "@/types/auth.types"
import { ComponentProps } from "react"

interface SidebarAppProps extends ComponentProps<typeof Sidebar> {
  usuario: AuthUsuario
}

export function SiderbarApp({ usuario, ...props }: SidebarAppProps) {
  const menu = Sidebar_Menu.filter(
    (item) => !item.roles || item.roles.includes(usuario.rol)
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoSidebar />
      </SidebarHeader>

      <SidebarContent>
        <NavMenu menu={menu} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser usuario={usuario} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
