import type { Dispatch, SetStateAction } from 'react'
import type { CVData, SeccionActiva } from '../types'
import { nuevaExperiencia, nuevaEducacion } from '../data/defaultData'
import RichTextArea from './RichTextArea'

interface Props {
  data: CVData
  setData: Dispatch<SetStateAction<CVData>>
  seccionActiva: SeccionActiva
  setSeccionActiva: (s: SeccionActiva) => void
}

const TABS: { id: SeccionActiva; label: string }[] = [
  { id: 'encabezado', label: 'Encabezado' },
  { id: 'perfil', label: 'Perfil' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'educacion', label: 'Educación' },
  { id: 'estilo', label: 'Estilo' },
]

const inputClass =
  'w-full rounded-lg border border-elevia-grayLine bg-white px-3 py-2 text-sm text-elevia-ink outline-none focus:ring-2 focus:ring-elevia-lilac'
const labelClass = 'mb-1 block text-xs font-semibold uppercase tracking-wide text-elevia-purple/70'

interface SubProps {
  data: CVData
  setData: Dispatch<SetStateAction<CVData>>
}

export default function EditorPanel({ data, setData, seccionActiva, setSeccionActiva }: Props) {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white shadow-panel">
      <div className="flex flex-wrap gap-1 border-b border-elevia-grayLine px-3 pt-3">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSeccionActiva(tab.id)}
            className={`rounded-t-lg px-3 py-2 text-sm font-semibold transition ${
              seccionActiva === tab.id
                ? 'bg-elevia-lilacSoft text-elevia-purple'
                : 'text-elevia-ink/60 hover:text-elevia-purple'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {seccionActiva === 'encabezado' && <FormEncabezado data={data} setData={setData} />}
        {seccionActiva === 'perfil' && <FormPerfil data={data} setData={setData} />}
        {seccionActiva === 'habilidades' && <FormHabilidades data={data} setData={setData} />}
        {seccionActiva === 'experiencia' && <FormExperiencia data={data} setData={setData} />}
        {seccionActiva === 'educacion' && <FormEducacion data={data} setData={setData} />}
        {seccionActiva === 'estilo' && <FormEstilo data={data} setData={setData} />}
      </div>
    </div>
  )
}

function FormEncabezado({ data, setData }: SubProps) {
  const h = data.header
  function set(campo: keyof typeof h, valor: string) {
    setData({ ...data, header: { ...h, [campo]: valor } })
  }

  const campos: { key: keyof typeof h; label: string; placeholder: string }[] = [
    { key: 'nombre', label: 'Nombre completo', placeholder: 'Ej: Camila Rodríguez' },
    { key: 'cargoObjetivo', label: 'Cargo objetivo', placeholder: 'Ej: Analista de Datos' },
    { key: 'ciudad', label: 'Ciudad', placeholder: 'Ej: Bogotá, Colombia' },
    { key: 'telefono', label: 'Teléfono', placeholder: 'Ej: +57 300 000 0000' },
    { key: 'correo', label: 'Correo electrónico', placeholder: 'Ej: nombre@correo.com' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/tu-usuario' },
    { key: 'portafolio', label: 'Portafolio (opcional)', placeholder: 'tuportafolio.com' },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {campos.map((c) => (
        <div key={c.key}>
          <label className={labelClass}>{c.label}</label>
          <input
            className={inputClass}
            value={h[c.key]}
            placeholder={c.placeholder}
            onChange={(e) => set(c.key, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}

function FormPerfil({ data, setData }: SubProps) {
  return (
    <div>
      <label className={labelClass}>Perfil profesional (3 a 5 líneas)</label>
      <RichTextArea
        value={data.perfil}
        onChange={(v) => setData({ ...data, perfil: v })}
        placeholder="Resume tu experiencia, tu fortaleza principal y lo que buscas profesionalmente."
        rows={6}
      />
    </div>
  )
}

function FormHabilidades({ data, setData }: SubProps) {
  const hab = data.habilidades
  function set(campo: keyof typeof hab, valor: string) {
    setData({ ...data, habilidades: { ...hab, [campo]: valor } })
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className={labelClass}>Habilidades técnicas (separadas por coma)</label>
        <textarea
          className={inputClass}
          rows={2}
          value={hab.tecnicas}
          placeholder="Ej: Excel avanzado, SQL, Power BI"
          onChange={(e) => set('tecnicas', e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>Habilidades blandas (separadas por coma)</label>
        <textarea
          className={inputClass}
          rows={2}
          value={hab.blandas}
          placeholder="Ej: Comunicación asertiva, trabajo en equipo"
          onChange={(e) => set('blandas', e.target.value)}
        />
      </div>
      <div>
        <label className={labelClass}>Herramientas digitales e IA (separadas por coma)</label>
        <textarea
          className={inputClass}
          rows={2}
          value={hab.digitalesIA}
          placeholder="Ej: ChatGPT, Notion IA, Google Workspace"
          onChange={(e) => set('digitalesIA', e.target.value)}
        />
      </div>
    </div>
  )
}

function FormExperiencia({ data, setData }: SubProps) {
  function actualizar(id: string, campo: string, valor: string | boolean) {
    setData({
      ...data,
      experiencia: data.experiencia.map((exp) => (exp.id === id ? { ...exp, [campo]: valor } : exp)),
    })
  }
  function eliminar(id: string) {
    setData({ ...data, experiencia: data.experiencia.filter((exp) => exp.id !== id) })
  }
  function agregar() {
    setData({ ...data, experiencia: [nuevaExperiencia(), ...data.experiencia] })
  }
  function mover(index: number, dir: -1 | 1) {
    const lista = [...data.experiencia]
    const destino = index + dir
    if (destino < 0 || destino >= lista.length) return
    ;[lista[index], lista[destino]] = [lista[destino], lista[index]]
    setData({ ...data, experiencia: lista })
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={agregar}
        className="self-start rounded-lg bg-elevia-purple px-4 py-2 text-sm font-semibold text-white hover:bg-elevia-purpleDeep"
      >
        + Agregar experiencia
      </button>

      {data.experiencia.length === 0 && (
        <p className="text-sm text-elevia-ink/60">Aún no has agregado experiencia laboral.</p>
      )}

      {data.experiencia.map((exp, index) => (
        <div key={exp.id} className="rounded-xl border border-elevia-grayLine p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-elevia-purple/70">Experiencia {index + 1}</span>
            <div className="flex gap-2 text-xs">
              <button onClick={() => mover(index, -1)} className="text-elevia-ink/50 hover:text-elevia-purple">↑</button>
              <button onClick={() => mover(index, 1)} className="text-elevia-ink/50 hover:text-elevia-purple">↓</button>
              <button onClick={() => eliminar(exp.id)} className="text-red-400 hover:text-red-600">Eliminar</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Cargo</label>
              <input
                className={inputClass}
                value={exp.cargo}
                onChange={(e) => actualizar(exp.id, 'cargo', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Empresa</label>
              <input
                className={inputClass}
                value={exp.empresa}
                onChange={(e) => actualizar(exp.id, 'empresa', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Fecha de inicio</label>
              <input
                className={inputClass}
                placeholder="Ene 2022"
                value={exp.fechaInicio}
                onChange={(e) => actualizar(exp.id, 'fechaInicio', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Fecha de fin</label>
              <input
                className={inputClass}
                placeholder="Actual"
                disabled={exp.actualmente}
                value={exp.actualmente ? 'Actual' : exp.fechaFin}
                onChange={(e) => actualizar(exp.id, 'fechaFin', e.target.value)}
              />
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-xs text-elevia-ink/70">
            <input
              type="checkbox"
              checked={exp.actualmente}
              onChange={(e) => actualizar(exp.id, 'actualmente', e.target.checked)}
            />
            Trabajo actual
          </label>

          <div className="mt-3">
            <label className={labelClass}>Descripción / logros</label>
            <RichTextArea
              value={exp.descripcion}
              onChange={(v) => actualizar(exp.id, 'descripcion', v)}
              placeholder="Describe qué hiciste y qué resultado obtuviste. Ej: Lideré la migración de datos, reduciendo el tiempo de reportes en 30%."
              rows={4}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function FormEducacion({ data, setData }: SubProps) {
  function actualizar(id: string, campo: string, valor: string) {
    setData({
      ...data,
      educacion: data.educacion.map((ed) => (ed.id === id ? { ...ed, [campo]: valor } : ed)),
    })
  }
  function eliminar(id: string) {
    setData({ ...data, educacion: data.educacion.filter((ed) => ed.id !== id) })
  }
  function agregar() {
    setData({ ...data, educacion: [nuevaEducacion(), ...data.educacion] })
  }

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={agregar}
        className="self-start rounded-lg bg-elevia-purple px-4 py-2 text-sm font-semibold text-white hover:bg-elevia-purpleDeep"
      >
        + Agregar educación o certificación
      </button>

      {data.educacion.length === 0 && (
        <p className="text-sm text-elevia-ink/60">Aún no has agregado educación o certificaciones.</p>
      )}

      {data.educacion.map((ed, index) => (
        <div key={ed.id} className="rounded-xl border border-elevia-grayLine p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-elevia-purple/70">Ítem {index + 1}</span>
            <button onClick={() => eliminar(ed.id)} className="text-xs text-red-400 hover:text-red-600">
              Eliminar
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Título / Certificación</label>
              <input className={inputClass} value={ed.titulo} onChange={(e) => actualizar(ed.id, 'titulo', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Institución</label>
              <input className={inputClass} value={ed.institucion} onChange={(e) => actualizar(ed.id, 'institucion', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Fecha</label>
              <input className={inputClass} placeholder="2023" value={ed.fecha} onChange={(e) => actualizar(ed.id, 'fecha', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Detalle (opcional)</label>
              <input className={inputClass} value={ed.detalle} onChange={(e) => actualizar(ed.id, 'detalle', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

type FontId = 'font-option-inter' | 'font-option-sora' | 'font-option-georgia' | 'font-option-mono'

const FUENTES: { id: FontId; label: string }[] = [
  { id: 'font-option-inter', label: 'Inter (moderna)' },
  { id: 'font-option-sora', label: 'Sora (destacada)' },
  { id: 'font-option-georgia', label: 'Georgia (clásica)' },
  { id: 'font-option-mono', label: 'Monoespaciada' },
]

function FormEstilo({ data, setData }: SubProps) {
  const est = data.estilo
  function set(campo: keyof typeof est, valor: string | number) {
    setData({ ...data, estilo: { ...est, [campo]: valor } })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label className={labelClass}>Tipografía</label>
        <select
          className={inputClass}
          value={est.fontFamily}
          onChange={(e) => set('fontFamily', e.target.value)}
        >
          {FUENTES.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Tamaño del texto ({est.fontSize}px)</label>
        <input
          type="range"
          min={12}
          max={18}
          value={est.fontSize}
          onChange={(e) => set('fontSize', Number(e.target.value))}
          className="w-full accent-elevia-purple"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ColorField label="Color del texto" value={est.colorTexto} onChange={(v) => set('colorTexto', v)} />
        <ColorField label="Color de títulos" value={est.colorTitulos} onChange={(v) => set('colorTitulos', v)} />
        <ColorField label="Color de resaltados" value={est.colorResaltado} onChange={(v) => set('colorResaltado', v)} />
        <ColorField label="Color principal del CV" value={est.colorPrincipal} onChange={(v) => set('colorPrincipal', v)} />
      </div>

      <div className="rounded-lg bg-elevia-lilacSoft p-3 text-xs text-elevia-purple">
        Estos colores personalizan tu CV manteniendo una estructura profesional y legible.
      </div>
    </div>
  )
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex items-center gap-2 rounded-lg border border-elevia-grayLine bg-white px-2 py-1.5">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="h-7 w-7 cursor-pointer rounded" />
        <span className="text-xs text-elevia-ink/60">{value}</span>
      </div>
    </div>
  )
}
