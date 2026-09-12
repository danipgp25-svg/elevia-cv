import React from 'react'

/**
 * Convierte un marcado simple (**negrita**, *cursiva*, __subrayado__)
 * en nodos de React. Se usa tanto en la vista previa como en el PDF.
 */
export function renderRichText(texto: string): React.ReactNode[] {
  if (!texto) return []

  const lineas = texto.split('\n')
  const nodos: React.ReactNode[] = []

  lineas.forEach((linea, i) => {
    nodos.push(<React.Fragment key={`l-${i}`}>{parseInline(linea)}</React.Fragment>)
    if (i < lineas.length - 1) nodos.push(<br key={`br-${i}`} />)
  })

  return nodos
}

function parseInline(texto: string): React.ReactNode[] {
  const regex = /(\*\*.+?\*\*|\*.+?\*|__.+?__)/g
  const partes = texto.split(regex).filter((p) => p.length > 0)

  return partes.map((parte, idx) => {
    if (parte.startsWith('**') && parte.endsWith('**')) {
      return <strong key={idx}>{parte.slice(2, -2)}</strong>
    }
    if (parte.startsWith('__') && parte.endsWith('__')) {
      return <u key={idx}>{parte.slice(2, -2)}</u>
    }
    if (parte.startsWith('*') && parte.endsWith('*')) {
      return <em key={idx}>{parte.slice(1, -1)}</em>
    }
    return <React.Fragment key={idx}>{parte}</React.Fragment>
  })
}
