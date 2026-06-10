# LLadeal

Sitio web de LLadeal construido con Astro, Tailwind CSS y Preline UI. El proyecto usa `pnpm` para dependencias, contenidos JSON multidioma para las paginas del sitio y `Pages CMS` para editar contenidos sin tocar codigo.

## Stack

- Astro 6
- Tailwind CSS 4
- Preline UI
- TypeScript
- astro-icon
- Pages CMS con configuracion en `.pages.yml`

## Requisitos

- Node.js 20 o superior
- pnpm 11 o superior

## Inicio rapido

Clona el repositorio e instala dependencias:

```bash
git clone <tu-repo>
cd <tu-repo>
pnpm install
```

Inicia el entorno local:

```bash
pnpm dev
```

Astro quedara disponible normalmente en `http://localhost:4321`.

## Scripts utiles

- `pnpm dev`: inicia el servidor de desarrollo
- `pnpm start`: alias de desarrollo
- `pnpm build`: ejecuta `astro check` y luego compila el sitio
- `pnpm preview`: levanta la version compilada localmente
- `pnpm format:check`: revisa formato con Prettier
- `pnpm format:fix`: corrige formato con Prettier

## Estructura importante

```text
.
├── public/                     # Archivos estaticos directos
├── src/
│   ├── components/             # Componentes Astro reutilizables
│   ├── content/pages/          # JSON de contenido por pagina e idioma
│   ├── i18n/                   # Logica de internacionalizacion y merges
│   ├── layout/                 # Layouts base del sitio
│   ├── pages/                  # Rutas Astro
│   └── utils/                  # Helpers generales
├── .pages.yml                  # Configuracion de Pages CMS
├── astro.config.mjs            # Configuracion principal de Astro
└── package.json
```

## Contenido e idiomas

El sitio usa una estrategia base en espanol con traducciones por idioma.

- Los JSON principales viven en `src/content/pages/*.json`
- Las traducciones viven en archivos como `src/content/pages/*.en.json`, `src/content/pages/*.ru.json` y `src/content/pages/*.zh.json`
- La logica de merge esta en `src/i18n/content.ts`

### Como funciona

- Espanol actua como fuente base
- Los otros idiomas solo necesitan guardar textos traducidos
- Recursos compartidos como imagenes, videos, PDFs, links base y otros campos invariantes se heredan desde espanol

Eso evita duplicar assets y vuelve el contenido mas robusto y facil de mantener.

## Pages CMS

Este proyecto usa `Pages CMS` para editar contenido desde interfaz visual.

### Donde se configura

- Archivo principal: `.pages.yml`

Ese archivo define:

- grupos del CMS
- archivos editables
- campos visibles
- colecciones
- que campos se editan por idioma y cuales solo desde espanol

### Como usarlo

1. Conecta el repositorio en Pages CMS
2. Pages CMS leerá `.pages.yml`
3. Edita el contenido desde la interfaz
4. Los cambios se guardan en los JSON y Markdown del proyecto

### Convencion actual del CMS

- Espanol controla el contenido base y los assets compartidos
- Ingles, ruso y chino editan solo los textos que cambian por idioma
- Si un campo no aparece en los idiomas secundarios dentro de Pages CMS, normalmente es porque se hereda desde el JSON en espanol

### Ejemplos practicos

- `src/content/pages/home.json`: controla textos base, links compartidos y assets del home
- `src/content/pages/home.en.json`: controla solo traducciones del home en ingles
- `src/content/pages/about.json`: controla tambien fotos del equipo
- `src/content/pages/about.ru.json`: controla solo textos del equipo en ruso

## Flujo recomendado para trabajar contenido

### Cambios de estructura

Si agregas un campo nuevo en un JSON principal, normalmente debes revisar tambien:

1. `src/i18n/content.ts` para decidir si el campo se hereda desde espanol o si debe traducirse
2. `.pages.yml` para exponerlo correctamente en Pages CMS
3. los JSON de idiomas si ese campo necesita traduccion

### Ejemplo

Si agregas un nuevo boton al catalogo:

- el texto puede ir en cada idioma
- el enlace del archivo PDF puede vivir solo en espanol
- `src/i18n/content.ts` define que el enlace se hereda
- `.pages.yml` define que idiomas pueden editar cada parte

## Desarrollo con Astro

### Comandos basicos

```bash
pnpm dev
pnpm build
pnpm preview
```

### Verificacion de tipos y build

```bash
pnpm build
```

Ese comando ejecuta primero chequeos de Astro/TypeScript y despues genera la compilacion final.

## Assets y archivos publicos

- Usa `public/` para archivos servidos directamente
- Los uploads del CMS quedan referenciados normalmente dentro de `/web-lladeal/uploads/...`
- Si enlazas un PDF para descarga, puedes usar el componente `src/components/ui/Button.astro` con `download={true}`

Ejemplo:

```astro
<Button href="/web-lladeal/uploads/CATALOGO-LLADEAL-1.pdf" download={true}>
  Descargar catalogo
</Button>
```

## Componentes clave

- `src/components/sections/Navbar.astro`: navegacion principal e idioma
- `src/components/common/HeroVideo.astro`: video principal del hero
- `src/components/ui/Button.astro`: boton reutilizable con soporte para enlaces y descarga
- `src/layout/BaseLayout.astro`: layout general del sitio

## Recomendaciones

- Usa `pnpm format:fix` antes de cerrar cambios grandes
- Si agregas contenido multidioma, evita duplicar assets en los JSON secundarios
- Si algo debe editarse desde CMS, asegúrate de reflejarlo en `.pages.yml`
- Si algo cambia solo por idioma, agregalo a los JSON localizados; si no, herédalo desde espanol

## Build

Para generar produccion:

```bash
pnpm build
```

Para previsualizar el resultado:

```bash
pnpm preview
```

## Marca del proyecto

Este repositorio corresponde al sitio web de LLadeal y el contenido, labels y referencias deben mantenerse con ese nombre en la documentacion del proyecto.
