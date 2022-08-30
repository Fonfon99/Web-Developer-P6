const { Sauce } = require("../mongo");
const fs  = require('fs');

function getSauces(req, res) {
  Sauce.find()
    .then((sauces) => res.json(sauces))
    .catch((error) => res.status(500).send(error));
}

function deleteSauce(req, res) {
  const { id } = req.params;
  console.log(id)

  Sauce.findByIdAndDelete(id)
    .then(deleteImage)
    .then((sauce) => res.send({message: "objet supprime", sauce}))
    .catch((err) => res.status(500).send({ message: err }));
}

function deleteImage(sauce) {
  
  const filename = sauce.imageUrl.split("/images/")[1];
  fs.unlink(`images/${filename}`, (err) => {
    if (err) console.log("probleme a la suppression de l'image", err);
    else {
      console.log("suppression de l'image effectue ");
      return sauce 
    }
  });
}

function modifySauce(req, res) {
  const sauceObject = req.file ?
    // Si il existe déjà une image
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }; 
    // Si il n'existe pas d'image
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .then(() => deleteImage())
      .catch(error => res.status(400).json({ error }));
}

function createSauce(req, res) {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });

  sauce
    .save()
    .then(() => res.status(201).send({ message: "objet enregistre" }))
    .catch(console.error);
}

function getSauceById(req, res) {
  const { id } = req.params;
  Sauce.findById(id)
    .then((sauce) => res.send(sauce))
    .catch((error) => res.send(error));
}

module.exports = { getSauces, createSauce, getSauceById, deleteSauce, modifySauce};
