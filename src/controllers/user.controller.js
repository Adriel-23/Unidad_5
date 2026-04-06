import userRepository from "../repositories/user.repository.js";
<<<<<<< HEAD
=======
import ServerError from "../helpers/serverError.helper.js";
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f

class Usercontroller {
    async registerUser(req, res){
        try{
            const {name, email, password} = req.body
            if(!name || !email || !password){
<<<<<<< HEAD
                return res.status(400).json({error: 'Faltan campos obligatorios'})
=======
                throw new ServerError('Todos los campos son obligatorios', 400)
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
            }
            
            const newUserData = {
                name,
                email, 
                password
            }
            const existingUser = await userRepository.findUserByEmail(email)
            if(existingUser){
<<<<<<< HEAD
                return res.status(400).json({error: 'El email ya está registrado'})
=======
                throw new ServerError('El email ya está registrado', 400)
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
            }

            const newUser = await userRepository.registerUser(newUserData)
            res.status(201).json(newUser)
        }
        catch(error){
<<<<<<< HEAD
            res.status(500).json({error: 'Error al registrar el usuario. ' + error.message})
=======
            if(error instanceof ServerError){
                res.status(error.statusCode).send({
                    ok: false,
                    status: error.statusCode,
                    message: error.message
                })
            } else {
                res.status(500).send({
                    ok: false,
                    status: 500,
                    message: 'Error al registrar el usuario: ' + error.message
                })
            }
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
        }
    }
    async loginUser(req, res){
        const { email, password } = req.body
        try{
            const foundUser = await userRepository.findUserByEmail(email)
            if(!foundUser || foundUser.password !== password){
<<<<<<< HEAD
                return res.status(401).json({error: 'Tu email o contraseña son incorrectos'})
            }
            res.status(200).json({message: 'Inicio de sesión exitoso', user: foundUser._id})
        }
        catch(error){
            res.status(500).json({error: 'Error al iniciar sesión. ' + error.message})
=======
                throw new ServerError('Tu email o contraseña son incorrectos', 401)
            }
            res.status(200).send({
                ok: true,
                status: 200,
                message: 'Inicio de sesión exitoso',
                user: {
                    id: foundUser._id,
                    name: foundUser.name,
                    email: foundUser.email,
                    created_at: foundUser.createdAt
                }
            })
        }
        catch(error){
            if(error instanceof ServerError){
                res.status(error.statusCode).send({
                    ok: false,
                    status: error.statusCode,
                    message: error.message
                })
            } else {
                res.status(500).send({
                    ok: false,
                    status: 500,
                    message: 'Error al iniciar sesión: ' + error.message
                })
            }
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
        }
    }
}

export default new Usercontroller();