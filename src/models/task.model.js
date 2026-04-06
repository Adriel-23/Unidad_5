import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    fk_mission_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
        default: 'PENDING'
    },
    difficulty: {
        type: String,
        enum: ['EASY', 'MEDIUM', 'HARD'],
<<<<<<< HEAD
=======
        default:'EASY'
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
    },
    estimated_time_minutes: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
<<<<<<< HEAD
    finished_at: {
=======
    finish_date: {
>>>>>>> 396dcb3dd1135e683538e9518f8ee1deaf1e224f
        type: Date,
    }
})

const Task = mongoose.model('Task', taskSchema)

export default Task;