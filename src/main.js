import ENVIRONMENT from './config/environment.config.js';
import connectMongoDB from './config/mongoDB.config.js';
import express from 'express';
import missionRouter from './routes/mission.router.js';
import authRouter from './routes/auth.router.js';
import taskRouter from './routes/task.router.js';
import errorHandling from './middlewares/errorHandling.middleware.js';
import mailTransporter from './config/mail.config.js';
import statusRouter from './routes/status.router.js';
import cors from 'cors';
import ServerError from './helpers/serverError.helper.js';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config.js';
import auditContextMiddleware from './middlewares/auditContext.middleware.js';

connectMongoDB()

const app = express();

//Si entramos a la ruta /docs, se servirá la documentación de swagger
app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
)


const blockedOrigins = [
    'https://google.com',
    'http://google.com',
    'https://facebook.com',
    'http://facebook.com',
]// http y https porque no sabemos desde donde se va a hacer la solicitud, para prevenir un salto en la blacklist. 
const allowedOrigins = [
    'http://127.0.0.1:5500',
]
app.use(
    cors({
        origin: (origin, callback) => {
            if(blockedOrigins.includes(origin)){
                
                callback(new ServerError('Tu origen está bloqueado', 403))
            }
            else if(!origin && ENVIRONMENT.MODE == 'dev'){
                
                callback(null, true)
            }
            else if(!allowedOrigins.includes(origin)){
                callback(new ServerError('No tienes acceso a esta página', 403))
            }
            else{
                
                callback(null, true)
            }
        }
    })
);


/* 
    Este es un middleware global que se encarga de revisar si el heaader de la petición es de tipo JSON.
*/
app.use(express.json({limit: '5gb'}));

app.use(auditContextMiddleware)

app.use('/api/status', statusRouter);
app.use('/api/missions', missionRouter);
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter)


app.use(errorHandling);


app.listen(ENVIRONMENT.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${ENVIRONMENT.PORT}`)
})


/* mailTransporter.sendMail(
    {
        subject: 'Correo de prueba',
        to: 'cursofullstackweb734@gmail.com',
        from: ENVIRONMENT.MAIL_USERNAME,
        html: `
                <h1>Hola, este es un correo de prueba desde node.js</h1>
            ` 
    }
) */

