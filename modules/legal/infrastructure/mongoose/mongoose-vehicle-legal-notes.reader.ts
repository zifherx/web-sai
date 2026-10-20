import {
  type IVehicleLegalNotesReader,
  type VehicleLegalNoteView,
} from "@/modules/legal/domain/repositories/vehicle-legal-notes.reader"
import { type VehiculoDocument } from "@/modules/vehiculo/infrastructure/mongoose/MongooseVehiculoSchema"
import { type RichContent } from "@/shared/domain/rich-text/rich-content"
import { type Model } from "mongoose"

type NoteProjection = {
  _id: { toString(): string }
  slug: string
  notaLegal: NonNullable<VehiculoDocument["notaLegal"]>
}

export class MongooseVehicleLegalNotesReader implements IVehicleLegalNotesReader {
  constructor(private readonly model: Model<VehiculoDocument>) {}

  async findPublishedForLegalPage(): Promise<VehicleLegalNoteView[]> {
    const docs = await this.model
      .find(
        {
          "notaLegal.showInLegalPage": true,
          "notaLegal.published": { $ne: null },
        },
        { slug: 1, notaLegal: 1 }
      )
      .sort({ "notaLegal.published.title": 1 })
      .collation({ locale: "es" })
      .lean<NoteProjection[]>()

    return docs.flatMap((d) => {
      const published = d.notaLegal.published
      if (!published) return []
      return [
        {
          vehiculoId: d._id.toString(),
          vehiculoSlug: d.slug,
          title: published.title,
          content: published.content as RichContent,
        },
      ]
    })
  }
}
