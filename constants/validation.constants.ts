export const validationMessage = {
  isUUID: (property: string) => `El campo ${property} debe ser un UUID`,
  isString: (property: string): string =>
    `El campo ${property} debe ser una cadena de texto`,
  length: (property: string, min: number, max: number) =>
    `${property} debe tener entre ${min} y ${max} caracteres`,
  isNotEmpty: (property: string): string =>
    `El campo ${property} no puede estar vacío`,
  isArray: (property: string) => `El campo ${property} debe ser un arreglo`,
  arrayMinSize: (property: string, min: number) =>
    `El campo ${property} debe tener al menos ${min} elemento`,
  arrayMaxSize: (property: string, max: number) =>
    `El campo ${property} no puede tener más de ${max} elementos `,
  matchesPattern: (property: string, patternDescription: string) =>
    `El campo ${property} debe coincidir con el patrón: ${patternDescription}`,
  isEmail: (property: string): string =>
    `El campo ${property} de ser un email válido`,
  isMin: (property: string, min: number): string =>
    `El campo ${property} debe tener mínimo ${min} caracteres`,
}
