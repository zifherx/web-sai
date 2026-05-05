import { parseBoldText } from "@/lib"
import { CORPORATIVO_INTRO_PROPS } from "@/types"

export function CorporativoIntro({ intro }: CORPORATIVO_INTRO_PROPS) {
  const { text } = intro

  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-textOffice-regular text-base leading-relaxed text-gray-custom-900 md:text-xl md:leading-8">
          {parseBoldText(text)}
        </p>
      </div>
    </section>
  )
}
