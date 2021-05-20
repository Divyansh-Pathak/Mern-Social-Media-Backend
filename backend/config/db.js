require('dotenv').config();
const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/capstone", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL");
    process.exit(1);
  } 
};
module.exports = connectDB;
