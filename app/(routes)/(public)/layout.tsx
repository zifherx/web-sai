import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { MaintenanceView } from "@/components/modules/(maintenance)/Maintenance-View"
import { FOOTER_CONSTANTS } from "@/constants"
import { siteSettingsServerService } from "@/services/server/site-settings.server"
import { ReactNode } from "react"

export default async function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const maintenance = await siteSettingsServerService.getMaintenanceStatus()

  if (maintenance.enabled) {
    return <MaintenanceView message={maintenance.message} />
  }

  return (
    <main>
      <Navbar />
      {children}
      <Footer {...FOOTER_CONSTANTS} />
    </main>
  )
}
