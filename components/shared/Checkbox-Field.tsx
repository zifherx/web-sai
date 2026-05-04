import { forwardRef } from "react"

export const CheckboxField = forwardRef<
  HTMLInputElement,
  { label: React.ReactNode; error?: string; [key: string]: any }
>(({ label, error, ...props }, ref) => (
  <div className="flex flex-col gap-1">
    <label className="flex cursor-pointer items-start gap-2">
      <input
        ref={ref}
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 accent-sky-custom-500"
        {...props}
      />
      <span className="font-textOffice-regular text-xs leading-relaxed text-gray-custom-700">
        {label}
      </span>
    </label>
    {error && (
      <p className="pl-6 font-textOffice-regular text-xs text-red-custom-500">
        {error}
      </p>
    )}
  </div>
))
CheckboxField.displayName = "CheckboxField"
