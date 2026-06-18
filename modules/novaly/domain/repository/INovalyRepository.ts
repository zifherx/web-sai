import {
  NovalyLeadResult,
  NovalyPayload,
} from "@/modules/novaly/domain/types/NovalyTypes"

/**
 * Puerto de salida secundario para la integración con Novaly.
 *
 * Define el contrato que cualquier adaptador HTTP de Novaly debe cumplir.
 * El use-case depende de esta interfaz, no del cliente HTTP concreto,
 * siguiendo el principio de inversión de dependencias (DIP).
 *
 * La implementación concreta (`NovalyHttpClient`) vive en infrastructure.
 */
export interface INovalyClient {
  enviarLead(payload: NovalyPayload): Promise<NovalyLeadResult>
}
