import { useRef } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export default function RichTextArea({ value, onChange, placeholder, rows = 4 }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)

  function envolverSeleccion(marca: string) {
    const textarea = ref.current
    if (!textarea) return

    const inicio = textarea.selectionStart
    const fin = textarea.selectionEnd
    const seleccionado = value.slice(inicio, fin) || 'texto'

    const nuevoValor = value.slice(0, inicio) + marca + seleccionado + marca + value.slice(fin)
    onChange(nuevoValor)

    requestAnimationFrame(() => {
      textarea.focus()
      const nuevaPos = inicio + marca.length + seleccionado.length + marca.length
      textarea.setSelectionRange(nuevaPos, nuevaPos)
    })
  }

  return (
    <div className="rounded-lg border border-elevia-grayLine bg-white overflow-hidden focus-within:ring-2 focus-within:ring-elevia-lilac">
      <div className="flex items-center gap-1 border-b border-elevia-grayLine bg-elevia-gray px-2 py-1">
        <button
          type="button"
          onClick={() => envolverSeleccion('**')}
          className="h-7 w-7 rounded text-sm font-bold text-elevia-purple hover:bg-elevia-lilacSoft"
          title="Negrita"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => envolverSeleccion('*')}
          className="h-7 w-7 rounded text-sm italic text-elevia-purple hover:bg-elevia-lilacSoft"
          title="Cursiva"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => envolverSeleccion('__')}
          className="h-7 w-7 rounded text-sm underline text-elevia-purple hover:bg-elevia-lilacSoft"
          title="Subrayado"
        >
          U
        </button>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-y px-3 py-2 text-sm text-elevia-ink outline-none"
      />
    </div>
  )
}
