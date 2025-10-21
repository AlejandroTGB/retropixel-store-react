# RetroPixel Store

Una tienda de videojuegos retro construida con React. Aplicación de e-commerce completamente funcional con gestión de productos, carrito de compras, autenticación UI y panel administrativo.

Sitio en vivo: https://AlejandroTGB.github.io/retropixel-store-react

## Descripción del Proyecto

RetroPixel Store es una aplicación React que recrea la experiencia de una tienda de videojuegos vintage. El proyecto fue migrado de vanilla HTML/CSS/JavaScript a React manteniendo la estética pixel art y agregando funcionalidades modernas como Context API para manejo de estado y React Router para navegación.

La aplicación incluye:
- Catálogo de productos
- Carrito de compras con sincronización en tiempo real
- Sistema de blog con artículos detallados
- Panel de administración para gestionar productos
- Páginas de autenticación (Login/Registro)
- Página de contacto
- Información de la empresa

## Requisitos e Instalación

### Requisitos previos
- Node.js v16 o superior
- npm o yarn
- Git

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/AlejandroTGB/retropixel-store-react.git
cd retropixel-store-react
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

La aplicación se abrirá en http://localhost:3000

## Cómo Usarlo

### Comandos disponibles

```bash
npm start          # Inicia servidor de desarrollo (puerto 3000)
npm build          # Construye la app para producción
npm deploy         # Construye y despliega a GitHub Pages
npm test           # Ejecuta los tests
```

### Flujo de usuario

1. **Explorar productos**: Navega a "Juegos" para ver el catálogo completo
2. **Agregar al carrito**: Haz clic en "Agregar al Carrito" en cualquier producto
3. **Ver carrito**: Accede al carrito desde el navbar (muestra contador de items)
4. **Admin panel**: Ve a "Admin" para crear, editar o eliminar productos
5. **Blog**: Lee artículos retro en la sección de Blog

### Ejemplos de rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con hero y productos destacados |
| `/productos` | Catálogo completo de juegos |
| `/blogs` | Lista de artículos |
| `/blogs/:id` | Detalle de artículo específico |
| `/contacto` | Formulario de contacto |
| `/login` | Página de login |
| `/registro` | Página de registro |
| `/carrito` | Carrito de compras |
| `/admin` | Panel administrativo |

## Estructura del Proyecto

```
src/
  components/
    Navbar.js              # Barra de navegación con contador de carrito
    Footer.js              # Pie de página
  
  context/
    ProductosContext.js    # Estado global de productos (CRUD)
    CarritoContext.js      # Estado global del carrito
  
  pages/
    home/                  # Página de inicio
    productos/             # Catálogo de productos
    carrito/               # Vista del carrito
    blog/                  # Lista de artículos
    detalleBlog/           # Artículo individual
    contacto/              # Formulario de contacto
    login/                 # Página de login
    registro/              # Página de registro
    admin/                 # Panel administrativo
    nosotros/              # Página de la empresa
  
  data/
    productos.json         # Base de datos de productos
    blogs.json             # Base de datos de artículos
  
  assets/
    Gif/                   # Imágenes GIF para fondos y productos
    Blogs/                 # Imágenes de artículos
    Logo/                  # Logos
  
  styles/
    global.css             # Estilos globales y fuentes

public/
  index.html               # HTML principal
  404.html                 # Para routing en GitHub Pages
```

## Dependencias

### Dependencias principales

```json
{
  "react": "^19.2.0",              // Framework UI
  "react-dom": "^19.2.0",          // Renderizado en DOM
  "react-router-dom": "^7.9.4",    // Enrutamiento
  "react-scripts": "5.0.1"         // Build tool (Create React App)
}
```

### Dependencias de desarrollo

```json
{
  "gh-pages": "^6.x",              // Despliegue a GitHub Pages
  "@testing-library/react": "^16.3.0"
}
```

## Arquitectura de Estado

### ProductosContext
Maneja la lista global de productos. Métodos disponibles:

```javascript
const { productos, agregarProducto, eliminarProducto, actualizarProducto } = useProductos();

// agregarProducto(producto) - Agrega un nuevo producto
// eliminarProducto(id) - Elimina un producto por ID
// actualizarProducto(id, actualizado) - Actualiza datos del producto
```

Estructura de producto:
```javascript
{
  id: "super-mario-bros",
  nombre: "Super Mario Bros",
  precio: 29990,
  imagen: "url/de/imagen.gif",
  descripcion: "Descripción del juego"
}
```

### CarritoContext
Maneja el carrito de compras. Métodos disponibles:

```javascript
const { carrito, agregarProducto, eliminarProducto, actualizarCantidad, vaciarCarrito, getTotalItems } = useCarrito();
```

Sincronización: El carrito filtra automáticamente productos eliminados del admin usando:
```javascript
carrito.filter(item => productos.find(p => p.id === item.id))
```

## Decisiones Técnicas Importantes

### 1. Context API

Decisión: Usar Context API + useState para estado global.

Justificación:
- Proyecto pequeño a mediano (9 páginas)
- Context API es nativo de React y suficiente para los casos de uso
- Menos boilerplate, más fácil de mantener

### 2. CSS Modules en lugar de Tailwind/styled-components

Decisión: CSS Modules para cada página/componente.

Justificación:
- Evita conflictos de nombres globales
- Facilita mantenimiento por componente
- Control fino del styling sin dependencias externas
- Compatible con la estética pixel art requerida

### 3. Imágenes desde GitHub Raw en lugar de CDN externo

Decisión: Cambiar de duroc-sa.github.io a GitHub Raw para activos.

Justificación:
- Centraliza todos los activos en el repositorio
- Garantiza que los cambios se reflejen en la rama gh-pages
- Evita dependencia de terceros

### 4. Sin localStorage para estado (Context only)

Decisión: Estado transitorio en Context (se borra al recargar).

Justificación:
- Evita sincronización complicada entre local y global
- Adecuado para aplicación de demostración

### 5. GitHub Pages con 404.html para routing

Decisión: Usar archivo 404.html para capturar todas las rutas.

Justificación:
- GitHub Pages no soporta historial de HTML5 nativamente
- 404.html redirige a index.html preservando la ruta
- Script en index.html decodifica y restaura la URL
- React Router maneja el resto del routing cliente

## Despliegue

El proyecto está configurado para desplegarse en GitHub Pages.


## Características Futuras

- Integración con backend API
- Autenticación real con JWT
- Búsqueda y filtrado de productos
- Gestión de blog en admin
- Carrito persistente
- Notificaciones en tiempo real
- Sistema de reviews de productos

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## Contacto

- GitHub: @AlejandroTGB

---
