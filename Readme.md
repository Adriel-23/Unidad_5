# Trabajo Práctico Final Integrador - Módulo 5 (Seguridad): API de Lista de Tareas

![Badge Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Badge Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Badge MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Objetivos del Proyecto

El proyecto consiste en desarrollar una API RESTful escalable y segura que permita gestionar un sistema de **Misiones** ligadas a **Usuarios**, donde dichas misiones tengan sus respectivas **Tareas**. 

En esta versión (Módulo 5), se ha implementado una capa robusta de **Seguridad**, incluyendo autenticación por Token JWT, limitador de peticiones (Rate Limiting), control de dominios mediante CORS, y un registro global de auditorías (Logging) en la base de datos.

### Jerarquía
1. **Usuarios**: Administradores, Premium y Usuarios Gratuitos. Son los únicos dueños de las misiones y cuentan con roles definidos.
2. **Misiones**: Cada misión es creada y controlada por su respectivo usuario. A su vez, estas tienen tareas ligadas.
3. **Tareas**: Describen los pasos a seguir para lograr completar dicha misión a la que pertenecen.

---

## 🔒 Capa de Seguridad Implementada (Unidad 5)

- **Autenticación Bearer Token**: Las contraseñas se almacenan cifradas (Bcrypt) y el acceso a los endpoints protegidos se realiza enviando un JWT en el `Authorization` header (`Bearer <token>`).
- **Verificación de Email**: Al registrarse, se envía un correo con un JWT temporal para validar la cuenta.
- **Rate Limiting**: Limitador estricto para evitar ataques de fuerza bruta en el Login y abusos en los endpoints protegidos por usuario autenticado.
- **CORS Blacklist & Whitelist**: La API bloquea activamente peticiones originadas desde dominios de Facebook y Google, y permite solo dominios de confianza.
- **Auditoría Global**: Middleware implementado que registra en la base de datos de auditorías todas las peticiones a la API (Endpoint, método, severidad y el _id del usuario autenticado si aplica), excepto el login/registro.

---

## 📖 Documentación Swagger

Toda la documentación técnica e interactiva de la API puede probarse visualmente a través del portal de **Swagger UI**.

**Ruta local:** `http://localhost:8080/docs`
**Ruta Producción:** `{URI_DE_LA_APP}/docs`

Allí encontrará los formatos de respuestas y manejo de errores (400, 401, 403, 404, 500) para absolutamente todos los endpoints.

---

## Modelos Principales

### Usuarios:
- **name**:  Nombre completo.
- **email**: Único en el sistema.
- **password**: Almacenada mediante hash unidireccional.
- **role**: Nivel de permisos (`free`, `premium`, `admin`).
- **verified**: Booleano que confirma estado de la verificación de email.

### Misiones:
- **fk_user_id**: Llave de vinculación con el usuario ocultada logicamente bajo Token.
- **title**: Es el Nombre principal que identifica a la misión.
- **description**: Descripción general de lo que se debe realizar.

### Tareas:
- **fk_mission_id**: Misión a la que pertenece la tarea.
- **description**: Una breve descripción de la tarea (obligatorio).
- **status**: Define el estado en el que se encuentra (`PENDING`, `IN_PROGRESS`, `COMPLETED`).
- **difficulty**: Nivel de dificultad.
- **estimated_time_minutes**: Tiempo estimado en minutos.
- **finish_date**: Fecha de finalización automática (en el momento en que el status se marca como COMPLETED).

---

## 🚀 Endpoints Implementados

> **Importante:** Todos los endpoints (a excepción de Auth) esperan recibir un Header `Authorization` con un Bearer Token válido. ¡El `user_id` ya no se envía en la URL!

### Autenticación (`/api/auth`)
| Método | Endpoint | Descripción | Body Requerido |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Crea al User y envía el email. | `name`, `email`, `password` |
| `POST` | `/login` | Identifica al usuario y devuelve el JWT. | `email`, `password` |
| `GET` | `/verify-email` | Verifica la cuenta con el token del email | `?verificationToken=` (Query string) |

### Misiones (`/api/missions`)
*Sujeto al middleware de Rate Limit para el usuario autenticado.*
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/` | Devuelve una lista con todas las misiones del User autenticado. |
| `POST` | `/` | Crea una misión ligada dinámicamente al ID en el Token. |
| `DELETE` | `/:mission_id` | Elimina la misión específica y en cascada sus tareas *(Solo admins/premium).* |

### Tareas (`/api/tasks`)
*Sujeto al middleware de Rate Limit para el usuario autenticado.*
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/:mission_id` | Lista las tareas asignadas a dicha misión. |
| `GET` | `/:task_id/detail` | Detalle específico de una tarea en concreto. |
| `POST` | `/:mission_id` | Crea una tarea vinculada a la misión. |
| `PUT` | `/:task_id` | Edita datos completos de la tarea *(Solo admins/premium).* |
| `PATCH`| `/:task_id/status`| Modifica únicamente el status. Inserta auto. `finish_date`. |
| `DELETE` | `/:task_id` | Elimina tarea del sistema *(Solo admins).* |

---

## 🛠 Instrucciones para Entorno Local de Desarrollo

1. **Clonar el repositorio**
    Abra la terminal en su IDE y ejecute:
    ```bash
    git clone https://github.com/Adriel-23/Integrador-Node.js-MongoDB.git
    cd Integrador-Node.js-MongoDB
    ```

2. **Instalar Dependencias**
    ```bash
    npm install
    ```

3. **Variables de Entorno (`.env`)**
    Cree un archivo `.env` en la raíz copiando la siguiente estructura:
    ```env
    PORT=8080
    MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/
    JWT_SECRET_KEY=su_clave_secreta_aleatoria
    MODE=dev
    MAIL_USERNAME=su_email@gmail.com
    MAIL_PASSWORD=su_password_de_aplicacion
    URL_BACKEND=http://localhost:8080
    ```

4. **Lanzar el servidor**
    ```bash
    npm run dev
    ```

> *Tip DNS SRV*: Si Mongoose arroja "querySrv ECONNREFUSED", desactive la opción "SRV Connection String" en MongoDB Atlas (o remueva el `+srv` y reemplace por el string puro) y reinicie el proyecto con Node.