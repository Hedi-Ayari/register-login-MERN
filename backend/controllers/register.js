const bcrypt = require("bcrypt");
const Users = require("../model/Users");

const register = async (req, res) => {
  const { Name, email, password } = req.body;

  Users.findOne({ email }).then((username) => {
    if (username) {
      return res.json({ message: "email mawjouda" });
    } else if (!Name || !email || !password) {
       
       res.json({ message: Name + ' ' + email + ' ' + password  });
    } else {
      bcrypt.hash(password, 10, (error, HashedPsw) => {
        if (error) res.json({ error });
        else {
          const NewUser = new Users({
            Name,
            email,
            password: HashedPsw,
          });

          NewUser
            .save()
            .then((email) => {
              res.json({ message: "User created successfully", email });
            })
            .catch((error) => console.error(error));
        }
      });
    }
  });
};

module.exports = register;
