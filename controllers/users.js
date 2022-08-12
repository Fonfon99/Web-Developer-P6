const { User } = require("../mongo");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  const { email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = new User({ email, password: hashedPassword });

  user
    .save()
    .then(() => res.send({ message: "utilisateur enregistre" }))
    .catch((err) => res.status(409).send({message: "utilisateur pas enregistre " + err }));
}

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function logUser(req, res) {
  const email = req.body.email
  const password = req.body.password   
  const user = await User.findOne({email: email})
  const isPasswordOk = await bcrypt.compare(password, user.password)
  if(!isPasswordOk){
    res.status(403).send({message: "mot de passe incorrect"})
  }
  res.status(200).send({message: "connexion reussi"})
  
  console.log('user:', user)
  console.log('isPasswordOk:', isPasswordOk)
}


module.exports = { createUser, logUser };
