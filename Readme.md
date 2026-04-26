# Trabajo Práctico Final Integrador - Módulo 5: API de Lista de Tareas

![Badge Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Badge Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Badge MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Sobre el Proyecto

Este proyecto es una API RESTful para gestionar un sistema de Misiones y Tareas ligadas a usuarios registrados. Fue desarrollada como trabajo final integrador del Módulo 5, donde el foco principal estuvo puesto en la seguridad de la aplicación.

La idea central es sencilla: cada usuario tiene sus propias misiones, y cada misión tiene sus propias tareas. El acceso a todo está controlado mediante autenticación por token.

### Jerarquía de entidades

1. **Usuarios**: Son los dueños de las misiones. Pueden tener rol `free`, `premium` o `admin`, lo cual determina qué acciones pueden realizar.
2. **Misiones**: Las crea cada usuario. Contienen una descripción general del objetivo a cumplir.
3. **Tareas**: Representan los pasos concretos para completar una misión. Tienen estado, dificultad y tiempo estimado.

---

## Seguridad implementada

- **Autenticación por Bearer Token**: Las contraseñas se almacenan cifradas con Bcrypt. Para acceder a los endpoints protegidos, el cliente debe enviar un JWT válido en el header `Authorization` (`Bearer <token>`).
- **Verificación de correo electrónico**: Al registrarse, el usuario recibe un mail con un token temporal para confirmar su cuenta antes de poder iniciar sesión.
- **Rate Limiting**: Se aplica un limitador de peticiones tanto en el login (por dirección de email, con bloqueo de 24 horas tras demasiados intentos) como en los endpoints protegidos (por ID de usuario autenticado).
- **Control de orígenes (CORS)**: La API tiene configurada una lista blanca de dominios permitidos y una lista negra que bloquea explícitamente peticiones provenientes de Google y Facebook.
- **Registro de auditoría**: Un middleware global intercepta todas las peticiones a la API (excepto login y registro) y guarda un registro en la base de datos con el método, el endpoint consultado, el resultado y el usuario que realizó la acción.

---

## Documentación interactiva

La API cuenta con documentación completa generada con Swagger UI, donde se pueden ver y probar todos los endpoints directamente desde el navegador.

- **Local:** `http://localhost:8080/docs`
- **Producción:** `{URL_DE_VERCEL}/docs`

---

## Modelos de datos

### Usuario
| Campo | Descripción |
| :--- | :--- |
| `name` | Nombre completo |
| `email` | Correo electrónico único |
| `password` | Contraseña hasheada |
| `role` | Rol del usuario: `free`, `premium` o `admin` |
| `verified` | Indica si verificó su correo electrónico |

### Misión
| Campo | Descripción |
| :--- | :--- |
| `fk_user_id` | ID del usuario propietario (vinculación interna) |
| `title` | Nombre de la misión |
| `description` | Descripción opcional del objetivo |

### Tarea
| Campo | Descripción |
| :--- | :--- |
| `fk_mission_id` | ID de la misión a la que pertenece |
| `description` | Descripción de la tarea (obligatorio) |
| `status` | Estado: `PENDING`, `IN_PROGRESS` o `COMPLETED` |
| `difficulty` | Dificultad: `EASY`, `MEDIUM` o `HARD` |
| `estimated_time_minutes` | Tiempo estimado en minutos |
| `finish_date` | Se completa automáticamente al marcar la tarea como `COMPLETED` |

---

## Endpoints

> Todos los endpoints, salvo los de autenticación, requieren enviar el header `Authorization: Bearer <token>` con un JWT válido obtenido al iniciar sesión.

### Autenticación (`/api/auth`)

| Método | Ruta | Descripción | Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Registra un nuevo usuario y envía el mail de verificación | `name`, `email`, `password` |
| `POST` | `/login` | Inicia sesión y devuelve el JWT | `email`, `password` |
| `GET` | `/verify-email` | Verifica el correo con el token recibido por mail | `?verificationToken=` |

### Misiones (`/api/missions`)

| Método | Ruta | Descripción | Roles permitidos |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Lista todas las misiones del usuario autenticado | Todos |
| `POST` | `/` | Crea una nueva misión | `admin`, `premium` |
| `DELETE` | `/:mission_id` | Elimina la misión y sus tareas en cascada | `admin`, `premium` |

### Tareas (`/api/tasks`)

| Método | Ruta | Descripción | Roles permitidos |
| :--- | :--- | :--- | :--- |
| `GET` | `/:mission_id` | Lista todas las tareas de una misión | Todos |
| `GET` | `/:task_id/detail` | Devuelve el detalle de una tarea específica | Todos |
| `POST` | `/:mission_id` | Crea una tarea dentro de una misión | `admin` |
| `PUT` | `/:task_id` | Actualiza todos los datos de una tarea | `admin`, `premium` |
| `PATCH` | `/:task_id/status` | Actualiza solo el estado de la tarea | Todos |
| `DELETE` | `/:task_id` | Elimina una tarea | `admin` |

---

## Correr el proyecto localmente

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/Adriel-23/Integrador-Node.js-MongoDB.git
    cd Integrador-Node.js-MongoDB
    ```

2. **Instalar dependencias**

    ```bash
    npm install
    ```

3. **Configurar las variables de entorno**

    Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:

    ```env
    PORT=8080
    MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/
    JWT_SECRET_KEY=una_clave_secreta_cualquiera
    MODE=dev
    MAIL_USERNAME=tu_email@gmail.com
    MAIL_PASSWORD=tu_password_de_aplicacion
    URL_BACKEND=http://localhost:8080
    ```

4. **Iniciar el servidor**

    ```bash
    npm run dev
    ```

    Si todo está bien, en la terminal deberían aparecer dos mensajes confirmando que el servidor arrancó y que MongoDB se conectó correctamente.

    > Nota: Si MongoDB devuelve un error del tipo "querySrv ECONNREFUSED", desactivá la opción "SRV Connection String" en MongoDB Atlas para obtener un string de conexión alternativo y reemplazalo en tu `.env`.

---

Creado por Adriel Laflor