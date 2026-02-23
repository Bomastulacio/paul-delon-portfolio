# Paul Delon — Portfolio Profesional

Este proyecto es el portfolio oficial de **Paul Delon**, fotógrafo profesional (oficial de Abel Pintos). La web presenta un diseño moderno, dramático y minimalista, optimizado para destacar el impacto visual de sus fotografías.

## 🚀 Características Principales

- **Gallería Accordion Pro**: Sistema de navegación por categorías (Música en Vivo, Proyectos & Documentales) con transiciones suaves.
- **Efectos Visuales Avanzados**: Implementación de Glassmorphism (efecto de cristal esmerilado), degradados dramáticos y un cursor minimalista personalizado.
- **Optimización Mobile**: Diseño responsivo con controles adaptados para táctil, asegurando una experiencia fluida en smartphones.
- **Carrusel Inteligente**: Galería de imágenes con cambio automático y manual mediante indicadores (dots).

## 🛠️ Proceso de Desarrollo (Paso a Paso)

Este sitio ha pasado por un proceso de refinamiento intensivo para alcanzar su estado actual:

### 1. Mejora Visual y Estética
- Se implementaron efectos de **Glassmorphism** en los contenedores de texto.
- Se estandarizaron las transiciones a `1.0s` con un suavizado `ease-in-out` para una sensación de fluidez premium.
- Se ajustó el esquema de colores a un modo "Dark Dramatic" para resaltar la fotografía.

### 2. Optimización para Dispositivos Móviles
- **Layout Adaptativo**: Se reestructuró la vista móvil para usar un diseño en columna con un reparto de espacio 70/30 (Imagen/Texto) al expandir paneles.
- **Manejo Táctil (Tap Handlers)**: Se reescribió la lógica de JavaScript para manejar eventos `click` y `touchstart` de forma robusta, cerrando automáticamente otros paneles al abrir uno nuevo.

### 3. Solución de Problemas Críticos (Visibility & Logic)
- **Eliminación del "Efecto Pantalla Negra"**: Se forzó la inicialización inmediata de la primera imagen de cada galería al expandir el panel.
- **Limpieza Global de Estado**: Se implementó una función de limpieza agresiva que flashea el estado de todas las imágenes antes de abrir una nueva sección.
- **Reglas CSS de Alta Prioridad**: Se añadieron reglas quirúrgicas al final del CSS para garantizar que la opacidad y los filtros de color funcionen correctamente en navegadores móviles (Chrome iOS/Android), independientemente de los estados `:hover`.

### 4. Actualización de Contenido Final
- Integración de la **nueva foto de perfil** oficial en la sección "Sobre Mí".
- Corrección y actualización del enlace a **Instagram** (`@pauldelon`).

## 💻 Instalación y Uso Local

1. Clona este repositorio.
2. Abre `index.html` en tu navegador o usa un servidor local (como Live Server).
3. No requiere dependencias externas pesadas, utiliza Vanilla JavaScript y CSS puro para máxima velocidad.

## 📸 Créditos
Fotografías por **Paul Delon**.
Diseño y Desarrollo asistido por **Antigravity**.
