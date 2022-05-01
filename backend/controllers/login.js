const bcrypt = require("bcrypt");
const Users = require("../model/Users");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email }).then((account) => {
    if (!account) {
      return res.json({ message: "User not found" });
    }

    bcrypt.compare(password, account.password).then((CorrectUser) => {
      if (CorrectUser) {
        const { id, nombre } = account;

        const data = {
          id,
          nombre,
        };

        const token = jwt.sign(data, "secret", {
          expiresIn: 86400 /* 24hs */,
        });

        res.json({
          message: "User logged in successfully",
          account: {
            id,
            nombre,
            token,
          },
        });
      } else {
        return res.json({ message: "Incorrect password" });
      }
    });
  });
};

module.exports = login;
