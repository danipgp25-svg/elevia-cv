import type { CVData, PuntuacionCV, ResultadoComparacion } from '../types'

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n))
}

const VERBOS_LOGRO = [
  'aumenté', 'aumento', 'reduje', 'reducción', 'logré', 'lideré', 'implementé',
  'optimicé', 'mejoré', 'generé', 'incrementé', 'ahorré', 'diseñé', 'automaticé',
  'gestioné', 'entregué', 'creé', 'lancé', 'coordiné',
]

function calcularATS(data: CVData): number {
  let puntos = 0
  const h = data.header
  if (h.nombre.trim()) puntos += 10
  if (h.cargoObjetivo.trim()) puntos += 15
  if (h.correo.trim()) puntos += 15
  if (h.telefono.trim()) puntos += 10
  if (h.ciudad.trim()) puntos += 5
  if (h.linkedin.trim()) puntos += 10
  if (data.perfil.trim().length > 40) puntos += 10
  if (data.habilidades.tecnicas.trim()) puntos += 10
  if (data.experiencia.length > 0) puntos += 10
  if (data.educacion.length > 0) puntos += 5
  return clamp(puntos)
}

function calcularLogros(data: CVData): number {
  const descripciones = data.experiencia
    .map((e) => e.descripcion.trim())
    .filter((d) => d.length > 0)

  if (descripciones.length === 0) return 0

  let conNumero = 0
  let conVerboLogro = 0

  descripciones.forEach((d) => {
    if (/\d/.test(d)) conNumero += 1
    const dl = d.toLowerCase()
    if (VERBOS_LOGRO.some((v) => dl.includes(v))) conVerboLogro += 1
  })

  const proporcion = (conNumero + conVerboLogro) / (descripciones.length * 2)
  return clamp(Math.round(proporcion * 100))
}

function calcularLegibilidad(data: CVData): number {
  let puntos = 40

  const perfilLen = data.perfil.trim().length
  if (perfilLen > 0 && perfilLen < 600) puntos += 20
  if (perfilLen >= 600) puntos += 5

  const descripciones = data.experiencia.map((e) => e.descripcion)
  const oracionesLargas = descripciones.some((d) => d.length > 400)
  if (!oracionesLargas) puntos += 20
  else puntos += 5

  if (data.experiencia.length > 0 && data.experiencia.every((e) => e.descripcion.trim().length > 0)) {
    puntos += 20
  }

  return clamp(puntos)
}

function calcularRelevancia(data: CVData, comparacion: ResultadoComparacion | null): number {
  if (!comparacion) {
    // Sin oferta laboral: se mide contra completitud general de habilidades y experiencia
    let puntos = 30
    if (data.habilidades.tecnicas.trim()) puntos += 20
    if (data.habilidades.blandas.trim()) puntos += 15
    if (data.habilidades.digitalesIA.trim()) puntos += 15
    if (data.experiencia.length > 0) puntos += 20
    return clamp(puntos)
  }

  const total = comparacion.palabrasEncontradas.length + comparacion.palabrasFaltantes.length
  if (total === 0) return 50
  const proporcion = comparacion.palabrasEncontradas.length / total
  return clamp(Math.round(proporcion * 100))
}

export function calcularPuntuacion(data: CVData, comparacion: ResultadoComparacion | null): PuntuacionCV {
  const ats = calcularATS(data)
  const logros = calcularLogros(data)
  const legibilidad = calcularLegibilidad(data)
  const relevancia = calcularRelevancia(data, comparacion)

  const total = Math.round(ats * 0.3 + logros * 0.25 + relevancia * 0.25 + legibilidad * 0.2)

  return { total: clamp(total), ats, logros, relevancia, legibilidad }
}
