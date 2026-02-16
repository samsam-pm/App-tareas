Gestor de Tareas

El Gestor de Tareas es una aplicación móvil híbrida desarrollada con Ionic y Angular. Su objetivo es ofrecer una solución simple y eficiente para la gestión de tareas personales, permitiendo la creación, edición, eliminación y visualización de tareas sin necesidad de conexión a internet ni servicios externos.

Características principales:

- Interfaz Responsiva: Se adapta a móviles, tabletas y escritorios utilizando las herramientas de diseño responsivo de Ionic.

- Persistencia de datos: Utiliza la API nativa de localStorage para almacenar las tareas de manera local, lo que permite mantener los datos incluso después de cerrar la aplicación.

- Carga perezosa (Lazy Loading): Optimiza el tiempo de carga inicial utilizando Lazy Loading en los módulos.

- Validaciones de formulario: Asegura la integridad de los datos con validaciones para el título, descripción y fecha de las tareas.

Tecnologías:

- Ionic 6 y Angular

- localStorage para persistencia de datos

Lazy Loading para optimizar la carga de los módulos

Estructura de la aplicación:

- Página Home: Muestra todas las tareas guardadas y permite navegar a las páginas de detalles y creación de tareas.

- Página Tarea: Muestra los detalles de una tarea específica.

- Página Tarea Detalle: Permite ver y editar los detalles de la tarea seleccionada.

- TareaService: Gestiona la interacción con localStorage para almacenar y recuperar las tareas.

Objetivos:

- Desarrollar una aplicación híbrida usando Ionic y Angular.

- Implementar persistencia local para guardar tareas sin conexión.

- Optimizar la carga con Lazy Loading.

La aplicación destaca por su arquitectura modular, optimización en la carga de datos y experiencia de usuario fluida y fácil de usar.
