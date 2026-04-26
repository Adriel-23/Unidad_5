import express from "express";
import ServerError from "../helpers/serverError.helper.js";

/* 
El controlador tiene la responsabilidad de manejar las consultas al servidor y emitir respuestas
*/
class StatusController {
    get(request, response, next) {
        try{
            response.status(200).send(
                {
                    ok: true,
                    message: "Api funcionando correctamente",
                    status: 200
                }
            )
        }
        catch(error){
            next(error);
        }
    }
}


const statusController = new StatusController()

export default statusController