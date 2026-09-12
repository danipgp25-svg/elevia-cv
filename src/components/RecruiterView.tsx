import type { ReactNode } from 'react'
import type { CVData } from '../types'
import { renderRichText } from '../utils/richText'

interface Props {
  data: CVData
}

export default function RecruiterView({ data }: Props) {
  const ultimaExperiencia = data.experiencia[0]
  const habilidadesDestacadas = [data.habilidades.tecnicas, data.habilidades.digitalesIA]
    .join(', ')
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8)

  return (
    <div className="mx-auto w-full max-w-[800px] rounded-2xl bg-white p-8 shadow-panel sm:p-10">
      <p className="mb-4 rounded-lg bg-elevia-aquaSoft p-3 text-xs text-elevia-ink/70">
        Esta es la lectura rápida que un reclutador podría hacer en pocos segundos.
      </p>

      <h1 className="text-2xl font-bold text-elevia-purple">{data.header.nombre || 'Nombre no definido'}</h1>
      <p className="mb-4 font-semibold text-elevia-ink/80">{data.header.cargoObjetivo || 'Cargo objetivo no definido'}</p>

      <Bloque titulo="Perfil">
        <p className="text-sm leading-relaxed">{renderRichText(data.perfil) ?? 'Sin perfil escrito.'}</p>
      </Bloque>

      <Bloque titulo="Última experiencia">
        {ultimaExperiencia ? (
          <div className="text-sm">
            <p className="font-semibold">
              {ultimaExperiencia.cargo} — {ultimaExperiencia.empresa}
            </p>
            <p className="text-elevia-ink/70">{renderRichText(ultimaExperiencia.descripcion)}</p>
          </div>
        ) : (
          <p className="text-sm text-elevia-ink/50">Sin experiencia registrada.</p>
        )}
      </Bloque>

      <Bloque titulo="Principales habilidades">
        {habilidadesDestacadas.length === 0 ? (
          <p className="text-sm text-elevia-ink/50">Sin habilidades registradas.</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {habilidadesDestacadas.map((h, i) => (
              <span key={i} className="rounded-full bg-elevia-lilacSoft px-2.5 py-0.5 text-xs font-medium text-elevia-purple">
                {h}
              </span>
            ))}
          </div>
        )}
      </Bloque>

      <Bloque titulo="Logros destacados">
        {data.experiencia.some((e) => /\d/.test(e.descripcion)) ? (
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {data.experiencia
              .filter((e) => /\d/.test(e.descripcion))
              .slice(0, 3)
              .map((e) => (
                <li key={e.id}>{renderRichText(e.descripcion)}</li>
              ))}
          </ul>
        ) : (
          <p className="text-sm text-elevia-ink/50">Aún no hay logros cuantificados en tu experiencia.</p>
        )}
      </Bloque>
    </div>
  )
}

function Bloque({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="mb-1 text-xs font-bold uppercase tracking-wide text-elevia-purple/70">{titulo}</h2>
      {children}
    </div>
  )
}
