/**
 * PUNTO DE EXTENSIÓN PARA UNA FUTURA API DE IA
 * ---------------------------------------------
 * Hoy el "Coach de CV", la puntuación y la comparación con la oferta laboral
 * funcionan con reglas locales (ver utils/coach.ts, utils/scoring.ts y
 * utils/jobMatch.ts). No requieren conexión a internet ni una API key.
 *
 * Cuando quieras conectar un modelo de IA (por ejemplo, la API de Anthropic)
 * para generar recomendaciones más ricas, este archivo es el lugar sugerido
 * para centralizar esa llamada, sin tocar la lógica de la interfaz.
 *
 * Ejemplo de cómo quedaría (comentado a propósito, no se ejecuta):
 *
 * export async function generarSugerenciasConIA(cvTexto: string, ofertaTexto: string) {
 *   const respuesta = await fetch('https://api.anthropic.com/v1/messages', {
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
 *       'anthropic-version': '2023-06-01',
 *     },
 *     body: JSON.stringify({
 *       model: 'claude-sonnet-4-6',
 *       max_tokens: 800,
 *       messages: [
 *         {
 *           role: 'user',
 *           content: `Analiza este CV frente a esta oferta y da recomendaciones honestas, sin inventar datos:\n\nCV:\n${cvTexto}\n\nOferta:\n${ofertaTexto}`,
 *         },
 *       ],
 *     }),
 *   })
 *   const data = await respuesta.json()
 *   return data.content?.[0]?.text ?? ''
 * }
 *
 * Recomendación: nunca expongas una API key directamente en el frontend en
 * producción. Lo ideal es crear un pequeño backend (por ejemplo, una función
 * serverless) que reciba la solicitud del frontend y llame a la API de IA
 * desde el servidor, devolviendo solo el resultado.
 */

export {}
