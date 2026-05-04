import { FORM_FIELD_CONTACTO } from "@/types"

export function FormField({
  children,
  label,
  error,
  icon: Icon,
  required,
}: FORM_FIELD_CONTACTO) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-headOffice-medium text-sm text-gray-custom-900">
        {label} {required && <span className="text-red-custom-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-custom-500"
            aria-hidden="true"
          />
        )}
        {children}
      </div>
      {error && (
        <p className="font-textOffice-regular text-xs text-red-custom-500">
          {error}
        </p>
      )}
    </div>
  )
}
