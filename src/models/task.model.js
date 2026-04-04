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
        default:'EASY'
    },
    estimated_time_minutes: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    finish_date: {
        type: Date,
    }
})

const Task = mongoose.model('Task', taskSchema)

export default Task;