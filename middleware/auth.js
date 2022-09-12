// import du package jsonwebtoken (authorisation d'authentification)
const jwt = require("jsonwebtoken");

// Verification du token
function authentification(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (token == null) return res.status(403).send({ message: "Invalid" });
  jwt.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
    if (err) return res.status(403).send({ message: "Token invalid" + err });
    next();
  });
}

module.exports = { authentification };
