"use client"

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react"

interface AuthTransitionState {
  isActive: boolean
  message: string
}

interface AuthTransitionContextValue extends AuthTransitionState {
  showTransition: (message: string) => void
  hideTransition: () => void
}

const AuthTransitionContext = createContext<AuthTransitionContextValue | null>(
  null
)

export function AuthTransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthTransitionState>({
    isActive: false,
    message: "",
  })

  const showTransition = useCallback((message: string) => {
    setState({ isActive: true, message })
  }, [])

  const hideTransition = useCallback(() => {
    setState((prev) => ({ ...prev, isActive: false }))
  }, [])

  return (
    <AuthTransitionContext.Provider
      value={{ ...state, showTransition, hideTransition }}
    >
      {children}
    </AuthTransitionContext.Provider>
  )
}

export function useAuthTransition() {
  const ctx = useContext(AuthTransitionContext)
  if (!ctx) {
    throw new Error(
      "useAuthTransition debe usarse dentro de <AuthTransitionProvider>"
    )
  }
  return ctx
}
