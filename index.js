require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const port = 3000

// connection
require("./mongo")

// controllers
const {signUser, logUser} = require("./controllers/users")
const { getSauces, createSauce } = require("./controllers/sauces")

// middleware
app.use(cors())
app.use(express.json())
const {authentification} = require("./middleware/auth")

// routes
app.post("/api/auth/signup", signUser) 
app.post("/api/auth/login", logUser)
app.get("/api/sauces", authentification, getSauces)
app.post("/api/sauces", authentification, createSauce) 
app.get("/", (req , res) => res.send("Hello world"))

// listen
app.listen(port, () => console.log("listening on port " + port))

