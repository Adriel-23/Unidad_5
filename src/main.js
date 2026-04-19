import ENVIRONMENT from './config/environment.config.js';
import connectMongoDB from './config/mongoDB.config.js';
import express from 'express';
import missionRouter from './routes/mission.router.js';
import authRouter from './routes/auth.router.js';
import taskRouter from './routes/task.router.js';
import errorHandling from './middlewares/errorHandling.middleware.js';
import mailTransporter from './config/mail.config.js';
import statusRouter from './routes/status.router.js';


connectMongoDB()

const app = express();
/* 
    Este es un middleware global que se encarga de revisar si el heaader de la petición es de tipo JSON.
*/
app.use(express.json({limit: '5gb'}));

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

