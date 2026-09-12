import type { VistaActiva } from '../types'

interface Props {
  vista: VistaActiva
  setVista: (v: VistaActiva) => void
  onDescargarPDF: () => void
  descargando: boolean
}

const VISTAS: { id: VistaActiva; label: string }[] = [
  { id: 'editor', label: 'Editor' },
  { id: 'ats', label: 'Vista ATS' },
  { id: 'reclutador', label: 'Vista reclutador' },
]

export default function TopBar({ vista, setVista, onDescargarPDF, descargando }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b border-elevia-grayLine bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-elevia-purple to-elevia-aqua text-sm font-bold text-white">
            E
          </div>
          <div>
            <p className="font-display text-sm font-bold leading-tight text-elevia-purple">ELEVIA</p>
            <p className="text-[11px] leading-tight text-elevia-ink/50">Simulador de hoja de vida</p>
          </div>
        </div>

        <nav className="flex gap-1 rounded-xl bg-elevia-gray p-1">
          {VISTAS.map((v) => (
            <button
              key={v.id}
              onClick={() => setVista(v.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                vista === v.id ? 'bg-white text-elevia-purple shadow-sm' : 'text-elevia-ink/60 hover:text-elevia-purple'
              }`}
            >
              {v.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onDescargarPDF}
          disabled={descargando}
          className="rounded-xl bg-elevia-purple px-4 py-2 text-sm font-semibold text-white transition hover:bg-elevia-purpleDeep disabled:opacity-60"
        >
          {descargando ? 'Generando PDF...' : 'Descargar hoja de vida en PDF'}
        </button>
      </div>
    </header>
  )
}
