"use client"

import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { useLogin } from "@/hooks/mutations/use-auth.mutations"
import { cn } from "@/lib"
import {
  loginFormSchema,
  LoginFormValues,
} from "@/shared/application/dto/auth.form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CheckCircle,
  Eye,
  EyeOffIcon,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(true)
  const { mutate: login, isPending } = useLogin()

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: LoginFormValues) => {
    login(values)
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold">Iniciar sesión</h2>
        <p className="text-sm text-muted-foreground">
          Ingresa tus credenciales del CMS
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="input-email"
                className="font-headOffice-medium text-blue-custom-500"
              >
                Email
              </FieldLabel>
              <InputGroup
                className={cn(
                  "h-12 rounded-lg border border-blue-custom-500 bg-white",
                  "text-blue-custom-500",
                  "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                  isSubmitting ? "cursor-not-allowed opacity-50" : ""
                )}
              >
                <InputGroupInput
                  {...field}
                  id="input-email"
                  placeholder="ejemplo@dominio.com"
                  type="email"
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                <InputGroupAddon>
                  <Mail size={16} />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="input-password"
                className="font-headOffice-medium text-blue-custom-500"
              >
                Password
              </FieldLabel>
              <InputGroup
                className={cn(
                  "h-12 rounded-lg border border-blue-custom-500 bg-white",
                  "text-blue-custom-500",
                  "focus:border-2 focus:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-sky-custom-500",
                  isSubmitting ? "cursor-not-allowed opacity-50" : ""
                )}
              >
                <InputGroupInput
                  {...field}
                  required
                  id="input-password"
                  placeholder="12345678"
                  type={showPassword ? "password" : "text"}
                  disabled={isSubmitting}
                />
                <InputGroupAddon>
                  <LockKeyhole size={16} />
                </InputGroupAddon>
                <InputGroupAddon
                  align="inline-end"
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon /> : <Eye />}
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-xl py-4",
            "bg-sky-custom-500 font-headOffice-bold text-sm tracking-widest text-white uppercase",
            "transition-all duration-200 hover:bg-sky-custom-700 active:scale-[0.98]",
            "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          )}
        >
          {isPending ? (
            <>
              <Loader2 size={18} /> Ingresando...
            </>
          ) : (
            <>
              <CheckCircle size={18} /> Ingresar
            </>
          )}
        </button>
      </form>
    </div>
  )
}
