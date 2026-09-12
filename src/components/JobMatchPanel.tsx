import type { ResultadoComparacion } from '../types'

interface Props {
  oferta: string
  setOferta: (v: string) => void
  resultado: ResultadoComparacion | null
}

export default function JobMatchPanel({ oferta, setOferta, resultado }: Props) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-panel">
      <h2 className="font-display text-base font-bold text-elevia-purple">Comparar con oferta laboral</h2>
      <p className="mb-3 text-xs text-elevia-ink/60">
        Pega el texto de una oferta para ver qué tan alineada está tu hoja de vida.
      </p>

      <textarea
        value={oferta}
        onChange={(e) => setOferta(e.target.value)}
        rows={4}
        placeholder="Pega aquí la descripción de la vacante..."
        className="w-full rounded-lg border border-elevia-grayLine bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-elevia-lilac"
      />

      {resultado && (
        <div className="mt-4 space-y-3 text-sm">
          <Grupo titulo="Palabras clave encontradas" items={resultado.palabrasEncontradas} color="#22B8A0" vacio="Ninguna coincidencia todavía." />
          <Grupo titulo="Palabras clave que faltan" items={resultado.palabrasFaltantes} color="#D9534F" vacio="No se detectaron palabras faltantes." />
          <Grupo titulo="Habilidades coincidentes" items={resultado.habilidadesCoincidentes} color="#4C2A85" vacio="Aún no hay habilidades que coincidan con la oferta." />
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-elevia-ink/60">Áreas que podrían fortalecerse</p>
            {resultado.areasAFortalecer.length === 0 ? (
              <p className="text-xs text-elevia-ink/50">No se identificaron áreas adicionales a revisar.</p>
            ) : (
              <p className="text-xs text-elevia-ink/70">
                La oferta menciona estos temas y no aparecen en tu CV: {resultado.areasAFortalecer.join(', ')}.
                Si realmente tienes experiencia en alguno, considera incluirlo; si no, podría ser una brecha a desarrollar.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Grupo({ titulo, items, color, vacio }: { titulo: string; items: string[]; color: string; vacio: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-elevia-ink/60">{titulo}</p>
      {items.length === 0 ? (
        <p className="text-xs text-elevia-ink/50">{vacio}</p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, i) => (
            <span
              key={i}
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ backgroundColor: `${color}1A`, color }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
