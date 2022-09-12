// import du schema user
const { User } = require("../models/user");
// import du package bcrypt pour hasher les mdp
const bcrypt = require("bcrypt");
// import du package jsonwebtoken (authorisation d'authentification)
const jwt = require("jsonwebtoken");

// Inscription d'un utilisateur
async function signUser(req, res) {
  const { email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = new User({ email, password: hashedPassword });

  user
    .save()
    .then(() => res.send({ message: "utilisateur enregistre" }))
    .catch((err) =>
      res.status(409).send({ message: "utilisateur pas enregistre " + err })
    );
}

// Hashage du mdp
function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Connection d'un utilisateur deja existant
async function logUser(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    const isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) {
      res.status(403).send({ message: "mot de passe incorrect" });
    }
    const token = createToken(email);
    res.status(200).json({ userId: user?._id, token: token });
  } catch (err) {
    res.status(500).send({ message: "Erreur interne" });
  }
}

// Creation du token unique grace a jwt
function createToken(email) {
  const jwtPassword = process.env.JWT_PASSWORD;
  return jwt.sign({ email: email }, jwtPassword, { expiresIn: "24h" });
}

module.exports = { signUser, logUser };
