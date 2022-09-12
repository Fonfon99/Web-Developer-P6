// Import du package Multer (gestion d'images)
const multer = require("multer")

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

// Creation du nom du fichier (unique)
function makeFilename(req, file, cb){
    const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension);
}

// On definit le dossier de stockage d'images
const storage = multer.diskStorage({destination: "images/", filename: makeFilename})


module.exports = multer({storage}).single('image')