# Intercepting Routes: una foto, una URL

[Abrir la demo en Vercel](https://lab-intercepting-routes.vercel.app/galeria)

La misma dirección, `/foto/montanas`, abre un modal si llegas desde la galería y una página completa si entras directo. El modal no necesita una segunda URL ni un estado local que se sincronice con el router.

## Ejecutar localmente

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Abre [la galería local](http://localhost:3000/galeria), desplázate hasta una foto y ábrela. Copia la URL en otra pestaña: verás el detalle sin la galería. En la primera pestaña, usa **Atrás** para volver al mismo lugar y **Adelante** para reabrir el modal. También puedes cerrarlo con **Escape**.

## Cómo se conectan las rutas

```text
src/app/
├── galeria/
│   ├── page.tsx
│   ├── layout.tsx
│   └── @modal/
│       ├── (..)foto/[id]/page.tsx
│       ├── default.tsx
│       └── page.tsx
└── foto/[id]/
    ├── page.tsx
    └── not-found.tsx
```

- El layout de la galería muestra sus hijos y el slot `@modal`. Al navegar con `Link`, `(..)foto` intercepta el segmento hermano `foto` sin reemplazar la galería. `@modal` no forma parte de la URL.
- Al pegar la URL o recargar, Next resuelve el detalle por su ruta normal. `default.tsx` es el fallback del slot en cargas completas sin coincidencia; el `page.tsx` del slot devuelve `null` al navegar explícitamente a `/galeria`. Son dos casos distintos.
- En `src/features/gallery/`, `PhotoDetail` es el mismo contenido en ambas vistas. `PhotoModal` agrega el diálogo y la interacción; el router, no el diálogo, decide cuál ruta se muestra.

## Cuándo lo usaría

Una vista rápida vale la pena cuando el listado tiene contexto que quieres conservar (por ejemplo, el scroll de una galería) **y** cada detalle necesita un enlace propio. Para una confirmación de borrado que no tiene sentido compartir, un modal con estado local es más simple.

## Verificación

```sh
pnpm exec playwright install chromium
pnpm check
```

Usa Node.js 24 y la versión de pnpm indicada en `package.json`. `pnpm check` corre lint, tipos, compilación y Playwright sobre `next start`. GitHub Actions ejecuta la misma secuencia en PRs y en `main`.

Los datos y las imágenes son locales. Consulta los [créditos y licencias](public/photos/CREDITS.md). La demo está desplegada en Vercel; la [exportación estática no soporta rutas interceptadas](https://nextjs.org/docs/app/guides/static-exports#unsupported-features).

Referencias: [Intercepting Routes](https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes) · [Parallel Routes](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes).
