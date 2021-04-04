const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  personalInformation : {
    name : String,
    DOB : Date,
    birthPlace: String,
    currentCity: String,
    profession : String
  },
  contactDetails : {
    eMail : String,
    phone : String
  },
  hobbies : [],
  Bio : String,
  profileImageURL : String,
  coverImageURL : String,
  followers : [],
  following : [],
  community : []
  
});

const User = mongoose.model("user", userSchema);

module.exports = User;