import { JSONLD_PROPS } from "@/types"

export function JsonLd({ data }: JSONLD_PROPS) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
