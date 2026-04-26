import express from 'express';
import missionController from '../controllers/mission.controller.js';
import authMiddleware, { verifyAuthTokenMiddleware } from '../middlewares/auth.middleware.js';
import missionMiddleware from '../middlewares/mission.middleware.js';
import limiterMiddleware from '../middlewares/limiter.middleware.js';




const missionRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Missions
 *   description: "Creación, obtención y eliminación de Misiones. Entidad principal del negocio."
 */

/**
 * @swagger
 * /api/missions:
 *   post:
 *     tags:
 *       - Missions
 *     summary: "Crear una nueva misión"
 *     description: "Registra una nueva misión en la base de datos. Requiere estar autenticado y tener el rol 'admin' o 'premium'."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Aprender a volar"
 *               description:
 *                 type: string
 *                 example: "Una misión para surcan los cielos"
 *     responses:
 *       201:
 *         description: "Misión creada exitosamente"
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "ok": true,
 *                 "status": 201,
 *                 "message": "Misión creada",
 *                 "data": { "id": "60a...", "title": "Aprender a volar" }
 *               }
 *       400:
 *         description: "Error de validación de los datos enviados"
 *       401:
 *         description: "No autorizado"
 *       403:
 *         description: "El usuario no tiene el rol necesario"
 *       500:
 *         description: "Error interno del servidor"
 */
missionRouter.post(
    '/', 
    verifyAuthTokenMiddleware(['admin', 'premium']),
    limiterMiddleware,
    missionMiddleware.validateMissionData,
    missionController.createMission
)

/**
 * @swagger
 * /api/missions:
 *   get:
 *     tags:
 *       - Missions
 *     summary: "Listar misiones de usuario"
 *     description: "Obtiene la lista de todas las misiones que pertenecen al usuario autenticado. Sujeto a un Rate Limit (limitador de frecuencia)."
 *     responses:
 *       200:
 *         description: "Lista de misiones retornadas correctamente"
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "ok": true,
 *                 "status": 200,
 *                 "message": "Misiones obtenidas con éxito",
 *                 "data": [ { "id": "60a...", "title": "Misión 1" } ]
 *               }
 *       401:
 *         description: "No autorizado"
 *       429:
 *         description: "Demasiadas peticiones desde este usuario/IP"
 *       500:
 *         description: "Error interno del servidor"
 */
missionRouter.get(
    '/',
    verifyAuthTokenMiddleware(),
    limiterMiddleware,
    missionController.getMissionsByUserId
)

/**
 * @swagger
 * /api/missions/{mission_id}:
 *   delete:
 *     tags:
 *       - Missions
 *     summary: "Eliminación de una misión"
 *     description: "Borra una misión específica de la base de datos basándose en su ID. Requiere rol 'admin' o 'premium'."
 *     parameters:
 *       - in: path
 *         name: mission_id
 *         schema:
 *           type: string
 *         required: true
 *         description: "Identificador único de la misión (MongoDB ObjectId)"
 *     responses:
 *       200:
 *         description: "Misión eliminada correctamente"
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 "ok": true,
 *                 "status": 200,
 *                 "message": "Misión eliminada"
 *               }
 *       401:
 *         description: "No autorizado"
 *       403:
 *         description: "Rol insuficiente"
 *       404:
 *         description: "Misión no encontrada"
 *       500:
 *         description: "Error interno del servidor"
 */
missionRouter.delete(
    '/:mission_id',
    verifyAuthTokenMiddleware(['admin', 'premium']),
    limiterMiddleware,
    missionController.deleteMissionById
)

export default missionRouter;