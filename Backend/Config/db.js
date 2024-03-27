const mongoose = require("mongoose");

const connection = async () => {
  try {
    const mongoURI = "mongodb+srv://monurajputrko:monurajputrko@portfolio-generator.d2hnuek.mongodb.net/Green-Mentor?retryWrites=true&w=majority";
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("Error connecting to MongoDB: ", err);
  }
};

module.exports = {
  connection,
};