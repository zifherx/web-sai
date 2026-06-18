export type SystemEmailArea =
  | "Comercial"
  | "Corporativo"
  | "Reclamos"
  | "Citas"
  | "General"

export class SystemEmailEntity {
  constructor(
    public readonly id: string,
    public readonly area: SystemEmailArea | string,
    public readonly email: string,
    public readonly isActive: boolean,
    public readonly createdBy: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}
}
