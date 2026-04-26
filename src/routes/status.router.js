import express from 'express'
import statusController from '../controllers/status.controller.js'
import authMiddleware, { verifyAuthTokenMiddleware } from '../middlewares/auth.middleware.js'


const statusRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Status
 *   description: "Consultas del estado general y disponibilidad de la API"
 */

/**
 * @swagger
 * /api/status:
 *   get:
 *     tags:
 *       - Status
 *     summary: "Obtener estado del servidor"
 *     description: "Ruta de prueba para verificar que el servidor esté en línea y procesando solicitudes. Requiere autenticación con rol 'premium'."
 *     responses:
 *       200:
 *         description: "El servidor se encuentra en línea y operativo"
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "ok": true,
 *                 "status": 200,
 *                 "message": "Servidor en línea"
 *               }
 *       401:
 *         description: "No autorizado (Falta el token de autenticación o es inválido)"
 *       403:
 *         description: "Prohibido (El usuario no tiene el rol necesario)"
 *       500:
 *         description: "Error interno del servidor"
 */
statusRouter.get(
    '/',
    verifyAuthTokenMiddleware(['premium']),
    statusController.get)

export default statusRouter