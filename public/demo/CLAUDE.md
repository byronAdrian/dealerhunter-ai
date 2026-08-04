# CLAUDE.md — AutoSync (landing comercial)

Landing de venta del software AutoSync para concesionarios. HTML/CSS/JS plano, sin build,
sin framework y sin dependencias externas salvo Google Fonts. Se sube por FTP tal cual.
Idioma del producto y del usuario: español.

## Qué es esto y qué no es

- Es una **landing de conversión**, no una web corporativa. Cada sección existe para llevar
  al formulario de demo. Si algo no empuja a eso, sobra.
- El producto que vende es AutoSync (gestión + escaparate + facturación).
  `autosmilan.es` es un **cliente real en producción**, es la prueba social, no el producto.
- El otro producto del autor (facturación para autónomos) **no se menciona aquí**.

## Reglas de salida (token budget)

- Sin saludos, sin resúmenes redundantes, sin emojis, sin em-dash, sin cierres de cortesía.
- Respuesta corta por defecto. Una frase antes del primer tool call.
- Cierre de turno: 1-2 frases. Qué cambió y qué falta.
- Referenciar ficheros como `[archivo](ruta#Lnn)`. No pegar bloques largos que ya están en el repo.
- No crear `.md` de planning o resumen salvo petición explícita.

## Ficheros

| Fichero | Contenido |
|---|---|
| `index.html` | Todo el marcado y los textos. Único sitio donde vive la marca. |
| `styles.css` | Sistema de diseño completo, con variables en `:root`. |
| `script.js` | Entrada por scroll, 3D de puntero, FAQ. Sin librerías. |

No añadir ficheros nuevos sin motivo. No introducir bundlers, Tailwind, React ni CDNs de JS.

## Sistema de diseño

- **Dirección:** showroom nocturno. Negro profundo, chapa metálica cepillada, corte rojo diagonal.
- **Color:** negro dominante, **rojo solo para acciones**, cobre y oro solo en filos y detalles.
  La paleta no está equilibrada a propósito. Nunca usar hex sueltos: todo sale de las variables
  de `:root`.
- **Tipografía:** Chakra Petch (titulares) y Barlow (texto). Prohibidas Inter, Roboto, Arial y
  las de sistema.
- **Radio:** 3px. El redondeo suave lee a plantilla y rompe la dirección.
- **Rejilla:** las tarjetas comparten juntas de 1px sobre fondo `--line`, no flotan separadas.

## Movimiento

- Todo efecto debe **respetar `prefers-reduced-motion`** y desactivarse en punteros gruesos
  (móvil y tablet) cuando dependa del ratón.
- El 3D es de puntero y de scroll, con `transform` y `opacity` únicamente.
  **Nunca animar `width`, `height`, `top` ni `left`.**
- Los efectos de entrada solo se ocultan si el JS ha arrancado (clase `.js` en `<html>`).
  Sin JS la página se ve entera. Hay además un temporizador de seguridad.
  **Esta regla no se toca:** una landing invisible por un fallo de JS es pérdida directa de ventas.
- Nada de parallax sobre texto de lectura ni sobre controles.

## Contenido y promesas

- **No prometer cumplimiento normativo que no se pueda firmar.** La facturación se describe por
  lo que hace y por sus límites de uso, sin afirmar homologaciones ni certificaciones.
- Los límites de facturas y los packs de ampliación deben coincidir en los tres sitios donde
  aparecen: tarjeta de producto, planes y FAQ. Si se cambia uno, cambiar los tres.
- Precios siempre con "sin IVA" visible.

## Antes de dar algo por terminado

- Comprobar en 375, 768, 1024 y 1440 px. **Sin scroll horizontal en ninguno.**
- Consola sin errores y fuentes cargadas.
- Foco visible con teclado en enlaces, botones, campos y preguntas del FAQ.
- Contraste de texto 4.5:1 mínimo.
- Si no se ha visto renderizada en el navegador, **decirlo explícitamente**. No afirmar que
  "se ve bien" sin haberlo mirado.

## Pendiente conocido

- El formulario tiene `action="#"`: no envía a ningún sitio.
- El pie tiene `[TU NOMBRE]`, `[TU NIF]` y `[TU DIRECCIÓN]` por rellenar.
- Los enlaces de aviso legal, privacidad y cookies apuntan a páginas que no existen.
- La marca AutoSync está sin verificar en la OEPM.
