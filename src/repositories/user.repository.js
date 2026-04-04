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
}

export default new UserRepository();