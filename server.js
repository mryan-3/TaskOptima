const express = require('express')
const app = express()
const taskRoutes = require('./routes/taskRoute')
app.use(express.json())
app.use('/', taskRoutes)

const port = 3000
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})