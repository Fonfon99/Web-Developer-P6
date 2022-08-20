const { Sauce } = require("../mongo");



function getSauces(req, res) {
  Sauce.find().then((sauces) => res.send(sauces));
}

function createSauce(req, res) {
  const sauce = new Sauce();
  sauce
    .save()
    .then((res) => console.log("produit enregistre", res))
    .catch(console.error);
}

module.exports = { getSauces, createSauce };
