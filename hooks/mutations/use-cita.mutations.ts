import { citaService } from "@/services"
import { CitaResponseType, CitaType, ICreateCitaOption } from "@/types"
import { useMutation } from "@tanstack/react-query"

export function useCrearCita(options?: ICreateCitaOption) {
  return useMutation<CitaResponseType, Error, CitaType>({
    mutationFn: (payload) => citaService.create(payload),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}
