const express = require('express')
const Task = require('../models/TaskModel')
const router = express.Router()
router.use(express.json())

//CREATE
router.post('/tasks', async(req, res) => {
    try{
        const task = await Task.create
        res.json(task)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})

// READ
router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.getAllTasks()
        res.json(tasks)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})

router.get('/tasks/:id', async(req, res) => {
    try{
        const task = await Task.getById(req.params.id)
        if (task){
            res.json(task)
        } else{
            res.status(404).json({ error: "Task not found"})
        }
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})

//UPDATE
router.put('/tasks/:id', async (req, res) => {
    try{
        const task = await Task.update(req.params.id, req.body)
        if (task) {
            res.json(task)
        }else{
            res.status(404).json({ error: "Task not found"})
        }
    } catch(eror){
        res.status(500).json({ error: error.message})
    }
})

//DELETE
router.delete('/tasks/:id', async(req, res) => {
    try{
        const task = await Task.delete(req.params.id)
        res.status(204)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})

module.exports =router