const mongoose = require("mongoose");
mongoose.connect(process.env.mongo_url);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("mongo db is connected");
});

connection.on("error", (error) => {
  console.error(" error accure " + error);
});

module.exports = mongoose;
