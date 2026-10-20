import { InvalidValidityRangeError } from "@/modules/legal/domain/errors/legal.error"
import { type OperationalSnapshot } from "@/shared/domain/content-versioning/content-revision"
import { type VersionedContent } from "@/shared/domain/content-versioning/versioned-content"

export interface PromotionAttachment {
  readonly url: string
  readonly name: string
}

export interface PromotionSettings {
  readonly validFrom: Date | null
  readonly validTo: Date | null
  readonly isActive: boolean
  readonly attachment: PromotionAttachment | null
}

export type PromotionValidityStatus =
  | "unpublished" // nunca publicada
  | "inactive" //    apagada manualmente
  | "scheduled" //   aún no inicia su vigencia
  | "active" //      visible en el sitio
  | "expired" //     vigencia terminada

export class LegalPromotionEntity {
  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly versioned: VersionedContent,
    public readonly validFrom: Date | null,
    public readonly validTo: Date | null,
    public readonly isActive: boolean,
    public readonly order: number,
    public readonly attachment: PromotionAttachment | null,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  static assertValidRange(validFrom: Date | null, validTo: Date | null): void {
    if (validFrom && validTo && validFrom.getTime() > validTo.getTime()) {
      throw new InvalidValidityRangeError()
    }
  }

  isVisibleAt(now: Date): boolean {
    return this.validityStatusAt(now) === "active"
  }

  validityStatusAt(now: Date): PromotionValidityStatus {
    if (this.versioned.published === null) return "unpublished"
    if (!this.isActive) return "inactive"
    const t = now.getTime()
    if (this.validFrom && t < this.validFrom.getTime()) return "scheduled"
    if (this.validTo && t > this.validTo.getTime()) return "expired"
    return "active"
  }

  operationalSnapshot(): OperationalSnapshot {
    return {
      validFrom: this.validFrom,
      validTo: this.validTo,
      isActive: this.isActive,
    }
  }
}
