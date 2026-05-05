import { LEGAL_ARTICLE_PROPS } from "@/types"
import { LegalSection } from "./Legal-Section"

export function LegalArticle({ page }: LEGAL_ARTICLE_PROPS) {
  const { heading, sections, subsections } = page

  return (
    <article className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-16">
      {/* Título principal */}
      <h1 className="mb-10 text-center font-headOffice-bold text-2xl text-sky-custom-500 uppercase md:text-3xl">
        {heading}
      </h1>

      {/* Secciones principales */}
      {sections.length > 0 && (
        <div className="flex flex-col gap-6">
          {sections.map((section) => (
            <LegalSection key={section.id} section={section} />
          ))}
        </div>
      )}

      {/* Subsecciones (ej: promociones individuales) */}
      {subsections && subsections.length > 0 && (
        <div className="mt-10 flex flex-col gap-10">
          {subsections.map((sub) => (
            <section key={sub.id}>
              <h2 className="mb-4 font-headOffice-bold text-lg text-sky-custom-500">
                {sub.heading}
              </h2>
              <div className="flex flex-col gap-5">
                {sub.sections.map((section) => (
                  <LegalSection key={section.id} section={section} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </article>
  )
}
