import mongoose from "mongoose";

const missionSchema = new mongoose.Schema({
    fk_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String, 
        required: true
    },
    description: {
        type: String,
    } 
},{
    timestamps: true
}
)

const Mission = mongoose.model('Mission', missionSchema)

export default Mission;