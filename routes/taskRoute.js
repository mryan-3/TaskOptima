const express = require('express')
const Task = require('../models/TaskModel')
const { openAIApi } = require('openai')
const router = express.Router()
router.use(express.json())
const openai = new openAIApi('')

// Function to analyze task urgency with OpenAI
async function analyzeTaskUrgency(taskDescription) {
    const prompt = `Task Description: ${taskDescription}\nUrgency level:`;
  
    const options = {
      prompt,
      max_tokens: 1,
      temperature: 0.3,
      n: 1
    };
  
    const { choices } = await openai.complete(options);
  
    const urgencyLevel = choices[0].text.trim();
  
    return urgencyLevel;
}

// Function to automate a task
async function automateTask(taskTitle, taskDescription){
    const prompt = `I want you to do the following task: ${taskTitle}.The following is the task description: ${taskDescription}`
    const options = {
        prompt,
        max_tokens: 100,
        temperature: 0.5,
        n:1
    }
    const { choices } = await openai.complete(options)
    const taskSolution = choices[0].text.trim()

    return taskSolution
}

router.get('/tasks/prioritize', async(req, res) => {
    try{
        const tasks = await Task.getAllTasks()

        //analyze urgency
        for (const task of tasks){
            task.urgency = await analyzeTaskUrgency(task.description)
        }
        tasks.sort((a, b) => a.urgency - b.urgency)
        res.json(tasks)
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})

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

// ROute to automate based on id
router.get('/automate-task/:id', async(req, res) => {
    try{
        const taskId = req.params.id
        const task = await Task.getById(taskId)

        if (task) {
            const { title, description } = task
            const taskSolution = await automateTask(title, description)
            res.json({ taskSolution })
        } else{
            res.status(404).json({ error: "Task not found"})
        }
    } catch(error){
        res.status(500).json({ error: error.message})
    }
})


module.exports =router