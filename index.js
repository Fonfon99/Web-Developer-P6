const express = require("express")
const app = express()
const cors = require("cors")
const port = 3000

const mongoose = require("mongoose");
const password = "2421f1bc78"
const uri =
  `mongodb+srv://louis:${password}@cluster0.4iyu8.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.error("Error connecting to mongo: ", err));


//middleware
app.use(cors())
app.use(express.json())

//routes
app.post("/api/auth/signup", (req, res) => {
    console.log("signup request:", req.body)
    res.send({message:"Hello"})
})
app.get("/", (req , res) => res.send("Hello world"))
app.listen(port, () => console.log("listening on port " + port))