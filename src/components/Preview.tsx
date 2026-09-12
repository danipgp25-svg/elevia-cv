import type { ReactNode } from 'react'
import type { CVData } from '../types'
import { renderRichText } from '../utils/richText'

interface Props {
  data: CVData
}

function separarLista(texto: string): string[] {
  return texto
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

export default function Preview({ data }: Props) {
  const h = data?.header || ({} as any)
  const est = data?.estilo || {
    fontFamily: 'font-option-inter',
    fontSize: 15,
    colorTexto: '#1E1A2B',
    colorTitulos: '#4C2A85',
    colorResaltado: '#22B8A0',
    colorPrincipal: '#4C2A85',
  }
  const perfil = data?.perfil || ''
  const hab = data?.habilidades || { tecnicas: '', blandas: '', digitalesIA: '' }
  const experiencia = data?.experiencia || []
  const educacion = data?.educacion || []

  return (
    <div
      id="cv-preview"
      className={`${est.fontFamily} mx-auto w-full max-w-[800px] bg-white p-8 shadow-panel sm:p-10`}
      style={{ fontSize: `${est.fontSize}px`, color: est.colorTexto }}
    >
      {/* Encabezado */}
      <header className="mb-6 border-b-2 pb-5" style={{ borderColor: est.colorPrincipal }}>
        <h1 className="text-3xl font-bold" style={{ color: est.colorTitulos, fontFamily: 'inherit' }}>
          {h.nombre || 'Tu nombre completo'}
        </h1>
        {h.cargoObjetivo && (
          <p className="mt-1 text-lg font-semibold" style={{ color: est.colorPrincipal }}>
            {h.cargoObjetivo}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-80">
          {h.ciudad && <span>{h.ciudad}</span>}
          {h.telefono && <span>{h.telefono}</span>}
          {h.correo && <span>{h.correo}</span>}
          {h.linkedin && <span>{h.linkedin}</span>}
          {h.portafolio && <span>{h.portafolio}</span>}
        </div>
      </header>

      {/* Perfil */}
      {perfil.trim() && (
        <Seccion titulo="Perfil profesional" color={est.colorTitulos}>
          <p className="leading-relaxed">{renderRichText(perfil)}</p>
        </Seccion>
      )}

      {/* Habilidades */}
      {(hab.tecnicas || hab.blandas || hab.digitalesIA) && (
        <Seccion titulo="Habilidades" color={est.colorTitulos}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <ListaHabilidades titulo="Técnicas" items={separarLista(hab.tecnicas || '')} color={est.colorResaltado} />
            <ListaHabilidades titulo="Blandas" items={separarLista(hab.blandas || '')} color={est.colorResaltado} />
            <ListaHabilidades titulo="Digitales e IA" items={separarLista(hab.digitalesIA || '')} color={est.colorResaltado} />
          </div>
        </Seccion>
      )}

      {/* Experiencia */}
      {experiencia.length > 0 && (
        <Seccion titulo="Experiencia laboral" color={est.colorTitulos}>
          <div className="flex flex-col gap-4">
            {experiencia.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-semibold">{exp.cargo || 'Cargo'}</p>
                  <p className="text-xs opacity-70">
                    {exp.fechaInicio} — {exp.actualmente ? 'Actual' : exp.fechaFin}
                  </p>
                </div>
                <p className="text-sm italic opacity-80">{exp.empresa}</p>
                {exp.descripcion && <p className="mt-1 whitespace-pre-line leading-relaxed">{renderRichText(exp.descripcion)}</p>}
              </div>
            ))}
          </div>
        </Seccion>
      )}

      {/* Educación */}
      {educacion.length > 0 && (
        <Seccion titulo="Educación y certificaciones" color={est.colorTitulos}>
          <div className="flex flex-col gap-3">
            {educacion.map((ed) => (
              <div key={ed.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-semibold">{ed.titulo || 'Título'}</p>
                  <p className="text-xs opacity-70">{ed.fecha}</p>
                </div>
                <p className="text-sm opacity-80">{ed.institucion}</p>
                {ed.detalle && <p className="text-sm opacity-70">{ed.detalle}</p>}
              </div>
            ))}
          </div>
        </Seccion>
      )}
    </div>
  )
}


function Seccion({ titulo, color, children }: { titulo: string; color: string; children: ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-sm font-bold uppercase tracking-wide" style={{ color }}>
        {titulo}
      </h2>
      {children}
    </section>
  )
}

function ListaHabilidades({ titulo, items, color }: { titulo: string; items: string[]; color: string }) {
  if (items.length === 0) return null
  return (
    <div>
      <p className="mb-1 text-xs font-semibold opacity-70">{titulo}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => (
          <span
            key={i}
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: `${color}22`, color }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
