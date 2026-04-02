# Trabajo Práctico Final Integrador - Módulo 4: API de Lista de Tareas

## Introducción

El objetivo de este Trabajo Práctico es desarrollar una API que permita gestionar la jerarquía completa de información del sistema:

1.  **Usuarios**: Que son los dueños de las misiones.
2.  **Misiones**: Creadas por los usuarios, que agrupan un conjunto de objetivos.
3.  **Tareas**: Los pasos específicos que componen cada misión.

> [!IMPORTANT]
> La estructura del proyecto debe respetar esta jerarquía: `Usuario` -> `Misión` -> `Tarea`.

> [!NOTE]
> Para esta entrega **no es necesario** implementar autenticación (JWT), encriptación de contraseñas ni Bearer Tokens. Utilizaremos los IDs en las rutas para identificar a los usuarios y misiones.

## Requisitos Técnicos

- **Node.js** y **Express** para el servidor.
- **MongoDB** con **Mongoose** para la persistencia de datos.
- **Arquitectura de Capas**: Utilizar capas de Rutas, Controladores y Repositorios.
- **Variables de Entorno**: Uso de `.env` para la configuración de la base de datos.

## Modelo de Datos (Task)

Cada tarea debe contar con los siguientes campos (definidos en `src/models/task.model.js`):

- `fk_mission_id`: Referencia (ObjectId) a la misión a la que pertenece la tarea.
- `description`: Breve descripción de la tarea (Obligatorio).
- `status`: Estado de la tarea (PENDING, IN_PROGRESS, COMPLETED).
- `difficulty`: Nivel de dificultad (EASY, MEDIUM, HARD).
- `estimated_time_minutes`: Tiempo estimado en minutos.
- `created_at`: Fecha de creación automática.
- `finish_date`: Fecha de finalización (solo si el status es COMPLETED).

> [!TIP]
> Observar que el repositorio actual tiene algunas inconsistencias con el modelo (como el campo `title`) que deberán ser corregidas durante el desarrollo.

## Consigna: Endpoints a Desarrollar

### 0. Autenticación (Ya implementada)

El sistema ya cuenta con un módulo de autenticación básica localizado en `src/routes/auth.router.js`:

- **POST `/api/auth/login`**: Permite al usuario iniciar sesión con `email` y `password`. Devuelve el `id` del usuario, el cual será necesario para interactuar con sus misiones.

### 1. Gestión de Misiones (Relación Usuario -> Misión)

- **POST `/api/missions/:user_id`**: Crear una misión asignada a un usuario.
- **GET `/api/missions/:user_id`**: Listar todas las misiones que pertenecen a un usuario específico.
- **DELETE `/api/missions/:mission_id`**: Eliminar una misión (debería considerar qué pasa con sus tareas).

### 2. Gestión de Tareas (Relación Misión -> Tarea)

- **POST `/api/tasks/:mission_id`**: Crear una tarea dentro de una misión.
- **GET `/api/tasks/:mission_id`**: Listar todas las tareas de una misión particular.
- **GET `/api/tasks/detail/:task_id`**: Obtener el detalle de una única tarea.
- **PUT `/api/tasks/:task_id`**: Editar descripción, dificultad o tiempo de una tarea.
- **DELETE `/api/tasks/:task_id`**: Eliminar una tarea individual.

### 3. Lógica de Negocio y Estados

- **PATCH `/api/tasks/:task_id/status`**: Cambiar el estado de la tarea (PENDING, IN_PROGRESS, COMPLETED).
  - Al pasar a `COMPLETED`, el sistema debe asignar automáticamente la fecha actual a `finish_date`.
  - Validar que el estado sea un valor permitido.

## Criterios de Evaluación

1. **Funcionamiento**: Los endpoints deben responder correctamente con los códigos de estado HTTP adecuados (200, 201, 400, 404, 500).
2. **Validaciones**: Se debe validar que los campos obligatorios estén presentes al crear una tarea.
3. **Estructura**: El código debe estar organizado siguiendo el patrón de diseño utilizado en el resto del proyecto.
4. **Manejo de Errores**: Implementar bloques `try/catch` para capturar posibles errores de la base de datos o de lógica.

## Entrega

Se debe subir el código completo al repositorio de GitHub correspondiente, link de despliegue, asegurándose de que todas las dependencias estén listadas en el `package.json`.
