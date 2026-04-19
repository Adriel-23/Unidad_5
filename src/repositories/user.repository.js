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
    async findUserById(user_id){
        try{
            const foundUser = await User.findById(user_id)
            return foundUser
        }
        catch(error){
            throw new Error('Error al buscar el usuario por ID: ' + error.message)
        }
    }
<<<<<<< HEAD

    async updateById(user_id, updateData){
        try{
            const updatedUser = await User.findByIdAndUpdate(user_id, updateData, { new: true })
            return updatedUser
        }
        catch(error){
            throw new Error('Error al actualizar el usuario: ' + error.message)
        }
    }

=======
>>>>>>> c156026d6a506c86f0421a7c0ce85d230a59b69f
}

export default new UserRepository();