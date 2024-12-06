## Tabla de Contenidos
1. [Glosario de Términos](#glosario-de-términos)
2. [Introducción](#introducción)
3. [¿Qué hace esta aplicación?](#qué-hace-esta-aplicación)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Backend (Parte del Servidor)](#backend-parte-del-servidor)
   - [Base de Datos](#base-de-datos)
   - [Servidor](#servidor)
6. [Frontend (Parte del Cliente)](#frontend-parte-del-cliente)
   - [Estructura HTML](#estructura-html)
   - [Funcionalidad JavaScript](#funcionalidad-javascript)
7. [Diseño y Estilo](#diseño-y-estilo)
8. [Puntos de Acceso de la API](#puntos-de-acceso-de-la-api)
9. [Cómo Ejecutar la Aplicación](#cómo-ejecutar-la-aplicación)
10. [Mejoras Futuras](#mejoras-futuras)

## Glosario de Términos

- *Backend*: La parte de la aplicación que se ejecuta en el servidor y maneja la lógica y el almacenamiento de datos.
- *Frontend*: La parte de la aplicación que el usuario ve e interactúa en su navegador web.
- *Base de Datos*: Un sistema para almacenar y organizar información de manera estructurada.
- *API*: Interfaz de Programación de Aplicaciones. Es como un "menú" de funciones que permite a diferentes partes de un programa comunicarse entre sí.
- *CRUD*: Crear, Leer, Actualizar y Eliminar. Son las operaciones básicas que se pueden realizar con datos en una aplicación.
- *HTML*: Lenguaje de Marcado de Hipertexto. Es el código que se usa para estructurar y presentar el contenido en la web.
- *CSS*: Hojas de Estilo en Cascada. Se usa para describir cómo se deben mostrar los elementos HTML.
- *JavaScript*: Un lenguaje de programación que permite crear contenido interactivo en páginas web.
- *Node.js*: Un entorno que permite ejecutar JavaScript en el servidor, no solo en el navegador.
- *Express.js*: Un marco de trabajo (framework) para Node.js que simplifica la creación de aplicaciones web.
- *SQLite*: Un sistema de gestión de bases de datos ligero y fácil de usar.

## Introducción

El AdAgency Campaign Manager es una aplicación web diseñada para ayudar a las agencias de publicidad a gestionar sus campañas de manera eficiente. Imagina que es como un organizador digital para campañas publicitarias.

## ¿Qué hace esta aplicación?

Esta aplicación permite a los usuarios:

1. Ver una lista de todas las campañas publicitarias.
2. Añadir nuevas campañas con detalles como nombre, presupuesto y cliente.
3. Actualizar la información de campañas existentes.
4. Eliminar campañas que ya no son necesarias.

Es como tener una libreta digital donde puedes escribir, modificar y borrar información sobre campañas publicitarias, pero de una manera más organizada y fácil de usar.

## Estructura del Proyecto

El proyecto está organizado en carpetas y archivos, cada uno con un propósito específico:

\
adagency-campaign-manager/
│
├── public/                 # Archivos que el navegador puede ver directamente
│   ├── index.html          # La página web principal
│   └── js/
│       └── main.js         # El código JavaScript para la interactividad
│
├── server/                 # Archivos del servidor (backend)
│   ├── index.js            # El código principal del servidor
│   └── initDb.js           # Código para crear la base de datos
│
└── package.json            # Lista de dependencias y scripts del proyecto
\

## Backend (Parte del Servidor)

### Base de Datos

Usamos SQLite como nuestra base de datos. Es como una hoja de cálculo muy potente que guarda toda la información de las campañas. La estructura de nuestra "hoja de cálculo" se define así:

\sql
CREATE TABLE IF NOT EXISTS campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  campaign_name TEXT,
  budget INTEGER,
  client TEXT
)
\

Esto crea una tabla llamada \campaigns\ con cuatro columnas:
- \id\: Un número único para cada campaña
- \campaign_name\: El nombre de la campaña
- \budget\: El presupuesto de la campaña
- \client\: El nombre del cliente

### Servidor

El servidor es como el "cerebro" de nuestra aplicación. Está construido usando Express.js, que es una herramienta que facilita la creación de aplicaciones web con Node.js. El servidor hace varias cosas importantes:

1. Escucha las peticiones que vienen del frontend (la parte que el usuario ve).
2. Interactúa con la base de datos para guardar o recuperar información.
3. Envía respuestas de vuelta al frontend.

## Frontend (Parte del Cliente)

### Estructura HTML

El frontend es lo que el usuario ve en su navegador. Está construido con HTML y usa Tailwind CSS para el diseño. Incluye:

1. Un formulario para añadir nuevas campañas
2. Un formulario para actualizar campañas existentes
3. Un formulario para eliminar campañas
4. Una sección que muestra la lista de todas las campañas

### Funcionalidad JavaScript

El archivo \main.js\ es el que hace que la página web sea interactiva. Hace cosas como:

1. Obtener la lista de campañas del servidor y mostrarla en la página
2. Enviar los datos de nuevas campañas al servidor cuando el usuario las crea
3. Actualizar la información de las campañas cuando el usuario hace cambios
4. Eliminar campañas cuando el usuario lo solicita
5. Mostrar mensajes para informar al usuario si sus acciones fueron exitosas o no

## Diseño y Estilo

Para hacer que la aplicación se vea bonita y sea fácil de usar, utilizamos Tailwind CSS. Esto nos permite:

- Hacer que la aplicación se vea bien en diferentes tamaños de pantalla (responsive design)
- Usar una combinación de colores agradable
- Añadir efectos visuales cuando el usuario interactúa con los elementos
- Usar una tipografía clara y legible

## Puntos de Acceso de la API

La API es como un menú de acciones que el frontend puede pedir al backend. Nuestra API tiene cuatro "platos" principales:

1. Crear una nueva campaña
2. Obtener la lista de todas las campañas
3. Actualizar una campaña existente
4. Eliminar una campaña

## Cómo Ejecutar la Aplicación

Para poner en marcha la aplicación:

1. Asegúrate de tener Node.js instalado en tu computadora.
2. Descarga todos los archivos del proyecto.
3. Abre una ventana de terminal y navega hasta la carpeta del proyecto.
4. Escribe \npm install\ y presiona Enter para instalar todas las herramientas necesarias.
5. Escribe \npm run init-db\ y presiona Enter para crear la base de datos.
6. Escribe \npm run dev\ y presiona Enter para iniciar el servidor.
7. Abre un navegador web y ve a la dirección \http://localhost:5000\

## Mejoras Futuras

Algunas ideas para mejorar la aplicación en el futuro incluyen:

1. Añadir un sistema de usuarios y contraseñas
2. Incluir más detalles sobre las campañas (fechas de inicio y fin, público objetivo, etc.)
3. Crear gráficos para visualizar el rendimiento de las campañas
4. Permitir subir archivos relacionados con las campañas
5. Conectar la aplicación con plataformas de publicidad externas
6. Mejorar la forma en que se manejan los errores
7. Añadir pruebas para asegurar que todo funciona correctamente
8. Permitir ver las campañas por páginas si hay muchas
9. Añadir una función de búsqueda para encontrar campañas específicas

Esta aplicación es un buen punto de partida para gestionar campañas publicitarias y puede ser ampliada y personalizada según sea necesario.
