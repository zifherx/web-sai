export class MarcaEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly imageUrl: string,
    public readonly idNovaly: number,
    public readonly isActive: boolean,
    public readonly createdBy: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  isPublishable(): boolean {
    return this.isActive && this.imageUrl.length > 0
  }
}
