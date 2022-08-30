
const express = require("express")
const bodyParser = require("body-parser")
const saucesRouter = express.Router()
const { getSauces, createSauce, getSauceById, deleteSauce, modifySauce } = require("../controllers/sauces")
const {authentification} = require("../middleware/auth")
const multer = require('../middleware/multer')

saucesRouter.get("/", authentification, getSauces)
saucesRouter.post("/", authentification, multer, createSauce) 
saucesRouter.get("/:id", authentification, getSauceById)
saucesRouter.delete("/:id", authentification, deleteSauce)
saucesRouter.put("/:id", authentification, multer, modifySauce) 

module.exports = {saucesRouter}