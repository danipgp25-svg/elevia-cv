import type { CoachSugerencia } from '../types'

interface Props {
  sugerencias: CoachSugerencia[]
}

const ESTILO_TIPO: Record<CoachSugerencia['tipo'], string> = {
  positivo: 'border-elevia-aqua/40 bg-elevia-aquaSoft text-elevia-ink',
  sugerencia: 'border-elevia-lilac/40 bg-elevia-lilacSoft text-elevia-ink',
  advertencia: 'border-amber-300 bg-amber-50 text-elevia-ink',
  alerta: 'border-red-200 bg-red-50 text-elevia-ink',
}

export default function CoachPanel({ sugerencias }: Props) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white shadow-panel">
      <div className="border-b border-elevia-grayLine px-5 py-4">
        <h2 className="font-display text-base font-bold text-elevia-purple">Coach de CV</h2>
        <p className="text-xs text-elevia-ink/60">Recomendaciones en tiempo real mientras escribes.</p>
      </div>

      <div className="flex-1 space-y-2.5 overflow-y-auto p-4">
        {sugerencias.length === 0 && (
          <p className="text-sm text-elevia-ink/50">
            Empieza a completar tu hoja de vida para recibir recomendaciones aquí.
          </p>
        )}
        {sugerencias.map((s) => (
          <div key={s.id} className={`rounded-lg border px-3 py-2.5 text-sm ${ESTILO_TIPO[s.tipo]}`}>
            <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide opacity-60">{s.seccion}</p>
            <p>{s.mensaje}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
