# Simulador Inteligente de Hoja de Vida — ELEVIA

Editor interactivo de hoja de vida con recomendaciones locales (sin API externa) frente a sistemas ATS, lectura de reclutadores, relevancia frente a una oferta laboral, claridad y presentación de logros.

## Stack

- React 18 + TypeScript
- Tailwind CSS
- Vite
- jsPDF + html2canvas (exportación a PDF)
- LocalStorage (persistencia sin backend)

## Funcionalidades incluidas

- Editor por secciones: Encabezado, Perfil, Habilidades, Experiencia, Educación, Estilo.
- Formato de texto: negrita, cursiva y subrayado dentro de Perfil y Experiencia.
- Personalización de tipografía, tamaño y colores (texto, títulos, resaltados, color principal).
- **Coach de CV**: recomendaciones en tiempo real basadas en reglas locales (no inventa datos).
- **Comparación con oferta laboral**: palabras clave encontradas/faltantes, habilidades coincidentes y áreas a fortalecer.
- **Nivel de optimización** (0–100) con desglose de ATS, Logros, Relevancia y Legibilidad.
- **Vista ATS**: versión en texto plano estructurado.
- **Vista reclutador**: resumen rápido (cargo, perfil, última experiencia, habilidades y logros).
- Exportación a **PDF** conservando diseño y colores.
- Guardado automático en el navegador (LocalStorage).

## Ejecutar localmente

Requisitos: Node.js 18 o superior.

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev
```

Luego abre la URL que aparece en la terminal (normalmente `http://localhost:5173`).

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

`npm run build` compila TypeScript y genera los archivos estáticos en `dist/`, listos para publicar en cualquier hosting (Vercel, Netlify, GitHub Pages, tu propio servidor, etc.).

## Subir el proyecto a GitHub

```bash
# Dentro de la carpeta del proyecto
git init
git add .
git commit -m "Primera versión del Simulador de Hoja de Vida ELEVIA"

# Crea un repositorio vacío en GitHub y luego:
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

Si prefieres usar GitHub CLI:

```bash
gh repo create tu-repositorio --public --source=. --remote=origin --push
```

### Publicar en GitHub Pages

Este proyecto utiliza `base: './'` en `vite.config.ts`, por lo que está listo para desplegar en GitHub Pages sin problemas de página en blanco por rutas de scripts o estilos (`404`).

**Opción A: Usar GitHub Actions (Recomendado)**
1. En tu repositorio en GitHub, ve a **Settings** > **Pages**.
2. En **Source**, selecciona **GitHub Actions**.
3. GitHub creará la acción automáticamente para proyectos con Vite (o puedes usar la plantilla estática).

**Opción B: Despliegue con paquete `gh-pages`**
```bash
npm install -D gh-pages
```
Añade en los `scripts` de tu `package.json`:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```
Y ejecuta:
```bash
npm run deploy
```

## Preparado para conectar una API de IA


El proyecto funciona hoy 100% con reglas locales (ver `src/utils/coach.ts`, `src/utils/scoring.ts` y `src/utils/jobMatch.ts`). Cuando quieras usar un modelo de IA para enriquecer las recomendaciones, el archivo `src/utils/aiIntegration.ts` incluye un ejemplo comentado de cómo estructurar esa llamada sin tener que rediseñar la interfaz.

## Estructura del proyecto

```
src/
  components/      Componentes de interfaz (editor, vista previa, coach, etc.)
  data/            Datos iniciales del CV
  hooks/           Hook de persistencia en LocalStorage
  utils/           Motor de reglas: coach, puntuación, comparación de oferta, PDF
  types.ts         Tipos de datos del CV
  App.tsx          Composición general de la aplicación
```

## Notas importantes

- El "Nivel de optimización" y las recomendaciones del Coach son orientativos: no garantizan pasar un sistema ATS real.
- El sistema nunca inventa información: no agrega palabras clave ni logros que el usuario no haya escrito.
