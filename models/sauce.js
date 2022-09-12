// import de la bibliotheque mongoose 
const mongoose = require("mongoose");

// Schema des donnees d'une sauce 
const sauceSchema = new mongoose.Schema({
    userId: String, 
    name: String, 
    manufacturer: String, 
    description: String, 
    mainPepper: String, 
    imageUrl: String, 
    heat: Number,
    likes: Number, 
    dislikes: Number, 
    usersLiked: [ String ],
    usersDisliked : [ String ]
  })
  
  const Sauce = mongoose.model("sauce", sauceSchema)

  module.exports = {Sauce}