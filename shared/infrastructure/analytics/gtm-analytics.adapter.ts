import {
  AnalyticsEvent,
  IAnalyticsEventPort,
} from "@/shared/domain/ports/analytics-event.port"

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export class GtmAnalyticsAdapter implements IAnalyticsEventPort {
  track(event: AnalyticsEvent): void {
    if (typeof window === "undefined") return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: event.name,
      event_module: event.module,
      ...event.payload,
    })
  }
}
