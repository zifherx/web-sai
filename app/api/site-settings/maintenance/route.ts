import {
  getMaintenanceHandler,
  setMaintenanceHandler,
} from "@/modules/site-settings/presentation/site-settings.controller"
import { NextRequest } from "next/server"

/**
 * GET   /api/site-settings/maintenance → estado actual (CMS)
 * PATCH /api/site-settings/maintenance → activa/desactiva (CMS)
 */
export const GET = (req: NextRequest) => getMaintenanceHandler(req)
export const PATCH = (req: NextRequest) => setMaintenanceHandler(req)
