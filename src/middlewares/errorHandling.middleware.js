import ServerError from "../helpers/serverError.helper.js";
import jwt from "jsonwebtoken";

function errorHandling(error, req, res, next){
    if(error instanceof jwt.JsonWebTokenError){
        return res.status(401).json({
            ok: false,
            status: 401,
            message: 'Token de autenticación inválido'
        })
    }
    if(error instanceof ServerError){
        res.status(error.statusCode).send({
            ok: false,
            status: error.statusCode,
            message: error.message
        })
    } else {
        console.error('Error no manejado:', error);
        res.status(500).send({
            ok: false,
            status: 500,
            message: 'Error interno del servidor: ' + error.message
        })
    }
    
}
export default errorHandling;