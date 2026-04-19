import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    email: { 
        type: String, required: true, unique: true 
    },
    password: { 
        type: String, required: true 
    },
    email_verified: {
            default: false,
            required:true,
            type: Boolean
        },
    role: {
        type: String,
        enum: ['free','premium', 'admin'],
        default: 'free'
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User;