const multer = require("multer")

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

function makeFilename(req, file, cb){
    const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension);
}

const storage = multer.diskStorage({destination: "images/", filename: makeFilename})


module.exports = multer({storage}).single('image')