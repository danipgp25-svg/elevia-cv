export interface HeaderData {
  nombre: string
  cargoObjetivo: string
  ciudad: string
  telefono: string
  correo: string
  linkedin: string
  portafolio: string
}

export interface ExperienciaItem {
  id: string
  cargo: string
  empresa: string
  fechaInicio: string
  fechaFin: string
  actualmente: boolean
  descripcion: string
}

export interface EducacionItem {
  id: string
  titulo: string
  institucion: string
  fecha: string
  detalle: string
}

export interface Habilidades {
  tecnicas: string
  blandas: string
  digitalesIA: string
}

export interface EstiloCV {
  fontFamily: 'font-option-inter' | 'font-option-sora' | 'font-option-georgia' | 'font-option-mono'
  fontSize: number
  colorTexto: string
  colorTitulos: string
  colorResaltado: string
  colorPrincipal: string
}

export interface CVData {
  header: HeaderData
  perfil: string
  habilidades: Habilidades
  experiencia: ExperienciaItem[]
  educacion: EducacionItem[]
  estilo: EstiloCV
}

export type SeccionActiva =
  | 'encabezado'
  | 'perfil'
  | 'habilidades'
  | 'experiencia'
  | 'educacion'
  | 'estilo'

export type VistaActiva = 'editor' | 'ats' | 'reclutador'

export interface CoachSugerencia {
  id: string
  tipo: 'alerta' | 'sugerencia' | 'positivo' | 'advertencia'
  seccion: string
  mensaje: string
}

export interface PuntuacionCV {
  total: number
  ats: number
  logros: number
  relevancia: number
  legibilidad: number
}

export interface ResultadoComparacion {
  palabrasEncontradas: string[]
  palabrasFaltantes: string[]
  habilidadesCoincidentes: string[]
  areasAFortalecer: string[]
}
