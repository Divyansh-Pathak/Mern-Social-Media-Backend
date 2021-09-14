require('dotenv').config();
const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://divyansh_pathak:passionworld@passionworld-mumbai.s5vkd.mongodb.net/passionworldDB?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL", error);
    process.exit(1);
  }
};
module.exports = connectDB;
