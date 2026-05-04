import { Scale, Shield } from "lucide-react"

export function ReclamoHeader() {
  return (
    <div className="overflow-hidden rounded-2xl bg-sky-custom-500 text-white shadow-lg">
      <div className="px-8 py-8 md:px-10">
        {/* Título + badge */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Scale size={28} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="font-headOffice-bold text-2xl md:text-3xl">
                Libro de Reclamaciones Digital
              </h1>
              <p className="mt-0.5 font-textOffice-regular text-sm text-white/80">
                Automotores Inka S.A.C.
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2">
            <Shield size={16} strokeWidth={2} />
            <span className="font-headOffice-medium text-sm">
              Protegido por INDECOPI
            </span>
          </div>
        </div>

        {/* Texto legal */}
        <div className="mt-6 rounded-xl bg-white/10 px-6 py-4">
          <p className="text-justify font-textOffice-regular text-sm leading-relaxed text-white/90">
            Conforme a lo establecido en el Código de Protección y Defensa del
            Consumidor (Ley N° 29571), esta institución cuenta con un Libro de
            Reclamaciones Digital a su disposición para garantizar sus derechos
            como consumidor.
          </p>
        </div>
      </div>
    </div>
  )
}
