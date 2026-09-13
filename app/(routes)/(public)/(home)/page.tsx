import { portadaServerService } from "@/services/server/portada.server"
import { HomeView } from "./components/Home-View"

export default async function HomePage() {
  const portadas = await portadaServerService.getActive().catch((err) => {
    console.error("[HomePage] portadaServerService.getActive() falló:", err)
    return []
  })
  return <HomeView initialPortadas={portadas} />
}
