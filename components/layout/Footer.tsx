import { BottomBar } from "@/components/modules/(footer)/Bootom-Bar"
import { ContentFooter } from "@/components/modules/(footer)/Content-Footer"
import { LogoFooter } from "@/components/modules/(footer)/Logo-Footer"
import { FOOTER_PROPS } from "@/types"

export function Footer({
  bottomBar,
  brand,
  complaints,
  sections,
  social,
}: FOOTER_PROPS) {
  return (
    <footer className="w-full bg-blue-custom-500">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8 md:py-14">
        <LogoFooter brand={brand} />
        <ContentFooter content={{ complaints, sections, social }} />
        <div className="my-6 h-px w-full bg-white/20">&nbsp;</div>
        <BottomBar bottom={bottomBar} />
      </div>
    </footer>
  )
}
