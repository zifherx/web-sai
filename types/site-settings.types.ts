import { PermissionRequest } from "@/shared/infrastructure/auth/permissions"
import { GENERAL_ICON } from "@/types/corporativo.types"
import { ReactNode } from "react"

export interface SiteSettingsType {
  maintenanceMode: boolean
  maintenanceMessage: string | null
  updatedBy: { userId: string; name: string } | null
  updatedAt: string | null
}

export interface SetMaintenancePayload {
  enabled: boolean
  message?: string | null
}

export type MAINTENANCE_VIEW_PROPS = {
  message: string | null
}

export interface SettingsTab {
  value: string
  label: string
  description: string
  icon: GENERAL_ICON
  permission?: PermissionRequest
  content: ReactNode
}

export type SETTINGS_DIALOG_PROPS = {
  open: boolean
  onOpenChange: (open: boolean) => void
  rol: string
}

export type MAINTENANCE_FORM_PROPS = {
  settings: SiteSettingsType
}
