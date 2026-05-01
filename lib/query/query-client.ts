import { QueryClient } from "@tanstack/react-query"

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 min
        gcTime: 1000 * 60 * 10, // 10 min en memoria
        retry: 1, // 1 reintento en error
        refetchOnReconnect: true, // ajusta según UX deseado
      },
      mutations: {
        retry: 0,
      },
    },
  })
}
