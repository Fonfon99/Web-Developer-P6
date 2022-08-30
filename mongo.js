//Database
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")
const password = process.env.DB_PASSWORD
const username = process.env.DB_USERNAME
const uri =
  `mongodb+srv://${username}:${password}@cluster0.4iyu8.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.error("Error connecting to mongo: ", err));

const userSchema = new mongoose.Schema ({
  email: {type: String, required: true, unique: true},
  password: { type: String, required: true }
  });
  
userSchema.plugin(uniqueValidator)

const sauceSchema = new mongoose.Schema({
  userId: String, 
  name: String, 
  manufacturer: String, 
  description: String, 
  mainPepper: String, 
  imageUrl: String, 
  heat: Number,
  likes: {Number, default: 0},
  dislikes: {Number, default: 0} ,
  usersLiked: [ String ],
  usersDisliked : [ String ]
})

const Sauce = mongoose.model("sauce", sauceSchema)
const User = mongoose.model("user", userSchema)

module.exports = {mongoose, User, Sauce}