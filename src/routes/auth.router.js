import userController from "../controllers/user.controller.js";
import express from 'express';
import authLimiterMiddleware from "../middlewares/authLimiter.middleware.js";



const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: "Registro, inicio de sesión y verificación de usuarios"
 */

/**
 *  @swagger
 *  /api/auth/login:
 *     post:
 *      tags:
 *        - Auth
 *      summary: "Login de usuario"
 *      description: "Recibe las credenciales de un usuario y devuelve un token de autenticación (JWT) si las credenciales son correctas."
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: "Correo electrónico del usuario"
 *                  example: "juan.perez@example.com"
 *                password:
 *                  type: string
 *                  description: "Contraseña en texto plano"
 *                  example: "123456"
 *      responses:
 *        200:
 *          description: "Login exitoso"
 *          content:
 *            application/json:
 *              example:
 *                {
 *                  "ok": true,
 *                  "status": 200,
 *                  "message": "Inicio de sesión exitoso",
 *                  "data": {
 *                      "authToken": ""
 *                  }
 *                }
 *        400:
 *          description: "Faltan campos obligatorios (email o contraseña)"
 *        401:
 *          description: "Credenciales incorrectas o correo electrónico no verificado"
 *        500:
 *          description: "Error interno del servidor"
 */
authRouter.post(
    '/login',
    authLimiterMiddleware,
    userController.loginUser
)

/**
 *  @swagger
 *  /api/auth/register:
 *    post:
 *      tags:
 *        - Auth
 *      summary: "Registro de un nuevo usuario"
 *      description: "Crea un nuevo usuario en la base de datos, hashea su contraseña, y le envía un correo electrónico con un token JWT para verificar su dirección de email."
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: "Nombre completo del usuario"
 *                  example: "Juan Perez"
 *                email:
 *                  type: string
 *                  description: "Correo electrónico del usuario"
 *                  example: "juan.perez@example.com"
 *                password:
 *                  type: string
 *                  description: "Contraseña en texto plano"
 *                  example: "123456"
 *      responses:
 *        201:
 *          description: "Usuario registrado exitosamente"
 *        400:
 *          description: "Error de validación (faltan campos o el email ya está registrado)"
 *        500:
 *          description: "Error interno del servidor"
 */
authRouter.post(
    '/register',
    userController.registerUser
)

/**
 *  @swagger
 *  /api/auth/verify-email:
 *    get:
 *      tags:
 *        - Auth
 *      summary: "Verificar dirección de correo electrónico"
 *      description: "Recibe un token de verificación JWT a través de la query string y actualiza el estado de verificación del usuario en la base de datos."
 *      parameters:
 *        - in: query
 *          name: verificationToken
 *          schema:
 *            type: string
 *          required: true
 *          description: "Token JWT generado al momento del registro"
 *      responses:
 *        200:
 *          description: "Correo electrónico verificado exitosamente"
 *          content:
 *            application/json:
 *              example:
 *                {
 *                  "ok": true,
 *                  "status": 200,
 *                  "message": "Correo electrónico verificado exitosamente"
 *                }
 *        400:
 *          description: "No se proporcionó el token de verificación"
 *        401:
 *          description: "Token de verificación inválido o expirado"
 *        404:
 *          description: "El usuario correspondiente al token no fue encontrado"
 *        500:
 *          description: "Error interno del servidor"
 */
authRouter.get(
    '/verify-email',
    userController.verifyEmail
)

export default authRouter; 