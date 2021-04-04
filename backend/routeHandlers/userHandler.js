const User = require("../models/user");
const express = require('express');




//signup
const addUser = async (req, res) => {

  const details = new User({
    personalInformation : {
      name : req.params.name,
      DOB : req.body.date,
      birthPlace: req.body.birthPlace,
      currentCity: req.body.currentCity,
      profession : req.body.profession
    },
    contactDetails : {
      eMail : req.body.eMail,
      phone : req.body.phone
    }
  });
  try {
    
    await details.save();

    console.log("User Added Successfully");

    } catch (error) {

      console.log("Failed To Add User");
      console.log(error);
    
  }
};

//login
const authenticateUser = async (req, res) => {
  try {
   //authenticate User
  } catch (error) {
    //catch error
  }
};

module.exports = {
  addUser,
  authenticateUser,
};
