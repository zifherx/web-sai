import { toast } from "sonner"

export const toastSuccess = {
  cotizacion: () =>
    toast.success("¡Cotización registrada!", {
      description:
        "Nos pondremos en contacto contigo a la brevedad. Revisa tu correo.",
    }),

  cita: () =>
    toast.success("¡Cita registrada con éxito!", {
      description:
        "Tu cita de servicio ha sido agendada. Te enviaremos una confirmación.",
    }),

  reclamo: (numeroReclamo?: string) =>
    toast.success("¡Reclamo registrado!", {
      description: numeroReclamo
        ? `N° de reclamo: ${numeroReclamo}. Recibirás respuesta en 15 días hábiles.`
        : "Hemos recibido tu reclamo. Recibirás respuesta en 15 días hábiles.",
    }),

  corporativo: () =>
    toast.success("¡Solicitud corporativa enviada!", {
      description: "Nuestro equipo comercial se pondrá en contacto contigo.",
    }),
}

export const toastError = {
  cotizacion: (detail?: string) =>
    toast.error("Error al registrar la cotización", {
      description:
        detail ?? "Ocurrió un error. Por favor, inténtalo nuevamente.",
    }),

  cita: (detail?: string) =>
    toast.error("Error al agendar la cita", {
      description:
        detail ?? "Ocurrió un error. Por favor, inténtalo nuevamente.",
    }),

  reclamo: (detail?: string) =>
    toast.error("Error al registrar el reclamo", {
      description:
        detail ?? "Ocurrió un error. Por favor, inténtalo nuevamente.",
    }),

  corporativo: (detail?: string) =>
    toast.error("Error al enviar la solicitud", {
      description:
        detail ?? "Ocurrió un error. Por favor, inténtalo nuevamente.",
    }),

  generic: (detail?: string) =>
    toast.error("Algo salió mal", {
      description:
        detail ?? "Ocurrió un error inesperado. Inténtalo nuevamente.",
    }),
}

export const toastInfo = {
  procesando: () =>
    toast.loading("Procesando tu solicitud...", {
      description: "Por favor espera un momento.",
    }),
}
