const { Sauce } = require("../models/sauce");
const { unlink } = require("fs/promises");

// Recuperation de toutes les sauces presentent sur l'API
function getSauces(req, res) {
  Sauce.find()
    .then((sauces) => res.json(sauces))
    .catch((error) => res.status(500).send(error));
}

// Recuperation d'une sauce unique par l'id
function getSauceById(req, res) {
  const { id } = req.params;
  Sauce.findById(id)
    .then((sauce) => res.send(sauce))
    .catch((error) => res.send(error));
}

// Suppression d'une sauce (id) de l'API
function deleteSauce(req, res) {
  const { id } = req.params;

  console.log(id);

  Sauce.findByIdAndDelete(id)
    .then((product) => testResponse(product, res))
    .then((product) =>
      unlink("images/" + product.imageUrl.split("/images/")[1])
    )
    .then((res) => console.log({ message: "File deleted", res }))
    .catch((err) => console.error("problem deleting", err));
}

// Suppression de l'image de la base de donnees
function deleteImage(product, req) {
  console.log(req.file);
  if (req.file == undefined) return;
  console.log("DELETE IMAGE", product);
  const filename = product.imageUrl.split("/images/")[1];
  return unlink("images/" + filename);
}

// Modification d'une sauce (id)
function modifySauce(req, res) {
  const {
    params: { id },
  } = req;

  // On definit les champs modifie par l'utilisateur (texte / image)
  const hasNewImage = req.file != null;
  const payload = makePayload(hasNewImage, req);

  Sauce.findByIdAndUpdate(id, payload)
    .then((response) => testResponse(response, res))
    .then((product) => deleteImage(product, req))
    .then((res) => console.log("File updated", res))
    .catch((err) => console.error("problem updating", err));
}

// On renvoi les donnees modifiees
function makePayload(hasNewImage, req) {
  console.log("hasNewImage:", hasNewImage);
  // si l'image est inchange
  if (!hasNewImage) {
    console.log("req.body", req.body);
    // on renvoi la sauce
    return req.body;
  }
  // si l'image a ete modifie
  const payload = JSON.parse(req.body.sauce);
  payload.imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
  console.log("payload", payload);
  // on renvoi la sauce avec sa nouvelle image
  return payload;
}

// Verification dans la base de donnees
function testResponse(product, res) {
  if (product == null) {
    return res.status(404).send({ message: "object not found in database" });
  }
  console.log("OBJECT TO MODIFY:", product);
  return Promise.resolve(res.status(200).send(product)).then(() => product);
}

// Creation d'une nouvelle sauce
function createSauce(req, res) {
  const sauceObject = JSON.parse(req.body.sauce);
  sauceObject.likes = 0;
  sauceObject.dislikes = 0;
  // utilisation du schema mongoose (models/sauce.js)
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  sauce
    .save()
    .then(() => res.status(201).send({ message: "objet enregistre" }))
    .catch(console.error);
}

// like/dislike d'une sauce (id)
function likeSauce(req, res) {
  const { like, userId } = req.body;
  if (![1, -1, 0].includes(like))
    return res.status(403).send({ message: "invalid like value" });
  const { id } = req.params;
  Sauce.findById(id)
    .then((sauce) => updateVote(sauce, like, userId, res))
    .then((product) => product.save())
    .then(() => res.status(201).send({ message: "sauce like" }))
    .catch((err) => res.status(500).send(err));
}

// Choix de l'utilisateur d'ajouter ou de supprimer un vote
function updateVote(sauce, like, userId, res) {
  like = parseInt(like); // "1" => 1
  if (like == 1 || like == -1) {
    // ajout d'un vote
    return incrementVote(sauce, userId, like);
  } else {
    // suppression d'un vote
    return resetVote(sauce, userId, res);
  }
}

// Suppression d'un like/dislike
function resetVote(sauce, userId) {
  const { usersLiked, usersDisliked } = sauce;
  if (usersLiked.includes(userId)) {
    --sauce.likes;
    sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId);
  } else {
    --sauce.dislikes;
    sauce.usersDisliked = sauce.usersDisliked.filter((id) => id !== userId);
  }
  return sauce;
}

// ajout d'un like/dislike
function incrementVote(sauce, userId, like) {
  const { usersLiked, usersDisliked } = sauce;

  const votersId = like == 1 ? usersLiked : usersDisliked;

  // if (like == 1){
  //   sauce.likes++
  // }
  // else {
  //   sauce.dislikes++
  // }
  if (!votersId.includes(userId)) votersId.push(userId);
  like == 1 ? ++sauce.likes : ++sauce.dislikes;

  return sauce;
}

module.exports = {
  getSauces,
  createSauce,
  getSauceById,
  deleteSauce,
  modifySauce,
  likeSauce,
};
