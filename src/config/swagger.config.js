import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Gestor de Tareas y Misiones",
            version: "1.0.0",
            description: "API que permite gestionar el estado de misiones y sus tareas, con autenticación y roles de usuario.",
        },
        servers: [
            {
                url: "http://localhost:2323",
            }
        ],
    },
    apis: [
        "./src/routes/*.js",
    ]
}

//Creamos unas especificaciones (configuraciones y definiciones)
const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec