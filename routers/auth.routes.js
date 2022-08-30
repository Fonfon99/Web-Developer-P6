const express = require("express")
const authRouter = express.Router()
const {signUser, logUser} = require("../controllers/users")

authRouter.post("/signup", signUser) 
authRouter.post("/login", logUser)

module.exports = {authRouter}