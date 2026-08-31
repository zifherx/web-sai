export type MODULE_TYPE =
  | "catalogo"
  | "citas"
  | "cotizacion"
  | "reclamo"
  | "corporativo"
  | "leads"
  | "novaly"
  | "general"

export interface AnalyticsEvent {
  name: string
  module: MODULE_TYPE
  payload?: Record<string, string | number | boolean>
}

export interface IAnalyticsEventPort {
  track(event: AnalyticsEvent): void
}
