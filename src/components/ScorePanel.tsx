import type { PuntuacionCV } from '../types'

interface Props {
  puntuacion: PuntuacionCV
}

function colorPorValor(valor: number) {
  if (valor >= 70) return '#22B8A0'
  if (valor >= 40) return '#C9A227'
  return '#D9534F'
}

export default function ScorePanel({ puntuacion }: Props) {
  const { total, ats, logros, relevancia, legibilidad } = puntuacion

  return (
    <div className="rounded-2xl bg-white p-5 shadow-panel">
      <div className="flex items-center gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 text-lg font-bold"
          style={{ borderColor: colorPorValor(total), color: colorPorValor(total) }}
        >
          {total}
        </div>
        <div>
          <p className="font-display text-sm font-bold text-elevia-purple">Nivel de optimización</p>
          <p className="text-xs text-elevia-ink/60">Orientativo — no garantiza pasar un sistema ATS real.</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Barra etiqueta="ATS" valor={ats} />
        <Barra etiqueta="Logros" valor={logros} />
        <Barra etiqueta="Relevancia" valor={relevancia} />
        <Barra etiqueta="Legibilidad" valor={legibilidad} />
      </div>
    </div>
  )
}

function Barra({ etiqueta, valor }: { etiqueta: string; valor: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs font-semibold text-elevia-ink/70">
        <span>{etiqueta}</span>
        <span>{valor}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-elevia-gray">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{ width: `${valor}%`, backgroundColor: colorPorValor(valor) }}
        />
      </div>
    </div>
  )
}
