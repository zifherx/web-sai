import { WIZARD_STEPS_FORM } from "@/constants/financiamiento.constant"
import { cn } from "@/lib/utils"
import { WIZARD_SIDEBAR_PROPS } from "@/types/financiamiento.types"

export function WizardSidebar({
  currentStep,
  onStepClick,
  stepsCompleted,
}: WIZARD_SIDEBAR_PROPS) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 rounded-2xl bg-white",
        "p-3 md:flex md:w-64 md:shrink-0 md:flex-col md:gap-2"
      )}
    >
      {WIZARD_STEPS_FORM.map((step) => {
        const isActive = currentStep === step.number
        const isCompleted = stepsCompleted[step.number]
        const isClickable = isCompleted || isActive

        return (
          <button
            key={step.number}
            onClick={() => isClickable && onStepClick(step.number)}
            disabled={!isClickable}
            aria-current={isActive ? "step" : undefined}
            className={cn(
              "flex flex-col items-center justify-center gap-3 rounded-2xl p-4 text-center",
              "text-white transition-all duration-200",
              "flex-1 md:w-full md:flex-none",
              isActive
                ? "bg-sky-custom-500 shadow-lg shadow-blue-custom-500/30"
                : isCompleted
                  ? "cursor-pointer bg-sky-custom-500 hover:bg-sky-custom-500"
                  : "cursor-not-allowed bg-sky-custom-100 text-white"
            )}
          >
            <span className="font-headOffice-bold text-3xl leading-none">
              {step.number}
            </span>
            <span className="font-headOffice-medium text-xl leading-tight">
              {step.label}
            </span>
            <span className="hidden font-textOffice-regular text-sm leading-tight opacity-80 md:block">
              {step.sublabel}
            </span>
          </button>
        )
      })}
    </div>
  )
}
