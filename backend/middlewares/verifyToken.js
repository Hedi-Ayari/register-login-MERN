const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["token"];

  if (token) {
    jwt.verify(token, "secret", (error, data) => {
      if (error) return res.status(400).json({ message: "invalide token" });
      else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "You must send a token" });
  }
};

module.exports = verifyToken;
