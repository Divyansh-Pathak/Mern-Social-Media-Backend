const yup = require('yup');
const  userValidationSchema = require('../Validations/userValidations');
const User = require("../models/user");


const validateUserDetails = (req, res, next) => {
    
    userValidationSchema.validate(req.body)
    .then((isValid) => {
        
        next();
    })
    .catch((error)=> res.json(`User Validity Error ${error}`));
}

const validateEmail = (req, res, next) => {
    let flag = true;
    User.find((err , data)=>{
        if(err){
            console.log("err from validate email", err);
        }else{
            data.map((user)=>{
                if(user.contactDetails.email=== req.body.email){
                    flag=false;
                    res.status(400).json({
                        error: "Email already exist"
                      });
                    // res.json({error: "Email already exist"})
                }
            })
        }
    }).then((data) => {
        if(flag){
            next();
        }
        
    });

};





module.exports = {validateUserDetails, validateEmail};

// const product1 = {
//   id: 1,
//   name: 'The Imitation Game',
//   description: 'Movie about Alan Turing',
//   price: 19.99,
//   category: 'movie',
// };

// const product2 = {
//   id: 2,
//   name: 'The Theory of Everything',
//   price: '$14.95',
//   category: 'movie',
// };

// productSchema
//   .isValid(product1)
//   .then((isValid) => console.log(`product1 valid? ${isValid}`));
// productSchema
//   .isValid(product2)
//   .then((isValid) => console.log(`product2 valid? ${isValid}`));