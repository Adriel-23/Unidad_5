import Task from "../models/task.model.js";

class TaskRespository {

    async createTask(taskData){
        try{
            const newTask = new Task(taskData)
            await newTask.save()
            return newTask
        }
        catch(error){
            throw new Error('Error al crear la tarea: ' + error.message)
        }
    }
    async getTasksByMissionId(missionId){
        try{
            const tasks = await Task.find({ fk_mission_id: missionId})
            return tasks
        }
        catch(error){
            throw new Error('Error al obtener las tareas: ' + error.message)
        }
    }
    async getDetailTaskById(taskId){
        try{
            const taskDetail = await Task.findById(taskId)
            return taskDetail
        }
        catch(error){
            throw new Error('Error al obtener el detalle de la tarea: ' + error.message)
        }
    }
    async updateTask(taskId, updateData){
        try{
            const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { returnDocument: 'after' })
            return updatedTask
        }
        catch(error){
            throw new Error('Error al actualizar la tarea: ' + error.message)
        }
    }
    async updateStatusAndFinishDate(taskId, statusData){
        try{
            const updatedStatusTask = await Task.findByIdAndUpdate(taskId, statusData, { returnDocument: 'after' })
            return updatedStatusTask
        }
        catch(error){
            throw new Error('Error al actualizar el estado y fecha de finalización de la tarea: ' + error.message)
        }
    }
    async deleteTask(taskId){
        try{
            const deletedTask = await Task.findByIdAndDelete(taskId)
            return deletedTask
        }
        catch(error){
            throw new Error ('Error al eliminar la tarea: ' + error.message)
        }
    }
}

export default new TaskRespository();