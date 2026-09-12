import { useEffect, useState } from 'react'

function safeMerge<T>(initial: T, stored: unknown): T {
  if (!stored || typeof stored !== 'object') return initial
  if (Array.isArray(initial)) return (Array.isArray(stored) ? stored : initial) as unknown as T

  const result = { ...initial } as Record<string, unknown>
  const storedObj = stored as Record<string, unknown>

  for (const key of Object.keys(initial as Record<string, unknown>)) {
    const initVal = (initial as Record<string, unknown>)[key]
    const storeVal = storedObj[key]

    if (storeVal === undefined || storeVal === null) {
      result[key] = initVal
    } else if (typeof initVal === 'object' && initVal !== null && !Array.isArray(initVal)) {
      result[key] = safeMerge(initVal, storeVal)
    } else {
      result[key] = storeVal
    }
  }
  return result as T
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (!raw) return initialValue
      const parsed = JSON.parse(raw)
      return safeMerge(initialValue, parsed)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // almacenamiento no disponible, se ignora silenciosamente
    }
  }, [key, value])

  return [value, setValue] as const
}

