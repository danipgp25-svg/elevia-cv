import type { CVData, CoachSugerencia } from '../types'

const VERBOS_RESPONSABILIDAD = [
  'encargado de', 'encargada de', 'responsable de', 'a cargo de',
  'me encargaba de', 'mis funciones eran', 'funciones:', 'tareas:',
]

const FRASES_GENERICAS = [
  'trabajo en equipo', 'buena actitud', 'proactivo', 'proactiva',
  'responsable', 'comprometido', 'comprometida', 'excelente comunicación',
  'orientado a resultados', 'orientada a resultados', 'capacidad de aprendizaje',
]

const VERBOS_LOGRO = [
  'aumenté', 'aumento', 'reduje', 'reducción', 'logré', 'lideré', 'implementé',
  'optimicé', 'mejoré', 'generé', 'incrementé', 'ahorré', 'diseñé', 'automaticé',
  'gestioné', 'entregué', 'creé', 'lancé', 'coordiné',
]

const CONTIENE_NUMERO = /\d/

function tieneAlguna(texto: string, lista: string[]) {
  const t = texto.toLowerCase()
  return lista.some((f) => t.includes(f))
}

let idCounter = 0
function nextId() {
  idCounter += 1
  return `coach-${idCounter}`
}

export function generarSugerencias(data: CVData): CoachSugerencia[] {
  const sugerencias: CoachSugerencia[] = []

  // --- Encabezado ---
  const h = data?.header || ({} as any)
  const camposFaltantes: string[] = []
  if (!(h.correo || '').trim()) camposFaltantes.push('correo')
  if (!(h.telefono || '').trim()) camposFaltantes.push('teléfono')
  if (!(h.linkedin || '').trim()) camposFaltantes.push('LinkedIn')
  if (!(h.cargoObjetivo || '').trim()) camposFaltantes.push('cargo objetivo')

  if (camposFaltantes.length > 0) {
    sugerencias.push({
      id: nextId(),
      tipo: 'alerta',
      seccion: 'Encabezado',
      mensaje: `⚠️ Faltan datos clave para que un sistema ATS y un reclutador te ubiquen: ${camposFaltantes.join(', ')}.`,
    })
  } else {
    sugerencias.push({
      id: nextId(),
      tipo: 'positivo',
      seccion: 'Encabezado',
      mensaje: '🟢 Tu encabezado tiene toda la información de contacto necesaria.',
    })
  }

  // --- Perfil profesional ---
  const perfil = (data?.perfil || '').trim()
  if (perfil.length === 0) {
    sugerencias.push({
      id: nextId(),
      tipo: 'sugerencia',
      seccion: 'Perfil profesional',
      mensaje: '💡 Aún no has escrito tu perfil profesional. Resume en 3 a 5 líneas quién eres y qué buscas.',
    })
  } else {
    const lineas = perfil.split(/[.\n]/).filter((l) => l.trim().length > 0)
    if (lineas.length < 2) {
      sugerencias.push({
        id: nextId(),
        tipo: 'sugerencia',
        seccion: 'Perfil profesional',
        mensaje: '💡 Tu perfil es muy corto. Intenta ampliarlo a 3-5 líneas contando tu experiencia y objetivo.',
      })
    } else if (lineas.length > 6) {
      sugerencias.push({
        id: nextId(),
        tipo: 'advertencia',
        seccion: 'Perfil profesional',
        mensaje: '⚠️ Tu perfil es extenso. Un reclutador dedica pocos segundos a esta sección; intenta resumir.',
      })
    }
    if (tieneAlguna(perfil, FRASES_GENERICAS)) {
      sugerencias.push({
        id: nextId(),
        tipo: 'advertencia',
        seccion: 'Perfil profesional',
        mensaje: '⚠️ Tu perfil usa frases genéricas ("responsable", "proactivo"). Intenta demostrarlas con una experiencia concreta.',
      })
    }
  }

  // --- Habilidades ---
  const { tecnicas = '', blandas = '', digitalesIA = '' } = data?.habilidades || {}
  if (!digitalesIA.trim()) {
    sugerencias.push({
      id: nextId(),
      tipo: 'sugerencia',
      seccion: 'Habilidades',
      mensaje: '💡 No has registrado herramientas digitales o de IA. Si usas alguna en tu trabajo, agrégala; hoy son muy valoradas.',
    })
  }
  if (!tecnicas.trim()) {
    sugerencias.push({
      id: nextId(),
      tipo: 'sugerencia',
      seccion: 'Habilidades',
      mensaje: '💡 Aún no defines tus habilidades técnicas. Los sistemas ATS buscan palabras clave concretas en esta sección.',
    })
  }
  if (!blandas.trim()) {
    sugerencias.push({
      id: nextId(),
      tipo: 'sugerencia',
      seccion: 'Habilidades',
      mensaje: '💡 Agrega tus habilidades blandas más relevantes para el cargo al que aplicas.',
    })
  }
  if (tecnicas.trim() || blandas.trim() || digitalesIA.trim()) {
    sugerencias.push({
      id: nextId(),
      tipo: 'positivo',
      seccion: 'Habilidades',
      mensaje: '🟢 Buen uso de palabras clave en la sección de habilidades.',
    })
  }

  // --- Experiencia laboral ---
  const experiencias = data?.experiencia || []
  if (experiencias.length === 0) {
    sugerencias.push({
      id: nextId(),
      tipo: 'sugerencia',
      seccion: 'Experiencia laboral',
      mensaje: '💡 Agrega al menos una experiencia laboral o práctica para que el CV tenga contenido evaluable.',
    })
  }

  experiencias.forEach((exp, index) => {
    const desc = (exp?.descripcion || '').trim()
    const etiqueta = exp?.cargo ? exp.cargo : `Experiencia ${index + 1}`
    if (desc.length === 0) return

    if (tieneAlguna(desc, VERBOS_RESPONSABILIDAD)) {
      sugerencias.push({
        id: nextId(),
        tipo: 'advertencia',
        seccion: etiqueta,
        mensaje: '🟡 Esto parece una responsabilidad. Intenta convertirla en un logro: qué hiciste y qué resultado obtuviste.',
      })
    }

    if (!CONTIENE_NUMERO.test(desc)) {
      sugerencias.push({
        id: nextId(),
        tipo: 'sugerencia',
        seccion: etiqueta,
        mensaje: '💡 ¿Puedes agregar un resultado o número? (por ejemplo, tiempo ahorrado, personas a cargo, porcentaje de mejora).',
      })
    }

    if (tieneAlguna(desc, FRASES_GENERICAS)) {
      sugerencias.push({
        id: nextId(),
        tipo: 'advertencia',
        seccion: etiqueta,
        mensaje: '⚠️ Esta frase es muy genérica. Intenta demostrarla con una experiencia concreta en lugar de solo nombrarla.',
      })
    }

    if (tieneAlguna(desc, VERBOS_LOGRO)) {
      sugerencias.push({
        id: nextId(),
        tipo: 'positivo',
        seccion: etiqueta,
        mensaje: '🟢 Buen uso de verbos de logro. Esto ayuda a que se note el impacto de tu trabajo.',
      })
    }
  })

  // --- Educación ---
  if ((data?.educacion || []).length === 0) {
    sugerencias.push({
      id: nextId(),
      tipo: 'sugerencia',
      seccion: 'Educación y certificaciones',
      mensaje: '💡 Agrega tu formación académica o certificaciones; muchos filtros ATS la requieren.',
    })
  }

  return sugerencias
}

