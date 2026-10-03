/** Reloj inyectable: permite fijar "ahora" en los tests de casos de uso. */
export type Clock = () => Date

export const systemClock: Clock = () => new Date()
