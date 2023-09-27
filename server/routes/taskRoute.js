const express = require('express')
const router = express.Router()
router.use(express.json())
const supabase = require('../supabaseConfig')
const e = require('express')

//Create
router.post("/tasks", async(req, res) => {
    try{
        const { title, description, dueDate, priority} = req.body
        const{ data: task, error } = await supabase
            .from("tas")
            .insert([{title, description , dueDate, priority}])
            .single()
        if (error) throw error
        res.status(201).json(task)
    }catch(error){
        res.status(500).json({ error: error.message})
    }
})
// Read
router.get("/tasks", async(req, res) => {
    try{
        const { data: tasks, error } = await supabase
            .from('tas')
            .select('*')
        if (error) throw error
        res.json(tasks)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})

router.get("/tasks/:id", async(req, res) => {
    try{
        const id = req.params.id
        const { data: task, error} = await supabase
            .from("tas")
            .select('*')
            .eq("id", id)
            .single()
        if (error) throw error
        res.json(task)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})

// router.get("/tasks/search", async(req, res) => {
//     const query = req.query.q
//     try{
//         const { data: task, error} = await supabase
//             .from('tas')
//             .select('*')
//             .ilike('title', `%${query}%`)
//             .or(`description.ilike.%${query}%`)
//         if (error) throw error
//         res.json(task)
//     } catch(error){
//         res.status(500).json({ error: error.message})
//     }
// })

router.get('/tasks/priority/:priority', async(req, res) => {
    try{
        const priority = req.params.priority
        const { data: tasks, error } = await supabase
            .from('tas')
            .select('*')
            .eq('priority', priority)
        if (error) throw error
        res.json(tasks)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})
//Update
router.put("/tasks/:id", async(req, res) => {
    try{
        const id = req.params.id
        const { title, description, dueDate, priority} = req.body
        const {data: task, error} = await supabase
            .from("tas")
            .update({title, description, dueDate, priority})
            .eq("id", id)
            .single()

        if (error) throw error
        res.json(task)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
}) 
//Mark a task as completed
router.put("/tasks/:id/complete", async(req, res) => {
    try{
        const id = req.params.id
        const { data: task, error } = await supabase
            .from("tas") 
            .update({completed: true})
            .eq("id", id)
            .single()
        if (error) throw error
        res.json(task)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})

// Delete
router.delete("/tasks/:id", async(req, res) => {
    try{
        const id = req.params.id
        const { data: task, error } = await supabase
            .from("tas")
            .delete()
            .eq('id', id)
            .single()
        if (error) throw error
        res.json(task)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})

router.delete('/tasks/delete', async(req, res) => {
    try{
        const taskIds = req.body.taskIds
        const { data: deletedTasks, error} = await supabase
            .from('tas')
            .delete()
            .in('id', taskIds)
        if (error) throw error
        res.json(deletedTasks)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})
//try it put
// {
//     "taskIds": ["id1", "id2", "id3"]
//   }


module.exports=router