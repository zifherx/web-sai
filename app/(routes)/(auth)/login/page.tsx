import type { Metadata } from "next"
import { LoginView } from "./components/Login-View"

export const metadata: Metadata = {
  title: {
    default: "Iniciar sesión | CMS Automotores Inka",
    template: "",
  },
}

export default function LoginPage() {
  return <LoginView />
}
