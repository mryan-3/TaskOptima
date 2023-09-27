const  supabase  = require('../supabaseConfig.js')

class Task {
    constructor(id, title, description, dueDate, priority) {
        this.id = id;
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }

    static async create(){
        //Insert a new task into the tasks table
        try{
            const { data, error } = await supabase
                .from('tasks')
                .insert([
                    {
                        title: this.title,
                        description: this.description,
                        dueDate: this.dueDate,
                        priority: this.priority,
                    }
                ])
                .single()
            if (error) {
                throw new Error("failed to create a new task")
            }
            return data
        } catch(error) {
            throw new Error("Failed to create task")
        }
    }
    //Update tasks
    static async update() {
        try{
            const { data, error } = await supabase
                .from('tasks')
                .update(
                    {
                        title: this.title,
                        description: this.description,
                        dueDate: this.dueDate,
                        priority: this.priority,
                    }
                )
                .eq("id", this.id)
                .single()
            if(error) {
                throw new Error("Failed to update task")
            }
            return data
        } catch(error){
            throw new Error("Failed to update task")
        }
    }

    static async delete() {
        try{
            
            const { data, error } = await supabase
                .from('tasks')
                .delete()
                .eq("id", this.id)
                .single()
            if (error) {
                throw new Error("Failed to delete task")
            }
        } catch(error) {
            throw new Error("Failed to delete task")
        }
    }

    static async getAllTasks() {
        try{
            const { data, error } = await supabase
                .from('tasks')
                .select("*")
            if (error) {
                throw new Error("Failed to delete task")
            }
            return data
        } catch(error){
            throw new Error("Failed to delete task")
        }
    }

    static async getById(id){
        try{
            const { data, error } = await supabase
                .from("tasks")
                .select()
                .eq("id", id)
                .single()
            if (error){
                throw new Error(error.message)
            }
            if (data){
                return new Task(data)
            }
            return null
        } catch(error){
            throw new Error("Failed to get task")
        }
    }
}

module.exports = Task