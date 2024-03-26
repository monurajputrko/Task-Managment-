const mongoose = require("mongoose");

const connection = async () => {
  try {
    const mongoURI =
      ;
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err);
  }
};

module.exports = {
  connection,
};