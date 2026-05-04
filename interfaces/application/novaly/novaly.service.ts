import axios, { AxiosResponse } from "axios"
import { NovalyPayload } from "./novaly.dto"

export class NovalyService {
  private readonly apiUrl: string

  constructor() {
    this.apiUrl =
      process.env.NEW_ENDPOINT_NOVALY ?? process.env.ENDPOINT_NOVALY ?? ""
    if (!this.apiUrl)
      throw new Error("Falta el API Endpoint de Novaly (ENDPOINT_NOVALY)")
  }

  async enviarLead(payload: NovalyPayload): Promise<AxiosResponse> {
    return axios.post(this.apiUrl, payload, {
      headers: { "Content-Type": "application/json" },
    })
  }
}
