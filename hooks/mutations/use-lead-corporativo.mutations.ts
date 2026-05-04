import { leadCorporativoService } from "@/services"
import {
  ICreateLeadCorporativoOption,
  LeadCorporativoResponseType,
  LeadCorporativoType,
} from "@/types"
import { useMutation } from "@tanstack/react-query"

export function useCrearLeadCorporativo(
  options?: ICreateLeadCorporativoOption
) {
  return useMutation<LeadCorporativoResponseType, Error, LeadCorporativoType>({
    mutationFn: (payload) => leadCorporativoService.create(payload),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}
