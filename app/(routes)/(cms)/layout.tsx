import { NavigationApp } from "@/components/modules/(dashboard)/Navigation-App"
import { SiderbarApp } from "@/components/modules/(dashboard)/Sidebar-App"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { requireUsuarioSesion } from "@/lib/auth/get-usuario-sesion"
import { ReactNode } from "react"

export default async function LayoutDashboard({
  children,
}: {
  children: ReactNode
}) {
  const usuario = await requireUsuarioSesion()
  return (
    <SidebarProvider>
      <SiderbarApp usuario={usuario} />
      <SidebarInset>
        <main className="pt5-5 flex flex-col gap-4 p-4">
          <NavigationApp />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
