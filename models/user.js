// import de la bibliotheque mongoose 
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

// Schema user utilise a la creation d'une session 
const userSchema = new mongoose.Schema ({
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true }
    });
    
userSchema.plugin(uniqueValidator)

const User = mongoose.model("user", userSchema)

module.exports = {User}