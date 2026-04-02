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
}

export default new TaskRespository();