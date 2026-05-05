import { cn } from "@/lib"
import { VALORES_CARD_PROPS } from "@/types"

export function ValoresCard({ valor }: VALORES_CARD_PROPS) {
  const { description, icon: Icon, title, variant } = valor

  const isDark = variant === "dark"

  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-2xl p-7",
        "transition-transform duration-300 hover:-translate-y-1",
        isDark ? "bg-sky-custom-500 text-white" : "bg-sky-custom-300 text-white"
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-xl",
          "bg-white"
        )}
        aria-hidden="true"
      >
        <Icon size={40} strokeWidth={1.5} className={"text-sky-custom-500"} />
      </div>

      <h3 className="font-headOffice-bold text-xl tracking-wider">{title}</h3>

      <p className="max-w-64 font-textOffice-regular text-lg leading-relaxed text-white/85">
        {description}
      </p>
    </div>
  )
}
