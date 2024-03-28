const mongoose = require("mongoose");
require("dotenv").config

const connection = async () => {
  try {
    const mongoURI = `${process.env.MONGODB_URL}`;
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err);
  }
};

module.exports = {
  connection,
};