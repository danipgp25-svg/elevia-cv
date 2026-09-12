import { useMemo, useState } from 'react'
import type { SeccionActiva, VistaActiva } from './types'
import { defaultCVData } from './data/defaultData'
import { useLocalStorage } from './hooks/useLocalStorage'
import { generarSugerencias } from './utils/coach'
import { calcularPuntuacion } from './utils/scoring'
import { compararConOferta } from './utils/jobMatch'
import { exportarPDF } from './utils/pdf'

import TopBar from './components/TopBar'
import EditorPanel from './components/EditorPanel'
import Preview from './components/Preview'
import CoachPanel from './components/CoachPanel'
import ScorePanel from './components/ScorePanel'
import JobMatchPanel from './components/JobMatchPanel'
import ATSView from './components/ATSView'
import RecruiterView from './components/RecruiterView'

export default function App() {
  const [data, setData] = useLocalStorage('elevia-cv-data', defaultCVData)
  const [oferta, setOferta] = useLocalStorage('elevia-cv-oferta', '')
  const [vista, setVista] = useState<VistaActiva>('editor')
  const [seccionActiva, setSeccionActiva] = useState<SeccionActiva>('encabezado')
  const [descargando, setDescargando] = useState(false)

  const sugerencias = useMemo(() => generarSugerencias(data), [data])
  const comparacion = useMemo(() => compararConOferta(data, oferta), [data, oferta])
  const puntuacion = useMemo(() => calcularPuntuacion(data, comparacion), [data, comparacion])

  async function manejarDescarga() {
    setDescargando(true)
    try {
      const nombreArchivo = data.header.nombre ? `CV-${data.header.nombre}` : 'hoja-de-vida'
      await exportarPDF('cv-preview', nombreArchivo)
    } finally {
      setDescargando(false)
    }
  }

  return (
    <div className="min-h-screen bg-elevia-gray pb-16">
      <TopBar vista={vista} setVista={setVista} onDescargarPDF={manejarDescarga} descargando={descargando} />

      <main className="mx-auto mt-6 max-w-[1400px] px-5">
        {vista === 'editor' && (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_320px]">
            <EditorPanel data={data} setData={setData} seccionActiva={seccionActiva} setSeccionActiva={setSeccionActiva} />

            <div className="flex flex-col gap-6">
              <Preview data={data} />
            </div>

            <div className="flex flex-col gap-6">
              <ScorePanel puntuacion={puntuacion} />
              <CoachPanel sugerencias={sugerencias} />
              <JobMatchPanel oferta={oferta} setOferta={setOferta} resultado={comparacion} />
            </div>
          </div>
        )}

        {vista === 'ats' && (
          <div id="ats-view-export">
            <ATSView data={data} />
          </div>
        )}

        {vista === 'reclutador' && (
          <div id="recruiter-view-export">
            <RecruiterView data={data} />
          </div>
        )}

        {/* Vista previa oculta para exportar a PDF siempre desde el diseño completo del CV */}
        {vista !== 'editor' && (
          <div className="pointer-events-none fixed -left-[9999px] top-0">
            <Preview data={data} />
          </div>
        )}
      </main>
    </div>
  )
}
