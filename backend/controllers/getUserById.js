const Users = require("../model/Users");

const getUserById = async (req, res) => {
  const { id } = req.user;

  if (id.length === 24) {
    Users.findById(id).then((account) => {
      if (!account) {
        return res.json({
          message: "No user found with that ID",
        });
      } else {
        const { _id, email, __v, ...info } = account._doc;
        res.json(info);
      }
    });
  } else {
    res.json({ message: "You are sending an incorrect password" });
  }
};

module.exports = getUserById;
