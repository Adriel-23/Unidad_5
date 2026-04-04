import mongoose from "mongoose";
import ENVIRONMENT from "./environment.config.js";
/* import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
 */
async function connectMongoDB (){
    try{
        await mongoose.connect(ENVIRONMENT.MONGO_DB_URI + '/' + ENVIRONMENT.MONGO_DB_NAME)
        console.log('Exito, MongoDB conectado')
    }
    catch(error){
        console.error('Hubo un error al conectarse con MongoDB', error)
    }
}


export default connectMongoDB
