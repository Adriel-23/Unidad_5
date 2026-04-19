import { request } from "express";
import ServerError from "../helpers/serverError.helper.js";
import userRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/environment.config.js";


function authMiddleware (valid_roles = []){
    return async function validateUser(req, res, next){
        try{
            const user_id = req.params.user_id
            if(!user_id){
                throw new ServerError('No se ha proporcionado el ID de usuario', 400)
            }
            const userFound = await userRepository.findUserById(user_id)
            if(!userFound){
                throw new ServerError('Usuario no encontrado', 404)
            }
            if(valid_roles.length > 0 && !valid_roles.includes(userFound.role)){
                throw new ServerError('No tienes permisos para realizar esta acción', 403)
            }
            req.user = userFound
            next()
        }
        catch(error){
            next(error)
        }
    }
}

function verifyAuthTokenMiddleware(valid_roles = []){

    return async function(req, res, next){
        try{
            //request.headers Es el objesto que guarda la lista de headers de la petición
            //request.headers.authorization Es donde esperamos recibir el token de autenticación
            const authHeader = req.headers.authorization;
            if(!authHeader){
                throw new ServerError('Token de autenticación no proporcionado', 401)
            }
            const authToken = authHeader.split(' ')[1];
            if(!authToken){
                throw new ServerError('Token de autenticación no proporcionado', 401)
            }
            //Verificacion de token
            const user = jwt.verify(authToken, ENVIRONMENT.JWT_SECRET_KEY)
            
            if(valid_roles.length > 0 && !valid_roles.includes(user.role)){
                throw new ServerError('No tienes permisos para realizar esta acción', 403)
            }
            //Guardar la sesion del usuario en la request
            req.user = user
            next()
        }
        catch(error){
            next(error)
        }
    } 
}

/* 
Auth middleware de token VERSION SIMPLIFICADA (SIN ROLES)
function verifyAuthTokenMiddleware(req, res, next){
    try{
        //request.headers Es el objesto que guarda la lista de headers de la petición
        //request.headers.authorization Es donde esperamos recibir el token de autenticación
        const authHeader = req.headers.authorization;
        if(!authHeader){
            throw new ServerError('Token de autenticación no proporcionado', 401)
        }
        const authToken = authHeader.split(' ')[1];
        if(!authToken){
            throw new ServerError('Token de autenticación no proporcionado', 401)
        }
        //Verificacion de token
        const user = jwt.verify(authToken, ENVIRONMENT.JWT_SECRET_KEY)
        console.log('Usuario autenticado:', user)
        //Guardar la sesion del usuario en la request
        req.user = user
        next()
    }
    catch(error){
        next(error)
    }
} */




export { authMiddleware, verifyAuthTokenMiddleware };
export default authMiddleware;