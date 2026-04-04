# Trabajo Práctico Final Integrador - Módulo 4: API de Lista de Tareas

## Objetivos del Proyecto:

El proyecto consiste en desarrollar una API que permita gestionar un sistema de Missiones ligadas a Usuarios, donde dichas missiones tengan sus respectivas Tareas.

### Jerarquía


1. **Usuarios**: *son los dueños de las misiones.*
2. **Misiones**: *Cada mission la crea su respectivo usuario, a su vez estás tienen sus tareas ligadas.*
3. **Tareas**: *Las tareas son aquellas que describen los pasos a seguir para lograr completar dicha mision a la que pertenecen.*

## Requisitos Técnicos

- **Node.js** y **Express** para el servidor.
- **MongoDB** con **Mongoose** para la persistencia de datos.
- **Arquitectura de Capas**: Utilizar capas de Rutas, Controladores y Repositorios.
- **Variables de Entorno**: Uso de `.env` para la configuración de la base de datos.

## Modelo de Datos

### Usuarios:

Los Usuarios cuentan con opcion de Registrarse y de Iniciar Sesion.

- **Registro**: Se solicita nombre, un email y una contraseña para crear su 'User' en la DB.
- **Iniciar Sesion**: Con un User ya existente se le solicita, a quien desee iniciar sesion, los datos proporcionados en el registro a exepcion del nombre (email y contraseña).

### Misiones:

Las Misiones estan formadas por:

- **fk_user_id**: Esta es la llave de vinculación con el usuario correspondiente a cada mision(user_id === fk_user_id).
- **Titulo**: Es el Nombre principal que identifica a la misión. No es necesario que sea único.
- **Descripcion**: Es opcional y en caso de tener, es una descripcion general de lo que se debe realizar en dicha Mision.
-**timestamps**: Posee un timestamps: true, lo que añade fecha de creacion de forma automática.

### Tareas:

Las tareas tienen los siguientes campos:

- **fk_mission_id**: Llave de vinculación a la misión a la que pertenece la tarea (mission_id === fk_mission_id).
- **description**: una breve descripción de la tarea (este campo es obligatorio).
- **status**: Define el estado en el que se encuentra la tarea (PENDING, IN_PROGRESS, COMPLETED). Por defecto es PENDING, no se aceptará un estado "en proceso", "pendiente", etc. 
- **difficulty**: Nivel de dificultad (EASY, MEDIUM, HARD). Igual que Status, por defecto EASY.
- **estimated_time_minutes**: Tiempo estimado que tomará completar la tarea en minutos.
- **created_at**: Fecha de creación automática al crear la tarea.
-**finish_date**: Fecha de finalización automática(en el momento en que el status es COMPLETED).

## Endpoints Implementados

### Autenticación:

- **POST `/api/auth/register`**: Crea el registro del usuario haciendo petición de un `name`, `email` y por último `password`. Devuelve nombre, email, contraseña, _id de usuario, fecha de creación y de modificación.
- **POST `/api/auth/login`**: Permite al usuario identificarse mediante el inicio de sesión haciendo uso de los datos proporcionados en el registro: `email` y `password`. No requiere `name`.

### Gestión de Misiones

- **POST `/api/missions/:user_id`**: Crea una misión asignada a un usuario.
- **GET `/api/missions/:user_id`**: Devuele una lista con todas las misiones correspondientes al usuario solicitado.
- **DELETE `/api/missions/:user_id/:mission_id`**: Elimina la mission junto a todas sus tareas vinculadas.

### Gestión de Tareas

- **POST `/api/tasks/:user_id/:mission_id`**: Crea una tarea vinculada a una misión, o dentro de ella.
- **GET `/api/tasks/:user_id/:mission_id`**: Devuelve una lista con todas las tareas asignadas a dicha misión.
- **GET `/api/tasks/:user_id/detail/:task_id`**: Devuelve el detalle de una tarea en concreto.
- **PUT `/api/tasks/:user_id/:task_id`**: Edita la descripción, la dificultad o el tiempo de una tarea en concreto.
- **PATCH `/api/tasks/:user_id/:task_id/status`**: Cambia el estado de una tarea (PENDING, IN_PROGRESS, COMPLETED). Si el estado nuevo es `COMPLETED` el sistema asigna de forma automática la fecha y hora actual en `finish_date`.
- **DELETE `/api/tasks/:user_id/:task_id`**: Elimina una única tarea especifica.

