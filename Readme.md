# Trabajo Práctico Final Integrador - Módulo 4: API de Lista de Tareas

## Objetivos del Proyecto:

El proyecto consiste en desarrollar una API que permita gestionar un sistema de Misiones ligadas a Usuarios, donde dichas missiones tengan sus respectivas Tareas.

### Jerarquía


1. **Usuarios**: *son los dueños de las misiones.*
2. **Misiones**: *Cada mision la crea su respectivo usuario, a su vez estás tienen sus tareas ligadas.*
3. **Tareas**: *Las tareas son aquellas que describen los pasos a seguir para lograr completar dicha mision a la que pertenecen.*

## Tecnologías Utilizadas

- **Node.js** y **Express** para el servidor.
- **MongoDB** con **Mongoose** para la persistencia de datos.
- **Yaak** para realizar peticiones HTTP y probar la API.
- **Vercel** para el despliegue del proyecto en la nube.


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

## Instrucciones para usar los Endpoints desplegados:

Deberá utilizar Postman u otro programa parecido para hacer peticiones HTPP. Como se indica en **EndPoints implementados** deberá realizar la peticion que desea utilizando como url la siguiente direccion:
 - **(Acá va la url de vercel)+`/api/auth/login`**
 - (este es un ejemplo para iniciar sesión) 
 Está ultima parte deberá modificarla dependiendo de donde quiera dirigirse. Los `/:User_id` y `/:mission_id` deberán ser reemplazados por la id otorgada por la DB al crear el usuario y una mision.

## Instrucciones para correrlo Localmente:

1. **Clonar el repositorio de GitHub**
    Deberá abrir la terminal en su IDE de preferencia y ejecutar el siguiente comando:

    ```bash
    git clone https://github.com/Adriel-23/Integrador-Node.js-MongoDB.git
    ```

   Si no le agrada la idea de clonar, siempre está la opción de descargarlo desde este mismo enlace con formato .zip, extraerlo y abrir la carpeta con un IDE.

2. **Ingresar a la carpeta del proyecto**
    Asegurese de ingresar a la carpeta del proyecto utilizando el siguiente código:

    ```bash
    cd Integrador-Node.js-MongoDB
    ```

3. **Instalar Dependencias**
    Una vez abierto el proyecto debe instalar las dependencias con el comando 

    ```bash
    npm install
    ```

4. **Configurar las Variables de Entorno**
    Deberá crear un archivo `.env` en la carpeta raíz del proyecto y agregar las siguientes variables:

    ```env
    PORT= 8080
    MONGO_DB_URI= mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/
    MONGO_DB_NAME= Nombre_de_su_DB
    JWT_SECRET_KEY= clave_hiper_mega_secreta_de_Pepito 
    ```

    En cada Variable luego del `=` se deberá llenar por las variables propias.
    - **PORT**: El puerto donde usted decida alojarlo.(ej: 8080, 3000, 3001, etc).
    - **MONGO_DB_URI**: Se llenará con el string que otorga MongoDB Atlas en su sección de conectar con la DB.
    - **MONGO_DB_NAME**: Llevará el nombre que tiene su DB.
    - **JWT_SECRET_KEY**: Puede ser cualquier palabra o frase secreta que usted elija. Esta se utilizará para encriptar los tokens de sesión.

5. **Lanzar el servidor**
    Para poder correr el proyecto y utilizarlo para ponerlo a prueba se utiliza el siguiente comando en la *Terminal*:

    ```bash
    npm run dev
    ```

    En la terminal deben aparecer dos mensajes:
    - *Servidor escuchando en el puerto (Acá el puerto que ha otorgado en su .env)*
    - *Exito, MongoDB Conectado*

    En caso de que MongoDB no se conecte y la terminal de un error **querySrv ECONNREFUSED***(Fallo en la resolución de registros DNS SRV)*, no se preocupe y siga los siguientes pasos:
    1. Diríjase a su Cluster de MongoDB Atlas
    2. Vaya a la sección de conexión y seleccione 'Drivers'.
    3. Dónde figura su string de conexión(el que empieza por *mongodb+srv://*) hay una opción *SRV Connection String* encendida por defecto, desactívela.
    4. Ahora la string de conexión debió haber sido reemplazada por una un poco mas larga, copie esta string nueva y diríjase a su **.env**.
    5. Reemplace el string que pegó anteriormente en la MONGO_DB_URI= por su nueva String(Solo después del =, no reemplace el nombre de la variable completa).
    6. Una vez hecho eso puede ir a la terminal y reinicar el proceso de correr (Ctrl+C para frenar el programa, `clear` para limpiar la consola y por ultimo `npm run dev`).
    7. Ya deberia funcionar sin problemas, y puede usted poner a prueba el programa.

6. **Hacer Peticiones HTTP**
    Una vez corriendo el programa puede abrir Postman o su programa de preferencia y crear peticiones a la siguiente URL:
    http://localhost:(el puerto que eligió)/api/(la direccion donde desea hacer la petición).

    Recuerde que las direcciones se encuentran disponibles en la sección **EndPoints Implementados** de este mismo archivo.

Creado por:
    Adriel Laflor