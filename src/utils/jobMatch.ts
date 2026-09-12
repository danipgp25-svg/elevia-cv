import type { CVData, ResultadoComparacion } from '../types'

const STOPWORDS = new Set([
  'de', 'la', 'el', 'los', 'las', 'y', 'a', 'en', 'un', 'una', 'unos', 'unas',
  'que', 'con', 'para', 'por', 'su', 'sus', 'al', 'del', 'se', 'es', 'lo', 'como',
  'más', 'o', 'este', 'esta', 'estos', 'estas', 'nuestro', 'nuestra', 'sobre',
  'entre', 'sin', 'ser', 'son', 'muy', 'todo', 'toda', 'todos', 'todas', 'cada',
  'nos', 'le', 'les', 'ya', 'si', 'no', 'te', 'me', 'tu', 'mi', 'pero', 'cual',
  'años', 'año', 'trabajo', 'empresa', 'ofrecemos', 'buscamos', 'requisitos',
  'funciones', 'perfil', 'vacante', 'puesto', 'cargo', 'salario', 'horario',
])

function limpiarPalabra(w: string) {
  return w
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes para comparar de forma flexible
    .replace(/[^a-z0-9ñ]/g, '')
}

function extraerPalabrasClave(texto: string): string[] {
  const palabras = texto
    .split(/\s+/)
    .map(limpiarPalabra)
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w))

  const frecuencia = new Map<string, number>()
  palabras.forEach((p) => frecuencia.set(p, (frecuencia.get(p) ?? 0) + 1))

  return Array.from(frecuencia.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([palabra]) => palabra)
    .slice(0, 25)
}

function textoCompletoCV(data: CVData): string {
  const partes = [
    data.header.cargoObjetivo,
    data.perfil,
    data.habilidades.tecnicas,
    data.habilidades.blandas,
    data.habilidades.digitalesIA,
    ...data.experiencia.map((e) => `${e.cargo} ${e.descripcion}`),
    ...data.educacion.map((e) => `${e.titulo} ${e.detalle}`),
  ]
  return partes.join(' ')
}

function listaHabilidades(data: CVData): string[] {
  const texto = `${data.habilidades.tecnicas}, ${data.habilidades.blandas}, ${data.habilidades.digitalesIA}`
  return texto
    .split(/[,;\n]/)
    .map((s) => limpiarPalabra(s.trim()))
    .filter((s) => s.length > 0)
}

export function compararConOferta(data: CVData, oferta: string): ResultadoComparacion | null {
  if (!oferta.trim()) return null

  const palabrasOferta = extraerPalabrasClave(oferta)
  const textoCV = limpiarPalabra(textoCompletoCV(data).replace(/\s+/g, ' '))
  const habilidadesCV = listaHabilidades(data)

  const palabrasEncontradas: string[] = []
  const palabrasFaltantes: string[] = []

  palabrasOferta.forEach((palabra) => {
    if (textoCV.includes(palabra)) {
      palabrasEncontradas.push(palabra)
    } else {
      palabrasFaltantes.push(palabra)
    }
  })

  const habilidadesCoincidentes = habilidadesCV.filter((h) =>
    palabrasOferta.some((p) => h.includes(p) || p.includes(h)),
  )

  // Áreas a fortalecer: palabras clave de la oferta que no están ni en el texto
  // ni fueron declaradas como habilidad. No se sugiere "agregarlas" como si el
  // usuario ya las tuviera; se presentan como puntos a revisar/desarrollar.
  const areasAFortalecer = palabrasFaltantes.slice(0, 8)

  return {
    palabrasEncontradas: palabrasEncontradas.slice(0, 15),
    palabrasFaltantes: palabrasFaltantes.slice(0, 15),
    habilidadesCoincidentes: Array.from(new Set(habilidadesCoincidentes)).slice(0, 10),
    areasAFortalecer,
  }
}
