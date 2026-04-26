import express from 'express';
import taskController from '../controllers/task.controller.js';
import taskMiddleware from '../middlewares/task.middleware.js';
import authMiddleware, { verifyAuthTokenMiddleware } from '../middlewares/auth.middleware.js';
import limiterMiddleware from '../middlewares/limiter.middleware.js';

const taskRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: "Administración, asignación y seguimiento de Tareas asoacidas a una Misión"
 */

/**
 * @swagger
 * /api/tasks/{mission_id}:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: "Crear una nueva tarea"
 *     description: "Crea una tarea dependiente de una misión de un usuario en particular. Requiere rol 'admin'."
 *     parameters:
 *       - in: path
 *         name: mission_id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID de la misión a enlázar la tarea"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Comprar pan"
 *               status:
 *                 type: string
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: "Tarea creada con éxito"
 *       400:
 *         description: "Error de validación o formato inválido"
 *       401:
 *         description: "No autorizado"
 *       403:
 *         description: "El usuario no tiene el rol necesario"
 *       500:
 *         description: "Error interno del servidor"
 */
taskRouter.post(
    '/:mission_id',
    verifyAuthTokenMiddleware(['admin', 'premium']),
    limiterMiddleware,
    taskMiddleware.validateStatusFormat,
    taskController.createTask
)

/**
 * @swagger
 * /api/tasks/{mission_id}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: "Listar todas las tareas de una misión"
 *     description: "Obtiene todas las tareas atadas a en un mission_id para un user_id específico. Se admite cualquier rol."
 *     parameters:
 *       - in: path
 *         name: mission_id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID de la misión"
 *     responses:
 *       200:
 *         description: "Obtiene un array con las tareas pertenecientes"
 *       401:
 *         description: "No autorizado"
 *       404:
 *         description: "Usuario o Misión no encontrados"
 *       500:
 *         description: "Error interno del servidor"
 */
taskRouter.get(
    '/:mission_id',
    verifyAuthTokenMiddleware(['admin', 'free', 'premium']),
    limiterMiddleware,
    taskMiddleware.validateTaskInMission,
    taskController.getTasksByMissionId
    
)

/**
 * @swagger
 * /api/tasks/{task_id}/detail:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: "Obtener detalle completo de una tarea"
 *     description: "Busca un task_id por su ID para leer sus detalles aislados. Se admite cualquier rol."
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID individual de la tarea"
 *     responses:
 *       200:
 *         description: "Retorna el objeto tarea con su detalle"
 *       401:
 *         description: "No autorizado"
 *       404:
 *         description: "No se encuentra la tarea en la base de datos"
 *       500:
 *         description: "Error interno del servidor"
 */
taskRouter.get(
    '/:task_id/detail',
    verifyAuthTokenMiddleware(['admin', 'free', 'premium']),
    limiterMiddleware,
    taskMiddleware.validateTaskExistence,
    taskController.getDetailTaskById
)

/**
 * @swagger
 * /api/tasks/{task_id}:
 *   put:
 *     tags:
 *       - Tasks
 *     summary: "Edición completa de tarea"
 *     description: "Actualiza por completo la información de una tarea requerida. Requiere rol 'admin' o 'premium'."
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID de tarea"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Actualizar pan por medialunas"
 *               description:
 *                 type: string
 *                 example: "Ir a la panadería central"
 *     responses:
 *       200:
 *         description: "Actualización realizada con éxito"
 *       400:
 *         description: "Mala petición, falta información"
 *       401:
 *         description: "No autorizado"
 *       403:
 *         description: "Rol insuficiente"
 *       500:
 *         description: "Error interno del servidor"
 */
taskRouter.put(
    '/:task_id',
    verifyAuthTokenMiddleware(['admin', 'premium']),
    limiterMiddleware,
    taskMiddleware.validateTaskExistence,
    taskController.updateTask
)

/**
 * @swagger
 * /api/tasks/{task_id}/status:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: "Actualizar estado de avance"
 *     description: "Modifica localmente sólo el status de una tarea (ej: pending -> in-progress -> completed) y asigna su fecha de finalización. Todos los roles permitidos."
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: "Estado actualizado satisfactoriamente"
 *       400:
 *         description: "Estado inválido arrojado por el middleware"
 *       401:
 *         description: "No autorizado"
 *       404:
 *         description: "Tarea inexistente"
 *       500:
 *         description: "Error interno de servidor"
 */
taskRouter.patch(
    '/:task_id/status',
    verifyAuthTokenMiddleware(['admin', 'free', 'premium']),
    limiterMiddleware,
    taskMiddleware.validateStatusFormat,
    taskMiddleware.validateTaskExistence,
    taskController.updateStatusAndFinishDate
)

/**
 * @swagger
 * /api/tasks/{task_id}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: "Eliminación de una tarea"
 *     description: "Borra para siempre de la base de datos la información referente a esta tarea. Requiere rol 'admin'."
 *     parameters:
 *       - in: path
 *         name: task_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "La tarea ha desaparecido exitosamente"
 *       401:
 *         description: "No autorizado"
 *       403:
 *         description: "Rol insuficiente, esta acción solo la realiza un Admin"
 *       404:
 *         description: "Tarea o usuario no hallados en el middleware"
 *       500:
 *         description: "Error de servidor general"
 */
taskRouter.delete(
    '/:task_id',
    verifyAuthTokenMiddleware(['admin', 'premium']),
    limiterMiddleware,
    taskMiddleware.validateTaskExistence,
    taskController.deleteTask
)

export default taskRouter;