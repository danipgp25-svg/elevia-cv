import type { CVData } from '../types'

interface Props {
  data: CVData
}

function limpiar(texto?: string): string {
  if (!texto) return ''
  return texto.replace(/\*\*|__|\*/g, '')
}


export default function ATSView({ data }: Props) {
  const h = data?.header || ({} as any)
  const perfil = data?.perfil || ''
  const hab = data?.habilidades || { tecnicas: '', blandas: '', digitalesIA: '' }
  const experiencia = data?.experiencia || []
  const educacion = data?.educacion || []

  return (
    <div className="mx-auto w-full max-w-[800px] rounded-2xl bg-white p-8 font-mono text-sm shadow-panel sm:p-10">
      <div className="mb-4 rounded-lg bg-elevia-gray p-3 text-xs text-elevia-ink/70">
        Así de simple y estructurado interpretan tu información muchos sistemas ATS: sin colores, íconos ni columnas,
        solo texto plano organizado por secciones.
      </div>

      <p className="font-bold">{h.nombre || '[Nombre no definido]'}</p>
      <p>{h.cargoObjetivo}</p>
      <p>
        {[h.ciudad, h.telefono, h.correo, h.linkedin, h.portafolio].filter(Boolean).join(' | ') || '[Sin datos de contacto]'}
      </p>

      <hr className="my-4 border-elevia-grayLine" />
      <p className="font-bold uppercase">Perfil profesional</p>
      <p className="whitespace-pre-line">{limpiar(perfil) || '[Sin contenido]'}</p>

      <hr className="my-4 border-elevia-grayLine" />
      <p className="font-bold uppercase">Habilidades</p>
      <p>Técnicas: {hab.tecnicas || '[Sin contenido]'}</p>
      <p>Blandas: {hab.blandas || '[Sin contenido]'}</p>
      <p>Digitales / IA: {hab.digitalesIA || '[Sin contenido]'}</p>

      <hr className="my-4 border-elevia-grayLine" />
      <p className="font-bold uppercase">Experiencia laboral</p>
      {experiencia.length === 0 && <p>[Sin experiencia registrada]</p>}
      {experiencia.map((exp) => (
        <div key={exp.id} className="mb-3">
          <p className="font-semibold">
            {exp.cargo || '[Cargo]'} — {exp.empresa || '[Empresa]'}
          </p>
          <p>
            {exp.fechaInicio} - {exp.actualmente ? 'Actual' : exp.fechaFin}
          </p>
          <p className="whitespace-pre-line">{limpiar(exp.descripcion)}</p>
        </div>
      ))}

      <hr className="my-4 border-elevia-grayLine" />
      <p className="font-bold uppercase">Educación y certificaciones</p>
      {educacion.length === 0 && <p>[Sin educación registrada]</p>}
      {educacion.map((ed) => (
        <div key={ed.id} className="mb-2">
          <p>
            {ed.titulo || '[Título]'} — {ed.institucion || '[Institución]'} ({ed.fecha})
          </p>
        </div>
      ))}
    </div>
  )
}

