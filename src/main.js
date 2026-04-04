import ENVIRONMENT from './config/environment.config.js';
import connectMongoDB from './config/mongoDB.config.js';
import express from 'express';
import missionRouter from './routes/mission.router.js';
import authRouter from './routes/auth.router.js';
import taskRouter from './routes/task.router.js';


connectMongoDB()

const app = express();

app.use(express.json({limit: '5gb'}));

app.use('/api/missions', missionRouter);
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter)


app.listen(ENVIRONMENT.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${ENVIRONMENT.PORT}`)
})


