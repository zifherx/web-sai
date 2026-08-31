import z from "zod"

export const loginFormSchema = z.object({
  email: z.email("Ingresa un correo válido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
