import type { CVData } from '../types'

export const defaultCVData: CVData = {
  header: {
    nombre: '',
    cargoObjetivo: '',
    ciudad: '',
    telefono: '',
    correo: '',
    linkedin: '',
    portafolio: '',
  },
  perfil: '',
  habilidades: {
    tecnicas: '',
    blandas: '',
    digitalesIA: '',
  },
  experiencia: [],
  educacion: [],
  estilo: {
    fontFamily: 'font-option-inter',
    fontSize: 15,
    colorTexto: '#1E1A2B',
    colorTitulos: '#4C2A85',
    colorResaltado: '#22B8A0',
    colorPrincipal: '#4C2A85',
  },
}

function generateUniqueId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function nuevaExperiencia() {
  return {
    id: generateUniqueId(),
    cargo: '',
    empresa: '',
    fechaInicio: '',
    fechaFin: '',
    actualmente: false,
    descripcion: '',
  }
}

export function nuevaEducacion() {
  return {
    id: generateUniqueId(),
    titulo: '',
    institucion: '',
    fecha: '',
    detalle: '',
  }
}

