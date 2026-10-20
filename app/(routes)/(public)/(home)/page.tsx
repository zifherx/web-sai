import { HomeView } from "@/app/(routes)/(public)/(home)/components/Home-View"
import { portadaServerService } from "@/services/server/portada.server"

export default async function HomePage() {
  const portadas = await portadaServerService.getActive().catch((err) => {
    console.error("[HomePage] portadaServerService.getActive() falló:", err)
    return []
  })
  return <HomeView initialPortadas={portadas} />
}
