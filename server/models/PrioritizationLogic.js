const { openAIApi } = require('openai')
require("dotenv").config()

const openApiKey = process.env.OPENAI_KEY
const openai = new openAIApi(openApiKey)

async function analyzeTaskUrgency(taskDescription){
    const prompt = `Task Description: ${taskDescription} \nUrgency level:`
    const options ={
        prompt, 
        max_tokens: 1,
        temperature: 0.3,
        n: 1
    }
    // Generate the completion
    const { choices } = await openai.complete(options)
    const urgencyLevel = choices[0].text.trim()
    return urgencyLevel
}

async function prioritizeTasks(tasks){
    for (const task of tasks) {
        task.urgency = await analyzeTaskUrgency(task.description)

        tasks.sort((a, b) => a.urgency - b.urgency)
        return tasks
    }
}