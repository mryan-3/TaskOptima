const { openAIApi } = require('openai')
require("dotenv").config()

const openApiKey = process.env.OPENAI_KEY
const openai = new openAIApi(openApiKey)

module.exports= openai