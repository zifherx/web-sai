import { NovalyRequestDTO } from "@/modules/novaly/application/dto/novaly.dto"
import { NovalyPayload } from "@/modules/novaly/domain/types/NovalyTypes"

interface INombreSeparado {
  nombres: string
  apellidos: string
}

/**
 * Mapper entre el DTO del frontend y el payload que espera la API de Novaly.
 *
 * La lógica de división de `nombreCompleto` → `nombres` + `apellidos` vive
 * aquí porque es una transformación de datos de aplicación, no una regla
 * de negocio de dominio — depende del formato de entrada del frontend.
 */
export class NovalyMapper {
  static toPayload(dto: NovalyRequestDTO): NovalyPayload {
    const { nombres, apellidos } = NovalyMapper.splitNombreCompleto(
      dto.nombreCompleto
    )

    return {
      nombres,
      apellidos,
      celular: dto.numeroCelular,
      email: dto.correoElectronico,
      tipo_documento: dto.tipoDocumento ?? "",
      numero_documento: dto.numeroDocumento ?? "",
      ciudad_origen: dto.ciudadCotizacion ?? "",
      marca: dto.marcaVehiculo ?? "",
      modelo: dto.modeloVehiculo ?? "",
      id_marca: dto.idMarca ?? 0,
      id_tienda: dto.idTienda ?? 0,
      form_name: "NUEVOS",
      city: dto.ciudadCotizacion ?? "",
      utm: NovalyMapper.buildUtm(dto),
    }
  }

  /**
   * Divide el nombre completo en nombres y apellidos.
   *
   * Regla: las últimas 2 palabras son los apellidos, el resto son nombres.
   * - 1 palabra  → nombre: "Carlos",  apellidos: ""
   * - 2 palabras → nombre: "Carlos",  apellidos: "Pérez"
   * - 3+ palabras → nombres: "Juan Carlos", apellidos: "Pérez López"
   */
  private static splitNombreCompleto(nombreCompleto: string): INombreSeparado {
    if (!nombreCompleto?.trim()) return { nombres: "", apellidos: "" }

    const partes = nombreCompleto.trim().split(/\s+/)

    if (partes.length === 1) return { nombres: partes[0], apellidos: "" }
    if (partes.length === 2) return { nombres: partes[0], apellidos: partes[1] }

    return {
      nombres: partes.slice(0, -2).join(" "),
      apellidos: partes.slice(-2).join(" "),
    }
  }
  /**
   * Consolida los campos UTM en el string único que Novaly espera.
   *
   * Prioridad:
   *   1. UTMs granulares → "{source}|{medium}|{campaign}|{term}"
   *   2. utmTrafico legacy → valor tal cual ("WEB", "meta", etc.)
   *   3. Fallback → "WEB"
   */
  private static buildUtm(dto: NovalyRequestDTO): string {
    const hasGranularUtm =
      dto.utmSource || dto.utmMedium || dto.utmCampaign || dto.utmTerm

    if (hasGranularUtm) {
      return (
        [
          dto.utmSource ?? "",
          // dto.utmMedium ?? "",
          // dto.utmCampaign ?? "",
          // dto.utmTerm ?? "",
        ]
          .join("|")
          // Elimina pipes finales vacíos: "meta|alcance|dia_del_padre|" → "meta|alcance|dia_del_padre"
          .replace(/\|+$/, "")
      )
    }

    return dto.utmTrafico ?? "WEB"
  }
}
