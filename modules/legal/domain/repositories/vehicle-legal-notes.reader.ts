import { type RichContent } from "@/shared/domain/rich-text/rich-content"

export interface VehicleLegalNoteView {
  vehiculoId: string
  vehiculoSlug: string
  title: string
  content: RichContent
}

export interface IVehicleLegalNotesReader {
  findPublishedForLegalPage(): Promise<VehicleLegalNoteView[]>
}
