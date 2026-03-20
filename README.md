- Instrucciones de entrega:
        - npm install
        - npm run dev
- Explicación de cómo se ha estructurado la navegación y cómo se han resuelto los problemas con los datos anidados de la API:

        - Navegación

El proyecto usa App Router de Next.js, organizando las rutas en carpetas dentro de src/app/. La ruta principal / muestra el listado de países y la ruta dinámica /country/[name] muestra el detalle de cada país. Para leer el parámetro de la URL se usa el hook useParams() de next/navigation, ya que useRouter() de next/router no es compatible con App Router.

        - Datos anidados de la API

La API siempre devuelve un array aunque se busque un único país, por lo que se extrae el primer elemento con data[0]. Además, campos como languages y currencies son objetos anidados, por lo que se usa Object.values() para convertirlos en arrays. Para evitar errores mientras cargan los datos, se añade un guard que muestra un mensaje de carga mientras country sea null.