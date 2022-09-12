// import du package express
const {app, express} = require("./server")
// import du routeur sauce 
const {saucesRouter} = require("./routers/sauces.routes")
// import du routeur authentification
const {authRouter} = require("./routers/auth.routes")
// acces au chemin systeme de fichier 
const path = require('path')
// configuration du port 
const port = 3000
// import du package mongoose
const mongoose = require("mongoose")
// configuration des variables d'environnements
require("dotenv").config()
const password = process.env.DB_PASSWORD
const username = process.env.DB_USERNAME

// connection a la base de données
const uri =
  `mongodb+srv://${username}:${password}@cluster0.4iyu8.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.error("Error connecting to mongo: ", err));

// configuration du routeur pour les demandes sur /api/sauces
app.use("/api/sauces", saucesRouter)
// configuration du routeur pour les demandes sur /api/auth
app.use("/api/auth", authRouter)
// configuration du dossier ou envoyer les images grace a express
app.use('/images', express.static(path.join(__dirname, 'images')))

// listen
app.listen(port, () => console.log("listening on port " + port))

