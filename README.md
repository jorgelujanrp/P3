# Catálogo de Productos con Next.js

## Instrucciones de entrega
        npm install
        npm run dev

## Estructura de navegación

El proyecto usa App Router de Next.js, organizando las rutas en carpetas dentro de src/app/

La navegación entre páginas se hace con el componente <Link> de Next.js

## Resolución de datos anidados de la API

La API de DummyJSON devuelve en el endpoint de listado un objeto con la clave products que contiene el array, por lo que se extrae con data.products`. En la ficha de detalle el endpoint devuelve directamente el objeto producto.

El campo dimensions es un objeto anidado con width, height y depth, por lo que se accede con notación de punto (product.dimensions.width).

Mientras los datos cargan, se muestra un spinner y la variable isLoading actúa de guard para no renderizar el contenido hasta que el producto esté disponible.
