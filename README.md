¿Qué valor agregado tiene el uso de WebComponents en su proyecto?

El uso de WebComponents permite encapsular la lógica y el diseño de la lista de préstamos en un componente reutilizable e independiente.
Esto mejora la organización del código, facilita el mantenimiento y permite reutilizar el componente en otros proyectos sin afectar el resto de la aplicación.

¿De qué forma manipularon los datos sin recargar la página?

Se utilizaron eventos de JavaScript, específicamente el evento submit del formulario, junto con métodos que actualizan dinámicamente el DOM mediante shadowRoot.innerHTML.
Además, se empleó localStorage para guardar y recuperar datos sin necesidad de recargar la página.

¿De qué forma validaron las entradas de datos?

Se validaron los datos verificando que ningún campo obligatorio estuviera vacío.
También se agregó una validación para asegurar que la fecha de devolución no sea menor que la fecha de préstamo. En caso de error,
se muestra un mensaje de alerta y no se permite el registro.

¿Cómo manejaría la escalabilidad futura en su página?

Para la escalabilidad futura:
Separar el código en módulos JavaScript
Implementar una base de datos en lugar de localStorage
Conectar la aplicación a un backend con API REST
Agregar autenticación de usuarios
Implementar paginación para grandes volúmenes de datos
