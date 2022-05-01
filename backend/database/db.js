const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://shampo:<password>@cluster0.n6s4y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const db = async () => {
  await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((error) => console.error(error));
};

module.exports = db
