import mongoose from "mongoose";
import ENVIRONMENT from "./environment.config.js";
<<<<<<< HEAD

=======
/* import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
 */
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
async function connectMongoDB (){
    try{
        await mongoose.connect(ENVIRONMENT.MONGO_DB_URI + '/' + ENVIRONMENT.MONGO_DB_NAME)
        console.log('Exito, MongoDB conectado')
    }
    catch(error){
        console.error('Hubo un error al conectarse con MongoDB', error)
    }
}


<<<<<<< HEAD
export default connectMongoDB
=======
export default connectMongoDB
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
