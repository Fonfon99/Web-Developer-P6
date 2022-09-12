// import du framework express
const express = require("express")
// import du middleware multer
const multer = require('../middleware/multer')
// import du middleware bodyparser
const bodyParser = require("body-parser")
const saucesRouter = express.Router()
const { getSauces, createSauce, getSauceById, deleteSauce, modifySauce, likeSauce} = require("../controllers/sauces")
const {authentification} = require("../middleware/auth")

// on utilise bodyparser pour pouvoir lire req.body
saucesRouter.use(bodyParser.json())
// Utilisation du middleware jwt sur toutes les routes
saucesRouter.use(authentification)

// Routes
saucesRouter.get("/", getSauces)
saucesRouter.post("/", multer, createSauce) 
saucesRouter.get("/:id", getSauceById)
saucesRouter.delete("/:id", deleteSauce)
saucesRouter.put("/:id", multer, modifySauce) 
saucesRouter.post("/:id/like", likeSauce) 


module.exports = {saucesRouter}