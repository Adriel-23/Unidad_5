import ENVIRONMENT from './config/environment.config.js';
import connectMongoDB from './config/mongoDB.config.js';
import express from 'express';
import missionRouter from './routes/mission.router.js';
import authRouter from './routes/auth.router.js';
import taskRouter from './routes/task.router.js';
import errorHandling from './middlewares/errorHandling.middleware.js';
<<<<<<< HEAD
import mailTransporter from './config/mail.config.js';
=======
>>>>>>> c156026d6a506c86f0421a7c0ce85d230a59b69f


connectMongoDB()

const app = express();

app.use(express.json({limit: '5gb'}));

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

