import User from "../models/user.model.js";

class UserRepository {
    async registerUser(userData){
        try{
            const newUser = new User(userData)
            await newUser.save()
            return newUser
        }
        catch(error){
            throw new Error(`Error al registrar el usuario: ${error.message}`);
        }
    }
    async findUserByEmail(email){
        try{
            const foundUser = await User.findOne({email})
            return foundUser
        }
        catch(error){
            throw new Error('Error al buscar el usuario por email: ' + error.message)
        }
    }
<<<<<<< HEAD
=======
    async findUserById(user_id){
        try{
            const foundUser = await User.findById(user_id)
            return foundUser
        }
        catch(error){
            throw new Error('Error al buscar el usuario por ID: ' + error.message)
        }
    }
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
}

export default new UserRepository();