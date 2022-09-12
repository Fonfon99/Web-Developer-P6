// import du package express
const express = require("express")
const app = express()
// import du package cors 
const cors = require("cors")

// middleware
app.use(cors())
app.use(express.json())

module.exports = {app, express}