import userRepository from "../repositories/user.repository.js";

class Usercontroller {
    async registerUser(req, res){
        try{
            const {name, email, password} = req.body
            if(!name || !email || !password){
                return res.status(400).json({error: 'Faltan campos obligatorios'})
            }
            
            const newUserData = {
                name,
                email, 
                password
            }
            const existingUser = await userRepository.findUserByEmail(email)
            if(existingUser){
                return res.status(400).json({error: 'El email ya está registrado'})
            }

            const newUser = await userRepository.registerUser(newUserData)
            res.status(201).json(newUser)
        }
        catch(error){
            res.status(500).json({error: 'Error al registrar el usuario. ' + error.message})
        }
    }
    async loginUser(req, res){
        const { email, password } = req.body
        try{
            const foundUser = await userRepository.findUserByEmail(email)
            if(!foundUser || foundUser.password !== password){
                return res.status(401).json({error: 'Tu email o contraseña son incorrectos'})
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
            res.status(500).json({error: 'Error al iniciar sesión. ' + error.message})
        }
    }
}

export default new Usercontroller();